import React from 'react';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="border border-terminal-green/30 p-4 my-2 rounded-sm bg-terminal-green/5 max-w-xl">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-terminal-green">{project.title}</h3>
                <span className="text-xs text-gray-500 font-mono">ID: {project.id}</span>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="px-2 py-0.5 text-xs font-mono border border-terminal-green/40 rounded text-terminal-green/80"
                    >
                        {t}
                    </span>
                ))}
            </div>

            <div className="flex gap-4 text-sm">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-terminal-green underline decoration-dashed"
                    >
                        [GitHub]
                    </a>
                )}
                {project.live ? (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-terminal-green underline decoration-dashed"
                    >
                        [Live Demo]
                    </a>
                ) : (
                    <span className="text-gray-500 italic">Live deployment coming soon.</span>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
