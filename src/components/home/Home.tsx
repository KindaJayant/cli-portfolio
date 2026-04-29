import React, { useEffect, useState } from 'react';
import {
    ArrowUpRight,
    Boxes,
    Braces,
    BrainCircuit,
    BriefcaseBusiness,
    Bot,
    Cloud,
    Database,
    GitBranch,
    Github,
    Linkedin,
    Mail,
    Menu,
    ServerCog,
    Terminal,
    Workflow,
    X,
} from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects, type Project } from '../../data/projects';
import { resume } from '../../data/resume';

const heroSignals = ['Agent systems', 'LLMOps', 'Full-stack', 'Eval workflows'];

const stackItems = [
    { label: 'Python', icon: BrainCircuit },
    { label: 'FastAPI', icon: ServerCog },
    { label: 'Next.js', icon: Boxes },
    { label: 'LangGraph', icon: Workflow },
    { label: 'TypeScript', icon: Terminal },
    { label: 'PostgreSQL', icon: Database },
    { label: 'n8n', icon: BriefcaseBusiness },
    { label: 'Redis', icon: Boxes },
    { label: 'React', icon: Braces },
    { label: 'GenAI', icon: Bot },
    { label: 'Promptfoo', icon: GitBranch },
    { label: 'MongoDB', icon: Database },
    { label: 'Firebase', icon: Cloud },
    { label: 'AWS', icon: Cloud },
    { label: 'SQL', icon: Database },
    { label: 'ChromaDB', icon: Database },
    { label: 'LangChain', icon: Workflow },
    { label: 'Agentic AI', icon: Bot },
];

const navItems = [
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume', href: resume.basics.profiles.resume, external: true },
];

