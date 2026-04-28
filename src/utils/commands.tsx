import { resume } from '../data/resume';
import { type Project, projects as projectsData } from '../data/projects';

export type TerminalOutput =
    | { type: 'text'; content: string }
    | { type: 'project'; project: Project }
    | { type: 'ai'; content: string }
    | { type: 'component'; content: React.ReactNode }
    | { type: 'header' };

export type CommandOutput = TerminalOutput | string | React.ReactNode;

export type TerminalActions = {
    clear: () => void;
    setMatrixBoost: (active: boolean) => void;
    setGlitchMode: (active: boolean) => void;
    triggerThemeTroll: () => void;
    setTheme: (theme: 'dark' | 'light' | 'cyberpunk') => void;
    setIsAiMode: (active: boolean) => void;
};

export interface Command {
    name: string;
    description: string;
    hidden?: boolean;
    execute: (args: string[], actions: TerminalActions) => CommandOutput;
}

const findProject = (query: string) => {
    const normalized = query.toLowerCase();
    return projectsData.find((project) =>
        project.id.toString() === normalized ||
        project.slug.toLowerCase() === normalized ||
        project.title.toLowerCase().includes(normalized)
    );
};

const impactMetrics = [
    { label: 'Voice-to-text accuracy', value: '90%' },
    { label: 'Users reached', value: '4,000+' },
    { label: 'Equities scored', value: '5,000+' },
    { label: 'Concurrent workflows', value: '10+' },
];

const stackGroups = [
    {
        title: 'Full-Stack Apps',
        level: 5,
        tools: ['React', 'Next.js', 'TypeScript', 'APIs'],
    },
    {
        title: 'AI Systems',
        level: 5,
        tools: ['RAG pipelines', 'Vapi', 'Prompt design', 'LLM orchestration'],
    },
    {
        title: 'Backend',
        level: 4,
        tools: ['Node.js', 'Supabase', 'Firebase', 'APIs'],
    },
    {
        title: 'Automation',
        level: 4,
        tools: ['n8n', 'Async jobs', 'Workflow design'],
    },
];

const renderBars = (level: number) => `${'█'.repeat(level)}${'░'.repeat(5 - level)}`;

const renderProjectSection = (project: Project) => (
    <div className="flex flex-col gap-4 max-w-3xl">
        <div>
            <div className="text-xs uppercase tracking-widest text-theme-dim">Case Study</div>
            <div className="text-2xl font-bold text-theme-text">{project.title}</div>
            <div className="text-theme-dim mt-1">Slug: {project.slug}</div>
        </div>

        <div className="grid gap-3 md:grid-cols-[160px_1fr] text-sm">
            <div className="text-theme-accent font-bold">Problem</div>
            <div className="text-theme-dim">{project.description}</div>

            <div className="text-theme-accent font-bold">Stack</div>
            <div className="text-theme-dim">{project.tech.join(' | ')}</div>

            <div className="text-theme-accent font-bold">Signals</div>
            <div className="text-theme-dim">
                {project.slug === 'analyst-project' && 'Autonomous research loop, live financial data ingestion, search resilience, and structured 6-section outputs.'}
                {project.slug === 'codebase-onboarding-agent' && 'LangGraph DAG orchestration, Tree-sitter parsing, vector search, and streamed codebase analysis.'}
                {project.slug === 'promptops-tool' && 'Prompt versioning, rollback, side-by-side diffs, test execution, and developer-facing workflow tooling.'}
                {project.slug === 'ai-interview' && 'Voice AI interview sessions, transcript-driven feedback, authenticated dashboards, and reusable full-stack architecture.'}
                {project.slug === 'llm-evaluations' && 'Batch benchmark runs, comparison views, scoring heuristics, and evaluation-driven model iteration.'}
            </div>

            <div className="text-theme-accent font-bold">Next Step</div>
            <div className="text-theme-dim">
                {project.github ? 'Open the source link below or ask Jayant AI why this project matters for your use case.' : 'Ask Jayant AI to compare this project with another build.'}
            </div>
        </div>

        <div className="flex gap-4 text-sm">
            {project.github && (
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-theme-text underline decoration-dashed"
                >
                    [GitHub]
                </a>
            )}
            {project.live && project.live !== '#' ? (
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-theme-text underline decoration-dashed"
                >
                    [Live Demo]
                </a>
            ) : (
                <span className="text-theme-dim italic">Live deployment not linked yet.</span>
            )}
        </div>
    </div>
);

