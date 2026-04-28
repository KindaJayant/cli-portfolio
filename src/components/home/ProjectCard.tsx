import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
    project: Project;
    color?: string;
    onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, color = 'from-slate-500/20 to-transparent', onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-charcoal-light text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
        >
            <div className={`relative overflow-hidden border-b border-white/5 bg-gradient-to-br ${color} px-6 py-5`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_40%)]" />
                <div className="relative flex items-start justify-between gap-4">
                    <div className="space-y-3">
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-white/75">
                            {project.category}
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
                            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-gray-400">{project.signal}</p>
                        </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-mono text-white/70">
                        {project.year}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="max-w-[85%]">
                        <p className="text-sm leading-relaxed text-gray-300">{project.description}</p>
                    </div>
                    <ArrowUpRight className="text-gray-500 transition-colors group-hover:text-white" size={20} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((item) => (
                        <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-mono text-gray-300">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </button>
    );
};

export default ProjectCard;
