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
    1. ResearchAgent (id: 1, slug: analyst-project)
       - Tech: Next.js, TypeScript, OpenRouter, Gemini 2.0 Flash, Yahoo Finance, RSS
       - Desc: Autonomous stock and company research agent generating structured briefs from live financial and news data.
    2. Codebase Onboarding Agent (id: 2, slug: codebase-onboarding-agent)
       - Tech: FastAPI, LangGraph, Tree-sitter, ChromaDB, OpenRouter, WebSockets
       - Desc: Autonomous codebase intelligence engine for structured onboarding reports over large repositories.
    3. PromptOps Tool (id: 3, slug: promptops-tool)
       - Tech: React, Vite, FastAPI, SQLAlchemy, SQLite, OpenRouter
       - Desc: Prompt version control and evaluation workspace with diffing, rollback, analytics, and CLI workflows.
    4. Prepwise AI Interview (id: 4, slug: ai-interview)
       - Tech: Next.js, Firebase, Vapi, Gemini, Tailwind CSS, Zod
       - Desc: AI mock interview platform with voice sessions, transcript capture, feedback scoring, and user dashboards.
    5. LLM Evaluation System (id: 5, slug: llm-evaluations)
       - Tech: Python, Streamlit, Evaluation Pipelines, Rule-based Scoring
       - Desc: Benchmarking system for prompt and model variants with batch runs, scoring logic, and performance tracking.
    `;

    const systemPrompt = `You are "Jayant AI", the intelligent portfolio assistant of Jayant Singh Bisht, a full-stack and AI-focused engineer targeting software engineering roles.

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
