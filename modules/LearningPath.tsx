import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, BookOpen, Lock, Server, ArrowRight, Zap, Award, 
  CheckCircle2, Play, Map, Share2, Eye, Network 
} from 'lucide-react';
import { ModuleId, LearningPathNode } from '../types';

interface LearningPathProps {
  onNavigate?: (id: ModuleId) => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({ onNavigate }) => {
  // Mock Progress Data
  const currentXP = 850;
  const nextRankXP = 1200;
  const progressPercent = (currentXP / nextRankXP) * 100;

  const pathNodes: LearningPathNode[] = [
    {
      id: ModuleId.INTRO,
      title: "Foundation & Responsibility",
      subtitle: "Start Here",
      desc: "Master the Shared Responsibility Model and the 5 Pillars of Cloud Security.",
      time: "45 min",
      xp: 100,
      status: 'completed',
      icon: <BookOpen size={20} />
    },
    {
      id: ModuleId.IDENTITY,
      title: "Identity & Access (IAM)",
      subtitle: "The Perimeter",
      desc: "Deep dive into IAM Policies, Roles, MFA, and Policy Evaluation Logic.",
      time: "90 min",
      xp: 300,
      status: 'completed',
      icon: <Shield size={20} />
    },
    {
      id: ModuleId.INFRASTRUCTURE,
      title: "Infrastructure Defense",
      subtitle: "Network Security",
      desc: "VPC, Security Groups, WAF, Shield, and Network Firewall architectures.",
      time: "60 min",
      xp: 250,
      status: 'unlocked', // Current Module
      icon: <Network size={20} />
    },
    {
      id: ModuleId.DATA_PROTECTION,
      title: "Data Protection",
      subtitle: "Encryption",
      desc: "KMS Envelope Encryption, Secrets Manager, and Certificate Manager.",
      time: "60 min",
      xp: 200,
      status: 'locked',
      icon: <Lock size={20} />
    },
    {
      id: ModuleId.DETECTION,
      title: "Detection & Response",
      subtitle: "Visibility",
      desc: "GuardDuty, Security Hub, Config, and centralized logging strategies.",
      time: "50 min",
      xp: 200,
      status: 'locked',
      icon: <Eye size={20} />
    },
    {
      id: ModuleId.AUTOMATION,
      title: "DevSecOps & Automation",
      subtitle: "Scale Security",
      desc: "CI/CD integration, Auto-Remediation with Lambda/EventBridge.",
      time: "75 min",
      xp: 350,
      status: 'locked',
      icon: <Zap size={20} />
    },
    {
      id: ModuleId.ADVANCED,
      title: "Advanced Architectures",
      subtitle: "Future Proof",
      desc: "Serverless security, Container security, and ML-powered defense.",
      time: "60 min",
      xp: 300,
      status: 'locked',
      icon: <Server size={20} />
    },
    {
      id: ModuleId.ARCHITECTURE,
      title: "Enterprise Landing Zone",
      subtitle: "Production Grade",
      desc: "Multi-account strategy, Control Tower, and Transit Gateway networking.",
      time: "90 min",
      xp: 500,
      status: 'locked',
      icon: <Share2 size={20} />
    },
    {
      id: ModuleId.ROADMAP,
      title: "90-Day Execution Plan",
      subtitle: "Go Live",
      desc: "A step-by-step checklist to implement everything you've learned.",
      time: "N/A",
      xp: 1000,
      status: 'locked',
      icon: <Map size={20} />
    }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Gamification Header */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Award size={200} />
        </div>
        
        <div className="flex items-center gap-4 z-10">
           <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center border-4 border-slate-800 shadow-lg">
              <span className="text-2xl font-bold text-white">12</span>
           </div>
           <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Current Rank</div>
              <h2 className="text-2xl font-bold text-white">Cloud Guardian</h2>
              <div className="text-sm text-orange-400 font-mono mt-1">Total XP: {currentXP}</div>
           </div>
        </div>

        <div className="w-full md:w-1/2 z-10">
           <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Level Progress</span>
              <span>{nextRankXP - currentXP} XP to next level</span>
           </div>
           <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              />
           </div>
        </div>
      </div>

      <div className="text-center mb-12">
         <h1 className="text-4xl font-bold text-white mb-4">Your Learning Path</h1>
         <p className="text-slate-400 max-w-2xl mx-auto">
           A structured "Zero to Hero" journey. Complete modules to unlock advanced topics and earn XP.
         </p>
      </div>

      {/* Vertical Path Visualization */}
      <div className="relative">
         {/* Vertical Connector Line */}
         <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-slate-800 -translate-x-1/2 rounded-full" />
         
         <div className="space-y-12">
            {pathNodes.map((node, index) => {
              const isLeft = index % 2 === 0;
              const isLocked = node.status === 'locked';
              const isCompleted = node.status === 'completed';
              
              return (
                <div key={node.id} className={`relative flex items-center md:justify-between ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                   
                   {/* Center Node Marker */}
                   <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                      <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        isCompleted ? 'bg-green-500 border-green-900 shadow-[0_0_15px_#22c55e]' :
                        !isLocked ? 'bg-blue-500 border-blue-900 shadow-[0_0_15px_#3b82f6] scale-110' :
                        'bg-slate-800 border-slate-700'
                      }`}>
                         {isCompleted ? <CheckCircle2 size={20} className="text-white"/> : 
                          !isLocked ? <Play size={20} className="text-white fill-white"/> : 
                          <Lock size={18} className="text-slate-500"/>}
                      </div>
                   </div>

                   {/* Content Card */}
                   <motion.div 
                     initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     onClick={() => !isLocked && onNavigate && onNavigate(node.id)}
                     className={`w-[calc(100%-4rem)] md:w-[42%] ml-20 md:ml-0 p-6 rounded-2xl border transition-all duration-300 group ${
                        isLocked 
                          ? 'bg-slate-900/30 border-slate-800 opacity-60 cursor-not-allowed' 
                          : 'bg-slate-900 border-slate-700 cursor-pointer hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/20'
                     }`}
                   >
                      <div className="flex justify-between items-start mb-4">
                         <div className={`p-2 rounded-lg ${isLocked ? 'bg-slate-800 text-slate-500' : 'bg-blue-900/20 text-blue-400'}`}>
                            {node.icon}
                         </div>
                         <div className="flex flex-col items-end">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
                               isCompleted ? 'bg-green-900/20 text-green-400 border-green-900' :
                               !isLocked ? 'bg-blue-900/20 text-blue-400 border-blue-900' :
                               'bg-slate-800 text-slate-500 border-slate-700'
                            }`}>
                               {node.status}
                            </span>
                            <span className="text-[10px] text-slate-500 mt-1 font-mono">
                               +{node.xp} XP • {node.time}
                            </span>
                         </div>
                      </div>
                      
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{node.subtitle}</div>
                      <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-500' : 'text-white group-hover:text-blue-400 transition-colors'}`}>
                        {node.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {node.desc}
                      </p>

                      {!isLocked && (
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-400 group-hover:translate-x-2 transition-transform">
                           {isCompleted ? 'REVIEW MODULE' : 'START MODULE'} <ArrowRight size={14} />
                        </div>
                      )}
                   </motion.div>

                   {/* Empty spacer for the other side of the timeline */}
                   <div className="hidden md:block w-[42%]" />
                </div>
              );
            })}
         </div>

         {/* Start Line */}
         <div className="absolute left-8 md:left-1/2 bottom-0 w-1 h-20 bg-gradient-to-t from-transparent to-slate-800 -translate-x-1/2" />
      </div>
    </div>
  );
};