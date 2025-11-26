import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Key, FileJson, CheckCircle, XCircle, Search, ShieldAlert, Eye, Server, ArrowRight, Activity, Filter } from 'lucide-react';

export const CoreServices: React.FC = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
       <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
          Part 2: Core Services
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Identity & Detection</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          Mastering the logic of IAM policies and the flow of detective logs is the difference between a secure environment and a leaky bucket.
        </p>
      </header>

      <IamVisualizer />
      <LoggingArchitecture />
    </div>
  );
};

const IamVisualizer: React.FC = () => {
  const [stage, setStage] = useState<'request' | 'policy' | 'eval' | 'result'>('request');
  
  // Logic simulation
  const request = {
    principal: "User: Alice",
    action: "s3:GetObject",
    resource: "arn:aws:s3:::finance-data/*"
  };

  const policy = {
    Effect: "Allow",
    Action: "s3:*",
    Resource: "arn:aws:s3:::finance-data/*"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStage(prev => {
        if (prev === 'request') return 'policy';
        if (prev === 'policy') return 'eval';
        if (prev === 'eval') return 'result';
        return 'request';
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Key className="text-purple-500" />
            IAM Policy Logic Engine
          </h3>
          <p className="text-slate-400 text-sm mt-1">Visualizing how AWS decides to Allow or Deny a request.</p>
        </div>
        <div className="flex gap-2">
           {['request', 'policy', 'eval', 'result'].map(s => (
             <div key={s} className={`h-2 w-8 rounded-full transition-colors ${stage === s ? 'bg-purple-500' : 'bg-slate-700'}`} />
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Step 1: Request */}
        <div className={`p-6 rounded-xl border transition-all duration-500 ${stage === 'request' ? 'bg-slate-800 border-blue-500 scale-105 shadow-xl' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
          <div className="flex items-center gap-2 text-blue-400 font-bold mb-4">
            <Activity size={18} /> API Request Context
          </div>
          <div className="font-mono text-xs text-slate-300 space-y-2">
             <div className="flex justify-between border-b border-slate-700 pb-1">
               <span className="text-slate-500">Principal:</span>
               <span>{request.principal}</span>
             </div>
             <div className="flex justify-between border-b border-slate-700 pb-1">
               <span className="text-slate-500">Action:</span>
               <span className="text-yellow-400">{request.action}</span>
             </div>
             <div className="flex justify-between border-b border-slate-700 pb-1">
               <span className="text-slate-500">Resource:</span>
               <span className="text-green-400">{request.resource}</span>
             </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 hidden lg:block text-slate-600">
           <ArrowRight size={32} />
        </div>

        {/* Step 2: Policy */}
        <div className={`p-6 rounded-xl border transition-all duration-500 ${stage === 'policy' || stage === 'eval' ? 'bg-slate-800 border-purple-500 scale-105 shadow-xl' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
          <div className="flex items-center gap-2 text-purple-400 font-bold mb-4">
            <FileJson size={18} /> Identity Policy
          </div>
          <pre className="font-mono text-[10px] text-slate-300 bg-slate-950 p-3 rounded border border-slate-800">
{`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": "arn:aws:s3:::finance-data/*"
  }]
}`}
          </pre>
          {stage === 'eval' && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="mt-4 text-xs bg-purple-900/30 text-purple-200 p-2 rounded border border-purple-500/30 flex flex-col gap-1"
             >
                <div className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500"/> Action Match (s3:*)
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500"/> Resource Match
                </div>
             </motion.div>
          )}
        </div>

        {/* Arrow */}
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 translate-x-1/2 hidden lg:block text-slate-600">
           <ArrowRight size={32} />
        </div>

        {/* Step 3: Result */}
        <div className={`p-6 rounded-xl border transition-all duration-500 flex flex-col items-center justify-center ${stage === 'result' ? 'bg-slate-800 border-green-500 scale-105 shadow-xl' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
           <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all ${stage === 'result' ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-600'}`}>
              <CheckCircle size={40} />
           </div>
           <div className="text-2xl font-bold text-white">ALLOWED</div>
           <p className="text-xs text-slate-400 mt-2 text-center">Implicit Deny overridden by Explicit Allow.</p>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-900/20 border border-blue-900/50 p-4 rounded-lg flex items-start gap-3">
         <Filter className="text-blue-400 shrink-0 mt-1" size={20} />
         <div>
            <h4 className="font-bold text-blue-200 text-sm">Pro Tip: The Hierarchy of Deny</h4>
            <p className="text-xs text-blue-300/80 mt-1">
              Remember: <strong className="text-white">Service Control Policies (SCPs)</strong> and <strong className="text-white">Permissions Boundaries</strong> filter permissions before Identity Policies are even evaluated. An explicit DENY anywhere in the chain overrides ALL Allows.
            </p>
         </div>
      </div>
    </div>
  );
};

const LoggingArchitecture: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <Eye className="text-blue-500" />
        Detective Controls Pipeline
      </h3>
      
      <div className="relative">
        {/* Animated Background Flow */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
           <motion.div 
             className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Sources */}
          <div className="space-y-4">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center">Data Sources</h4>
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                   <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><Activity size={18}/></div>
                   <div className="font-bold text-white">CloudTrail</div>
                </div>
                <div className="text-xs text-slate-400">Records every API call (Who, When, What).</div>
             </div>
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                   <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Server size={18}/></div>
                   <div className="font-bold text-white">VPC Flow Logs</div>
                </div>
                <div className="text-xs text-slate-400">Network traffic meta-data (IPs, Ports).</div>
             </div>
          </div>

          {/* Analysis */}
          <div className="space-y-4 pt-12 md:pt-0 flex flex-col justify-center">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center">Intelligent Analysis</h4>
             <motion.div 
               animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.3)', '0 0 0px rgba(59,130,246,0)'] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="bg-slate-800 p-6 rounded-xl border-2 border-blue-600 text-center relative"
             >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  Machine Learning
                </div>
                <ShieldAlert size={40} className="text-blue-500 mx-auto mb-3" />
                <div className="font-bold text-white text-lg">Amazon GuardDuty</div>
                <div className="text-xs text-slate-400 mt-2">
                  Detects cryptocurrency mining, port scanning, and compromised credentials using threat intelligence.
                </div>
             </motion.div>
          </div>

          {/* Action */}
          <div className="space-y-4 flex flex-col justify-center">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center">Central Visibility</h4>
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                   <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><ShieldAlert size={18}/></div>
                   <div className="font-bold text-white">Security Hub</div>
                </div>
                <div className="text-xs text-slate-400 mb-3">
                  Aggregates findings and compares against standards (CIS, PCI-DSS).
                </div>
                <div className="bg-slate-900 rounded p-2 text-[10px] font-mono text-red-300 border border-red-900/30">
                   [CRITICAL] S3 Bucket Public Read<br/>
                   [HIGH] Root Account Usage
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
