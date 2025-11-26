import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Lock, Eye, Network, FileText, X, ArrowRight, Play, CheckCircle2, AlertTriangle, Key, Globe, Database, Server, UserCheck, RefreshCw, Library, ChevronRight, Terminal, AlertCircle } from 'lucide-react';

// --- Types ---

interface ServiceDef {
  id: string;
  name: string;
  category: 'Identity' | 'Infrastructure' | 'Detection' | 'Data' | 'Compliance';
  icon: React.ReactNode;
  desc: string;
  realWorld: string;
  labTitle: string;
  labInstruction: string;
}

// --- Main Component ---

export const AllServices: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<ServiceDef | null>(null);

  const services: ServiceDef[] = [
    {
      id: 'iam',
      name: 'IAM',
      category: 'Identity',
      icon: <UserCheck size={24} className="text-blue-500" />,
      desc: "Identity and Access Management. The control plane for AWS. It manages Who (Authentication) can do What (Authorization) on Which resources.",
      realWorld: "Creating a Role for an EC2 instance to access S3, eliminating the need to store long-term AWS Access Keys on the server.",
      labTitle: "Policy Simulator",
      labInstruction: "Test if the user 'Alice' can delete a critical S3 bucket based on her current policy."
    },
    {
      id: 'cognito',
      name: 'Amazon Cognito',
      category: 'Identity',
      icon: <UserCheck size={24} className="text-blue-400" />,
      desc: "Customer Identity & Access Management (CIAM). Handles sign-up, sign-in, and federation for your web/mobile apps.",
      realWorld: "Allowing users to log in to your gaming app using their Facebook or Google account, then exchanging that token for temporary AWS credentials.",
      labTitle: "Token Exchange",
      labInstruction: "Simulate a user logging in and exchanging a JWT ID Token for AWS temporary credentials."
    },
    {
      id: 'kms',
      name: 'AWS KMS',
      category: 'Data',
      icon: <Key size={24} className="text-orange-500" />,
      desc: "Key Management Service. Creates and controls the cryptographic keys used to encrypt your data across AWS.",
      realWorld: "Encrypting an EBS volume (hard drive) so that even if the physical drive is stolen from the data center, the data is unreadable.",
      labTitle: "Encrypt/Decrypt",
      labInstruction: "Use a Customer Master Key (CMK) to encrypt a sensitive credit card number."
    },
    {
      id: 'secrets',
      name: 'Secrets Manager',
      category: 'Data',
      icon: <Lock size={24} className="text-orange-400" />,
      desc: "Securely encrypts, stores, and rotates credentials for databases and other services.",
      realWorld: "Automatically rotating the RDS database password every 30 days and updating the application configuration without downtime.",
      labTitle: "Secret Rotation",
      labInstruction: "Trigger an immediate rotation of the database password and observe the version change."
    },
    {
      id: 'waf',
      name: 'AWS WAF',
      category: 'Infrastructure',
      icon: <Globe size={24} className="text-purple-500" />,
      desc: "Web Application Firewall. Protects against common web exploits like SQL Injection and Cross-Site Scripting (XSS).",
      realWorld: "Blocking all traffic from a specific country or blocking requests that contain malicious SQL patterns like `' OR 1=1`.",
      labTitle: "Traffic Filtering",
      labInstruction: "Configure the firewall to BLOCK requests coming from a specific malicious IP address."
    },
    {
      id: 'shield',
      name: 'AWS Shield',
      category: 'Infrastructure',
      icon: <Shield size={24} className="text-blue-600" />,
      desc: "Managed DDoS protection. Standard is free; Advanced offers cost protection and 24/7 support team access.",
      realWorld: "Absorbing a massive Layer 3/4 UDP reflection attack targeting your Route 53 DNS servers.",
      labTitle: "DDoS Mitigation",
      labInstruction: "Simulate a volumetric traffic spike and watch Shield Standard absorb the load."
    },
    {
      id: 'guardduty',
      name: 'GuardDuty',
      category: 'Detection',
      icon: <Eye size={24} className="text-red-500" />,
      desc: "Intelligent threat detection service that continuously monitors for malicious activity and unauthorized behavior.",
      realWorld: "Detecting an EC2 instance that has been compromised and is communicating with a known cryptocurrency mining IP pool.",
      labTitle: "Threat Hunter",
      labInstruction: "Analyze a stream of VPC Flow Logs to identify compromised instances."
    },
    {
      id: 'inspector',
      name: 'Amazon Inspector',
      category: 'Detection',
      icon: <Search size={24} className="text-red-400" />,
      desc: "Automated vulnerability management service that continually scans AWS workloads for software vulnerabilities (CVEs).",
      realWorld: "Scanning all EC2 instances for the Log4j vulnerability and generating a report for the patching team.",
      labTitle: "Vulnerability Scan",
      labInstruction: "Run an agentless scan on an EC2 instance to find missing security patches."
    },
    {
      id: 'macie',
      name: 'Amazon Macie',
      category: 'Data',
      icon: <Database size={24} className="text-teal-500" />,
      desc: "Data security service that uses machine learning to discover and protect sensitive data (PII) in AWS S3.",
      realWorld: "Scanning petabytes of S3 logs to ensure no developers accidentally uploaded customer PII or API keys.",
      labTitle: "PII Discovery",
      labInstruction: "Scan an S3 bucket to classify data types (e.g., Credit Cards, Names)."
    },
    {
      id: 'hub',
      name: 'Security Hub',
      category: 'Compliance',
      icon: <AlertTriangle size={24} className="text-red-600" />,
      desc: "Cloud security posture management (CSPM) service that performs security best practice checks and aggregates alerts.",
      realWorld: "Giving the CISO a single score (e.g., 78%) representing compliance with the CIS AWS Foundations Benchmark.",
      labTitle: "Compliance Check",
      labInstruction: "Aggregate findings and calculate the current security score."
    },
    {
      id: 'netfw',
      name: 'Network Firewall',
      category: 'Infrastructure',
      icon: <Network size={24} className="text-indigo-500" />,
      desc: "Managed stateful network firewall and intrusion detection/prevention service (IDS/IPS) for your VPC.",
      realWorld: "Filtering outbound traffic to prevent servers from downloading malware from non-approved domains (FQDN filtering).",
      labTitle: "Packet Inspection",
      labInstruction: "Inspect outbound packets and drop connections to 'malware.com'."
    },
    {
      id: 'artifact',
      name: 'AWS Artifact',
      category: 'Compliance',
      icon: <FileText size={24} className="text-slate-400" />,
      desc: "Central resource for compliance-related information. Provides access to AWS's security and compliance reports.",
      realWorld: "Downloading the AWS SOC 2 Type II report to provide to an auditor during your company's compliance audit.",
      labTitle: "Audit Artifacts",
      labInstruction: "Retrieve the official AWS ISO 27001 certification document."
    }
  ];

  const filteredServices = services.filter(s => {
     const matchesFilter = s.name.toLowerCase().includes(filter.toLowerCase()) || s.desc.toLowerCase().includes(filter.toLowerCase());
     const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
     return matchesFilter && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
          <Library size={12} /> Service Catalog
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Security Service Arsenal</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          AWS provides over 30 security-specific services. This interactive catalog breaks down the essential ones used in enterprise environments.
          Select a service to enter the <strong>Micro-Lab</strong>.
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-700 sticky top-0 z-20 backdrop-blur-md bg-opacity-90 shadow-lg">
         
         {/* Categories */}
         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
            {['All', 'Identity', 'Infrastructure', 'Detection', 'Data', 'Compliance'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>

         {/* Search */}
         <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
            />
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
         <AnimatePresence>
            {filteredServices.map((service) => (
               <motion.div
                 key={service.id}
                 layout
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 onClick={() => setSelectedService(service)}
                 className="bg-slate-900 border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all group flex flex-col h-full shadow-lg"
               >
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 group-hover:scale-110 transition-transform shadow-inner">
                        {service.icon}
                     </div>
                     <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${
                        service.category === 'Identity' ? 'bg-blue-900/20 text-blue-300 border-blue-800' :
                        service.category === 'Detection' ? 'bg-red-900/20 text-red-300 border-red-800' :
                        service.category === 'Infrastructure' ? 'bg-indigo-900/20 text-indigo-300 border-indigo-800' :
                        service.category === 'Data' ? 'bg-orange-900/20 text-orange-300 border-orange-800' :
                        'bg-slate-800 text-slate-400 border-slate-600'
                     }`}>
                        {service.category}
                     </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">{service.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-1">{service.desc}</p>
                  
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mt-auto group-hover:translate-x-1 transition-transform border-t border-slate-800 pt-3">
                     LAUNCH LAB <ChevronRight size={14} />
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* Lab Modal */}
      <AnimatePresence>
         {selectedService && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               onClick={() => setSelectedService(null)}
            >
               <motion.div 
                  initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                  className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl h-[80vh] shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
               >
                  <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 z-10">
                     <X size={24} />
                  </button>

                  {/* Left: Concept & Details */}
                  <div className="w-full md:w-1/2 p-8 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-700 bg-slate-900">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                           {React.cloneElement(selectedService.icon as React.ReactElement<any>, { size: 40 })}
                        </div>
                        <div>
                           <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{selectedService.category}</div>
                           <h2 className="text-3xl font-bold text-white">{selectedService.name}</h2>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <div>
                           <h4 className="text-lg font-bold text-white mb-2">Concept</h4>
                           <p className="text-slate-300 leading-relaxed">{selectedService.desc}</p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                           <h4 className="text-xs font-bold text-blue-400 mb-2 uppercase flex items-center gap-2">
                              <Globe size={14}/> Real World Scenario
                           </h4>
                           <p className="text-slate-300 italic text-sm">"{selectedService.realWorld}"</p>
                        </div>

                         <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                           <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Lab Mission</h4>
                           <p className="text-sm text-slate-300">{selectedService.labInstruction}</p>
                         </div>
                     </div>
                  </div>

                  {/* Right: Interactive Lab */}
                  <div className="w-full md:w-1/2 bg-slate-950 flex flex-col">
                      <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center gap-2">
                         <Terminal size={16} className="text-green-500" />
                         <span className="text-xs font-bold text-slate-300 uppercase">Interactive Terminal: {selectedService.labTitle}</span>
                      </div>
                      <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden">
                          <LabController serviceId={selectedService.id} />
                      </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

// --- Lab Logic Controller ---

const LabController: React.FC<{ serviceId: string }> = ({ serviceId }) => {
  switch (serviceId) {
    case 'iam': return <IamLab />;
    case 'kms': return <KmsLab />;
    case 'waf': return <WafLab />;
    case 'secrets': return <SecretsLab />;
    case 'guardduty': return <GuardDutyLab />;
    case 'inspector': return <InspectorLab />;
    case 'macie': return <MacieLab />;
    case 'shield': return <ShieldLab />;
    case 'cognito': return <CognitoLab />;
    case 'hub': return <SecurityHubLab />;
    case 'netfw': return <NetworkFirewallLab />;
    case 'artifact': return <ArtifactLab />;
    default: return <div className="text-slate-500">Lab Under Construction</div>;
  }
};

// --- Individual Lab Components (Self-Contained State) ---

const IamLab = () => {
  const [allowed, setAllowed] = useState(false);
  
  return (
    <div className="w-full max-w-sm">
       <div className="mb-6 space-y-2">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
             <span>Principal: <strong>User/Alice</strong></span>
             <span>Action: <strong>s3:DeleteBucket</strong></span>
          </div>
          <div className="bg-slate-900 p-4 rounded border border-slate-700 font-mono text-xs text-slate-300">
             {`{
  "Effect": "${allowed ? "Allow" : "Deny"}",
  "Action": "s3:*",
  "Resource": "arn:aws:s3:::production-data"
}`}
          </div>
       </div>
       
       <div className="flex gap-4">
          <button onClick={() => setAllowed(!allowed)} className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white py-2 rounded text-xs transition-colors">
             Toggle Policy
          </button>
          <div className={`flex-1 flex items-center justify-center gap-2 rounded border text-xs font-bold ${allowed ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-red-900/30 border-red-500 text-red-400'}`}>
             {allowed ? <CheckCircle2 size={14} /> : <X size={14} />}
             {allowed ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
          </div>
       </div>
    </div>
  );
};

const KmsLab = () => {
  const [text, setText] = useState('Secret123');
  const [isEncrypted, setIsEncrypted] = useState(false);

  const toggle = () => {
    if (isEncrypted) {
      setText('Secret123');
      setIsEncrypted(false);
    } else {
      setText('AQICAHi... (Ciphertext)');
      setIsEncrypted(true);
    }
  };

  return (
    <div className="w-full max-w-sm text-center">
       <div className="mb-2 text-xs text-slate-500">Data State</div>
       <div className={`text-xl font-mono mb-6 p-4 rounded border transition-all ${isEncrypted ? 'bg-orange-900/20 border-orange-500 text-orange-400' : 'bg-slate-900 border-slate-700 text-slate-200'}`}>
          {text}
       </div>
       <button onClick={toggle} className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 mx-auto transition-colors">
          <Key size={16} /> {isEncrypted ? 'Decrypt Data' : 'Encrypt Data'}
       </button>
    </div>
  );
};

const WafLab = () => {
  const [ruleActive, setRuleActive] = useState(false);
  const [status, setStatus] = useState<null | 'blocked' | 'allowed'>(null);

  const sendRequest = () => {
    setStatus(null);
    setTimeout(() => {
      setStatus(ruleActive ? 'blocked' : 'allowed');
    }, 600);
  };

  return (
    <div className="w-full max-w-sm space-y-6">
       <div className="flex items-center justify-between bg-slate-900 p-3 rounded border border-slate-700">
          <div className="text-xs text-slate-400">Rule: <strong>Block IP 192.168.1.50</strong></div>
          <button 
            onClick={() => setRuleActive(!ruleActive)}
            className={`w-12 h-6 rounded-full relative transition-colors ${ruleActive ? 'bg-purple-500' : 'bg-slate-700'}`}
          >
             <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${ruleActive ? 'left-7' : 'left-1'}`} />
          </button>
       </div>

       <div className="flex justify-center">
          <button onClick={sendRequest} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-bold">
             Simulate Request from 192.168.1.50
          </button>
       </div>

       {status && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded border text-center font-bold text-sm ${status === 'blocked' ? 'bg-red-900/20 border-red-500 text-red-400' : 'bg-green-900/20 border-green-500 text-green-400'}`}>
             {status === 'blocked' ? '403 FORBIDDEN (Blocked by WAF)' : '200 OK (Allowed)'}
          </motion.div>
       )}
    </div>
  );
};

const SecretsLab = () => {
  const [version, setVersion] = useState(1);
  const [password, setPassword] = useState('Pass_v1_abc');
  const [rotating, setRotating] = useState(false);

  const rotate = () => {
    setRotating(true);
    setTimeout(() => {
      setVersion(v => v + 1);
      setPassword(`Pass_v${version + 1}_${Math.random().toString(36).substring(7)}`);
      setRotating(false);
    }, 1500);
  };

  return (
     <div className="w-full max-w-sm space-y-6 text-center">
        <div className="bg-slate-900 p-4 rounded border border-slate-700">
           <div className="text-xs text-slate-500 mb-2">Current Secret (Version {version})</div>
           <div className="font-mono text-green-400 text-lg">{password}</div>
        </div>
        <button 
           onClick={rotate} 
           disabled={rotating}
           className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-bold flex items-center justify-center gap-2 w-full"
        >
           <RefreshCw size={16} className={rotating ? 'animate-spin' : ''} />
           {rotating ? 'Rotating Secret...' : 'Rotate Secret Now'}
        </button>
     </div>
  );
};

const GuardDutyLab = () => {
  const [scanning, setScanning] = useState(false);
  const [findings, setFindings] = useState<string[]>([]);

  const analyze = () => {
     setScanning(true);
     setFindings([]);
     setTimeout(() => {
        setScanning(false);
        setFindings(['CryptoCurrency:EC2/BitcoinTool.B', 'UnauthorizedAccess:EC2/SSHBruteForce']);
     }, 2000);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
       <button 
         onClick={analyze}
         disabled={scanning}
         className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
       >
          <Eye size={18} /> {scanning ? 'Analyzing VPC Logs...' : 'Analyze Flow Logs'}
       </button>
       
       <div className="h-40 bg-black rounded border border-slate-800 p-3 font-mono text-xs overflow-y-auto">
          {scanning && <div className="text-slate-500 italic">Ingesting logs from eni-0a1b2c3d...</div>}
          {!scanning && findings.length === 0 && <div className="text-slate-600">No active findings. System clean.</div>}
          {findings.map((f, i) => (
             <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.2 }} className="text-red-400 mb-2">
                [ALERT] {f}
             </motion.div>
          ))}
       </div>
    </div>
  );
};

const InspectorLab = () => {
    const [status, setStatus] = useState('Idle');
    
    const runScan = () => {
        setStatus('Scanning');
        setTimeout(() => setStatus('Found'), 2000);
    };

    return (
        <div className="w-full max-w-sm text-center">
            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mx-auto mb-6 transition-colors ${
                status === 'Scanning' ? 'border-yellow-500 text-yellow-500' :
                status === 'Found' ? 'border-red-500 text-red-500' : 'border-slate-700 text-slate-500'
            }`}>
                {status === 'Scanning' ? <RefreshCw size={40} className="animate-spin"/> : 
                 status === 'Found' ? <AlertTriangle size={40} /> : <Search size={40} />}
            </div>
            
            {status === 'Found' && (
                <div className="mb-6 p-2 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-xs font-bold">
                    CVE-2021-44228 (Log4j) Detected
                </div>
            )}

            <button onClick={runScan} disabled={status === 'Scanning'} className="bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm font-bold">
                {status === 'Scanning' ? 'Scanning Instance...' : 'Run Vulnerability Scan'}
            </button>
        </div>
    );
};

const MacieLab = () => {
    const [progress, setProgress] = useState(0);

    const scan = () => {
        if (progress > 0) return;
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return p + 5;
            });
        }, 100);
    };

    return (
        <div className="w-full max-w-sm space-y-6">
             <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Target: <strong>s3://corporate-data</strong></span>
                <span>{progress}%</span>
             </div>
             <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                <div className="bg-teal-500 h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
             </div>
             
             {progress === 100 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                        <div className="text-lg font-bold text-white">14</div>
                        <div className="text-[10px] text-slate-500">Credit Cards</div>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                        <div className="text-lg font-bold text-white">42</div>
                        <div className="text-[10px] text-slate-500">SSNs</div>
                    </div>
                </motion.div>
             )}

             <button onClick={scan} disabled={progress > 0} className="w-full bg-teal-600 hover:bg-teal-500 text-white py-2 rounded text-sm font-bold">
                {progress === 100 ? 'Scan Complete' : progress > 0 ? 'Scanning...' : 'Start PII Discovery Job'}
             </button>
        </div>
    );
};

const ShieldLab = () => {
    const [attack, setAttack] = useState(false);

    return (
        <div className="w-full max-w-sm text-center">
             <div className={`p-6 rounded-xl border-2 mb-6 transition-all ${attack ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_20px_#3b82f6]' : 'bg-slate-900 border-slate-700'}`}>
                <Shield size={48} className={`mx-auto mb-2 ${attack ? 'text-blue-400 animate-pulse' : 'text-slate-600'}`} />
                <div className={`text-lg font-bold ${attack ? 'text-blue-400' : 'text-slate-500'}`}>
                    {attack ? 'MITIGATING ATTACK' : 'Status: Standing By'}
                </div>
                {attack && <div className="text-xs text-blue-300 mt-1">Absorbing 45 Gbps UDP Flood</div>}
             </div>
             
             <button onClick={() => setAttack(!attack)} className={`px-6 py-2 rounded font-bold text-sm transition-colors ${attack ? 'bg-slate-700 text-white' : 'bg-red-600 text-white hover:bg-red-500'}`}>
                {attack ? 'Stop Simulation' : 'Launch DDoS Simulation'}
             </button>
        </div>
    );
};

const CognitoLab = () => {
    const [step, setStep] = useState(0);

    const login = () => {
        setStep(1);
        setTimeout(() => setStep(2), 1500);
    };

    return (
        <div className="w-full max-w-sm">
             <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute top-1/2 w-full h-1 bg-slate-800 -z-0"></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${step >= 0 ? 'bg-blue-500 text-white' : 'bg-slate-800'}`}>1</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-800'}`}>2</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${step >= 2 ? 'bg-green-500 text-white' : 'bg-slate-800'}`}>3</div>
             </div>
             
             <div className="text-center h-20">
                 {step === 0 && <div className="text-sm text-slate-300">User enters Credentials</div>}
                 {step === 1 && <div className="text-sm text-blue-400 font-bold">Cognito Issues JWT Token</div>}
                 {step === 2 && <div className="text-sm text-green-400 font-bold">Exchanged for AWS STS Credentials</div>}
             </div>

             <button onClick={login} disabled={step > 0} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2 rounded text-sm font-bold">
                 {step === 0 ? 'Login User' : 'Authenticating...'}
             </button>
        </div>
    );
};

const SecurityHubLab = () => {
    const [score, setScore] = useState(0);

    const check = () => {
        let s = 0;
        const interval = setInterval(() => {
            s += 2;
            setScore(s);
            if(s >= 78) clearInterval(interval);
        }, 50);
    };

    return (
        <div className="w-full max-w-sm text-center">
             <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="10" fill="none" />
                      <circle cx="80" cy="80" r="70" stroke={score > 70 ? "#22c55e" : "#eab308"} strokeWidth="10" fill="none" strokeDasharray="440" strokeDashoffset={440 - (440 * score) / 100} className="transition-all duration-300" />
                  </svg>
                  <div className="absolute text-3xl font-bold text-white">{score}%</div>
             </div>
             <div className="text-xs text-slate-400 mb-6">CIS AWS Foundations Benchmark</div>
             <button onClick={check} disabled={score > 0} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded text-sm font-bold">
                 Run Compliance Assessment
             </button>
        </div>
    );
};

const NetworkFirewallLab = () => {
    const [packet, setPacket] = useState<'idle' | 'allowed' | 'dropped'>('idle');

    const send = (malicious: boolean) => {
        setPacket('idle');
        setTimeout(() => setPacket(malicious ? 'dropped' : 'allowed'), 500);
    };

    return (
        <div className="w-full max-w-sm space-y-4">
             <div className="p-4 bg-slate-900 border border-slate-700 rounded h-24 flex items-center justify-center">
                 {packet === 'idle' && <span className="text-slate-500 text-sm">Waiting for traffic...</span>}
                 {packet === 'allowed' && <span className="text-green-400 font-bold flex items-center gap-2"><CheckCircle2/> ALLOWED: google.com</span>}
                 {packet === 'dropped' && <span className="text-red-400 font-bold flex items-center gap-2"><X/> DROPPED: malware.site</span>}
             </div>
             
             <div className="flex gap-2">
                 <button onClick={() => send(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs font-bold">Safe Request</button>
                 <button onClick={() => send(true)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-red-300 py-2 rounded text-xs font-bold">Malware Request</button>
             </div>
        </div>
    );
};

const ArtifactLab = () => {
    const [downloading, setDownloading] = useState(false);
    
    return (
        <div className="w-full max-w-sm text-center">
             <div className={`mx-auto mb-6 w-24 h-32 border-2 rounded flex items-center justify-center bg-slate-900 transition-all ${downloading ? 'border-green-500 scale-105' : 'border-slate-700'}`}>
                 <FileText size={40} className={downloading ? 'text-green-500' : 'text-slate-600'} />
             </div>
             {downloading && <div className="text-xs text-green-400 mb-4 font-bold">Download Complete: AWS_SOC2.pdf</div>}
             <button onClick={() => setDownloading(true)} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded text-sm font-bold">
                 Retrieve Audit Report
             </button>
        </div>
    );
};
