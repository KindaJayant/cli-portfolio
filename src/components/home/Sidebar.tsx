import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-full md:w-72 lg:w-80 h-auto md:h-screen fixed left-0 top-0 bg-charcoal-dark flex flex-col p-8 md:border-r border-white/5 z-50">
            {/* Profile */}
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
                    <p className="text-gray-400 text-sm mt-1">Frontend & AI Engineer</p>
                    <p className="text-gray-600 text-xs mt-4 uppercase tracking-widest font-semibold">Chandigarh, India</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <ul className="flex flex-col gap-2">
                    {['Home', 'Projects', 'Experience', 'Creative Suite'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors py-2 group cursor-pointer"
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${item === 'Home' ? 'bg-white' : 'bg-transparent group-hover:bg-white/50'} transition-all`} />
                                <span className="text-sm font-medium">{item}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Socials */}
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
                    30.7333° N, 76.7794° E
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
