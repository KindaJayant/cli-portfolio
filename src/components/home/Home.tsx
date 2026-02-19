import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProjectCard from './ProjectCard';
import { Terminal, ArrowUpRight, X, ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';
import { resume } from '../../data/resume';

interface HomeProps {
    onSwitchToTerminal: () => void;
}

const Home: React.FC<HomeProps> = ({ onSwitchToTerminal }) => {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [showAllProjects, setShowAllProjects] = useState(false);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        if (selectedProject || showAllProjects) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject, showAllProjects]);
    return (
        <div className="min-h-screen bg-black font-sans text-soft-white selection:bg-white/20">
            <Sidebar />

            {/* Main Content Panel */}
            <main className="md:ml-72 lg:ml-80 min-h-screen p-4 md:p-8 lg:p-12 transition-all duration-500">
                <div className="max-w-5xl mx-auto rounded-[2rem] bg-charcoal shadow-2xl overflow-hidden min-h-[calc(100vh-4rem)] relative border border-white/5">

                    {/* CLI Switch Button */}
                    <button
                        onClick={onSwitchToTerminal}
                        className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2 bg-charcoal-light/50 hover:bg-white/10 border border-white/5 rounded-full text-xs font-mono text-gray-400 hover:text-white transition-all backdrop-blur-sm group"
                    >
                        <Terminal size={14} className="group-hover:text-white transition-colors" />
                        <span>Switch to CLI</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
                    </button>

                    <div className="p-8 md:p-16 lg:p-20">

                        {/* Hero Section */}
                        <section id="home" className="mb-32 pt-10">
                            <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">
                                <div className="flex-1 space-y-8">
                                    <div className="space-y-4">
                                        <span className="text-xs font-bold tracking-widest text-gray-500 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 uppercase">
                                            Frontend & AI Engineer
                                        </span>
                                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                                            Hey, I'm <br />
                                            <span className="text-gray-400">Jayant.</span>
                                        </h1>
                                    </div>

                                    <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                                        I build full-stack systems with a focus on performance, clarity, and real-world AI integration.
                                        Currently crafting intelligent interfaces that bridge the gap between complex models and human intent.
                                    </p>

                                    <div className="flex gap-4 pt-4">
                                        <span className="flex items-center gap-2 text-xs font-mono text-gray-600">
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                            Open for opportunities
                                        </span>
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

                        {/* Projects Section (formerly Work) */}
                        <section id="projects" className="mb-32">
                            <div className="flex items-baseline justify-between mb-12 border-b border-white/5 pb-4">
                                <h2 className="text-2xl font-bold text-white">Projects</h2>
                                <span className="text-sm text-gray-500">My best work</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.slice(0, 3).map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        title={project.title}
                                        description={project.description}
                                        year="2024"
                                        image="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=60" // Placeholder
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

                        {/* Experience Section */}
                        <section id="experience" className="mb-32">
                            <div className="flex items-baseline justify-between mb-12 border-b border-white/5 pb-4">
                                <h2 className="text-2xl font-bold text-white">Experience</h2>
                            </div>

                            <div className="space-y-12">
                                {resume.internships.map((job, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-8 group">
                                        <div className="w-full md:w-48 shrink-0 text-gray-500 font-mono text-sm pt-1">
                                            {job.startDate} — {job.endDate}
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">{job.position}</h3>
                                                <div className="text-gray-400">{job.company} • {job.location}</div>
                                            </div>
                                            <ul className="space-y-2 text-gray-400 leading-relaxed">
                                                {job.highlights.map((highlight, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-gray-600 mt-1.5 text-[10px]">▹</span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Creative Suite Section */}
                        <section id="creative-suite" className="mb-20">
                            <div className="flex items-baseline justify-between mb-12 border-b border-white/5 pb-4">
                                <h2 className="text-2xl font-bold text-white">Creative Suite</h2>
                            </div>
                            <div className="p-12 border border-dashed border-white/10 rounded-xl text-center">
                                <p className="text-gray-500">Coming soon...</p>
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="text-center text-gray-700 text-xs py-8">
                            <p>© {new Date().getFullYear()} Jayant Singh Bisht. Built with React & Tailwind.</p>
                        </footer>

                    </div>
                </div>
            </main>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-charcoal max-w-2xl w-full rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
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
                        </div>

                        <div className="p-8 -mt-12 relative">
                            <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProject.tech.map((tech: string) => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-gray-300 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8">
                                {selectedProject.description}
                            </p>

                            <div className="flex gap-4">
                                {selectedProject.live && (
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

            {/* All Projects Modal */}
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
                                    title={project.title}
                                    description={project.description}
                                    year="2024"
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
