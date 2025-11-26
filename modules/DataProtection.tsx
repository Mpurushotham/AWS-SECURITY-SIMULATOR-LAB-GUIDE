import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileKey, Database, RefreshCw, Search, ShieldCheck, Server, BadgeCheck, FileBadge, Upload, AlertOctagon } from 'lucide-react';

export const DataProtection: React.FC = () => {
  const [rotationStep, setRotationStep] = useState(0);

  const rotateSecret = () => {
    setRotationStep(1);
    setTimeout(() => setRotationStep(2), 1500);
    setTimeout(() => setRotationStep(3), 3000);
    setTimeout(() => setRotationStep(0), 4500);
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-medium border border-teal-500/20">
          Domain: Data Protection
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Encryption & Privacy</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          Data is the ultimate asset. Learn how Envelope Encryption works in KMS and how to automate credential rotation with Secrets Manager.
        </p>
      </header>

      {/* KMS Deep Dive */}
      <section className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FileKey className="text-teal-500" />
          KMS Envelope Encryption
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
           <div className="space-y-4 text-sm text-slate-300">
             <p>AWS KMS does not store your data. It manages the <strong>Customer Master Keys (CMKs)</strong> used to encrypt the keys that encrypt your data.</p>
             <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-teal-500">
               <h4 className="font-bold text-white mb-1">Why Envelope Encryption?</h4>
               <p className="text-xs text-slate-400">Performance. Asymmetric CMKs are slow. Symmetric Data Keys are fast. We use the slow/secure CMK to encrypt the fast Data Key.</p>
             </div>
           </div>

           <div className="relative h-64 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-6 flex flex-col justify-between items-center">
             <div className="flex gap-8">
               <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/50 mb-2">
                    <KeyIcon />
                  </div>
                  <span className="text-xs font-mono text-orange-400">Master Key (CMK)</span>
               </div>
               
               <motion.div 
                 animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 0, 0], y: [0, 40, 40, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="flex flex-col items-center absolute top-6 left-1/2 -translate-x-1/2"
               >
                  <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center border border-blue-500/50 mb-1">
                    <KeyIcon size={16} />
                  </div>
                  <span className="text-[10px] font-mono text-blue-400">Data Key</span>
               </motion.div>
             </div>

             <div className="w-full bg-slate-800 h-24 rounded-lg border border-slate-700 flex items-center justify-center relative">
                <span className="text-slate-500 text-xs font-mono absolute top-2 left-2">Encrypted Storage</span>
                <div className="flex items-center gap-2">
                  <Database size={20} className="text-slate-400"/>
                  <span className="text-xs text-slate-300">Your Data + <span className="text-blue-400">Encrypted Data Key</span></span>
                </div>
             </div>
           </div>
        </div>
      </section>

      <CloudHSMVisualizer />
      <ACMVisualizer />
      <MacieSimulation />

      {/* Secrets Manager Visual */}
      <section className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <RefreshCw className="text-teal-500" />
              Secrets Manager Rotation
            </h3>
            <button 
              onClick={rotateSecret} 
              disabled={rotationStep !== 0}
              className="bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 text-white text-xs px-3 py-1 rounded transition-colors"
            >
              Simulate Rotation
            </button>
          </div>

          <div className="relative h-48 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-around p-4">
             {/* App */}
             <div className="flex flex-col items-center z-10">
               <div className="w-12 h-12 bg-blue-900/40 rounded-lg flex items-center justify-center mb-2"><Server className="text-blue-400"/></div>
               <span className="text-xs text-slate-400">App</span>
             </div>

             {/* Connection Line */}
             <div className="absolute top-1/2 left-20 right-20 h-0.5 bg-slate-800 -translate-y-6"></div>

             {/* DB */}
             <div className="flex flex-col items-center z-10">
               <div className="w-12 h-12 bg-purple-900/40 rounded-lg flex items-center justify-center mb-2"><Database className="text-purple-400"/></div>
               <span className="text-xs text-slate-400">RDS DB</span>
             </div>

             {/* Rotation Status */}
             <div className="absolute bottom-4 left-0 right-0 text-center">
                {rotationStep === 0 && <span className="text-green-500 text-xs font-mono">Status: Synced (Ver 1)</span>}
                {rotationStep === 1 && <span className="text-yellow-500 text-xs font-mono animate-pulse">Lambda Creating Ver 2...</span>}
                {rotationStep === 2 && <span className="text-orange-500 text-xs font-mono animate-pulse">Updating DB Password...</span>}
                {rotationStep === 3 && <span className="text-blue-500 text-xs font-mono">Testing Connection...</span>}
             </div>
          </div>
      </section>
    </div>
  );
};

