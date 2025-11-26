import React from 'react';
import { Heart, Github, Linkedin, Cloud } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-slate-800 bg-slate-900/30 pt-16 pb-8">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <div className="flex flex-col items-center mb-8">
           <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 flex items-center justify-center mb-4 shadow-xl relative group">
             <span className="text-2xl font-bold text-slate-300 group-hover:text-white transition-colors">PM</span>
             <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1.5 rounded-full border-2 border-slate-900">
                <Cloud size={14} />
             </div>
           </div>
           
           <h3 className="text-2xl font-bold text-white mb-2">Purushotham Muktha</h3>
           <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
             Built with <Heart className="inline text-red-500 fill-red-500 mx-1 animate-pulse" size={12} /> and passion to learn and share knowledge globally for AWS Security aspirants.
           </p>
        </div>

        <div className="flex justify-center gap-6 mb-12">
           <SocialLink 
             icon={<Github size={18} />} 
             label="GitHub" 
             href="https://github.com/PurushothamMuktha" 
           />
           <SocialLink 
             icon={<Linkedin size={18} />} 
             label="LinkedIn" 
             href="https://www.linkedin.com/in/purushotham-muktha" 
           />
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
           <p>© {new Date().getFullYear()} AWS Security Mastery. Educational Project.</p>
           <p>Not affiliated with Amazon Web Services, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{icon: any, label: string, href: string}> = ({ icon, label, href }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center"
  >
    {icon}
    <span className="sr-only">{label}</span>
  </a>
);