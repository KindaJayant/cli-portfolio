export type Project = {
    id: number;
    slug: string;
    title: string;
    description: string;
    tech: string[];
    github?: string;
    live?: string;
};

export const projects: Project[] = [
    {
        id: 1,
        slug: 'voice-interview',
        title: 'AI Voice Interview Platform',
        description: 'AI-based interview simulator with 90% accuracy in voice-to-text. Features reduced latency speech synthesis and robust error handling.',
        tech: ['Next.js', 'Vapi', 'React.js', 'Firebase'],
        github: 'https://github.com/KindaJayant',
        live: '#'
    },
    {
        id: 2,
        slug: 'lms-saas',
        title: 'LMS SaaS AI Platform',
        description: 'Full-stack LMS with AI voice tutoring, payments, and auth. specific features include sub-second response times and reusable UI components.',
        tech: ['Next.js', 'TypeScript', 'Supabase', 'Clerk', 'Stripe', 'Vapi'],
        github: 'https://github.com/KindaJayant',
        live: '#'
    },
    {
        id: 3,
        slug: 'rag-engine',
        title: 'AI Workflow Engine',
        description: 'Scalable RAG-based LLM backend with async job processing, improving retrieval relevance by 2x over keyword search.',
        tech: ['LLM', 'RAG', 'Async Processing', 'API'],
        github: 'https://github.com/KindaJayant'
    },
    {
        id: 4,
        slug: 'stock-scoring',
        title: 'AI Stock Scoring System',
        description: 'Institutional-grade system evaluating 5000+ equities using multi-pillar analysis, fully automated via n8n and Gemini LLMs.',
        tech: ['n8n', 'Gemini LLM', 'Automated Workflows'],
        live: '#'
    }
];
