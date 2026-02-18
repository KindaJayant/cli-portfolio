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
                <div className="flex flex-col gap-2">
                    <div>Available commands:</div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        {Object.values(commands)
                            .filter(cmd => !cmd.hidden)
                            .map((cmd) => (
                                <div key={cmd.name} className="flex contents">
                                    <span className="text-theme-text font-bold">{cmd.name}</span>
                                    <span className="text-theme-dim">- {cmd.description}</span>
                                </div>
                            ))}
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
                    <div className="text-theme-dim mt-2 text-sm">Type 'open &lt;number&gt;' or 'open &lt;name&gt;' to view details.</div>
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

            const query = args[0].toLowerCase();
            const project = projectsData.find(p =>
                p.id.toString() === query ||
                p.slug.toLowerCase() === query ||
                p.title.toLowerCase().includes(query)
            );

            if (!project) return `Project not found: ${args[0]}`;

            return { type: 'project', project };
        },
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