const MacieSimulation: React.FC = () => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'alert'>('idle');

  const startScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('alert');
    }, 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Search className="text-teal-500" />
            Amazon Macie: PII Discovery Task
          </h3>
          <p className="text-slate-400 text-sm mt-1">Simulate scanning an S3 bucket for sensitive data (PII, Credentials).</p>
        </div>
        <button
          onClick={startScan}
          disabled={scanState !== 'idle'}
          className={`px-4 py-2 rounded font-bold transition-all ${
            scanState === 'idle' ? 'bg-teal-600 hover:bg-teal-500 text-white' : 'bg-slate-700 text-slate-500'
          }`}
        >
          {scanState === 'idle' ? 'Run Data Discovery Job' : scanState === 'scanning' ? 'Scanning...' : 'Scan Complete'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
         {/* S3 Bucket Visualization */}
         <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[200px]">
            <span className="absolute top-2 left-2 text-xs font-mono text-slate-500">s3://customer-uploads</span>
            <div className="grid grid-cols-3 gap-4">
               <FileIcon name="image_01.jpg" sensitive={false} scanning={scanState === 'scanning'} />
               <FileIcon name="invoice.pdf" sensitive={false} scanning={scanState === 'scanning'} />
               <FileIcon name="customers.csv" sensitive={true} scanning={scanState === 'scanning'} />
               <FileIcon name="notes.txt" sensitive={false} scanning={scanState === 'scanning'} />
            </div>

            {scanState === 'scanning' && (
              <motion.div 
                className="absolute inset-0 bg-teal-500/10 pointer-events-none"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 2, ease: "linear" }}
              />
            )}
         </div>

         {/* Findings Dashboard */}
         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700">
               <ShieldCheck className="text-teal-400" />
               <h4 className="font-bold text-white">Security Findings</h4>
            </div>
            
            <div className="space-y-3">
               {scanState === 'idle' && <div className="text-sm text-slate-500 italic">No recent jobs run.</div>}
               {scanState === 'scanning' && (
                  <div className="flex items-center gap-2 text-teal-400 text-sm">
                    <RefreshCw className="animate-spin" size={14} /> Analyzing objects...
                  </div>
               )}
               {scanState === 'alert' && (
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="p-3 bg-red-900/20 border border-red-500/50 rounded flex gap-3"
                  >
                     <AlertOctagon className="text-red-500 shrink-0" size={20} />
                     <div>
                        <div className="text-red-400 font-bold text-sm">Sensitive Data Found</div>
                        <div className="text-xs text-slate-300 mt-1">Object: <span className="font-mono">customers.csv</span></div>
                        <div className="text-[10px] text-slate-400 mt-1">Type: Credit Card Number, Name</div>
                     </div>
                  </motion.div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

const FileIcon: React.FC<{name: string, sensitive: boolean, scanning: boolean}> = ({ name, sensitive, scanning }) => (
  <div className={`flex flex-col items-center p-2 rounded ${scanning && sensitive ? 'bg-red-500/20' : 'bg-slate-900'}`}>
     <FileBadge size={24} className={scanning && sensitive ? 'text-red-400' : 'text-slate-500'} />
     <span className="text-[10px] text-slate-400 mt-1">{name}</span>
  </div>
);

const ACMVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <BadgeCheck className="text-green-500" />
        AWS Certificate Manager (ACM)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { step: 1, title: 'Request', desc: 'Public or Private Cert' },
           { step: 2, title: 'Validate', desc: 'DNS (CNAME) or Email' },
           { step: 3, title: 'Deploy', desc: 'Attach to ELB/CloudFront' },
           { step: 4, title: 'Auto-Renew', desc: 'Managed by AWS' },
         ].map((s, idx) => (
           <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-green-500 transition-colors">
              <div className="text-xs font-bold text-slate-500 mb-2">Step 0{s.step}</div>
              <h4 className="font-bold text-white mb-1">{s.title}</h4>
              <p className="text-xs text-slate-400">{s.desc}</p>
              {s.step === 4 && <motion.div 
                 className="absolute bottom-0 right-0 p-2 text-green-500 opacity-20 group-hover:opacity-100 transition-opacity"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              ><RefreshCw size={24}/></motion.div>}
           </div>
         ))}
      </div>
    </div>
  );
};

const CloudHSMVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Server className="text-purple-500" />
        KMS vs CloudHSM
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
               <FileKey size={18} className="text-teal-400" /> AWS KMS
            </h4>
            <div className="flex gap-2 mb-4">
               <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300">FIPS 140-2 Level 2</span>
               <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300">Multi-Tenant</span>
            </div>
            <div className="flex flex-col items-center justify-center h-32 bg-slate-900 rounded border border-slate-700 border-dashed">
               <div className="grid grid-cols-3 gap-2 opacity-50">
                  <div className="w-6 h-6 bg-teal-500/20 rounded"></div>
                  <div className="w-6 h-6 bg-teal-500/20 rounded"></div>
                  <div className="w-6 h-6 bg-teal-500/20 rounded"></div>
               </div>
               <span className="text-xs text-slate-500 mt-2">Shared Hardware</span>
            </div>
         </div>

         <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
               <Server size={18} className="text-purple-400" /> CloudHSM
            </h4>
            <div className="flex gap-2 mb-4">
               <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300">FIPS 140-2 Level 3</span>
               <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300">Single-Tenant</span>
            </div>
            <div className="flex flex-col items-center justify-center h-32 bg-slate-900 rounded border border-purple-500/30">
               <div className="w-16 h-16 bg-purple-900/20 border border-purple-500/50 rounded flex items-center justify-center">
                  <FileBadge size={32} className="text-purple-500" />
               </div>
               <span className="text-xs text-purple-400 mt-2">Dedicated Hardware</span>
            </div>
         </div>
      </div>
    </div>
  );
};

const KeyIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);