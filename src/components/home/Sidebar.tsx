import React from 'react';
import { Github, Linkedin, Mail, X } from 'lucide-react';

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

            <aside className={`fixed left-0 top-0 z-[110] h-screen w-72 md:w-72 lg:w-80 bg-charcoal-dark border-r border-white/5 p-8 flex flex-col transition-transform duration-300 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:w-72 lg:w-80 md:z-50`}>
                <div className="flex items-start justify-between md:block">
                    <div className="flex flex-col gap-4 mb-12">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-xl">
                            <img
                                src="https://ui-avatars.com/api/?name=Jayant+Singh&background=1e1e1e&color=fff&size=256"
                                alt="Jayant Singh Bisht"
                                className="w-full h-full object-cover opacity-90"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-soft-white tracking-tight">Jayant Singh</h1>
                            <p className="text-gray-400 text-sm mt-1">Full-Stack & AI Engineer</p>
                            <p className="text-gray-600 text-xs mt-4 uppercase tracking-widest font-semibold">Chandigarh, India</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={onClose}
                        className="md:hidden rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
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
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors py-2 group cursor-pointer"
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${item === 'Home' ? 'bg-white' : 'bg-transparent group-hover:bg-white/50'} transition-all`} />
                                    <span className="text-sm font-medium">{item}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="flex gap-6 items-center">
                        <a href="https://github.com/KindaJayant" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/kindajayant/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:iamjayant246@gmail.com" className="text-gray-500 hover:text-white transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>
                    <div className="mt-8 text-[10px] text-gray-700 font-mono">
                        30.7333Â° N, 76.7794Â° E
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
