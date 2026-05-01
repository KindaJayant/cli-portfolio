const getFallbackResponse = (message: string) => {
    const lower = message.toLowerCase();

    if (lower.includes('experience') || lower.includes('intern') || lower.includes('work')) {
        return 'Jayant is currently an AI Engineer Intern at The Future University, where he builds and tests AI-first investing workflows, stock-scoring systems, and portfolio analysis tooling. He previously worked at NVISH Solutions on backend performance and analytics-heavy retrieval improvements.';
    }

    if (lower.includes('project') || lower.includes('show me') || lower.includes('built')) {
        return 'Jayant\'s flagship projects include ResearchAgent, Codebase Onboarding Agent, PromptOps Tool, and Prepwise AI Interview. Type "projects" to browse them all, or "project analyst-project", "project codebase-onboarding-agent", "project promptops-tool", or "project ai-interview" for a specific one.';
    }

    if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
        return 'Jayant works primarily with TypeScript, React, Next.js, FastAPI, PostgreSQL, Redis, MongoDB, Firebase, AWS, n8n, and Gemini-powered workflows. His strongest lane is backend-heavy AI product engineering and orchestration.';
    }

    if (lower.includes('hire') || lower.includes('hireable') || lower.includes('why should')) {
        return 'Jayant looks strongest for roles that need product-minded full-stack engineering with real AI systems work. The signal is in the shipped projects, workflow reliability focus, and hands-on experience with backend architecture, eval-driven tooling, and orchestration.';
    }

    if (lower.includes('contact') || lower.includes('email') || lower.includes('linkedin') || lower.includes('github') || lower.includes('resume')) {
        return 'Use the "contact" command for Jayant\'s email, LinkedIn, GitHub, and resume links.';
    }

    if (lower.includes('who are you') || lower.includes('what is this')) {
        return 'I\'m Jayant AI, the portfolio assistant for Jayant Singh Bisht. Ask me about his projects, experience, skills, or technical focus.';
    }

    return 'Ask me about Jayant\'s projects, experience, skills, or why a specific project matters. You can also type "projects", "experience", or "skills" for direct terminal views.';
};

export const generateChatResponse = async (message: string, apiKey: string) => {
    const projectsContext = `
    1. ResearchAgent (slug: analyst-project)
       - Tech: Next.js, TypeScript, Gemini, Yahoo Finance, RSS
       - Desc: Autonomous stock and company research agent generating structured briefs from live financial and news data.
    2. Codebase Onboarding Agent (slug: codebase-onboarding-agent)
       - Tech: FastAPI, LangGraph, Tree-sitter, ChromaDB, Gemini, WebSockets
       - Desc: Autonomous codebase intelligence engine for structured onboarding reports over large repositories.
    3. PromptOps Tool (slug: promptops-tool)
       - Tech: React, Vite, FastAPI, SQLAlchemy, Postgres, Gemini
       - Desc: Prompt version control and evaluation workspace with diffing, rollback, analytics, and CLI workflows.
    4. Prepwise AI Interview (slug: ai-interview)
       - Tech: Next.js, Firebase, Vapi, Gemini, Tailwind CSS, Zod
       - Desc: AI mock interview platform with voice sessions, transcript capture, feedback scoring, and user dashboards.
    `;

    const systemPrompt = `You are "Jayant AI", the portfolio assistant of Jayant Singh Bisht, a full-stack and AI-focused engineer targeting software engineering roles.

Your role is to answer questions about Jayant's skills, projects, experience, and technical thinking.

STRICT TONE & STYLE GUIDELINES:
- NO MARKDOWN FORMATTING.
- Use PLAIN TEXT only. The output is rendered in a retro terminal that does not support markdown.
- Be consistent, professional, friendly, and concise.
- Keep answers sharp and useful.
- Do NOT be overly flattering, hypey, or personal.
- Do NOT dodge simple questions with generic assistant introductions.
- If asked a blunt or casual question, answer it plainly and bring it back to evidence from the portfolio.
- Prefer concrete proof points over adjectives.

PROJECT KNOWLEDGE BASE:
${projectsContext}

When discussing projects, refer to them by name.
If you recommend a project, tell the user to type "project <slug>".

If the user asks about specific skills, refer to these projects as proof of work.
If a question is unrelated to Jayant or his portfolio, politely steer the conversation back to relevant topics.

CRITICAL INSTRUCTION:
Your name is "Jayant AI".
Only introduce yourself if the user asks "Who are you?" or "What is this?".
Otherwise, answer directly.`;

    const requestBody = JSON.stringify({
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: `${systemPrompt}\n\nUser question: ${message}`,
                    },
                ],
            },
        ],
        generationConfig: {
            temperature: 0.35,
            topP: 0.85,
            maxOutputTokens: 700,
        },
    });

    for (let attempt = 0; attempt < 3; attempt++) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (response.ok) {
            const data: any = await response.json();

            return (
                data?.candidates?.[0]?.content?.parts
                    ?.map((part: { text?: string }) => part.text || '')
                    .join('')
                    .trim() || 'No response generated.'
            );
        }

        await response.text();
        if (![429, 500, 503].includes(response.status) || attempt === 2) {
            break;
        }

        await new Promise((resolve) => setTimeout(resolve, 700 * (attempt + 1)));
    }

    return getFallbackResponse(message);
};
