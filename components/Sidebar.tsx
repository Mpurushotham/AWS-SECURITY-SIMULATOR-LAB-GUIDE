import React from 'react';
import { NavItem, ModuleId } from '../types';
import { ShieldCheck, BookOpen, GitBranch, Server, Zap, Map, Lock, Eye, Network, LayoutDashboard, Heart, Share2, Library, GraduationCap } from 'lucide-react';

interface SidebarProps {
  activeModule: ModuleId;
  onSelect: (id: ModuleId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onSelect }) => {
  const learningPath: NavItem[] = [
    { id: ModuleId.INTRO, title: '1. Foundation', icon: <BookOpen size={18} /> },
    { id: ModuleId.IDENTITY, title: '2. Identity (IAM)', icon: <ShieldCheck size={18} /> },
    { id: ModuleId.INFRASTRUCTURE, title: '3. Infrastructure', icon: <Network size={18} /> },
    { id: ModuleId.DATA_PROTECTION, title: '4. Data Protection', icon: <Lock size={18} /> },
    { id: ModuleId.DETECTION, title: '5. Detection', icon: <Eye size={18} /> },
    { id: ModuleId.AUTOMATION, title: '6. Automation', icon: <Zap size={18} /> },
    { id: ModuleId.ADVANCED, title: '7. Advanced & ML', icon: <Server size={18} /> },
    { id: ModuleId.ARCHITECTURE, title: '8. Enterprise Arch', icon: <Share2 size={18} /> },
    { id: ModuleId.ROADMAP, title: '9. Roadmap', icon: <Map size={18} /> },
  ];

  const references: NavItem[] = [
    { id: ModuleId.HOME, title: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: ModuleId.LEARNING_PATH, title: 'Learning Path', icon: <GraduationCap size={18} /> },
    { id: ModuleId.ALL_SERVICES, title: 'Service Catalog', icon: <Library size={18} /> },
  ];

  const renderLink = (item: NavItem) => (
    <button
      key={item.id}
      onClick={() => onSelect(item.id)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-1 ${
        activeModule === item.id
          ? 'bg-orange-600/10 text-orange-500 border border-orange-600/20'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      {item.icon}
      {item.title}
    </button>
  );

  return (
    <div className="w-72 bg-slate-900 border-r border-slate-700 h-screen flex flex-col shrink-0 sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div 
          onClick={() => onSelect(ModuleId.HOME)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-900/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-tight group-hover:text-orange-400 transition-colors">AWS Security</h1>
            <p className="text-xs text-slate-400">Zero to Hero</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        
        <div className="mb-8">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
             <LayoutDashboard size={12} /> Reference Center
           </h3>
           {references.map(renderLink)}
        </div>

        <div>
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
             <BookOpen size={12} /> Modules
           </h3>
           <div className="relative">
              {/* Connector Line for sidebar */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-800 -z-10" />
              {learningPath.map(renderLink)}
           </div>
        </div>

      </nav>

      {/* Author Footer */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/30">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 border border-slate-600">
            <span className="font-bold text-xs text-slate-300">PM</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Purushotham Muktha</p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Built with <Heart size={8} className="inline text-red-500 fill-red-500"/> for the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};