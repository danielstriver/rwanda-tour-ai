import { HfInference } from '@huggingface/inference';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';
const LLM_MODEL = 'Qwen/Qwen2.5-72B-Instruct';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  const message = "I want to see some animals and maybe a beach.";
  console.log(`Testing message: "${message}"`);

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
    process.exit(1);
  }

  // 1. Get embedding for the test message
  console.log('Fetching query embedding...');
  const queryEmbeddingResponse = await hf.featureExtraction({
    model: EMBEDDING_MODEL,
    inputs: message,
  });
  const queryVec = queryEmbeddingResponse as unknown as number[];

  // 2. Query Supabase
  console.log('Querying Supabase vector search...');
  const { data: matches, error: searchError } = await supabase.rpc('match_destinations', {
    query_embedding: queryVec,
    match_threshold: 0.1,
    match_count: 3
  });

  if (searchError) {
    console.error(`Supabase search error: ${searchError.message}`);
    process.exit(1);
  }

  const topContext = (matches || []).map((m: any) => m.metadata);
  console.log("Top matches from Supabase:", topContext.map((c: any) => c.name));

  if (topContext.length === 0) {
    console.warn("No matches found. Ensure you have run 'npm run sync-supabase' first.");
  }

  // 3. Construct prompt
  const contextString = topContext.map((c: any) => 
    `- ${c.name} (${c.category} in ${c.location}): ${c.description}`
  ).join('\n');

  const systemPrompt = `You are the Rwanda Tourist Assistant. Your goal is to provide helpful, personalized travel recommendations in Rwanda based strictly on the provided context.
Context (Available Destinations):
${contextString}
`;

  // 4. Get LLM response
  console.log('Getting response from LLM...');
  const llmResponse = await hf.chatCompletion({
    model: LLM_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  console.log("--------------------------------------------------");
  console.log("AI REPLY:");
  console.log(llmResponse.choices[0].message.content);
  console.log("--------------------------------------------------");
}

test();
