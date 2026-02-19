import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    description: string;
    year: string;
    image: string;
    color?: string; // Optional accent color class
    onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, year, image, color, onClick }) => {
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
                    alt={title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white/80 border border-white/10">
                    {year}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-soft-white group-hover:text-white transition-colors">
                        {title}
                    </h3>
                    <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[90%]">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ProjectCard;
