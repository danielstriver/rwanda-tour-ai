import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { HfInference } from '@huggingface/inference';
import { createClient } from '@supabase/supabase-js';
import { KnowledgeItem } from '../src/types/knowledge';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';
const LLM_MODEL = 'Qwen/Qwen2.5-72B-Instruct';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const ChatPayloadSchema = z.object({
  message: z.string().min(1, "Message is required"),
  preferences: z.object({
    experience: z.string().optional(),
    budget: z.string().optional(),
    duration: z.string().optional(),
  }).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const validatedBody = ChatPayloadSchema.safeParse(req.body);
    
    if (!validatedBody.success) {
      return res.status(400).json({ 
        error: 'Invalid request payload', 
        details: validatedBody.error.format() 
      });
    }

    const { message, preferences } = validatedBody.data;

    // 1. Query Embedding
    const queryText = `Looking for: ${message}. Preferences: ${JSON.stringify(preferences || {})}`;
    const queryEmbeddingResponse = await hf.featureExtraction({
      model: EMBEDDING_MODEL,
      inputs: queryText,
    });
    const queryVec = queryEmbeddingResponse as unknown as number[];

    // 2. Find Top Matches via Supabase Vector Search
    const { data: matches, error: searchError } = await supabase.rpc('match_destinations', {
      query_embedding: queryVec,
      match_threshold: 0.1, // Adjust as needed
      match_count: 3
    });

    if (searchError) {
      throw new Error(`Supabase search error: ${searchError.message}`);
    }

    const topContext = (matches || []).map((m: any) => m.metadata) as KnowledgeItem[];

    // 3. Construct Prompt
    const contextString = topContext.map(c => 
      `- ${c.name} (${c.category} in ${c.location}): ${c.description}`
    ).join('\n');

    const systemPrompt = `You are the Rwanda Tourist Assistant. Your goal is to provide helpful, personalized travel recommendations in Rwanda based strictly on the provided context.
If the context is insufficient, gently steer the conversation towards the available locations.
Be friendly, concise, and format your response beautifully.

Context (Available Destinations):
${contextString}

User Preferences: ${JSON.stringify(preferences || {})}
`;

    // 4. Streaming Response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = hf.chatCompletionStream({
      model: LLM_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const content = chunk.choices[0].delta.content;
        if (content) {
          res.write(content);
        }
      }
    }

    res.end();

  } catch (error: any) {
    console.error('API Error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    if (!res.headersSent) {
      return res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
    }
    res.end();
  }
}
