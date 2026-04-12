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
const INPUT_FILE = path.join(DATA_DIR, 'rwanda_knowledge.json');
const OUTPUT_FILE = path.join(DATA_DIR, 'rwanda_embeddings.json');

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
const MODEL_ID = 'sentence-transformers/all-MiniLM-L6-v2';

if (!HF_TOKEN) {
  console.error('Missing HUGGINGFACE_API_KEY in .env');
  process.exit(1);
}

const hf = new HfInference(HF_TOKEN);

async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const result = await hf.featureExtraction({
    model: MODEL_ID,
    inputs: texts,
  });
  return result as unknown as number[][];
}

async function generateEmbeddings() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Input file not found: ${INPUT_FILE}`);
    process.exit(1);
  }

  const data: KnowledgeItem[] = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
  console.log(`Loaded ${data.length} items from knowledge base.`);

  // Combine relevant fields into a single search string per item
  const textsToEmbed = data.map(item => {
    return `${item.name}. ${item.category} in ${item.location}. ${item.description} Tags: ${item.tags.join(', ')}`;
  });

  console.log('Fetching embeddings from HuggingFace...');
  
  try {
    const embeddings = await getEmbeddings(textsToEmbed);

    const records: EmbeddingRecord[] = data.map((item, index) => {
      const embedding = embeddings[index];
      const norm = Math.sqrt(embedding.reduce((acc, val) => acc + val * val, 0));
      return {
        id: item.id,
        embedding,
        norm
      };
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(records, null, 2));
    console.log(`✅ Successfully generated and saved embeddings to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Failed to generate embeddings:', error);
  }
}

generateEmbeddings();
