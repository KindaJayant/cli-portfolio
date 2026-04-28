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
    { value: '5', label: 'featured builds' },
    { value: '4,000+', label: 'users reached' },
    { value: '5,000+', label: 'equities analyzed' },
];

const Home: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    React.useEffect(() => {
        if (selectedProject || showAllProjects || mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
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

            <main className="min-h-screen p-4 pt-24 transition-all duration-500 md:ml-72 md:p-8 md:pt-8 lg:ml-80 lg:p-12">
                <div className="max-w-5xl mx-auto rounded-[2rem] bg-charcoal shadow-2xl overflow-hidden min-h-[calc(100vh-4rem)] relative border border-white/5">
                    <a
                        href="#cli"
                        className="absolute top-6 right-6 z-10 hidden md:flex items-center gap-2 px-4 py-2 bg-charcoal-light/50 hover:bg-white/10 border border-white/5 rounded-full text-xs font-mono text-gray-400 hover:text-white transition-all backdrop-blur-sm group"
                    >
                        <Terminal size={14} className="group-hover:text-white transition-colors" />
                        <span>Switch to CLI</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">{'->'}</span>
                    </a>

                    <div className="p-8 md:p-16 lg:p-20">
                        <section id="home" className="mb-28 pt-10">
                            <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">
                                <div className="flex-1 space-y-8">
                                    <div className="space-y-5">
                                        <span className="text-xs font-bold tracking-[0.35em] text-gray-500 uppercase">
                                            Full-Stack & AI Engineer
                                        </span>
                                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.02] max-w-3xl">
                                            Building software systems, agent workflows, and developer tools that hold up in the real world.
                                        </h1>
                                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
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

                                    <div className="grid grid-cols-3 gap-3 max-w-xl">
                                        {headlineMetrics.map((metric) => (
                                            <div key={metric.label} className="rounded-2xl border border-white/5 bg-charcoal-light/60 px-4 py-4">
                                                <div className="text-2xl md:text-3xl font-bold text-white">{metric.value}</div>
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
                                </div>

                                <div className="w-full lg:w-80 shrink-0">
                                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-charcoal-light relative shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                                        <img
                                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                            alt="Jayant Portrait"
                                            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="projects" className="mb-28">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 border-b border-white/5 pb-5">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">Selected Projects</h2>
                                    <p className="mt-2 text-gray-500 max-w-2xl">
                                        Recent work across autonomous agents, full-stack AI products, evaluation systems, and developer-facing tooling.
                                    </p>
                                </div>
                                <span className="text-sm text-gray-500">Built to show engineering depth, not just visual polish</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projects.slice(0, 3).map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        image="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=60"
                                        color="bg-indigo-500/20"
                                        onClick={() => setSelectedProject(project)}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 text-right">
                                <button
                                    onClick={() => setShowAllProjects(true)}
                                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                                >
                                    View all projects <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </section>

                        <section id="experience" className="mb-20">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 border-b border-white/5 pb-5">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">Experience</h2>
                                    <p className="mt-2 text-gray-500 max-w-2xl">
                                        Roles where I worked on applied AI systems, product workflows, and performance-oriented engineering problems.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-12">
                                {resume.internships.map((job, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-8 group">
                                        <div className="w-full md:w-48 shrink-0 text-gray-500 font-mono text-sm pt-1">
                                            {job.startDate} {'->'} {job.endDate}
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">{job.position}</h3>
                                                <div className="text-gray-400">{job.company} {'|'} {job.location}</div>
                                            </div>
                                            <ul className="space-y-2 text-gray-400 leading-relaxed">
                                                {job.highlights.map((highlight, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-gray-600 mt-1.5 text-[10px]">{'>'}</span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <footer className="text-center text-gray-700 text-xs py-8">
                            <p>(c) {new Date().getFullYear()} Jayant Singh Bisht. Built with React & Tailwind.</p>
                        </footer>
                    </div>
                </div>
            </main>

            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-charcoal max-w-3xl w-full rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="h-64 bg-charcoal-light relative">
                            <img
                                src="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=60"
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
                            <div className="absolute left-6 bottom-6 flex flex-wrap gap-2">
                                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono text-white/80">
                                    {selectedProject.year}
                                </span>
                                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono text-white/80">
                                    {selectedProject.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 -mt-8 relative">
                            <p className="text-gray-500 text-[11px] uppercase tracking-[0.28em] mb-3">{selectedProject.signal}</p>
                            <h2 className="text-3xl font-bold text-white mb-3">{selectedProject.title}</h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                {selectedProject.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedProject.tech.map((tech: string) => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-gray-300 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-3 mb-8">
                                {selectedProject.details.map((detail) => (
                                    <div key={detail} className="flex items-start gap-3 text-gray-300">
                                        <span className="mt-1 text-xs text-gray-500">{'>'}</span>
                                        <span>{detail}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                {selectedProject.live && selectedProject.live !== '#' && (
                                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                )}
                                {selectedProject.github && (
                                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 border border-white/10 hover:bg-white/5 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <Github size={18} /> Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAllProjects && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="w-full h-full max-w-6xl mx-auto flex flex-col">
                        <div className="flex justify-between items-center py-6 border-b border-white/10 mb-8">
                            <h2 className="text-2xl font-bold text-white">All Projects</h2>
                            <button
                                onClick={() => setShowAllProjects(false)}
                                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="overflow-y-auto pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    image="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=60"
                                    color="bg-charcoal"
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
