import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProjectCard from './ProjectCard';
import { Terminal, ArrowUpRight, X, ExternalLink, Github, Menu } from 'lucide-react';
import { projects, type Project } from '../../data/projects';
import { resume } from '../../data/resume';

const heroSignals = [
    'Agent systems',
    'Full-stack products',
    'Developer tooling',
    'Evaluation workflows',
];

const headlineMetrics = [
    { value: '5', label: 'featured projects' },
    { value: '2', label: 'internships' },
    { value: '4,000+', label: 'users reached' },
    { value: '5,000+', label: 'equities analyzed' },
];

const Home: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    React.useEffect(() => {
        document.body.style.overflow = selectedProject || showAllProjects || mobileMenuOpen ? 'hidden' : 'unset';
    }, [selectedProject, showAllProjects, mobileMenuOpen]);

    return (
        <div className="min-h-screen bg-black font-sans text-soft-white selection:bg-white/20">
            <div className="fixed inset-x-0 top-0 z-[120] px-4 pt-4 md:hidden">
                <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-charcoal-dark/95 px-4 py-3 shadow-2xl backdrop-blur-md">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-mono text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <Menu size={16} />
                        <span>Menu</span>
                    </button>

                    <a
                        href="#cli"
                        className="flex items-center gap-2 rounded-full border border-terminal-green/30 bg-terminal-green/10 px-3 py-2 text-xs font-mono text-terminal-green transition-colors hover:bg-terminal-green/20"
                    >
                        <Terminal size={16} />
                        <span>Switch to CLI</span>
                    </a>
                </div>
            </div>

            <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            <main className="min-h-screen p-4 pt-24 transition-all duration-500 md:ml-64 md:p-8 md:pt-8 lg:ml-72 lg:p-10">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/5 bg-charcoal shadow-2xl">
                    <a
                        href="#cli"
                        className="group absolute right-6 top-6 z-10 hidden items-center gap-2 rounded-full border border-white/5 bg-charcoal-light/50 px-4 py-2 text-xs font-mono text-gray-400 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white md:flex"
                    >
                        <Terminal size={14} className="transition-colors group-hover:text-white" />
                        <span>Switch to CLI</span>
                        <span className="ml-1 opacity-0 transition-opacity group-hover:opacity-100">{'->'}</span>
                    </a>

                    <div className="p-8 md:p-12 lg:p-14">
                        <section id="home" className="mb-14 pt-10">
                            <div className="space-y-8">
                                <div className="space-y-5">
                                    <span className="text-xs font-bold uppercase tracking-[0.35em] text-gray-500">
                                        Full-Stack & AI Engineer
                                    </span>
                                    <h1 className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-[3.5rem]">
                                        Building software systems, agent workflows, and developer tools that hold up in the real world.
                                    </h1>
                                    <p className="max-w-3xl text-lg leading-relaxed text-gray-400">
                                        I am targeting software engineering roles where backend depth, product sense, and strong execution matter.
                                        Most of my recent work sits at the intersection of AI systems, full-stack product development, and engineering tooling.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {heroSignals.map((signal) => (
                                        <span key={signal} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-gray-300">
                                            {signal}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
                                    {headlineMetrics.map((metric) => (
                                        <div key={metric.label} className="rounded-2xl border border-white/5 bg-charcoal-light/60 px-4 py-4">
                                            <div className="text-2xl font-bold text-white md:text-3xl">{metric.value}</div>
                                            <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-gray-500">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    <a
                                        href="#projects"
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                                    >
                                        View Projects <ArrowUpRight size={14} />
                                    </a>
                                    <a
                                        href={resume.basics.profiles.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-white/5 hover:text-white"
                                    >
                                        Open Resume
                                    </a>
                                </div>

                                <div className="grid gap-4 lg:grid-cols-2">
                                    <div className="rounded-2xl border border-white/10 bg-charcoal-light/80 p-5">
                                        <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-gray-500">Current focus</p>
                                        <h2 className="mt-4 text-xl font-semibold leading-tight text-white">
                                            Full-stack systems, AI products, and engineering workflows.
                                        </h2>
                                        <div className="mt-4 space-y-3 text-sm leading-6 text-gray-400">
                                            <p>Targeting SDE roles with strong backend, product, and execution ownership.</p>
                                            <p>Recent work spans research agents, onboarding systems, prompt tooling, and voice AI products.</p>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-white/5 bg-black/20 p-5 text-sm leading-6 text-gray-400">
                                        <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-gray-500">Why this portfolio exists</p>
                                        <p className="mt-3">To show projects and experience clearly, without turning the homepage into filler.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="projects" className="mb-16">
                            <div className="mb-8 border-b border-white/5 pb-5">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">Selected Projects</h2>
                                    <p className="mt-2 max-w-2xl text-gray-500">
                                        Recent work across autonomous agents, full-stack AI products, evaluation systems, and developer-facing tooling.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {projects.slice(0, 4).map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        color="from-indigo-500/20 via-slate-500/10 to-transparent"
                                        onClick={() => setSelectedProject(project)}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 text-right">
                                <button
                                    onClick={() => setShowAllProjects(true)}
                                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
                                >
                                    View all projects <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </section>

                        <section id="experience" className="mb-16">
                            <div className="mb-8 flex flex-col gap-4 border-b border-white/5 pb-5 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">Experience</h2>
                                    <p className="mt-2 max-w-2xl text-gray-500">
                                        Roles where I worked on applied AI systems, product workflows, and performance-oriented engineering problems.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {resume.internships.map((job, index) => (
                                    <div key={index} className="group rounded-2xl border border-white/5 bg-charcoal-light/40 p-6">
                                        <div className="mb-4 font-mono text-sm text-gray-500">
                                            {job.startDate} {'->'} {job.endDate}
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-gray-300">{job.position}</h3>
                                                <div className="text-gray-400">{job.company} {'|'} {job.location}</div>
                                            </div>
                                            <ul className="space-y-2 text-gray-400 leading-relaxed">
                                                {job.highlights.map((highlight, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="mt-1.5 text-[10px] text-gray-600">{'>'}</span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <footer className="py-8 text-center text-xs text-gray-700">
                            <p>(c) {new Date().getFullYear()} Jayant Singh Bisht. Built with React & Tailwind.</p>
                        </footer>
                    </div>
                </div>
            </main>

            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-charcoal shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative h-64 bg-charcoal-light">
                            <img
                                src="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=60"
                                alt={selectedProject.title}
                                className="h-full w-full object-cover opacity-85"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
                            <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono text-white/80">
                                    {selectedProject.year}
                                </span>
                                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono text-white/80">
                                    {selectedProject.category}
                                </span>
                            </div>
                        </div>

                        <div className="relative -mt-8 p-8">
                            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-gray-500">{selectedProject.signal}</p>
                            <h2 className="mb-3 text-3xl font-bold text-white">{selectedProject.title}</h2>
                            <p className="mb-6 leading-relaxed text-gray-300">{selectedProject.description}</p>

                            <div className="mb-8 flex flex-wrap gap-2">
                                {selectedProject.tech.map((tech: string) => (
                                    <span key={tech} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-mono text-gray-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mb-8 space-y-3">
                                {selectedProject.details.map((detail) => (
                                    <div key={detail} className="flex items-start gap-3 text-gray-300">
                                        <span className="mt-1 text-xs text-gray-500">{'>'}</span>
                                        <span>{detail}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                {selectedProject.live && selectedProject.live !== '#' && (
                                    <a
                                        href={selectedProject.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white py-3 font-bold text-black transition-colors hover:bg-gray-200"
                                    >
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                )}
                                {selectedProject.github && (
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-3 font-medium text-white transition-colors hover:bg-white/5"
                                    >
                                        <Github size={18} /> Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAllProjects && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
                        <div className="mb-8 flex items-center justify-between border-b border-white/10 py-6">
                            <h2 className="text-2xl font-bold text-white">All Projects</h2>
                            <button
                                onClick={() => setShowAllProjects(false)}
                                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 overflow-y-auto pb-20 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    color="from-slate-500/15 via-white/[0.02] to-transparent"
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
