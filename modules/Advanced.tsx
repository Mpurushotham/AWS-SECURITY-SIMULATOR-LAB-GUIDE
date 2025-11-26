import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Server, Shield, Lock, Database, Globe, AlertOctagon, Fingerprint } from 'lucide-react';

export const Advanced: React.FC = () => {
  const [showThreats, setShowThreats] = useState(false);

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
          Part 4: Advanced Architectures
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Serverless & Machine Learning</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          Securing modern, ephemeral compute requires a shift in mindset. Plus, using AI to defend the cloud.
        </p>
      </header>

      {/* Serverless Security Interactive Diagram */}
      <section className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl relative">
        <div className="flex justify-between items-center mb-10">
           <h3 className="text-2xl font-bold text-white">Serverless Threat Model</h3>
           <button 
             onClick={() => setShowThreats(!showThreats)}
             className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
               showThreats ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
             }`}
           >
             <AlertOctagon size={18} /> {showThreats ? 'Hide Threats' : 'Simulate Attacks'}
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch h-full relative z-10">
            
            {/* Component 1: API Gateway */}
            <div className={`flex-1 p-6 rounded-xl border-2 transition-all relative ${showThreats ? 'border-red-500/50 bg-red-900/10' : 'border-blue-500/30 bg-slate-800'}`}>
               <div className="flex justify-center mb-4"><Globe size={40} className="text-blue-400"/></div>
               <h4 className="text-center text-white font-bold mb-2">API Gateway</h4>
               <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                 <li>Throttling/Quotas</li>
                 <li>WAF Integration</li>
                 <li>Resource Policies</li>
               </ul>

               {/* Threat Overlay */}
               <AnimatePresence>
                 {showThreats && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                     className="absolute -top-4 -right-4 bg-red-600 text-white text-xs p-2 rounded shadow-lg z-20 w-48"
                   >
                     <strong>Threat: DDoS & Injection</strong>
                     <div className="mt-1 opacity-90">Blocked by WAF (SQLi rules) and Rate Limiting.</div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center text-slate-600">➔</div>

            {/* Component 2: Lambda */}
            <div className={`flex-1 p-6 rounded-xl border-2 transition-all relative ${showThreats ? 'border-orange-500/50 bg-orange-900/10' : 'border-orange-500/30 bg-slate-800'}`}>
               <div className="flex justify-center mb-4"><Server size={40} className="text-orange-400"/></div>
               <h4 className="text-center text-white font-bold mb-2">Lambda Function</h4>
               <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                 <li>Least Privilege Role</li>
                 <li>VPC Config</li>
                 <li>Code Signing</li>
               </ul>

                {/* Threat Overlay */}
               <AnimatePresence>
                 {showThreats && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                     className="absolute -top-4 -right-4 bg-red-600 text-white text-xs p-2 rounded shadow-lg z-20 w-48"
                   >
                     <strong>Threat: Malicious Dependency</strong>
                     <div className="mt-1 opacity-90">Blocked by Lambda Code Signing and outgoing Network Firewall.</div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

             {/* Arrow */}
             <div className="flex items-center justify-center text-slate-600">➔</div>

            {/* Component 3: DynamoDB */}
            <div className={`flex-1 p-6 rounded-xl border-2 transition-all relative ${showThreats ? 'border-purple-500/50 bg-purple-900/10' : 'border-purple-500/30 bg-slate-800'}`}>
               <div className="flex justify-center mb-4"><Database size={40} className="text-purple-400"/></div>
               <h4 className="text-center text-white font-bold mb-2">DynamoDB</h4>
               <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                 <li>KMS Encryption</li>
                 <li>Fine-Grained IAM</li>
                 <li>VPC Endpoints</li>
               </ul>

                {/* Threat Overlay */}
               <AnimatePresence>
                 {showThreats && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                     className="absolute -top-4 -right-4 bg-red-600 text-white text-xs p-2 rounded shadow-lg z-20 w-48"
                   >
                     <strong>Threat: Data Exfiltration</strong>
                     <div className="mt-1 opacity-90">Blocked by VPC Endpoint Policy (No public internet access).</div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
        </div>
      </section>

      {/* ML Architecture */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-900/50 rounded-2xl p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-20"><Fingerprint size={120} className="text-indigo-400"/></div>
        
        <div className="flex items-center gap-4 mb-8 relative z-10">
           <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
             <Brain className="text-indigo-400" size={32} />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-white">ML-Powered Anomaly Detection</h3>
             <p className="text-slate-400">Architecture Pattern: Real-time CloudTrail Analysis with SageMaker</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
           {[
             { title: "Ingest", desc: "Kinesis Firehose streams logs to S3 Data Lake", color: "border-slate-600" },
             { title: "Train", desc: "SageMaker Random Cut Forest (RCF) learns patterns", color: "border-indigo-600" },
             { title: "Inference", desc: "Lambda checks new events against Model Endpoint", color: "border-purple-600" },
             { title: "Act", desc: "High anomaly score triggers SNS Alert & IAM restriction", color: "border-red-600" }
           ].map((step, idx) => (
             <div key={idx} className={`bg-slate-800/80 backdrop-blur p-4 rounded-xl border-l-4 ${step.color} shadow-lg`}>
                <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Step 0{idx+1}</div>
                <h4 className="font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-slate-300">{step.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};
