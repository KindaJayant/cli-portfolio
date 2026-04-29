import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
    wide?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, wide = false }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group relative overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] text-left transition-colors duration-200 hover:border-[#323232] ${
                wide ? 'grid gap-6 lg:grid-cols-[0.95fr_1.25fr] lg:items-stretch' : ''
            }`}
        >
            <div className="p-6 md:p-7">
                <div className="mb-4 flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#53504a]">
                    <span>{project.signal}</span>
                    <span>{project.year}</span>
                </div>

                <h3 className="font-display text-[2rem] leading-[1.02] text-[#ece8e1] md:text-[2.3rem]">
                    {project.title}
                </h3>

                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#7f7a72]">
                    {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((item) => (
                        <span
                            key={item}
                            className="rounded-md border border-[#2a2a2a] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6b665f]"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className={`relative ${wide ? 'min-h-[260px]' : 'px-6 pb-6 md:px-7 md:pb-7'}`}>
                <div className={`relative overflow-hidden border border-[#1d1d1d] bg-[#101010] ${wide ? 'h-full rounded-none lg:rounded-l-none lg:rounded-r-2xl' : 'h-52 rounded-xl'}`}>
                    {project.image ? (
                        <>
                            <img
                                src={project.image}
                                alt={project.title}
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                }}
                                className="h-full w-full object-cover opacity-55 grayscale transition duration-300 group-hover:scale-[1.02] group-hover:opacity-72"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,12,0.08),rgba(12,12,12,0.42))]" />
                        </>
                    ) : null}
                </div>

                <ArrowUpRight
                    size={16}
                    className="absolute right-10 top-10 text-[#5d5851] transition-colors group-hover:text-[#bdb6ae]"
                />
            </div>
        </button>
    );
};

export default ProjectCard;
