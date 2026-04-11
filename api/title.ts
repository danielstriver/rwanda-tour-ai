import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const LLM_MODEL = 'Qwen/Qwen2.5-72B-Instruct';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are a helpful assistant. Your goal is to generate a very concise, 2-5 word descriptive title for a chat session based ONLY on the user's first message. 
    Examples:
    - User: "I want a luxury tour in Akagera" -> Title: "Luxury Akagera Tour"
    - User: "Budget-friendly places in Kigali" -> Title: "Kigali Budget Stay"
    
    Rules:
    - 2-5 words total.
    - No quotes, no punctuation.
    - Title Case.
    - Do not include "Title: " prefix.
    `;

    const llmResponse = await hf.chatCompletion({
      model: LLM_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 20,
      temperature: 0.5,
    });

    const title = llmResponse.choices[0].message.content?.trim();

    return res.status(200).json({ title });

  } catch (error: any) {
    console.error('Title API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
