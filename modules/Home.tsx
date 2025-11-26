import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, BookOpen, Lock, Server, Zap, Globe, 
  Map, Share2, Eye, Network, ArrowRight, Heart
} from 'lucide-react';
import { ModuleId } from '../types';

interface HomeProps {
  onNavigate: (id: ModuleId) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const cards = [
    {
      id: ModuleId.INTRO,
      title: "Foundation",
      desc: "Shared Responsibility & 5 Pillars",
      icon: <BookOpen size={24} className="text-blue-400" />,
      color: "border-blue-500/20 hover:border-blue-500"
    },
    {
      id: ModuleId.IDENTITY,
      title: "Identity (IAM)",
      desc: "Policies, Roles, & Auth Logic",
      icon: <Shield size={24} className="text-purple-400" />,
      color: "border-purple-500/20 hover:border-purple-500"
    },
    {
      id: ModuleId.INFRASTRUCTURE,
      title: "Infrastructure",
      desc: "VPC, WAF, Shield, & Firewalls",
      icon: <Network size={24} className="text-indigo-400" />,
      color: "border-indigo-500/20 hover:border-indigo-500"
    },
    {
      id: ModuleId.DATA_PROTECTION,
      title: "Data Protection",
      desc: "KMS, Secrets, & Encryption",
      icon: <Lock size={24} className="text-teal-400" />,
      color: "border-teal-500/20 hover:border-teal-500"
    },
    {
      id: ModuleId.DETECTION,
      title: "Detection",
      desc: "GuardDuty, Config, & Logs",
      icon: <Eye size={24} className="text-red-400" />,
      color: "border-red-500/20 hover:border-red-500"
    },
    {
      id: ModuleId.AUTOMATION,
      title: "Automation",
      desc: "DevSecOps & EventBridge",
      icon: <Zap size={24} className="text-yellow-400" />,
      color: "border-yellow-500/20 hover:border-yellow-500"
    },
    {
      id: ModuleId.ADVANCED,
      title: "Advanced & ML",
      desc: "Serverless & AI Defense",
      icon: <Server size={24} className="text-pink-400" />,
      color: "border-pink-500/20 hover:border-pink-500"
    },
    {
      id: ModuleId.ARCHITECTURE,
      title: "Enterprise Arch",
      desc: "Multi-Account Strategy",
      icon: <Share2 size={24} className="text-cyan-400" />,
      color: "border-cyan-500/20 hover:border-cyan-500"
    },
    {
      id: ModuleId.ROADMAP,
      title: "Execution Plan",
      desc: "90-Day Implementation",
      icon: <Map size={24} className="text-green-400" />,
      color: "border-green-500/20 hover:border-green-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Interactive Learning Platform
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            AWS Security <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Zero to Hero</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
            The definitive guide to architecting, automating, and defending cloud environments. 
            Built with <Heart className="inline text-red-500 fill-red-500 mx-1" size={16}/> by 
            <span className="text-white font-semibold"> Purushotham Muktha</span> to share knowledge globally.
          </p>

          <div className="flex flex-wrap gap-4">
             <button 
               onClick={() => onNavigate(ModuleId.LEARNING_PATH)}
               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1"
             >
               Start Learning Path <ArrowRight size={20} />
             </button>
             <button 
               onClick={() => onNavigate(ModuleId.ALL_SERVICES)}
               className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-1"
             >
               Service Catalog
             </button>
          </div>
        </div>
        
        <div className="relative w-80 h-80 hidden md:flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10"
            >
              <Shield size={240} className="text-white drop-shadow-2xl" strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock size={80} className="text-blue-500/80" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute top-0 right-0 bg-slate-800/90 backdrop-blur p-3 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3"
            >
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-xs font-mono text-green-400 font-bold">IAM Secure</span>
            </motion.div>

            <motion.div 
              animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0 }}
              className="absolute bottom-10 -left-4 bg-slate-800/90 backdrop-blur p-3 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3"
            >
               <Zap size={14} className="text-yellow-400 fill-yellow-400" />
               <span className="text-xs font-mono text-yellow-400 font-bold">Auto-Remediation</span>
            </motion.div>
        </div>
      </div>

      {/* Grid Menu */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
           <div>
             <h2 className="text-2xl font-bold text-white">Core Modules</h2>
             <p className="text-sm text-slate-500 mt-1">Select a topic to begin your journey</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(card.id)}
              className={`p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border ${card.color} cursor-pointer group transition-all shadow-lg hover:shadow-xl hover:bg-slate-900`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:bg-slate-800 transition-colors shadow-inner">
                  {card.icon}
                </div>
                <ArrowRight size={16} className="text-slate-700 group-hover:text-blue-400 transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{card.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats / Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
         <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Zap size={100}/></div>
            <div className="text-3xl font-bold text-white mb-1">12+</div>
            <div className="text-sm text-slate-400">Interactive Labs</div>
         </div>
         <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Eye size={100}/></div>
            <div className="text-3xl font-bold text-white mb-1">20+</div>
            <div className="text-sm text-slate-400">Visual Architectures</div>
         </div>
         <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Map size={100}/></div>
            <div className="text-3xl font-bold text-white mb-1">90 Day</div>
            <div className="text-sm text-slate-400">Execution Plan</div>
         </div>
      </div>
    </div>
  );
};