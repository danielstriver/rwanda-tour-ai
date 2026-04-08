import { HfInference } from '@huggingface/inference';
import fs from 'fs';
import path from 'path';

// Define paths
// In Vercel serverless, __dirname is the directory of the current file.
// When compiled, the paths might change slightly depending on the build, but for raw Vercel functions, it usually runs from root.
const DATA_DIR = path.join(process.cwd(), 'src/data');
const KNOWLEDGE_FILE = path.join(DATA_DIR, 'rwanda_knowledge.json');
const EMBEDDINGS_FILE = path.join(DATA_DIR, 'rwanda_embeddings.json');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';
const LLM_MODEL = 'Qwen/Qwen2.5-72B-Instruct';

interface KnowledgeItem {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  tags: string[];
}

interface EmbeddingRecord {
  id: string;
  embedding: number[];
}

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, preferences } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Read Knowledge & Embeddings
    if (!fs.existsSync(KNOWLEDGE_FILE) || !fs.existsSync(EMBEDDINGS_FILE)) {
      return res.status(500).json({ error: 'Knowledge base not found' });
    }

    const knowledge: KnowledgeItem[] = JSON.parse(fs.readFileSync(KNOWLEDGE_FILE, 'utf-8'));
    const embeddings: EmbeddingRecord[] = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8'));

    // 2. Embed user query (combining message and preferences to capture intent)
    const queryText = `Looking for: ${message}. Preferences: ${JSON.stringify(preferences || {})}`;
    
    const queryEmbeddingResponse = await hf.featureExtraction({
      model: EMBEDDING_MODEL,
      inputs: queryText,
    });
    const queryEmbedding = queryEmbeddingResponse as unknown as number[];

    // 3. Find Top Matches (Cosine Similarity)
    const similarities = embeddings.map(record => ({
      id: record.id,
      score: cosineSimilarity(queryEmbedding, record.embedding)
    }));

    similarities.sort((a, b) => b.score - a.score);
    const topIds = similarities.slice(0, 3).map(s => s.id);
    const topContext = knowledge.filter(k => topIds.includes(k.id));

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

    // 5. Generate Response
    const llmResponse = await hf.chatCompletion({
      model: LLM_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const replyText = llmResponse.choices[0].message.content;

    return res.status(200).json({
      reply: replyText,
      recommendations: topContext
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
