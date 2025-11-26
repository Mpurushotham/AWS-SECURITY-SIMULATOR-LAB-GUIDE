import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Lock, Server, Globe, ShieldCheck, Database, ArrowRight, Share2, Activity, HardDrive, Cpu, Network, FileKey, X, Info } from 'lucide-react';

type ZoneId = 'internet' | 'network' | 'log' | 'security' | 'prod' | 'dev';

export const EnterpriseArch: React.FC = () => {
  const [activeFlow, setActiveFlow] = useState<'none' | 'user' | 'log'>('none');
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null);

  const zoneDetails: Record<ZoneId, { title: string; services: string[]; desc: string; icon: any }> = {
    internet: {
      title: "Public Internet",
      services: ["External Traffic", "CDNs"],
      desc: "Untrusted territory. All ingress traffic must be filtered. In this architecture, no workload VPC has a direct path to the internet (IGW). All traffic is routed through the Inspection VPC in the Network Account.",
      icon: Globe
    },
    network: {
      title: "Network & Connectivity (Edge)",
      services: ["Transit Gateway", "Network Firewall", "Route 53 Resolver", "VPC Ingress/Egress"],
      desc: "The connectivity hub. The Transit Gateway connects all VPCs and VPNs. The 'Inspection VPC' forces all North-South (Internet) and East-West (VPC-to-VPC) traffic through AWS Network Firewall for deep packet inspection.",
      icon: Network
    },
    log: {
      title: "Log Archive Account",
      services: ["S3 (Object Lock)", "CloudTrail", "Config Aggregator"],
      desc: "Immutable storage for audit logs. We use S3 Object Lock (WORM - Write Once Read Many) to prevent hackers from deleting logs even if they gain root access. All CloudTrail logs from the Organization land here.",
      icon: HardDrive
    },
    security: {
      title: "Security Tooling Account",
      services: ["Security Hub (Master)", "GuardDuty (Master)", "Macie", "Incident Response"],
      desc: "The Security Operations Center (SOC). This account is the 'Delegated Administrator' for security services. Findings from all other accounts are aggregated here for a single pane of glass view.",
      icon: ShieldCheck
    },
    prod: {
      title: "Production Workloads",
      services: ["EC2 / EKS", "RDS / Aurora", "VPC Endpoints", "Systems Manager"],
      desc: "Where value is created. Production accounts are isolated. They have NO internet gateways. They access AWS services (like S3) via PrivateLink (VPC Endpoints) and the internet via the Transit Gateway -> Network Account.",
      icon: Server
    },
    dev: {
      title: "Development Sandbox",
      services: ["Service Catalog", "Budget Alarms", "Auto-Nuke Scripts"],
      desc: "Innovation zone with guardrails. Developers have freedom, but Service Control Policies (SCPs) prevent critical risks (like turning off CloudTrail or mining crypto). Resources may be automatically deleted nightly.",
      icon: Cpu
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto relative">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">
          Part 6: Enterprise Landing Zone
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Production Grade Architecture</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          Visualizing how XYZ Organization scales using a <strong>Multi-Account Strategy</strong> (Control Tower). 
          Click on any zone to see the specific services and security controls applied.
        </p>
      </header>

      {/* Main Architecture Visualizer */}
      <section className="bg-slate-950 border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl min-h-[800px]">
        
        {/* Controls Overlay */}
        <div className="flex justify-between items-center mb-10 relative z-20">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Share2 className="text-cyan-500" />
              XYZ Corp: Landing Zone Map
            </h3>
            <p className="text-slate-500 text-sm mt-1">Interactive Diagram: Select a zone to explore.</p>
          </div>
          <div className="flex gap-3 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveFlow('none')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all ${activeFlow === 'none' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Static View
            </button>
            <button
              onClick={() => setActiveFlow('user')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 ${activeFlow === 'user' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Globe size={14} /> Simulate Traffic
            </button>
            <button
              onClick={() => setActiveFlow('log')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 ${activeFlow === 'log' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Activity size={14} /> Simulate Logs
            </button>
          </div>
        </div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-12 gap-6 relative z-10">
          
          {/* Top Row: Internet & Edge */}
          <div className="col-span-12 flex justify-center mb-4 relative h-32">
             <div 
               className="flex flex-col items-center z-10 cursor-pointer hover:scale-110 transition-transform"
               onClick={() => setSelectedZone('internet')}
             >
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-700 hover:border-blue-500 shadow-xl">
                  <Cloud size={40} className="text-blue-400" />
                </div>
                <span className="text-slate-500 font-bold mt-2 text-sm">Internet</span>
             </div>
             
             {/* Ingress Particles */}
             {activeFlow === 'user' && (
                <>
                  <motion.div 
                    className="absolute top-16 left-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] z-0"
                    animate={{ y: [0, 150], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute top-16 left-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] z-0"
                    animate={{ y: [0, 150], opacity: [1, 0] }}
                    transition={{ duration: 1.5, delay: 0.7, repeat: Infinity, ease: "linear" }}
                  />
                </>
             )}
          </div>

          {/* Left Column: Infrastructure OU */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
             <div className="border border-dashed border-slate-700 p-4 rounded-xl bg-slate-900/50">
                <div className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                   <Network size={14} /> Infrastructure OU
                </div>
                
                {/* Network Account */}
                <div 
                  className={`bg-slate-800 border border-slate-700 rounded-xl p-5 relative overflow-hidden group cursor-pointer transition-all ${selectedZone === 'network' ? 'ring-2 ring-cyan-500' : 'hover:border-cyan-500/50'}`}
                  onClick={() => setSelectedZone('network')}
                >
                   <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                   <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-white flex items-center gap-2"><Share2 size={16} className="text-cyan-400"/> Network Account</h4>
                   </div>
                   
                   <div className="space-y-3">
                      <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center justify-between text-xs">
                         <span className="text-slate-300 font-bold">Transit Gateway</span>
                         <span className="px-1.5 py-0.5 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-800">Hub</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center justify-between text-xs">
                         <span className="text-slate-300">Ingress VPC (ALB)</span>
                         <ShieldCheck size={14} className="text-green-500"/>
                      </div>
                      <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center justify-between text-xs">
                         <span className="text-slate-300">Inspection (Firewall)</span>
                         <ShieldCheck size={14} className="text-red-500"/>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Middle: Transit/Connection Logic (Visual Only) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-center items-center relative min-h-[300px]">
             {/* Central Hub Connector Animation */}
             <div className="w-48 h-48 rounded-full border border-slate-800 flex items-center justify-center relative animate-[spin_60s_linear_infinite]">
                 <div className="absolute top-0 left-1/2 w-2 h-2 bg-slate-700 rounded-full"></div>
                 <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-slate-700 rounded-full"></div>
                 <div className="absolute left-0 top-1/2 w-2 h-2 bg-slate-700 rounded-full"></div>
                 <div className="absolute right-0 top-1/2 w-2 h-2 bg-slate-700 rounded-full"></div>
             </div>
             
             <div className="absolute w-24 h-24 bg-cyan-900/20 rounded-full flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm z-10">
                <Share2 size={32} className="text-cyan-500" />
             </div>
             
             {/* Traffic Lines */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <line x1="50%" y1="0%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="10%" y1="50%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="90%" y1="50%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="100%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
             </svg>

             {/* Dynamic Flow Particles */}
             {activeFlow === 'user' && (
                <motion.div 
                   className="absolute w-4 h-4 rounded-full bg-green-500 z-20"
                   animate={{ 
                      top: ['10%', '50%', '80%'], 
                      left: ['50%', '50%', '80%'],
                      opacity: [1, 1, 0]
                   }}
                   transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
                />
             )}
          </div>

          {/* Right Column: Security OU */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
             <div className="border border-dashed border-slate-700 p-4 rounded-xl bg-slate-900/50">
                <div className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                   <Lock size={14} /> Security OU
                </div>
                
                {/* Log Archive */}
                <div 
                  className={`bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4 relative overflow-hidden group cursor-pointer transition-all ${selectedZone === 'log' ? 'ring-2 ring-blue-500' : 'hover:border-blue-500/50'}`}
                  onClick={() => setSelectedZone('log')}
                >
                   <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                   <h4 className="font-bold text-white flex items-center gap-2 mb-3"><HardDrive size={16} className="text-blue-400"/> Log Archive</h4>
                   <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center gap-3">
                      <Database size={16} className="text-slate-500"/>
                      <div className="text-xs">
                        <div className="text-white">Central S3 Bucket</div>
                        <div className="text-slate-500">Immutable (Object Lock)</div>
                      </div>
                   </div>
                   {activeFlow === 'log' && (
                     <motion.div className="absolute right-4 top-4 text-blue-500"><Activity className="animate-pulse" size={16}/></motion.div>
                   )}
                </div>

                {/* Security Tooling */}
                <div 
                  className={`bg-slate-800 border border-slate-700 rounded-xl p-5 relative overflow-hidden group cursor-pointer transition-all ${selectedZone === 'security' ? 'ring-2 ring-red-500' : 'hover:border-red-500/50'}`}
                  onClick={() => setSelectedZone('security')}
                >
                   <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                   <h4 className="font-bold text-white flex items-center gap-2 mb-3"><ShieldCheck size={16} className="text-red-400"/> Security Tooling</h4>
                   <div className="bg-slate-900 p-3 rounded border border-slate-700 flex flex-wrap gap-2">
                      <span className="text-[10px] bg-slate-800 border border-slate-600 px-2 py-1 rounded text-slate-300">GuardDuty</span>
                      <span className="text-[10px] bg-slate-800 border border-slate-600 px-2 py-1 rounded text-slate-300">Security Hub</span>
                      <span className="text-[10px] bg-slate-800 border border-slate-600 px-2 py-1 rounded text-slate-300">Macie</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Bottom Row: Workloads */}
          <div className="col-span-12 mt-4">
             <div className="border border-dashed border-slate-700 p-4 rounded-xl bg-slate-900/50 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-32 shrink-0 flex items-center justify-center md:justify-start">
                   <div className="text-xs font-bold text-slate-500 uppercase tracking-wider rotate-0 md:-rotate-90 flex items-center gap-2">
                      <Server size={14} /> Workloads
                   </div>
                </div>

                {/* Prod Account */}
                <div 
                  className={`flex-1 bg-slate-800 border border-slate-700 rounded-xl p-5 relative group cursor-pointer transition-all ${selectedZone === 'prod' ? 'ring-2 ring-purple-500' : 'hover:border-purple-500/50'}`}
                  onClick={() => setSelectedZone('prod')}
                >
                   <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                   <div className="flex justify-between items-start mb-4">
                     <h4 className="font-bold text-white flex items-center gap-2"><Server size={16} className="text-purple-400"/> Prod Account</h4>
                     <span className="text-[10px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded border border-green-900/50">Production</span>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900 p-3 rounded border border-slate-700 relative overflow-hidden">
                         <div className="text-xs font-bold text-slate-400 mb-1">App VPC</div>
                         <div className="flex items-center gap-2">
                            <Cpu size={16} className="text-slate-500" />
                            <span className="text-xs text-slate-300">EC2 / EKS</span>
                         </div>
                         {activeFlow === 'user' && (
                            <motion.div 
                              className="absolute inset-0 bg-green-500/10"
                              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}
                            />
                         )}
                         {activeFlow === 'log' && (
                            <motion.div 
                               className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full"
                               animate={{ y: -50, x: 100, opacity: [1, 0] }}
                               transition={{ duration: 1.5, repeat: Infinity }}
                            />
                         )}
                      </div>
                      <div className="bg-slate-900 p-3 rounded border border-slate-700">
                         <div className="text-xs font-bold text-slate-400 mb-1">Data VPC</div>
                         <div className="flex items-center gap-2">
                            <Database size={16} className="text-slate-500" />
                            <span className="text-xs text-slate-300">RDS / DynamoDB</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Dev Account */}
                <div 
                  className={`flex-1 bg-slate-800 border border-slate-700 rounded-xl p-5 relative opacity-70 group cursor-pointer transition-all ${selectedZone === 'dev' ? 'ring-2 ring-orange-500 opacity-100' : 'hover:border-orange-500/50'}`}
                  onClick={() => setSelectedZone('dev')}
                >
                   <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
                   <h4 className="font-bold text-white flex items-center gap-2 mb-4"><Cpu size={16} className="text-orange-400"/> Dev Account</h4>
                   <div className="bg-slate-900 p-3 rounded border border-slate-700">
                      <div className="text-xs font-bold text-slate-400 mb-1">Sandbox VPC</div>
                      <span className="text-xs text-slate-500">Experimental workloads</span>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Deep Dive Panel (Slide Over) */}
        <AnimatePresence>
          {selectedZone && zoneDetails[selectedZone] && (
             <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: "spring", damping: 30, stiffness: 300 }}
               className="absolute top-0 right-0 h-full w-full md:w-[400px] bg-[#0f172a]/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl z-30 flex flex-col"
               onClick={(e) => e.stopPropagation()}
             >
                <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900/50">
                   <div className="flex items-center gap-3">
                      <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 shadow-inner">
                        {React.createElement(zoneDetails[selectedZone].icon, { size: 24, className: "text-cyan-400" })}
                      </div>
                      <div>
                         <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider mb-0.5">Deep Dive</div>
                         <h3 className="text-lg font-bold text-white leading-tight">{zoneDetails[selectedZone].title}</h3>
                      </div>
                   </div>
                   <button onClick={() => setSelectedZone(null)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                      <X size={20} />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                   <div>
                      <h4 className="text-sm font-bold text-white mb-2">Architectural Role</h4>
                      <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-slate-700 pl-4">
                        {zoneDetails[selectedZone].desc}
                      </p>
                   </div>

                   <div>
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Activity size={16} className="text-cyan-500"/> Core Services
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                         {zoneDetails[selectedZone].services.map((service, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                            >
                               <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></div>
                               <span className="text-sm text-slate-200">{service}</span>
                            </motion.div>
                         ))}
                      </div>
                   </div>

                   {/* Contextual Tips based on zone */}
                   {selectedZone === 'network' && (
                      <div className="p-4 bg-cyan-900/10 border border-cyan-500/30 rounded-xl shadow-lg">
                         <h5 className="text-xs font-bold text-cyan-400 mb-2 flex items-center gap-2"><Info size={14}/> Pro Tip</h5>
                         <p className="text-xs text-slate-400">Use <strong>Gateway Load Balancer (GWLB)</strong> here to insert 3rd party firewalls (Palo Alto, Fortinet) if AWS Network Firewall isn't enough.</p>
                      </div>
                   )}
                    {selectedZone === 'log' && (
                      <div className="p-4 bg-blue-900/10 border border-blue-500/30 rounded-xl shadow-lg">
                         <h5 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2"><Info size={14}/> Pro Tip</h5>
                         <p className="text-xs text-slate-400">Enable <strong>S3 MFA Delete</strong> alongside Object Lock for maximum protection against ransomware.</p>
                      </div>
                   )}
                   {selectedZone === 'prod' && (
                      <div className="p-4 bg-purple-900/10 border border-purple-500/30 rounded-xl shadow-lg">
                         <h5 className="text-xs font-bold text-purple-400 mb-2 flex items-center gap-2"><Info size={14}/> Pro Tip</h5>
                         <p className="text-xs text-slate-400">Use <strong>Systems Manager Session Manager</strong> for SSH/RDP access. Never open port 22/3389 to the internet.</p>
                      </div>
                   )}
                </div>
             </motion.div>
          )}
        </AnimatePresence>

      </section>
    </div>
  );
};