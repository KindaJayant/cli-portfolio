import React from 'react';
import { Github, Linkedin, Mail, X } from 'lucide-react';
import { resume } from '../../data/resume';

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const navItems = ['Home', 'Projects', 'Experience'];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
    return (
        <>
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close navigation overlay"
                    className="fixed inset-0 z-[95] bg-black/70 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-[110] flex h-screen w-64 flex-col border-r border-white/5 bg-charcoal-dark p-7 transition-transform duration-300 md:translate-x-0 lg:w-72 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-start justify-between md:block">
                    <div className="mb-12 flex flex-col gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-charcoal-light text-3xl font-semibold tracking-tight text-white shadow-xl">
                            JS
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-soft-white">{resume.basics.name}</h1>
                            <p className="mt-1 text-sm text-gray-400">Full-Stack & AI Engineer</p>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gray-600">Chandigarh, India</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={onClose}
                        className="rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex-1">
                    <ul className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={onClose}
                                    className="group flex items-center gap-3 py-2 text-gray-400 transition-colors hover:text-white"
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                                            item === 'Home' ? 'bg-white' : 'bg-transparent group-hover:bg-white/50'
                                        }`}
                                    />
                                    <span className="text-sm font-medium">{item}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto border-t border-white/5 pt-8">
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/KindaJayant" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-white">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/kindajayant/" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-white">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:iamjayant246@gmail.com" className="text-gray-500 transition-colors hover:text-white">
                            <Mail size={20} />
                        </a>
                    </div>
                    <div className="mt-8 text-[10px] font-mono text-gray-700">30.7333 N | 76.7794 E</div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
