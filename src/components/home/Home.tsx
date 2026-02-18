import React from 'react';
import Sidebar from './Sidebar';
import ProjectCard from './ProjectCard';
import { Terminal, ArrowUpRight } from 'lucide-react';

interface HomeProps {
    onSwitchToTerminal: () => void;
}

const Home: React.FC<HomeProps> = ({ onSwitchToTerminal }) => {
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
                        <Terminal size={14} className="group-hover:text-terminal-green transition-colors" />
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
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
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

                        {/* Work Section */}
                        <section id="work" className="mb-32">
                            <div className="flex items-baseline justify-between mb-12 border-b border-white/5 pb-4">
                                <h2 className="text-2xl font-bold text-white">Work</h2>
                                <span className="text-sm text-gray-500">Selected systems & projects</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <ProjectCard
                                    title="Voice Interview Platform"
                                    description="AI-assisted mock interview system with real-time streaming evaluation and feedback."
                                    year="2025"
                                    image="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=60"
                                    color="bg-indigo-500/20"
                                />
                                <ProjectCard
                                    title="LMS Platform"
                                    description="Assessment-focused learning system with dynamic AI feedback and progress tracking."
                                    year="2024"
                                    image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60"
                                    color="bg-emerald-500/20"
                                />
                                <ProjectCard
                                    title="Stock Scoring Tool"
                                    description="Quant-based ranking engine for retail investors processing 5000+ equities."
                                    year="2024"
                                    image="https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&auto=format&fit=crop&q=60"
                                    color="bg-orange-500/20"
                                />
                            </div>

                            <div className="mt-8 text-right">
                                <a href="#projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                                    View all projects <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </section>

                        {/* Story Section */}
                        <section id="about" className="mb-20">
                            <div className="flex items-baseline justify-between mb-12 border-b border-white/5 pb-4">
                                <h2 className="text-2xl font-bold text-white">Where it all started</h2>
                            </div>

                            <div className="bg-charcoal-light/50 rounded-2xl p-8 border border-white/5 flex flex-col md:flex-row gap-12 items-center">
                                <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden bg-gray-800">
                                    <img
                                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60"
                                        alt="University Days"
                                        className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <div className="flex-1 space-y-6">
                                    <h3 className="text-xl font-bold text-white">From Hello World to AI Systems</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        My developer journey began in college with a simple curiosity about how things worked under the hood.
                                        What started as building basic scripts evolved into a passion for scalable systems and artificial intelligence.
                                        Today, I focus on bridging the gap between theoretical AI models and practical, user-centric applications,
                                        always striving to build tools that genuinely solve problems.
                                    </p>

                                    <div className="flex gap-4 pt-4">
                                        <button className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors">
                                            More About Me
                                        </button>
                                        <a href="mailto:iamjayant246@gmail.com" className="px-6 py-2 border border-white/10 text-white text-sm font-medium rounded-full hover:bg-white/5 transition-colors">
                                            Email Me
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="text-center text-gray-700 text-xs py-8">
                            <p>© {new Date().getFullYear()} Jayant Singh Bisht. Built with React & Tailwind.</p>
                        </footer>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
