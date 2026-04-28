import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
    project: Project;
    image: string;
    color?: string; // Optional accent color class
    onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, image, color, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group relative bg-charcoal-light rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1"
        >
            {/* Image Section */}
            <div className={`aspect-[4/3] w-full relative overflow-hidden ${color}`}>
                {/* Placeholder gradient if no image, or actual image */}
                <img
                    src={image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white/80 border border-white/10">
                    {project.year}
                </div>
                <div className="absolute left-4 bottom-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-mono text-white/80 border border-white/10">
                    {project.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-soft-white group-hover:text-white transition-colors">
                        {project.title}
                    </h3>
                    <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                </div>
                <p className="text-gray-500 text-[11px] uppercase tracking-[0.22em] mb-3">
                    {project.signal}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((item) => (
                        <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-mono text-gray-300">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
