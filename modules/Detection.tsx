import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldAlert, Activity, Server, Filter, Share2, Search, MapPin, User, FileCode, Play, AlertCircle } from 'lucide-react';

export const Detection: React.FC = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
          Domain: Detection & Response
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Visibility & Threat Detection</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          You can't secure what you can't see. Centralize your logs, automate threat detection with GuardDuty, and aggregate findings with Security Hub.
        </p>
      </header>

      <GuardDutySimulation />
      <LoggingArchitecture />
      <DetectiveGraph />
      
      {/* Additional Detection Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">AWS Config</h3>
          <p className="text-sm text-slate-400 mb-4">The flight recorder for your resource configurations.</p>
          <div className="space-y-3">
             <div className="p-3 bg-slate-800 rounded border border-slate-700 flex justify-between items-center">
                <span className="text-sm text-slate-300">1. Record</span>
                <span className="text-xs text-slate-500">Snapshots current state of all resources.</span>
             </div>
             <div className="p-3 bg-slate-800 rounded border border-slate-700 flex justify-between items-center">
                <span className="text-sm text-slate-300">2. Evaluate</span>
                <span className="text-xs text-slate-500">Checks against Rules (e.g., encrypted-vol).</span>
             </div>
             <div className="p-3 bg-slate-800 rounded border border-slate-700 flex justify-between items-center">
                <span className="text-sm text-slate-300">3. Remediate</span>
                <span className="text-xs text-slate-500">Triggers Systems Manager documents.</span>
             </div>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Amazon Inspector</h3>
          <p className="text-sm text-slate-400 mb-4">Automated vulnerability management for EC2 and ECR.</p>
           <ul className="space-y-2 text-sm text-slate-300">
             <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Agentless scanning (using SSM).</li>
             <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-green-500 rounded-full"></div> CVE Database matching.</li>
             <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Network Reachability analysis.</li>
           </ul>
        </div>
      </section>
    </div>
  );
};

const GuardDutySimulation: React.FC = () => {
  const [attackType, setAttackType] = useState<'ssh' | 'crypto' | null>(null);
  const [stage, setStage] = useState(0);

  const startAttack = (type: 'ssh' | 'crypto') => {
    if (stage !== 0) return;
    setAttackType(type);
    setStage(1);
    setTimeout(() => setStage(2), 2000);
    setTimeout(() => setStage(3), 4000);
    setTimeout(() => { setStage(0); setAttackType(null); }, 7000);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
       <div className="flex justify-between items-center mb-6">
        <div>
           <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="text-blue-500" />
            GuardDuty Threat Hunter
          </h3>
          <p className="text-slate-400 text-sm mt-1">Simulate real-world attacks and see how GuardDuty detects them via log analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="space-y-4">
            <button 
              onClick={() => startAttack('ssh')}
              disabled={stage !== 0}
              className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 p-4 rounded-xl border border-slate-700 flex items-center gap-4 text-left transition-all"
            >
               <div className="bg-red-900/20 p-3 rounded-lg"><Server className="text-red-400"/></div>
               <div>
                  <div className="font-bold text-white">Simulate SSH Brute Force</div>
                  <div className="text-xs text-slate-400">Trigger: UnauthorizedAccess:EC2/SSHBruteForce</div>
               </div>
               {attackType === 'ssh' && <Activity className="animate-spin ml-auto text-blue-500" />}
            </button>

            <button 
              onClick={() => startAttack('crypto')}
              disabled={stage !== 0}
              className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 p-4 rounded-xl border border-slate-700 flex items-center gap-4 text-left transition-all"
            >
               <div className="bg-orange-900/20 p-3 rounded-lg"><Activity className="text-orange-400"/></div>
               <div>
                  <div className="font-bold text-white">Simulate Crypto Mining</div>
                  <div className="text-xs text-slate-400">Trigger: CryptoCurrency:EC2/BitcoinTool.B</div>
               </div>
               {attackType === 'crypto' && <Activity className="animate-spin ml-auto text-blue-500" />}
            </button>
         </div>

         <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-8 relative flex flex-col justify-center gap-6">
            
            {/* Pipeline Visual */}
            <div className="flex justify-between items-center relative z-10">
               {/* 1. Attacker */}
               <div className={`flex flex-col items-center transition-opacity ${stage >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                  <User size={32} className="text-red-500 mb-2" />
                  <span className="text-xs font-bold text-slate-400">Attacker IP</span>
               </div>

               {/* 2. Log Source */}
               <div className={`flex flex-col items-center transition-opacity ${stage >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-12 h-12 rounded bg-slate-800 border border-slate-600 flex items-center justify-center mb-2">
                     <FileCode size={20} className="text-blue-400"/>
                  </div>
                  <span className="text-xs font-bold text-slate-400">VPC Flow Logs</span>
               </div>

               {/* 3. GuardDuty Analysis */}
               <div className={`flex flex-col items-center transition-opacity ${stage >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 ${stage === 2 ? 'bg-blue-900/20 border-blue-500 animate-pulse' : 'bg-slate-900 border-slate-700'}`}>
                     <ShieldAlert size={32} className={stage >= 2 ? "text-blue-500" : "text-slate-600"} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">GuardDuty Engine</span>
               </div>

               {/* 4. Finding */}
               <div className={`flex flex-col items-center transition-opacity ${stage >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="bg-red-500 text-white px-3 py-1 rounded shadow-lg shadow-red-500/20 mb-2 flex items-center gap-2">
                     <AlertCircle size={14} /> ALERT
                  </div>
                  <span className="text-xs font-bold text-slate-400">Security Hub</span>
               </div>
            </div>

            {/* Connecting Lines */}
            <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-800 -translate-y-4 -z-0">
               {stage >= 1 && <motion.div className="h-full bg-red-500" initial={{width:0}} animate={{width: '33%'}} transition={{duration: 0.5}} />}
               {stage >= 2 && <motion.div className="h-full bg-blue-500 absolute left-[33%]" initial={{width:0}} animate={{width: '33%'}} transition={{duration: 0.5}} />}
               {stage >= 3 && <motion.div className="h-full bg-orange-500 absolute left-[66%]" initial={{width:0}} animate={{width: '34%'}} transition={{duration: 0.5}} />}
            </div>

            {/* Log Console */}
            <div className="mt-4 bg-black rounded p-3 font-mono text-[10px] text-green-400 h-24 overflow-hidden border border-slate-800">
               <div className="text-slate-500 border-b border-slate-800 pb-1 mb-1">GuardDuty Agent Logs</div>
               {stage >= 1 && <div>[INFO] Ingesting Flow Logs from eni-12345abcd...</div>}
               {stage >= 2 && attackType === 'ssh' && <div>[WARN] Traffic volume spike on port 22 from 192.168.1.100</div>}
               {stage >= 2 && attackType === 'crypto' && <div>[WARN] DNS query to known mining pool 'pool.mine.xmr'</div>}
               {stage >= 3 && <div className="text-red-400">[CRITICAL] Finding Generated: {attackType === 'ssh' ? 'UnauthorizedAccess:EC2/SSHBruteForce' : 'CryptoCurrency:EC2/BitcoinTool.B'}</div>}
            </div>
         </div>
      </div>
    </div>
  );
}

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

const DetectiveGraph: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <Share2 className="text-purple-500" />
        Amazon Detective: Behavior Graph
      </h3>
      
      <div className="relative h-64 bg-slate-950 rounded-xl border border-slate-800 p-8 flex justify-center items-center">
        {/* Nodes */}
        <div className="absolute top-10 left-10 flex flex-col items-center group cursor-pointer">
           <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center border-2 border-purple-500 group-hover:scale-110 transition-transform">
              <User size={20} className="text-purple-300" />
           </div>
           <span className="text-xs text-slate-400 mt-2">AdminRole</span>
        </div>

        <div className="absolute top-10 right-10 flex flex-col items-center group cursor-pointer">
           <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center border-2 border-red-500 group-hover:scale-110 transition-transform">
              <MapPin size={20} className="text-red-300" />
           </div>
           <span className="text-xs text-slate-400 mt-2">Malicious IP</span>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer">
           <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center border-2 border-blue-500 group-hover:scale-110 transition-transform">
              <FileCode size={20} className="text-blue-300" />
           </div>
           <span className="text-xs text-slate-400 mt-2">API: RunInstances</span>
        </div>

        {/* Links */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           <motion.line 
             x1="15%" y1="30%" x2="85%" y2="30%" 
             stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"
             initial={{ strokeDashoffset: 10 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 1 }}
           />
           <line x1="15%" y1="35%" x2="50%" y2="75%" stroke="#475569" strokeWidth="2" />
           <line x1="85%" y1="35%" x2="50%" y2="75%" stroke="#475569" strokeWidth="2" />
        </svg>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-3 py-1 rounded border border-slate-700 text-[10px] text-slate-400 text-center">
           Detective correlates <br/> <span className="text-red-400 font-bold">Impossible Travel</span>
        </div>
      </div>
      
      <p className="text-sm text-slate-400 mt-4 text-center">
        Detective ingests logs from CloudTrail, VPC Flow Logs, and GuardDuty to build a linked graph of entities, helping you visualize the scope of an attack.
      </p>
    </div>
  );
};