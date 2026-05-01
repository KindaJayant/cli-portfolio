import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import {
    SiFastapi,
    SiFirebase,
    SiGooglegemini,
    SiMongodb,
    SiN8N,
    SiNextdotjs,
    SiPostgresql,
    SiPython,
    SiReact,
    SiRedis,
    SiTypescript,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import ProjectCard from './ProjectCard';
import { projects, type Project } from '../../data/projects';
import { resume } from '../../data/resume';

const heroSignals = ['Agent systems', 'LLMOps', 'Full-stack', 'Eval workflows'];

type StackItem = {
    label: string;
    icon?: IconType;
    accent: string;
    bg: string;
    wordmark?: string;
};

const stackItems: StackItem[] = [
    { label: 'Python', icon: SiPython, accent: '#ffd343', bg: 'rgba(55, 118, 171, 0.14)' },
    { label: 'TypeScript', icon: SiTypescript, accent: '#3178c6', bg: 'rgba(49, 120, 198, 0.12)' },
    { label: 'React', icon: SiReact, accent: '#61dafb', bg: 'rgba(97, 218, 251, 0.12)' },
    { label: 'Next.js', icon: SiNextdotjs, accent: '#ffffff', bg: 'rgba(255, 255, 255, 0.07)' },
    { label: 'FastAPI', icon: SiFastapi, accent: '#17b497', bg: 'rgba(23, 180, 151, 0.12)' },
    { label: 'PostgreSQL', icon: SiPostgresql, accent: '#336791', bg: 'rgba(51, 103, 145, 0.14)' },
    { label: 'Redis', icon: SiRedis, accent: '#dc382d', bg: 'rgba(220, 56, 45, 0.12)' },
    { label: 'MongoDB', icon: SiMongodb, accent: '#00ed64', bg: 'rgba(0, 237, 100, 0.10)' },
    { label: 'Firebase', icon: SiFirebase, accent: '#ffca28', bg: 'rgba(255, 202, 40, 0.12)' },
    { label: 'AWS', wordmark: 'aws', accent: '#ff9900', bg: 'rgba(255, 153, 0, 0.12)' },
    { label: 'n8n', icon: SiN8N, accent: '#ef6c57', bg: 'rgba(239, 108, 87, 0.14)' },
    { label: 'Gemini', icon: SiGooglegemini, accent: '#8ab4f8', bg: 'rgba(138, 180, 248, 0.12)' },
];

const experienceItems = [
    {
        company: 'The Future University',
        role: 'AI Engineer Intern',
        period: 'Jan 2026 - Present',
        marks: [
            { name: 'SuperInvesting.ai', logo: '/logo-superinvesting.ico', invert: false },
            { name: 'The Future University', logo: '/logo-tfu.png', invert: false },
        ],
        summary:
            'Built and tested AI-first investing workflows across stock scoring, prompt logic, portfolio analysis, and automation loops for a fast-moving retail investing product.',
        bullets: [
            'Institutional-style stock scoring across live market, sentiment, and narrative risk inputs.',
            'Prompt and workflow iteration on user-facing analysis systems, charts, and portfolio review flows.',
        ],
        metrics: [
            { value: '5000+', label: 'Indian equities scored' },
            { value: '5+', label: 'Core trading workflows built and tested' },
            { value: '6000+', label: 'Active users supported' },
        ],
    },
    {
        company: 'NVISH Solutions',
        role: 'Web Developer Intern',
        period: 'Jun 2024 - Jul 2024',
        marks: [{ name: 'NVISH', logo: '/logo-nvish.png', invert: false }],
        summary:
            'Worked on product and data-layer performance improvements, using analytics and backend changes to make customer-facing systems faster and more useful.',
        bullets: [
            'Analyzed retrieval bottlenecks and moved analytics-heavy access patterns onto a MongoDB-backed flow.',
            'Standardized components and interaction patterns to improve engagement outcomes on live client surfaces.',
        ],
        metrics: [
            { value: '75%', label: 'Retrieval time reduction' },
            { value: '15%', label: 'Bounce-rate improvement' },
        ],
    },
];

const navItems = [
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume', href: resume.basics.profiles.resume, external: true },
];

const completedProjects = projects.filter((project) => project.slug !== 'llm-evaluations');

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
                                {item.external ? ' ->' : ''}
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
                    <div className="rounded-2xl border border-[#242424] bg-[#121212] p-5 md:p-7">
                        <div className="mb-5 flex flex-wrap gap-2">
                            {heroSignals.map((signal) => (
                                <span
                                    key={signal}
                                    className="rounded-md border border-[#2a2a2a] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#716b63]"
                                >
                                    {signal}
                                </span>
                            ))}
                        </div>

                        <h1 className="max-w-4xl font-sans text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.035em] text-[#f4f0ea] sm:text-[2.9rem] lg:text-[3.95rem]">
                            <span className="block">Hey, I&apos;m Jayant.</span>
                            <span className="mt-2 block text-[#7d786f]">I build reliable agent workflows,</span>
                            <span className="block text-[#f4f0ea]">LLMOps tooling,</span>
                            <span className="block text-[#7d786f]">and production AI systems.</span>
                        </h1>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-[#28231f] bg-[#141311] p-3.5">
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6f685f]">Focus</p>
                                <p className="mt-2.5 text-[14px] font-medium leading-6 text-[#ece8e1]">Backend-first AI architecture</p>
                            </div>
                            <div className="rounded-2xl border border-[#28231f] bg-[#141311] p-3.5">
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6f685f]">Bias</p>
                                <p className="mt-2.5 text-[14px] font-medium leading-6 text-[#ece8e1]">Reliable orchestration over demos</p>
                            </div>
                            <div className="rounded-2xl border border-[#28231f] bg-[#141311] p-3.5">
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6f685f]">Build style</p>
                                <p className="mt-2.5 text-[14px] font-medium leading-6 text-[#ece8e1]">Eval-minded, product-ready systems</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#242424] bg-[radial-gradient(circle_at_top,#1a1917_0%,#111111_58%,#0f0f0f_100%)] p-5 md:p-7">
                        <div className="flex h-full flex-col justify-between gap-8">
                            <div className="rounded-[2rem] border border-dashed border-[#2b2622] bg-[linear-gradient(180deg,rgba(20,18,16,0.92),rgba(12,12,12,0.96))] p-4">
                                <div className="flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-[#26211d] bg-[radial-gradient(circle_at_top,rgba(39,35,30,0.45),rgba(14,14,14,0.96))]">
                                    <div className="text-center">
                                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#676158]">Photo space</p>
                                        <p className="mt-3 max-w-[180px] text-sm leading-6 text-[#8c847a]">
                                            Reserved for portrait placement
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#2a2521] bg-black/20 px-6 py-5">
                                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#746e65]">Based in</p>
                                <p className="mt-3 text-[1.55rem] font-semibold leading-[1.15] text-[#f4f0ea]">{resume.basics.location}</p>
                                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#746e65]">Education</p>
                                <p className="mt-3 text-[13.5px] leading-7 text-[#b5aea4]">
                                    BE, Computer Science and Business Systems
                                    <br />
                                    Thapar Institute of Engineering and Technology
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border border-[#28231f] bg-[#121110] p-3.5">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#746e65]">Current focus</p>
                                    <p className="mt-2.5 text-[1.05rem] font-semibold text-[#f4f0ea]">Reliable multi-agent orchestration</p>
                                </div>
                                <div className="rounded-2xl border border-[#28231f] bg-[#121110] p-3.5">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#746e65]">Availability</p>
                                    <div className="mt-2.5 flex items-center gap-3 text-[14px] text-[#f4f0ea]">
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#4db36f]" />
                                        <span>Open to full-time roles</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-4 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
                    <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-8">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#666058]">Operating lens</p>
                        <h2 className="mt-4 max-w-sm text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#ece8e1]">
                            Building AI that survives real usage.
                        </h2>
                        <p className="mt-5 max-w-md text-[15px] leading-7 text-[#8e877d]">
                            Fallback paths, eval discipline, workflow clarity, and backend reliability are the parts I like sweating.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-8">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#666058]">Technical arsenal</p>
                        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {stackItems.map(({ label, icon: Icon, accent, bg, wordmark }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-3 rounded-2xl border border-[#24211d] bg-[#111111] px-4 py-3 text-[#e7e1d8]"
                                >
                                    <span
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5"
                                        style={{ backgroundColor: bg, color: accent }}
                                    >
                                        {Icon ? (
                                            <Icon size={20} />
                                        ) : (
                                            <span className="text-[12px] font-semibold uppercase tracking-[-0.04em]">{wordmark ?? label}</span>
                                        )}
                                    </span>
                                    <span className="text-[15px] font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="projects" className="mt-14">
                    <div className="mb-7">
                        <h2 className="text-[3rem] font-semibold leading-none tracking-[-0.04em] text-[#ece8e1]">Projects</h2>
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
                    <h2 className="text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-[#ece8e1]">Professional Journey</h2>

                    <div className="mt-10 space-y-0">
                        {experienceItems.map((item, index) => (
                            <div
                                key={item.company}
                                className={`grid gap-8 py-8 xl:grid-cols-[0.95fr_1.45fr_0.75fr] ${index < experienceItems.length - 1 ? 'border-b border-[#23201d]' : ''}`}
                            >
                                <div>
                                    <h3 className="text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#ece8e1]">
                                        {item.role}
                                    </h3>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {item.marks.map((mark) => (
                                            <div
                                                key={mark.name}
                                                className="inline-flex items-center gap-2 rounded-full border border-[#2f2b27] bg-[#111111] px-3 py-2"
                                            >
                                                <img
                                                    src={mark.logo}
                                                    alt={mark.name}
                                                    className={`h-5 w-auto object-contain ${mark.invert ? 'brightness-0 invert' : ''}`}
                                                />
                                                {mark.name === 'The Future University' ? (
                                                    <span className="font-mono text-[11px] tracking-[0.04em] text-[#c7c1b8]">The Future University</span>
                                                ) : (
                                                    <span className="font-mono text-[11px] tracking-[0.04em] text-[#c7c1b8]">{mark.name}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#736d65]">{item.period}</p>
                                </div>

                                <div>
                                    <p className="max-w-3xl text-[15px] leading-8 text-[#b4ada3]">{item.summary}</p>
                                    <div className="mt-5 space-y-3">
                                        {item.bullets.map((bullet) => (
                                            <p key={bullet} className="text-[14px] leading-7 text-[#8b847b]">
                                                {bullet}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-5 border-l border-[#23201d] pl-0 xl:pl-8">
                                    {item.metrics.map((metric) => (
                                        <div key={metric.label}>
                                            <p className="text-[2.3rem] font-semibold leading-none tracking-[-0.05em] text-[#f1ede6]">
                                                {metric.value}
                                            </p>
                                            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6e685f]">
                                                {metric.label}
                                            </p>
                                        </div>
                                    ))}
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
                                <h2 className="mt-4 font-sans text-[2.35rem] font-semibold leading-[1] tracking-[-0.035em] text-[#ece8e1]">
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
                                        className="h-full w-full object-cover object-top"
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
                            <h2 className="font-sans text-[2.45rem] font-semibold leading-none tracking-[-0.035em] text-[#ece8e1]">All Projects</h2>
                            <button
                                type="button"
                                onClick={() => setShowAllProjects(false)}
                                className="rounded-full border border-[#34302b] p-2 text-[#b8b0a6] transition-colors hover:text-[#f2eee8]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {completedProjects.map((project, index) => (
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
