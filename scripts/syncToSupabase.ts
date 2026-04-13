import { createClient } from '@supabase/supabase-js';
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

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function syncToSupabase() {
  if (!fs.existsSync(KNOWLEDGE_FILE) || !fs.existsSync(EMBEDDINGS_FILE)) {
    console.error('Data files not found');
    process.exit(1);
  }

  const knowledgeArr: KnowledgeItem[] = JSON.parse(fs.readFileSync(KNOWLEDGE_FILE, 'utf-8'));
  const embeddingsArr: EmbeddingRecord[] = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8'));

  const embeddingsMap = new Map(embeddingsArr.map(e => [e.id, e.embedding]));

  console.log(`Syncing ${knowledgeArr.length} destinations to Supabase...`);

  const rows = knowledgeArr.map(item => {
    const embedding = embeddingsMap.get(item.id);
    if (!embedding) {
      console.warn(`No embedding found for ID: ${item.id}`);
    }

    // Use the same search content as generateEmbeddings.ts
    const content = `${item.name}. ${item.category} in ${item.location}. ${item.description} Tags: ${item.tags.join(', ')}`;

    return {
      id: item.id,
      content,
      metadata: item,
      embedding: embedding
    };
  });

  const { error } = await supabase
    .from('destinations')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error upserting data to Supabase:');
    console.error(`Status: ${error.code}`);
    console.error(`Message: ${error.message}`);
    if (error.message.includes('<!DOCTYPE html>')) {
      console.error('Hint: Received an HTML response. Check if your SUPABASE_URL is correct and if the "destinations" table exists.');
    }
  } else {
    console.log('✅ Successfully synced destinations to Supabase.');
  }
}

syncToSupabase();
