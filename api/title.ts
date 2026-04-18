import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { HfInference } from '@huggingface/inference';
import { ratelimit } from './_lib/ratelimit';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const LLM_MODEL = 'Qwen/Qwen2.5-0.5B-Instruct';

const TitlePayloadSchema = z.object({
  message: z.string().min(1, 'Message is required').max(500, 'Message too long'),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (ratelimit) {
      const identifier = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
      const { success } = await ratelimit.limit(`title:${identifier.toString()}`);
      if (!success) {
        return res.status(429).json({ error: 'Rate limit exceeded.' });
      }
    }

    const validatedBody = TitlePayloadSchema.safeParse(req.body);

    if (!validatedBody.success) {
      return res.status(400).json({
        error: 'Invalid request payload',
        details: validatedBody.error.format()
      });
    }

    const { message } = validatedBody.data;

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

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Title API Error:', { message: msg, timestamp: new Date().toISOString() });
    return res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
  }
}
