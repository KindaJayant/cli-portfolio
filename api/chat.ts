import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Ensure env vars are loaded in local dev
    // @ts-ignore
    if (process.env.NODE_ENV !== 'production') {
        try {
            const dotenv = await import('dotenv');
            const path = await import('path');
            const envPath = path.resolve(process.cwd(), '.env.local');
            dotenv.config({ path: envPath });
        } catch (e) {
            // ignore if dotenv not found
        }
    }

    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
        console.error('Missing MISTRAL_API_KEY');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const projectsContext = `
    1. AI Voice Interview Platform (id: 1, slug: voice-interview)
       - Tech: Next.js, Vapi, React.js, Firebase
       - Desc: AI interview simulator, 90% voice-to-text accuracy, low latency.
    2. LMS SaaS AI Platform (id: 2, slug: lms-saas)
       - Tech: Next.js, Supabase, Clerk, Stripe, Vapi
       - Desc: Full-stack LMS with AI voice tutoring and payments.
    3. AI Workflow Engine (id: 3, slug: rag-engine)
       - Tech: LLM, RAG, Async Processing
       - Desc: Scalable backend with semantic retrieval and async jobs.
    4. AI Stock Scoring System (id: 4, slug: stock-scoring)
       - Tech: n8n, Gemini LLM
       - Desc: Automated stock evaluation system for 5000+ equities.
    `;

    const systemPrompt = `You are "Jayant AI", the intelligent portfolio assistant of Jayant Singh Bisht, a frontend and AI-focused engineer.

Your role is to answer questions about Jayant’s skills, projects, experience, and technical thinking.

STRICT TONE & STYLE GUIDELINES:
- **NO MARKDOWN FORMATTING**: Do NOT use bold (**text**), italics (*text*), or code blocks (\`text\`).
- Use PLAIN TEXT only. The output is rendered in a retro terminal that does not support markdown.
- Be consistent, professional, yet friendly and witty.
- Keep answers concise and punchy.

PROJECT KNOWLEDGE BASE:
${projectsContext}

When discussing projects, refer to them by name.
If you recommend a project, tell the user to type 'open <id>' (e.g., "Check out the Mini ERP by typing 'open 1'").

If the user asks about specific skills, refer to these projects as proof of work.
If a question is unrelated to Jayant or his portfolio, politely steer the conversation back to relevant topics.

CRITICAL INSTRUCTION:
Your name is "Jayant AI".
Only introduce yourself if the user asks "Who are you?" or "What is this?".
Otherwise, just answer the question directly.
Do NOT start every message with your name.`;

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'mistral-tiny', // or mistral-small, mistral-medium
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                stream: true,
            }),
        });

        if (!response.ok) {
            console.error('Mistral API Error:', response.status, response.statusText);
            return res.status(500).json({ error: 'AI system temporarily overloaded.' });
        }

        // Handle Streaming Response
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
            throw new Error('No response body from Mistral');
        }

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const dataStr = line.slice(6).trim();
                    if (dataStr === '[DONE]') break;

                    try {
                        const data = JSON.parse(dataStr);
                        const content = data.choices[0]?.delta?.content || '';
                        if (content) {
                            res.write(content);
                        }
                    } catch (e) {
                        // ignore parse errors
                    }
                }
            }
        }

        res.end();

    } catch (error) {
        console.error('AI Processing Error:', error);
        return res.status(500).json({ error: 'AI system connection failed.' });
    }
}