export const commands: Record<string, Command> = {
    banner: {
        name: 'banner',
        description: 'Display welcome header',
        hidden: true,
        execute: () => ({ type: 'header' }),
    },
    help: {
        name: 'help',
        description: 'List all available commands',
        execute: () => {
            return (
                <div className="flex flex-col gap-4">
                    <div className="text-theme-text font-bold">Available commands</div>
                    <div className="grid grid-cols-[140px_1fr] gap-2">
                        {Object.values(commands)
                            .filter(cmd => !cmd.hidden)
                            .map((cmd) => (
                                <div key={cmd.name} className="flex contents">
                                    <span className="text-theme-text font-bold">{cmd.name}</span>
                                    <span className="text-theme-dim">- {cmd.description}</span>
                                </div>
                            ))}
                    </div>
                    <div className="text-theme-dim text-sm">
                        Suggested journey: <span className="text-theme-text">neofetch</span> {'->'} <span className="text-theme-text">impact</span> {'->'} <span className="text-theme-text">timeline</span> {'->'} <span className="text-theme-text">case-study analyst-project</span> {'->'} <span className="text-theme-text">chat jayant</span>
                    </div>
                </div>
            );
        },
    },
    neofetch: {
        name: 'neofetch',
        description: 'Show a workstation-style profile summary',
        execute: () => {
            return (
                <div className="grid gap-6 md:grid-cols-[auto_1fr] items-start">
                    <pre className="text-theme-text text-xs leading-tight">{String.raw`
      _____                       __
     / ___/____  ____ ___________/ /_
     \__ \/ __ \/ __ \`/ ___/ ___/ __/
    ___/ / /_/ / /_/ / /  / /__/ /_
   /____/ .___/\__,_/_/   \___/\__/
       /_/`}</pre>
                    <div className="grid gap-2 text-sm">
                        <div><span className="text-theme-accent">name</span>: {resume.basics.name}</div>
                        <div><span className="text-theme-accent">role</span>: Full-Stack + AI Engineer</div>
                        <div><span className="text-theme-accent">location</span>: {resume.basics.location}</div>
                        <div><span className="text-theme-accent">focus</span>: performant interfaces, AI products, workflow systems</div>
                        <div><span className="text-theme-accent">status</span>: open to opportunities</div>
                        <div><span className="text-theme-accent">highlights</span>: {impactMetrics.map((item) => `${item.value} ${item.label}`).join(' | ')}</div>
                        <div><span className="text-theme-accent">next</span>: try `impact`, `timeline`, `stack`, or `case-study analyst-project`</div>
                    </div>
                </div>
            );
        },
    },
    menu: {
        name: 'menu',
        description: 'Alias for help',
        hidden: true,
        execute: (args, actions) => commands.help.execute(args, actions),
    },
    // ... existing commands ...
    whoami: {
        name: 'whoami',
        description: 'Display user profile',
        execute: () => {
            return (
                <div className="flex flex-col gap-2">
                    <div className="text-xl font-bold text-theme-accent mb-2">Hello, I'm {resume.basics.name}</div>
                    <div>{resume.basics.location} | {resume.basics.email} | {resume.basics.phone}</div>
                    <div className="flex gap-4 mt-2">
                        {Object.entries(resume.basics.profiles).map(([platform, url]) => (
                            <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 hover:underline"
                            >
                                [{platform}]
                            </a>
                        ))}
                    </div>
                    <div className="text-theme-dim mt-4 max-w-2xl">
                        A Developer Dedicated to Crafting Scalable Web Solutions.
                        I specialize in building AI-powered platforms and immersive web experiences.
                    </div>
                </div>
            );
        },
    },
    experience: {
        name: 'experience',
        description: 'View professional experience',
        execute: () => {
            return (
                <div className="flex flex-col gap-6">
                    <div className="text-lg font-bold border-b border-theme-text/30 pb-2 mb-2 w-max">Professional Experience</div>
                    {resume.internships.map((job, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="flex justify-between items-baseline flex-wrap">
                                <span className="text-theme-text font-bold text-lg">{job.position}</span>
                                <span className="text-theme-dim text-sm">[{job.startDate} - {job.endDate}]</span>
                            </div>
                            <div className="text-theme-accent italic">{job.company}, {job.location}</div>
                            <ul className="list-disc list-inside text-theme-dim mt-2 space-y-1">
                                {job.highlights.map((highlight, i) => (
                                    <li key={i} className="text-sm leading-relaxed">{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        },
    },
    education: {
        name: 'education',
        description: 'View educational background',
        execute: () => {
            return (
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold border-b border-theme-text/30 pb-2 mb-2 w-max">Education</div>
                    {resume.education.map((edu, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex justify-between items-baseline">
                                <span className="text-theme-text font-bold">{edu.institution}</span>
                                <span className="text-theme-dim text-sm">[{edu.startDate} - {edu.endDate}]</span>
                            </div>
                            <div className="text-theme-accent">{edu.studyType} in {edu.area}</div>
                            <div className="text-theme-dim text-sm mt-1">Coursework: {edu.courses.join(', ')}</div>
                        </div>
                    ))}
                </div>
            );
        },
    },
    projects: {
        name: 'projects',
        description: 'List technical projects',
        execute: () => {
            return (
                <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold border-b border-theme-text/30 pb-2 mb-2 w-max">Projects</div>
                    {projectsData.map((project) => (
                        <div key={project.id} className="text-theme-accent">
                            <span className="text-theme-text">[{project.id}]</span> {project.title}
                        </div>
                    ))}
                    <div className="text-theme-dim mt-2 text-sm">Type `open &lt;number&gt;`, `project &lt;slug&gt;`, or `case-study &lt;name&gt;` to drill in.</div>
                </div>
            );
        },
    },
    impact: {
        name: 'impact',
        description: 'Show headline metrics and proof points',
        execute: () => {
            return (
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold border-b border-theme-text/30 pb-2 w-max">Impact Snapshot</div>
                    <div className="grid gap-3 md:grid-cols-2">
                        {impactMetrics.map((metric) => (
                            <div key={metric.label} className="border border-theme-text/20 bg-theme-text/5 rounded-sm px-4 py-3">
                                <div className="text-2xl font-bold text-theme-text">{metric.value}</div>
                                <div className="text-sm text-theme-dim">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="text-theme-dim text-sm">
                        Proof lives across `analyst-project`, `codebase-onboarding-agent`, `promptops-tool`, `ai-interview`, and `llm-evaluations`.
                    </div>
                </div>
            );
        },
    },
    timeline: {
        name: 'timeline',
        description: 'Render a quick career and project timeline',
        execute: () => {
            const entries = [
                '2022  | Started BE in Computer Science and Business Systems at Thapar',
                '2024  | Web Developer Intern at NVISH Solutions',
                '2024  | Built Prepwise AI Interview and PromptOps Tool',
                '2025  | Built LLM Evaluation System and Codebase Onboarding Agent',
                '2026  | Shipped ResearchAgent for autonomous market and company research',
            ];

            return (
                <div className="flex flex-col gap-3">
                    <div className="text-lg font-bold border-b border-theme-text/30 pb-2 w-max">Timeline</div>
                    <div className="font-mono text-sm whitespace-pre-wrap text-theme-dim">
                        {entries.map((entry, index) => `${index === entries.length - 1 ? '└' : '├'}─ ${entry}`).join('\n')}
                    </div>
                </div>
            );
        },
    },
    chat: {
        name: 'chat',
        description: 'Talk to Jayant AI (usage: chat jayant)',
        execute: (args, actions) => {
            if (args[0] === 'jayant') {
                actions.setIsAiMode(true);
                return { type: 'ai', content: "Hello! I am Jayant's AI assistant. Ask me anything about his work." };
            }
            return 'Usage: chat jayant';
        },
    },
    open: {
        name: 'open',
        description: 'View project details',
        execute: (args) => {
            if (args.length === 0) return 'Usage: open <id | slug>';

            const project = findProject(args.join(' '));

            if (!project) return `Project not found: ${args[0]}`;

            return { type: 'project', project };
        },
    },
    project: {
        name: 'project',
        description: 'Open a deeper project case study',
        execute: (args) => {
            if (args.length === 0) return 'Usage: project <id | slug | title>';

            const project = findProject(args.join(' '));

            if (!project) return `Project not found: ${args.join(' ')}`;

            return { type: 'component', content: renderProjectSection(project) };
        },
    },
    'case-study': {
        name: 'case-study',
        description: 'Alias for project deep dives',
        execute: (args, actions) => commands.project.execute(args, actions),
    },
    skills: {
        name: 'skills',
        description: 'Display technical skills',
        execute: () => {
            return (
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold border-b border-theme-text/30 pb-2 mb-2 w-max">Technical Skills</div>
                    <div>
                        <span className="text-theme-text font-bold">Tools & Platforms: </span>
                        <span className="text-theme-dim">{resume.skills.toolsAndPlatforms.join(', ')}</span>
                    </div>
                    <div>
                        <span className="text-theme-text font-bold">Professional Skills: </span>
                        <span className="text-theme-dim">{resume.skills.other.join(', ')}</span>
                    </div>
                </div>
            );
        },
    },
    stack: {
        name: 'stack',
        description: 'Visualize core strengths with signal bars',
        execute: () => {
            return (
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold border-b border-theme-text/30 pb-2 w-max">Stack Signal</div>
                    {stackGroups.map((group) => (
                        <div key={group.title} className="grid gap-1 md:grid-cols-[140px_120px_1fr] text-sm items-start">
                            <div className="text-theme-text font-bold">{group.title}</div>
                            <div className="font-mono text-theme-accent">{renderBars(group.level)}</div>
                            <div className="text-theme-dim">{group.tools.join(' | ')}</div>
                        </div>
                    ))}
                </div>
            );
        },
    },
    contact: {
        name: 'contact',
        description: 'Get contact information',
        execute: () => {
            return (
                <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold border-b border-theme-text/30 pb-2 mb-2 w-max">Contact Protocol</div>
                    <div><span className="text-theme-text">Email:</span> {resume.basics.email}</div>
                    <div><span className="text-theme-text">Phone:</span> {resume.basics.phone}</div>
                    <div><span className="text-theme-text">Location:</span> {resume.basics.location}</div>
                </div>
            );
        },
    },
    clear: {
        name: 'clear',
        description: 'Clear the terminal screen',
        execute: () => 'CLEAR_SIGNAL',
    },
    sudo: {
        name: 'sudo',
        description: 'Admin privileges',
        hidden: true,
        execute: (args) => {
            if (args.join(' ') === 'hire jayant') {
                return (
                    <div className="text-theme-text">
                        <div>Access granted.</div>
                        <div className="text-xl font-bold mt-2">Welcome aboard! 🚀</div>
                        <div>Contacting candidate...</div>
                    </div>
                );
            }
            return 'Permission denied: User is not in the sudoers file. This incident will be reported.';
        },
    },
    // matrix command moved to compatible standalone section below
    coffee: {
        name: 'coffee',
        description: 'Brew some coffee',
        hidden: true,
        execute: () => {
            const jokes = [
                "I drink coffee for your protection.",
                "Sudo make me a sandwich.",
                "Error 418: I'm a teapot.",
                "Software developers are devices that turn coffee into code.",
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
    },
    konami: {
        name: 'konami',
        description: 'Cheat code',
        hidden: true,
        execute: (_, actions) => {
            actions.setGlitchMode(true);
            setTimeout(() => actions.setGlitchMode(false), 3000);
            return 'GOD MODE ENABLED (visuals only, sorry)';
        },
    },
    theme: {
        name: 'theme',
        description: 'Change terminal theme (dark | light | cyberpunk)',
        execute: (args, actions) => {
            const theme = args[0]?.toLowerCase();
            if (theme === 'light') {
                actions.triggerThemeTroll();
                return 'Initiating light mode sequence...';
            } else if (theme === 'dark') {
                actions.setTheme('dark');
                actions.setMatrixBoost(false);
                return 'Restoring dark mode...';
            } else if (theme === 'cyberpunk') {
                actions.setTheme('cyberpunk');
                actions.setMatrixBoost(false);
                return 'Initializing NEON CITY interface...';
            } else if (theme === 'matrix') {
                // Secret path still works but not advertised
                actions.setTheme('dark');
                actions.setMatrixBoost(true);
                return 'Entering the Matrix...';
            }
            return 'Usage: theme <dark | light | cyberpunk>';
        },
    },
    // Standalone commands for better UX
    light: {
        name: 'light',
        description: 'Switch to light mode',
        execute: (_, actions) => {
            actions.triggerThemeTroll(); // Still troll them!
            return 'Initiating light mode sequence...';
        },
    },
    dark: {
        name: 'dark',
        description: 'Switch to dark mode',
        execute: (_, actions) => {
            actions.setTheme('dark');
            actions.setMatrixBoost(false);
            return 'Restoring dark mode...';
        },
    },
    cyberpunk: {
        name: 'cyberpunk',
        description: 'Switch to cyberpunk theme',
        execute: (_, actions) => {
            actions.setTheme('cyberpunk');
            actions.setMatrixBoost(false);
            return 'Initializing NEON CITY interface...';
        },
    },
    matrix: {
        name: 'matrix',
        description: 'Enter the Matrix',
        hidden: true,
        execute: (_, actions) => {
            actions.setTheme('dark');
            actions.setMatrixBoost(true);
            return 'Follow the white rabbit...';
        },
    },
};