const Home: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = selectedProject || showAllProjects || mobileMenuOpen ? 'hidden' : 'unset';
    }, [selectedProject, showAllProjects, mobileMenuOpen]);

    return (
        <div className="min-h-screen bg-[#0c0c0c] text-[#c8c3bb]">
            <header className="sticky top-0 z-40 border-b border-[#1f1f1f] bg-[#0f0d0c]/95 backdrop-blur">
                <div className="mx-auto grid max-w-[1480px] grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
                    <a href="#home" className="justify-self-start font-display text-[1.45rem] leading-none text-[#f2eee8]">
                        {resume.basics.name}
                    </a>

                    <nav className="hidden items-center justify-self-center md:flex md:gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noopener noreferrer' : undefined}
                                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7f7a72] transition-colors hover:text-[#ece8e1]"
                            >
                                {item.label}
                                {item.external ? ' ↗' : ''}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden items-center justify-self-end gap-3 md:flex">
                        <a
                            href={`mailto:${resume.basics.email}`}
                            className="rounded-full border border-[#37322c] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#ece8e1] transition-colors hover:border-[#575048] hover:bg-[#171412]"
                        >
                            Contact
                        </a>
                        <a
                            href="#cli"
                            className="rounded-full border border-[#26221f] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#90887f] transition-colors hover:border-[#413a33] hover:text-[#ece8e1]"
                        >
                            Switch to CLI
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="justify-self-end rounded-full border border-[#2a2521] p-2 text-[#9d958b] md:hidden"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden">
                    <div className="ml-auto flex h-full w-[86%] max-w-sm flex-col border-l border-[#1f1f1f] bg-[#100f0e] p-6">
                        <div className="flex items-center justify-between">
                            <span className="font-display text-2xl text-[#ece8e1]">Navigate</span>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-full border border-[#2a2521] p-2 text-[#9d958b]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-10 flex flex-col gap-5">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-mono text-sm uppercase tracking-[0.2em] text-[#c8c3bb]"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a href="#cli" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase tracking-[0.2em] text-[#8f877f]">
                                Switch to CLI
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <main id="home" className="mx-auto max-w-[1480px] px-5 py-7 md:px-8 md:py-8">
                <section className="grid gap-4 lg:grid-cols-[1.55fr_0.75fr]">
                    <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-8">
                        <div className="mb-6 flex flex-wrap gap-2">
                            {heroSignals.map((signal) => (
                                <span
                                    key={signal}
                                    className="rounded-md border border-[#2a2a2a] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#716b63]"
                                >
                                    {signal}
                                </span>
                            ))}
                        </div>

                        <h1 className="max-w-4xl font-display text-[3.15rem] leading-[0.98] text-[#ece8e1] sm:text-[4rem] lg:text-[4.8rem]">
                            Building software systems, <em className="font-display italic text-[#b7aea3]">agent workflows,</em> and developer tools
                        </h1>

                        <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#91887f]">
                            Focused on the intersection of deep backend architecture and LLM orchestration. Engineering tools that empower developers and automate complex reasoning.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-8">
                        <div className="flex flex-col items-center justify-center gap-5 py-6 md:py-8">
                            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-[#302c27] bg-[radial-gradient(circle_at_30%_30%,#2b2824_0%,#171615_58%,#121111_100%)] font-display text-7xl text-[#ece8e1] md:h-44 md:w-44 md:text-[5.25rem]">
                                JS
                            </div>

                            <div className="text-center">
                                <h2 className="font-display text-[2rem] leading-none text-[#ece8e1]">{resume.basics.name}</h2>
                                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#726d65]">
                                    BE CSE · Thapar · Jun 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-4 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
                    <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-8">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#666058]">Availability</p>
                        <div className="mt-5 flex items-center gap-3 text-[15px] text-[#ece8e1]">
                            <span className="h-2 w-2 rounded-full bg-[#5b8b69]" />
                            <span>Available for full time roles</span>
                        </div>

                        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-[#666058]">Current focus</p>
                        <h2 className="mt-4 max-w-sm font-display text-[2.15rem] leading-[1.02] text-[#ece8e1]">
                            Reliable Multi-Agent Orchestration
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-8">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#666058]">Technical arsenal</p>
                        <div className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {stackItems.map(({ label, icon: Icon }) => (
                                <div key={label} className="flex items-center gap-3 text-[#e7e1d8]">
                                    <Icon size={16} className="text-[#9a9388]" />
                                    <span className="text-[15px]">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="projects" className="mt-14">
                    <div className="mb-7">
                        <h2 className="font-display text-[3rem] leading-none text-[#ece8e1]">Selected Work</h2>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        {projects.slice(0, 2).map((project) => (
                            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                        ))}
                    </div>

                    <div className="mt-4">
                        <ProjectCard project={projects[2]} wide onClick={() => setSelectedProject(projects[2])} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setShowAllProjects(true)}
                            className="inline-flex items-center gap-2 rounded-full border border-[#302b26] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#a0998f] transition-colors hover:border-[#4a433b] hover:text-[#ece8e1]"
                        >
                            View all projects <ArrowUpRight size={14} />
                        </button>
                    </div>
                </section>

                <section id="experience" className="mt-12 rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#666058]">Professional journey</p>

                    <div className="mt-8 space-y-8">
                        {resume.internships.map((job, index) => (
                            <div
                                key={job.company}
                                className={`grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-start ${index < resume.internships.length - 1 ? 'border-b border-[#1f1f1f] pb-8' : ''}`}
                            >
                                <div>
                                    <h3 className="font-display text-[2rem] leading-none text-[#ece8e1]">{job.position}</h3>
                                    <p className="mt-2 text-[15px] text-[#a49b90]">{job.company}</p>
                                </div>

                                <div className="md:text-right">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8b8379]">
                                        {job.startDate} - {job.endDate}
                                    </p>
                                    <p className="mt-2 text-[13px] text-[#7a736a]">{job.highlights[0]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="mt-10 flex flex-col gap-5 border-t border-[#1f1f1f] py-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6f695f] md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()}</p>
                    <div className="flex items-center gap-6">
                        <a
                            href={resume.basics.profiles.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 transition-colors hover:text-[#ece8e1]"
                        >
                            <Github size={14} />
                            Github
                        </a>
                        <a
                            href={resume.basics.profiles.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 transition-colors hover:text-[#ece8e1]"
                        >
                            <Linkedin size={14} />
                            LinkedIn
                        </a>
                        <a
                            href={resume.basics.profiles.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 transition-colors hover:text-[#ece8e1]"
                        >
                            <Mail size={14} />
                            Resume
                        </a>
                    </div>
                </footer>
            </main>

            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/82 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#2c2925] bg-[#141414]">
                        <button
                            type="button"
                            onClick={() => setSelectedProject(null)}
                            className="absolute right-5 top-5 z-10 rounded-full border border-[#34302b] bg-[#121111]/80 p-2 text-[#b8b0a6] transition-colors hover:text-[#f2eee8]"
                        >
                            <X size={18} />
                        </button>

                        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="p-6 md:p-8">
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6d675f]">
                                    {selectedProject.category} · {selectedProject.year}
                                </p>
                                <h2 className="mt-4 font-display text-[2.9rem] leading-[0.98] text-[#ece8e1]">
                                    {selectedProject.title}
                                </h2>
                                <p className="mt-4 text-[16px] leading-8 text-[#928a81]">{selectedProject.description}</p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {selectedProject.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-md border border-[#2b2824] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7f786f]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-8 space-y-3">
                                    {selectedProject.details.map((detail) => (
                                        <p key={detail} className="text-[15px] leading-7 text-[#c1baaf]">
                                            {detail}
                                        </p>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {selectedProject.github && (
                                        <a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full border border-[#36312c] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#ece8e1]"
                                        >
                                            <Github size={14} /> Source
                                        </a>
                                    )}
                                    {selectedProject.live && selectedProject.live !== '#' && (
                                        <a
                                            href={selectedProject.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full border border-[#36312c] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#ece8e1]"
                                        >
                                            <ArrowUpRight size={14} /> Live
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="min-h-[320px] border-l border-[#22201d] bg-[#101010]">
                                {selectedProject.image ? (
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        onError={(event) => {
                                            event.currentTarget.style.display = 'none';
                                        }}
                                        className="h-full w-full object-cover grayscale opacity-70"
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAllProjects && (
                <div className="fixed inset-0 z-[90] overflow-y-auto bg-[#0c0c0c]/96 p-4 backdrop-blur-md md:p-8">
                    <div className="mx-auto max-w-[1480px]">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="font-display text-[3rem] leading-none text-[#ece8e1]">All Projects</h2>
                            <button
                                type="button"
                                onClick={() => setShowAllProjects(false)}
                                className="rounded-full border border-[#34302b] p-2 text-[#b8b0a6] transition-colors hover:text-[#f2eee8]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    wide={index % 3 === 2}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
