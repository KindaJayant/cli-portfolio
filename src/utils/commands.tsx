import { resume } from '../data/resume';

export type CommandOutput = string | React.ReactNode;

export type TerminalActions = {
    clear: () => void;
    setMatrixBoost: (active: boolean) => void;
    setGlitchMode: (active: boolean) => void;
};

export interface Command {
    name: string;
    description: string;
    hidden?: boolean;
    execute: (args: string[], actions: TerminalActions) => CommandOutput;
}

export const commands: Record<string, Command> = {
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
                                    <span className="text-terminal-green font-bold">{cmd.name}</span>
                                    <span className="text-gray-400">- {cmd.description}</span>
                                </div>
                            ))}
                    </div>
                </div>
            );
        },
    },
    // ... existing commands ...
    whoami: {
        name: 'whoami',
        description: 'Display user profile',
        execute: () => {
            return (
                <div className="flex flex-col gap-2">
                    <div className="text-xl font-bold text-white mb-2">Hello, I'm {resume.basics.name}</div>
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
                    <div className="text-gray-400 mt-4 max-w-2xl">
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
                    <div className="text-lg font-bold border-b border-terminal-green/30 pb-2 mb-2 w-max">Professional Experience</div>
                    {resume.internships.map((job, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="flex justify-between items-baseline flex-wrap">
                                <span className="text-terminal-green font-bold text-lg">{job.position}</span>
                                <span className="text-gray-400 text-sm">[{job.startDate} - {job.endDate}]</span>
                            </div>
                            <div className="text-white italic">{job.company}, {job.location}</div>
                            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
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
                    <div className="text-lg font-bold border-b border-terminal-green/30 pb-2 mb-2 w-max">Education</div>
                    {resume.education.map((edu, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex justify-between items-baseline">
                                <span className="text-terminal-green font-bold">{edu.institution}</span>
                                <span className="text-gray-400 text-sm">[{edu.startDate} - {edu.endDate}]</span>
                            </div>
                            <div className="text-white">{edu.studyType} in {edu.area}</div>
                            <div className="text-gray-400 text-sm mt-1">Coursework: {edu.courses.join(', ')}</div>
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
                <div className="flex flex-col gap-6">
                    <div className="text-lg font-bold border-b border-terminal-green/30 pb-2 mb-2 w-max">Projects</div>
                    {resume.projects.map((project, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <span className="text-terminal-green font-bold text-lg">{project.name}</span>
                            <ul className="list-disc list-inside text-gray-300 mt-1 space-y-1">
                                {project.highlights.map((highlight, i) => (
                                    <li key={i} className="text-sm">{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        },
    },
    skills: {
        name: 'skills',
        description: 'Display technical skills',
        execute: () => {
            return (
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold border-b border-terminal-green/30 pb-2 mb-2 w-max">Technical Skills</div>
                    <div>
                        <span className="text-terminal-green font-bold">Tools & Platforms: </span>
                        <span className="text-gray-300">{resume.skills.toolsAndPlatforms.join(', ')}</span>
                    </div>
                    <div>
                        <span className="text-terminal-green font-bold">Professional Skills: </span>
                        <span className="text-gray-300">{resume.skills.other.join(', ')}</span>
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
                    <div className="text-lg font-bold border-b border-terminal-green/30 pb-2 mb-2 w-max">Contact Protocol</div>
                    <div><span className="text-terminal-green">Email:</span> {resume.basics.email}</div>
                    <div><span className="text-terminal-green">Phone:</span> {resume.basics.phone}</div>
                    <div><span className="text-terminal-green">Location:</span> {resume.basics.location}</div>
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
                    <div className="text-terminal-green">
                        <div>Access granted.</div>
                        <div className="text-xl font-bold mt-2">Welcome aboard! 🚀</div>
                        <div>Contacting candidate...</div>
                    </div>
                );
            }
            return 'Permission denied: User is not in the sudoers file. This incident will be reported.';
        },
    },
    matrix: {
        name: 'matrix',
        description: 'Enter the Matrix',
        hidden: true,
        execute: (_, actions) => {
            actions.setMatrixBoost(true);
            setTimeout(() => actions.setMatrixBoost(false), 5000);
            return 'Follow the white rabbit...';
        },
    },
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
};
