export type Project = {
    id: number;
    slug: string;
    title: string;
    year: string;
    category: string;
    description: string;
    signal: string;
    tech: string[];
    details: string[];
    image?: string;
    github?: string;
    live?: string;
};

export const projects: Project[] = [
    {
        id: 1,
        slug: 'analyst-project',
        title: 'ResearchAgent',
        year: '2026',
        category: 'Agent Systems',
        description: 'Autonomous research agent that gathers live market data, news, and web context to generate structured company and stock briefs.',
        signal: 'Multi-source tool orchestration',
        tech: ['Next.js', 'TypeScript', 'OpenRouter', 'Gemini 2.0 Flash', 'Yahoo Finance', 'RSS'],
        image: '/research-agent-preview.png',
        details: [
            'Built a server-side agent loop in Next.js that plans, gathers, reflects, and synthesizes without a separate backend.',
            'Integrated live financial data, search, and news pipelines with fallback logic to avoid empty or brittle analyses.',
            'Designed the output as a structured six-section report with bull and bear framing for fast investor-style review.',
        ],
        github: 'https://github.com/KindaJayant/analyst-project',
        live: 'https://analyst-project-ten.vercel.app',
    },
    {
        id: 2,
        slug: 'codebase-onboarding-agent',
        title: 'Codebase Onboarding Agent',
        year: '2025',
        category: 'Developer Tools',
        description: 'Autonomous codebase intelligence engine that turns large repositories into structured onboarding reports with streamed progress.',
        signal: 'LangGraph + semantic memory',
        tech: ['FastAPI', 'LangGraph', 'Tree-sitter', 'ChromaDB', 'Gemini', 'WebSockets'],
        image: '/codebase-onboarding-preview.png',
        details: [
            'Orchestrated a staged analysis DAG with LangGraph to move from repo parsing to architecture-level onboarding output.',
            'Used Tree-sitter and local vector search to combine structural parsing with semantic retrieval over large codebases.',
            'Streamed pipeline progress to a dashboard in real time, making a heavy backend workflow feel interactive and inspectable.',
        ],
        github: 'https://github.com/KindaJayant/codebase-onboarding-agent',
        live: 'https://codebase-onboarding-agent-r6wv.onrender.com/',
    },
    {
        id: 3,
        slug: 'promptops-tool',
        title: 'PromptOps Tool',
        year: '2025',
        category: 'LLM Infrastructure',
        description: 'Prompt workspace with versioning, diffs, rollback, analytics, eval runs, and a lightweight backend CLI for headless test workflows.',
        signal: 'Prompt lifecycle tooling',
        tech: ['React', 'Vite', 'FastAPI', 'SQLAlchemy', 'Postgres', 'Gemini'],
        image: '/promptops-preview.png',
        details: [
            'Built a full-stack prompt management flow with saved versions, side-by-side diffs, rollback, and test case execution.',
            'Added evaluation and analytics layers so prompt changes can be tracked with scores and pass-rate history instead of intuition.',
            'Added a lightweight backend CLI for listing prompts and running saved-version evals outside the web UI.',
        ],
        github: 'https://github.com/KindaJayant/PromptOps-Tool',
        live: 'https://prompt-ops-tool.vercel.app',
    },
    {
        id: 4,
        slug: 'ai-interview',
        title: 'Prepwise AI Interview',
        year: '2024',
        category: 'AI Product',
        description: 'Full-stack mock interview platform with voice sessions, transcript capture, structured feedback generation, and persistent user dashboards.',
        signal: 'Voice AI + product architecture',
        tech: ['Next.js', 'Firebase', 'Vapi', 'Gemini', 'Tailwind CSS', 'Zod'],
        image: '/prepwise-preview.png',
        details: [
            'Built an interview workflow that dynamically generates questions, runs voice sessions, captures transcripts, and scores performance.',
            'Used Firebase auth, Firestore, and server-side routes to support secure user flows and persistent interview history.',
            'Designed structured AI feedback around communication, technical clarity, confidence, and improvement areas for repeatable review.',
        ],
        github: 'https://github.com/KindaJayant/ai-interview',
        live: '#',
    },
    {
        id: 5,
        slug: 'llm-evaluations',
        title: 'LLM Evaluation System',
        year: '2025',
        category: 'Evaluation Systems',
        description: 'Benchmarking system for prompt and model variants with batch evaluation, scoring rules, hallucination checks, and performance tracking.',
        signal: 'Evaluation-first iteration',
        tech: ['Python', 'Streamlit', 'Rule-based Scoring', 'Benchmark Pipelines'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        details: [
            'Created an evaluation interface for comparing prompt variants side by side against datasets instead of ad hoc testing.',
            'Implemented exact, fuzzy, and hallucination-oriented scoring layers to make output quality more measurable.',
            'Tracked latency and token usage as part of the benchmark loop so model quality could be weighed against cost and speed.',
        ],
        github: 'https://github.com/KindaJayant/llm-evaluations',
    },
];
