import { HfInference } from '@huggingface/inference';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');
const KNOWLEDGE_FILE = path.join(DATA_DIR, 'rwanda_knowledge.json');
const EMBEDDINGS_FILE = path.join(DATA_DIR, 'rwanda_embeddings.json');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';
const LLM_MODEL = 'Qwen/Qwen2.5-72B-Instruct';

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

async function test() {
  const message = "I want to see some animals and maybe a beach.";
  
  const knowledge = JSON.parse(fs.readFileSync(KNOWLEDGE_FILE, 'utf-8'));
  const embeddings = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8'));

  const queryEmbeddingResponse = await hf.featureExtraction({
    model: EMBEDDING_MODEL,
    inputs: message,
  });
  const queryEmbedding = queryEmbeddingResponse as unknown as number[];

  const similarities = embeddings.map((record: any) => ({
    id: record.id,
    score: cosineSimilarity(queryEmbedding, record.embedding)
  }));

  similarities.sort((a: any, b: any) => b.score - a.score);
  const topIds = similarities.slice(0, 3).map((s: any) => s.id);
  const topContext = knowledge.filter((k: any) => topIds.includes(k.id));

  console.log("Top matches:", topContext.map((c: any) => c.name));

  const contextString = topContext.map((c: any) => 
    `- ${c.name} (${c.category} in ${c.location}): ${c.description}`
  ).join('\n');

  const systemPrompt = `You are the Rwanda Tourist Assistant. Your goal is to provide helpful, personalized travel recommendations in Rwanda based strictly on the provided context.
Context:
${contextString}
`;

  const llmResponse = await hf.chatCompletion({
    model: LLM_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  console.log("LLM Reply:", llmResponse.choices[0].message.content);
}

test();
