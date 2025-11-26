import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Code, Lock, Shield, Eye, AlertTriangle, Layers } from 'lucide-react';

export const Introduction: React.FC = () => {
  const [modelType, setModelType] = useState<'ec2' | 'rds' | 'lambda'>('ec2');
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    { 
      title: "Identity (IAM)", 
      icon: <UserKeyIcon />,
      desc: "The gatekeeper. Never share root credentials. Use Roles for compute.",
      details: "AWS Identity and Access Management (IAM) enables you to manage access to AWS services and resources securely. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources."
    },
    { 
      title: "Detective Controls", 
      icon: <Eye size={20} />,
      desc: "Visibility is security. If you can't see it, you can't secure it.",
      details: "Detective controls allow you to identify a potential security incident by logging and monitoring your workloads. Services include CloudTrail (API logs), Config (Resource inventory), and GuardDuty (Threat detection)."
    },
    { 
      title: "Infrastructure", 
      icon: <Layers size={20} />,
      desc: "Protecting the perimeter and the network layers.",
      details: "Infrastructure security controls network access to your resources. This involves VPC Security Groups (stateful firewalls), NACLs (stateless), WAF (Web Application Firewall), and Shield (DDoS protection)."
    },
    { 
      title: "Data Protection", 
      icon: <Lock size={20} />,
      desc: "Encryption at rest and in transit. Key management.",
      details: "Data protection ensures you can encrypt your data and manage keys. AWS KMS (Key Management Service) is central here, allowing you to create and control keys used to encrypt your data across AWS services."
    },
    { 
      title: "Incident Response", 
      icon: <AlertTriangle size={20} />,
      desc: "Automated reaction to deviations from the baseline.",
      details: "Preparation is key. Incident response in the cloud should be automated. Use EventBridge to trigger Lambda functions that automatically isolate compromised instances or revoke credentials."
    },
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
          Part 1: Foundation
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Cloud Security Fundamentals</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          Security in the cloud is not a static wall; it's a dynamic partnership. 
          Understanding where AWS ends and you begin is the first step to mastery.
        </p>
      </header>

      {/* Shared Responsibility Interactive Model */}
      <section className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Shield size={200} />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Shared Responsibility Model</h3>
            <p className="text-slate-400 text-sm">Select a service model to see how responsibility shifts.</p>
          </div>
          <div className="flex bg-slate-800 p-1 rounded-lg">
            {[
              { id: 'ec2', label: 'IaaS (EC2)', icon: Server },
              { id: 'rds', label: 'PaaS (RDS)', icon: Database },
              { id: 'lambda', label: 'Serverless', icon: Code },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setModelType(type.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  modelType === type.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <type.icon size={16} />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
           {/* Customer Zone */}
           <motion.div 
             className="w-full bg-gradient-to-b from-blue-900/30 to-blue-900/10 border-b border-blue-500/30 flex-1 relative transition-all duration-700"
             animate={{ flex: modelType === 'ec2' ? 3 : modelType === 'rds' ? 1.5 : 0.8 }}
           >
             <div className="absolute top-4 left-4 font-mono text-blue-400 text-sm font-bold flex items-center gap-2">
               <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
               CUSTOMER RESPONSIBILITY
             </div>
             
             {/* Draggable/Floating Items - Customer */}
             <div className="absolute inset-0 p-12 flex flex-wrap content-end gap-4">
                <ResponsibilityItem text="Customer Data" type="customer" />
                <ResponsibilityItem text="IAM & Access" type="customer" />
                <ResponsibilityItem text="Client Encryption" type="customer" />
                
                {modelType === 'ec2' && (
                  <>
                    <ResponsibilityItem text="OS Patching" type="customer" />
                    <ResponsibilityItem text="Firewall Config" type="customer" />
                    <ResponsibilityItem text="Network Traffic" type="customer" />
                  </>
                )}
                {modelType === 'rds' && (
                  <ResponsibilityItem text="Database Schema" type="customer" />
                )}
             </div>
           </motion.div>

           {/* AWS Zone */}
           <motion.div 
             className="w-full bg-gradient-to-t from-orange-900/30 to-orange-900/10 border-t border-orange-500/30 flex-1 relative transition-all duration-700"
             animate={{ flex: modelType === 'ec2' ? 1 : modelType === 'rds' ? 2 : 3 }}
           >
              <div className="absolute bottom-4 left-4 font-mono text-orange-400 text-sm font-bold flex items-center gap-2">
               <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
               AWS RESPONSIBILITY
             </div>

             <div className="absolute inset-0 p-12 flex flex-wrap content-start gap-4">
                <ResponsibilityItem text="Physical Hardware" type="aws" />
                <ResponsibilityItem text="Regions & AZs" type="aws" />
                <ResponsibilityItem text="Edge Locations" type="aws" />
                
                {modelType !== 'ec2' && (
                   <ResponsibilityItem text="OS & Kernel" type="aws" />
                )}
                {modelType === 'lambda' && (
                   <>
                    <ResponsibilityItem text="Runtime Environment" type="aws" />
                    <ResponsibilityItem text="Server Management" type="aws" />
                   </>
                )}
             </div>
           </motion.div>
        </div>
      </section>

      {/* Interactive Pillars */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-6">The 5 Pillars of Cloud Security</h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
          {/* Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {pillars.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePillar(idx)}
                className={`text-left p-4 rounded-xl transition-all border ${
                  activePillar === idx 
                  ? 'bg-slate-800 border-blue-500 shadow-lg shadow-blue-900/20' 
                  : 'bg-transparent border-transparent hover:bg-slate-800/50 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className={activePillar === idx ? 'text-blue-400' : 'text-slate-500'}>{p.icon}</span>
                  <span className={`font-bold ${activePillar === idx ? 'text-white' : 'text-slate-300'}`}>{p.title}</span>
                </div>
                <p className="text-xs text-slate-500 pl-8">{p.desc}</p>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col justify-center"
                >
                  <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                    {React.cloneElement(pillars[activePillar].icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4">{pillars[activePillar].title}</h4>
                  <p className="text-lg text-slate-300 leading-relaxed mb-8">
                    {pillars[activePillar].details}
                  </p>
                  
                  <div className="bg-slate-950 rounded-lg p-6 border border-slate-800 font-mono text-sm text-slate-400">
                    <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider font-semibold text-slate-500">
                      <Code size={12} /> Key Services
                    </div>
                    {activePillar === 0 && "IAM, IAM Identity Center, STS, Organizations, Directory Service"}
                    {activePillar === 1 && "CloudTrail, Config, GuardDuty, Security Hub, Inspector, Macie"}
                    {activePillar === 2 && "VPC, Security Groups, NACLs, WAF, Shield, Firewall Manager"}
                    {activePillar === 3 && "KMS, CloudHSM, Certificate Manager (ACM), Secrets Manager"}
                    {activePillar === 4 && "EventBridge, Lambda, Step Functions, Detective, Elastic Disaster Recovery"}
                  </div>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

const ResponsibilityItem: React.FC<{ text: string; type: 'aws' | 'customer' }> = ({ text, type }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`px-3 py-1.5 rounded text-xs font-bold border shadow-sm cursor-help ${
      type === 'aws' 
        ? 'bg-orange-900/40 border-orange-700/50 text-orange-200' 
        : 'bg-blue-900/40 border-blue-700/50 text-blue-200'
    }`}
  >
    {text}
  </motion.div>
);

const UserKeyIcon = ({ size = 20 }: { size?: number | string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8v6M23 11h-6" />
  </svg>
);
