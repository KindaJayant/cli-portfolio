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
    setTheme: (theme: 'dark' | 'light' | 'cyberpunk' | 'serika' | 'nord' | 'matcha') => void;
    setIsAiMode: (active: boolean) => void;
    runCommand: (command: string) => void;
};

export interface Command {
    name: string;
    description: string;
    hidden?: boolean;
    execute: (args: string[], actions: TerminalActions) => CommandOutput;
}

const visibleProjects = projectsData.filter((project) => project.slug !== 'llm-evaluations');

const findProject = (query: string) => {
    const normalized = query.toLowerCase();
    return visibleProjects.find((project) =>
        project.id.toString() === normalized ||
        project.slug.toLowerCase() === normalized ||
        project.title.toLowerCase().includes(normalized)
    );
};

const aboutStats = [
    { label: 'Current focus', value: 'Reliable multi-agent orchestration' },
    { label: 'Base', value: resume.basics.location },
    { label: 'Availability', value: 'Open to full-time roles' },
];

const stackGroups = [
    {
        title: 'Core stack',
        tools: ['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL'],
    },
    {
        title: 'AI systems',
        tools: ['Gemini', 'LangGraph', 'Prompt orchestration', 'Eval workflows'],
    },
    {
        title: 'Infra and workflows',
        tools: ['Redis', 'MongoDB', 'Firebase', 'AWS', 'n8n'],
    },
    {
        title: 'Technical arsenal',
        tools: ['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'MongoDB', 'Firebase', 'AWS', 'n8n', 'Gemini'],
    },
];

const experienceEntries = [
    {
        role: 'AI Engineer Intern',
        company: 'The Future University',
        location: 'Chandigarh, IN',
        dates: '[Jan 2026 - Present]',
        bullets: [
            'Built and tested AI-first investing workflows across stock scoring, prompt logic, portfolio analysis, and automation loops.',
            'Developed and deployed an institutional-grade stock scoring system evaluating 5000+ Indian equities with multi-pillar analysis and narrative risk signals.',
            'Supported a 6000+ user investing product while building and testing 5+ core trading workflows.',
        ],
    },
    {
        role: 'Web Developer Intern',
        company: 'NVISH Solutions',
        location: 'Chandigarh, IN',
        dates: '[Jun 2024 - Jul 2024]',
        bullets: [
            'Analyzed retrieval bottlenecks and implemented a MongoDB-backed solution that reduced retrieval times by 75%.',
            'Improved client-facing component patterns and helped reduce bounce rates by 15% through better interaction design.',
        ],
    },
];

const linkClass = 'underline decoration-dashed underline-offset-4 hover:text-theme-text';

const renderProjectSection = (project: Project) => (
    <div className="flex max-w-3xl flex-col gap-4">
        <div>
            <div className="text-xs uppercase tracking-widest text-theme-dim">Project</div>
            <div className="text-2xl font-bold text-theme-text">{project.title}</div>
            <div className="mt-1 text-theme-dim">Slug: {project.slug}</div>
        </div>

        <div className="grid gap-3 text-sm md:grid-cols-[160px_1fr]">
            <div className="font-bold text-theme-accent">What it is</div>
            <div className="text-theme-dim">{project.description}</div>

            <div className="font-bold text-theme-accent">Stack</div>
            <div className="text-theme-dim">{project.tech.join(' | ')}</div>

            <div className="font-bold text-theme-accent">Highlights</div>
            <div className="text-theme-dim">{project.details.join(' ')}</div>
        </div>

        <div className="flex gap-4 text-sm">
            {project.github && (
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-dashed hover:text-theme-text"
                >
                    [GitHub]
                </a>
            )}
            {project.live && project.live !== '#' ? (
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-dashed hover:text-theme-text"
                >
                    [Live]
                </a>
            ) : (
                <span className="italic text-theme-dim">Live deployment not linked yet.</span>
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
        description: 'List available commands',
        execute: (_, actions) => {
            const primaryCommands = Object.values(commands).filter((cmd) => !cmd.hidden);

            return (
                <div className="flex flex-col gap-4">
                    <div className="font-bold text-theme-text">Available commands</div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        {primaryCommands.map((cmd) => (
                            <div key={cmd.name} className="contents">
                                <span className="font-bold text-theme-text">{cmd.name}</span>
                                <span className="text-theme-dim">- {cmd.description}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-theme-dim">
                        Good starting points:{' '}
                        <button type="button" onClick={() => actions.runCommand('about')} className={linkClass}>
                            about
                        </button>
                        ,{' '}
                        <button type="button" onClick={() => actions.runCommand('projects')} className={linkClass}>
                            projects
                        </button>
                        ,{' '}
                        <button type="button" onClick={() => actions.runCommand('experience')} className={linkClass}>
                            experience
                        </button>
                        ,{' '}
                        <button type="button" onClick={() => actions.runCommand('skills')} className={linkClass}>
                            skills
                        </button>
                    </div>
                </div>
            );
        },
    },
    about: {
        name: 'about',
        description: 'Show a concise profile summary',
        execute: () => {
            return (
                <div className="flex max-w-3xl flex-col gap-5">
                    <div>
                        <div className="text-2xl font-bold text-theme-text">Jayant Singh Bisht</div>
                        <div className="mt-2 text-theme-dim">
                            I build reliable agent workflows, LLMOps tooling, and production AI systems.
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                        {aboutStats.map((item) => (
                            <div key={item.label} className="rounded-sm border border-theme-text/20 bg-theme-text/5 px-4 py-3">
                                <div className="text-xs uppercase tracking-widest text-theme-dim">{item.label}</div>
                                <div className="mt-2 font-semibold text-theme-text">{item.value}</div>
                            </div>
                        ))}
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
                    <div className="mb-2 w-max border-b border-theme-text/30 pb-2 text-lg font-bold">Professional Experience</div>
                    {experienceEntries.map((job) => (
                        <div key={`${job.company}-${job.role}`} className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="text-lg font-bold text-theme-text">{job.role}</span>
                                <span className="text-sm text-theme-dim">{job.dates}</span>
                            </div>
                            <div className="italic text-theme-accent">{job.company}, {job.location}</div>
                            <ul className="mt-2 list-inside list-disc space-y-1 text-theme-dim">
                                {job.bullets.map((highlight, index) => (
                                    <li key={index} className="text-sm leading-relaxed">{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        },
    },
    projects: {
        name: 'projects',
        description: 'Browse flagship projects',
        execute: (_, actions) => {
            return (
                <div className="flex flex-col gap-3">
                    <div className="mb-2 w-max border-b border-theme-text/30 pb-2 text-lg font-bold">Projects</div>
                    {visibleProjects.map((project) => (
                        <button
                            key={project.id}
                            type="button"
                            onClick={() => actions.runCommand(`project ${project.slug}`)}
                            className="grid gap-1 text-left transition-colors hover:text-theme-text md:grid-cols-[220px_1fr]"
                        >
                            <div className="font-semibold text-theme-text underline decoration-dashed underline-offset-4">{project.slug}</div>
                            <div className="text-sm text-theme-dim">{project.title} - {project.description}</div>
                        </button>
                    ))}
                    <div className="mt-2 text-sm text-theme-dim">Click a project slug to open it.</div>
                </div>
            );
        },
    },
    project: {
        name: 'project',
        description: 'Open one project in detail',
        execute: (args) => {
            if (args.length === 0) return 'Usage: project <slug>';

            const project = findProject(args.join(' '));
            if (!project) return `Project not found: ${args.join(' ')}`;

            return { type: 'component', content: renderProjectSection(project) };
        },
    },
    skills: {
        name: 'skills',
        description: 'Show technical stack',
        execute: () => {
            return (
                <div className="flex flex-col gap-4">
                    <div className="mb-2 w-max border-b border-theme-text/30 pb-2 text-lg font-bold">Technical Stack</div>
                    {stackGroups.map((group) => (
                        <div key={group.title}>
                            <div className="font-bold text-theme-text">{group.title}</div>
                            <div className="mt-1 text-theme-dim">{group.tools.join(' | ')}</div>
                        </div>
                    ))}
                </div>
            );
        },
    },
    contact: {
        name: 'contact',
        description: 'Get contact links',
        execute: () => {
            return (
                <div className="flex flex-col gap-2">
                    <div className="mb-2 w-max border-b border-theme-text/30 pb-2 text-lg font-bold">Contact</div>
                    <div>
                        <span className="text-theme-text">Email:</span>{' '}
                        <a className={linkClass} href={`mailto:${resume.basics.email}`}>
                            {resume.basics.email}
                        </a>
                    </div>
                    <div>
                        <span className="text-theme-text">LinkedIn:</span>{' '}
                        <a className={linkClass} href={resume.basics.profiles.linkedin} target="_blank" rel="noopener noreferrer">
                            {resume.basics.profiles.linkedin}
                        </a>
                    </div>
                    <div>
                        <span className="text-theme-text">GitHub:</span>{' '}
                        <a className={linkClass} href={resume.basics.profiles.github} target="_blank" rel="noopener noreferrer">
                            {resume.basics.profiles.github}
                        </a>
                    </div>
                    <div>
                        <span className="text-theme-text">Resume:</span>{' '}
                        <a className={linkClass} href={resume.basics.profiles.resume} target="_blank" rel="noopener noreferrer">
                            {resume.basics.profiles.resume}
                        </a>
                    </div>
                </div>
            );
        },
    },
    clear: {
        name: 'clear',
        description: 'Clear the terminal screen',
        execute: () => 'CLEAR_SIGNAL',
    },
    theme: {
        name: 'theme',
        description: 'Change terminal theme (dark | light | cyberpunk | serika | nord | matcha)',
        execute: (args, actions) => {
            const theme = args[0]?.toLowerCase();
            if (theme === 'light') {
                actions.triggerThemeTroll();
                return 'Initiating light mode sequence...';
            }
            if (theme === 'dark') {
                actions.setTheme('dark');
                actions.setMatrixBoost(false);
                return 'Restoring dark mode...';
            }
            if (theme === 'cyberpunk') {
                actions.setTheme('cyberpunk');
                actions.setMatrixBoost(false);
                return 'Initializing cyberpunk mode...';
            }
            if (theme === 'serika') {
                actions.setTheme('serika');
                actions.setMatrixBoost(false);
                return 'Loading Serika theme...';
            }
            if (theme === 'nord') {
                actions.setTheme('nord');
                actions.setMatrixBoost(false);
                return 'Loading Nord theme...';
            }
            if (theme === 'matcha') {
                actions.setTheme('matcha');
                actions.setMatrixBoost(false);
                return 'Loading Matcha theme...';
            }
            if (theme === 'matrix') {
                actions.setTheme('dark');
                actions.setMatrixBoost(true);
                return 'Entering the Matrix...';
            }
            return 'Usage: theme <dark | light | cyberpunk | serika | nord | matcha>';
        },
    },
    light: {
        name: 'light',
        description: 'Switch to light mode',
        execute: (_, actions) => {
            actions.triggerThemeTroll();
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
            return 'Initializing cyberpunk mode...';
        },
    },
    serika: {
        name: 'serika',
        description: 'Switch to Serika theme',
        execute: (_, actions) => {
            actions.setTheme('serika');
            actions.setMatrixBoost(false);
            return 'Loading Serika theme...';
        },
    },
    nord: {
        name: 'nord',
        description: 'Switch to Nord theme',
        execute: (_, actions) => {
            actions.setTheme('nord');
            actions.setMatrixBoost(false);
            return 'Loading Nord theme...';
        },
    },
    matcha: {
        name: 'matcha',
        description: 'Switch to Matcha theme',
        execute: (_, actions) => {
            actions.setTheme('matcha');
            actions.setMatrixBoost(false);
            return 'Loading Matcha theme...';
        },
    },
    chat: {
        name: 'chat',
        description: 'Talk to Jayant AI (usage: chat jayant)',
        execute: (args, actions) => {
            if (args[0] === 'jayant') {
                actions.setIsAiMode(true);
                return { type: 'ai', content: "Hello! I am Jayant's AI assistant. Ask me anything about his work. Press Esc or type 'exit' to leave AI mode." };
            }
            return 'Usage: chat jayant';
        },
    },

    menu: {
        name: 'menu',
        description: 'Alias for help',
        hidden: true,
        execute: (args, actions) => commands.help.execute(args, actions),
    },
    whoami: {
        name: 'whoami',
        description: 'Alias for about',
        hidden: true,
        execute: (args, actions) => commands.about.execute(args, actions),
    },
    neofetch: {
        name: 'neofetch',
        description: 'Alias for about',
        hidden: true,
        execute: (args, actions) => commands.about.execute(args, actions),
    },
    open: {
        name: 'open',
        description: 'Alias for project',
        hidden: true,
        execute: (args, actions) => commands.project.execute(args, actions),
    },
    'case-study': {
        name: 'case-study',
        description: 'Alias for project',
        hidden: true,
        execute: (args, actions) => commands.project.execute(args, actions),
    },
    education: {
        name: 'education',
        description: 'View educational background',
        hidden: true,
        execute: () => {
            return (
                <div className="flex flex-col gap-4">
                    <div className="mb-2 w-max border-b border-theme-text/30 pb-2 text-lg font-bold">Education</div>
                    {resume.education.map((edu, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex justify-between gap-2">
                                <span className="font-bold text-theme-text">{edu.institution}</span>
                                <span className="text-sm text-theme-dim">[{edu.startDate} - {edu.endDate}]</span>
                            </div>
                            <div className="text-theme-accent">{edu.studyType} in {edu.area}</div>
                        </div>
                    ))}
                </div>
            );
        },
    },
    impact: {
        name: 'impact',
        description: 'Legacy alias',
        hidden: true,
        execute: (args, actions) => commands.about.execute(args, actions),
    },
    timeline: {
        name: 'timeline',
        description: 'Legacy alias',
        hidden: true,
        execute: (args, actions) => commands.experience.execute(args, actions),
    },
    stack: {
        name: 'stack',
        description: 'Legacy alias',
        hidden: true,
        execute: (args, actions) => commands.skills.execute(args, actions),
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
                        <div className="mt-2 text-xl font-bold">Welcome aboard!</div>
                        <div>Contacting candidate...</div>
                    </div>
                );
            }
            return 'Permission denied: User is not in the sudoers file.';
        },
    },
    coffee: {
        name: 'coffee',
        description: 'Brew some coffee',
        hidden: true,
        execute: () => {
            const jokes = [
                'I drink coffee for your protection.',
                'Sudo make me a sandwich.',
                "Error 418: I'm a teapot.",
                'Software developers are devices that turn coffee into code.',
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
            return 'GOD MODE ENABLED (visuals only)';
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
