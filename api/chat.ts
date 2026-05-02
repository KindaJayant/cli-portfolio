import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateChatResponse } from './chatCore.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
    }

    if (process.env.NODE_ENV !== 'production') {
        try {
            const dotenv = await import('dotenv');
            const path = await import('path');
            const envPath = path.resolve(process.cwd(), '.env.local');
            dotenv.config({ path: envPath });
        } catch {
            // ignore local dotenv loading failures
        }
    }

    const apiKey =
        process.env.GEMINI_API_KEY ||
        process.env.GOOGLE_API_KEY ||
        process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        console.error('Missing Gemini API key');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const content = await generateChatResponse(message, apiKey);
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(content);
    } catch (error) {
        console.error('AI Processing Error:', error);
        return res.status(500).json({ error: 'AI system connection failed.' });
    }
}
