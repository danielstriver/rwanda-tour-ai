import { HfInference } from '@huggingface/inference';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { KnowledgeItem, EmbeddingRecord } from '../src/types/knowledge';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');
const KNOWLEDGE_FILE = path.join(DATA_DIR, 'rwanda_knowledge.json');
const EMBEDDINGS_FILE = path.join(DATA_DIR, 'rwanda_embeddings.json');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';
const LLM_MODEL = 'Qwen/Qwen2.5-72B-Instruct';

function fastCosineSimilarity(queryVec: number[], queryNorm: number, record: EmbeddingRecord): number {
  let dotProduct = 0;
  const vecB = record.embedding;
  for (let i = 0; i < queryVec.length; i++) {
    dotProduct += queryVec[i] * vecB[i];
  }
  return dotProduct / (queryNorm * record.norm);
}

async function test() {
  const message = "I want to see some animals and maybe a beach.";
  
  if (!fs.existsSync(KNOWLEDGE_FILE) || !fs.existsSync(EMBEDDINGS_FILE)) {
    console.error('Knowledge base or embeddings not found. Please run generateEmbeddings.ts first.');
    process.exit(1);
  }

  const knowledge: KnowledgeItem[] = JSON.parse(fs.readFileSync(KNOWLEDGE_FILE, 'utf-8'));
  const embeddings: EmbeddingRecord[] = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8'));

  const queryEmbeddingResponse = await hf.featureExtraction({
    model: EMBEDDING_MODEL,
    inputs: message,
  });
  const queryVec = queryEmbeddingResponse as unknown as number[];
  const queryNorm = Math.sqrt(queryVec.reduce((acc, val) => acc + val * val, 0));

  const similarities = embeddings.map((record) => ({
    id: record.id,
    score: fastCosineSimilarity(queryVec, queryNorm, record)
  }));

  similarities.sort((a, b) => b.score - a.score);
  const topIds = similarities.slice(0, 3).map((s) => s.id);
  const topContext = knowledge.filter((k) => topIds.includes(k.id));

  console.log("Top matches:", topContext.map((c) => c.name));

  const contextString = topContext.map((c) => 
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
