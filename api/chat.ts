import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { HfInference } from '@huggingface/inference';
import fs from 'fs';
import path from 'path';
import { KnowledgeItem, EmbeddingRecord } from '../src/types/knowledge';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';
const LLM_MODEL = 'Qwen/Qwen2.5-72B-Instruct';

const ChatPayloadSchema = z.object({
  message: z.string().min(1, "Message is required"),
  preferences: z.object({
    experience: z.string().optional(),
    budget: z.string().optional(),
    duration: z.string().optional(),
  }).optional(),
});

// Global cache for optimized lookup and reduced I/O
let cachedKnowledge: Map<string, KnowledgeItem> | null = null;
let cachedEmbeddings: EmbeddingRecord[] | null = null;

function loadData() {
  if (cachedKnowledge && cachedEmbeddings) return;

  const DATA_DIR = path.join(process.cwd(), 'src/data');
  const KNOWLEDGE_FILE = path.join(DATA_DIR, 'rwanda_knowledge.json');
  const EMBEDDINGS_FILE = path.join(DATA_DIR, 'rwanda_embeddings.json');

  if (!fs.existsSync(KNOWLEDGE_FILE) || !fs.existsSync(EMBEDDINGS_FILE)) {
    throw new Error('Knowledge base not found');
  }

  const knowledgeArr: KnowledgeItem[] = JSON.parse(fs.readFileSync(KNOWLEDGE_FILE, 'utf-8'));
  const embeddingsRaw: EmbeddingRecord[] = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8'));

  cachedKnowledge = new Map(knowledgeArr.map(k => [k.id, k]));
  cachedEmbeddings = embeddingsRaw;
}

/**
 * Optimized Cosine Similarity
 * Time Complexity: O(D) where D is embedding dimension.
 * Space Complexity: O(1)
 */
function fastCosineSimilarity(queryVec: number[], queryNorm: number, record: EmbeddingRecord): number {
  let dotProduct = 0;
  const vecB = record.embedding;
  for (let i = 0; i < queryVec.length; i++) {
    dotProduct += queryVec[i] * vecB[i];
  }
  return dotProduct / (queryNorm * record.norm);
}

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

    // 1. Efficient Data Loading (O(1) after first load)
    loadData();

    // 2. Query Embedding (Parallelize if possible, but here query is needed for next step)
    const queryText = `Looking for: ${message}. Preferences: ${JSON.stringify(preferences || {})}`;
    const queryEmbeddingResponse = await hf.featureExtraction({
      model: EMBEDDING_MODEL,
      inputs: queryText,
    });
    const queryVec = queryEmbeddingResponse as unknown as number[];
    const queryNorm = Math.sqrt(queryVec.reduce((acc, val) => acc + val * val, 0));

    // 3. Find Top Matches (O(N*D))
    const similarities = cachedEmbeddings!.map(record => ({
      id: record.id,
      score: fastCosineSimilarity(queryVec, queryNorm, record)
    }));

    similarities.sort((a, b) => b.score - a.score);
    const topContext = similarities.slice(0, 3)
      .map(s => cachedKnowledge!.get(s.id))
      .filter(Boolean) as KnowledgeItem[];

    // 4. Construct Prompt
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

    // 5. Streaming Response for best TTFT (Time to First Token)
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
    // Sanitize error response and log details internally
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
