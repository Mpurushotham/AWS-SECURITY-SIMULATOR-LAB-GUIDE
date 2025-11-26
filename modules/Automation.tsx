import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Bell, ArrowRight, CheckCircle2, Shield, Code2, Terminal, GitBranch, Box, Server, Layers, FileCode, Search, AlertTriangle, Play, RefreshCw, Lock } from 'lucide-react';

type Tab = 'remediation' | 'cicd' | 'ami';

export const Automation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('cicd');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
          Part 3: DevSecOps & Automation
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Automate or Die</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          Security cannot scale with humans alone. We must integrate security into the CI/CD pipeline ("Shift Left") and automate incident response ("Shift Right").
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-700">
        <TabButton id="cicd" label="The Golden Pipeline (CI/CD)" icon={<GitBranch size={16}/>} active={activeTab} onClick={setActiveTab} />
        <TabButton id="ami" label="AMI Factory (Immutable)" icon={<Server size={16}/>} active={activeTab} onClick={setActiveTab} />
        <TabButton id="remediation" label="Auto-Remediation (Event Driven)" icon={<Zap size={16}/>} active={activeTab} onClick={setActiveTab} />
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'cicd' && <CicdPipeline key="cicd" />}
          {activeTab === 'ami' && <AmiFactory key="ami" />}
          {activeTab === 'remediation' && <RemediationConsole key="remediation" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const CicdPipeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const stages = [
    { 
      id: 'source', 
      label: 'Source', 
      icon: Code2, 
      tools: ['git-secrets', 'pre-commit'],
      desc: 'Prevent secrets from ever entering git history.',
      config: `# .pre-commit-config.yaml
repos:
  - repo: https://github.com/awslabs/git-secrets
    rev: master
    hooks:
      - id: git-secrets
        entry: git-secrets --scan`
    },
    { 
      id: 'build', 
      label: 'Build & SAST', 
      icon: Box, 
      tools: ['SonarQube', 'Snyk'],
      desc: 'Static Analysis (SAST) and Dependency Scanning (SCA).',
      config: `# buildspec.yml (CodeBuild)
phases:
  build:
    commands:
      - mvn clean install
      - mvn sonar:sonar -Dsonar.login=$SONAR_TOKEN
      - snyk test --severity-threshold=high` 
    },
    { 
      id: 'iac', 
      label: 'IaC Scan', 
      icon: FileCode, 
      tools: ['Checkov', 'tfsec', 'cfn_nag'],
      desc: 'Scan Terraform/CloudFormation for misconfigurations.',
      config: `# GitHub Actions Workflow
- name: Run Checkov
  uses: bridgecrewio/checkov-action@master
  with:
    directory: terraform/
    framework: terraform
    # Fail build if HIGH severity issues found
    soft_fail: false ` 
    },
    { 
      id: 'container', 
      label: 'Container Scan', 
      icon: Layers, 
      tools: ['Trivy', 'ECR Inspector'],
      desc: 'Scan Docker images for OS vulnerabilities.',
      config: `# buildspec.yml
post_build:
  commands:
    - docker build -t my-app .
    # Scan image before pushing
    - trivy image --exit-code 1 --severity CRITICAL my-app
    - docker push $ECR_URI` 
    },
    { 
      id: 'deploy', 
      label: 'Deploy & DAST', 
      icon: RefreshCw, 
      tools: ['OWASP ZAP', 'CloudFormation'],
      desc: 'Dynamic Analysis (DAST) against staging environment.',
      config: `# DAST Stage
- name: OWASP ZAP Baseline Scan
  uses: zaproxy/action-baseline@v0.7.0
  with:
    target: 'https://staging.myapp.com'
    fail_action: true` 
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <GitBranch className="text-green-500" />
          DevSecOps "Golden Pipeline"
        </h3>

        {/* Pipeline Visualization */}
        <div className="relative flex items-center justify-between gap-4 py-8 overflow-x-auto">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-800 -z-0" />
          
          {stages.map((stage, idx) => (
            <div key={stage.id} className="relative z-10 flex flex-col items-center">
              <button 
                onClick={() => setSelectedStage(stage.id)}
                className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                  selectedStage === stage.id 
                    ? 'bg-green-900/40 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-110' 
                    : 'bg-slate-800 border-slate-600 hover:border-slate-400'
                }`}
              >
                <stage.icon size={24} className={selectedStage === stage.id ? 'text-green-400' : 'text-slate-400'} />
              </button>
              <span className="mt-4 text-xs font-bold text-slate-300 uppercase tracking-wider">{stage.label}</span>
              <div className="flex gap-1 mt-2">
                 {stage.tools.map(t => (
                   <span key={t} className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-500">{t}</span>
                 ))}
              </div>
            </div>
          ))}
        </div>

        {/* Config Viewer */}
        <AnimatePresence mode="wait">
          {selectedStage && (
            <motion.div 
              key={selectedStage}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 bg-black rounded-xl border border-slate-800 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                 <div className="flex items-center gap-2 text-sm text-slate-300">
                   <Code2 size={16} /> 
                   configuration.yaml
                 </div>
                 <span className="text-xs text-slate-500">{stages.find(s => s.id === selectedStage)?.desc}</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-green-400 leading-relaxed">
                  {stages.find(s => s.id === selectedStage)?.config}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
           <h4 className="font-bold text-white mb-2">Why "Shift Left"?</h4>
           <p className="text-sm text-slate-400">
             Fixing a security bug in <strong>Production</strong> costs 100x more than fixing it in <strong>Design/Code</strong> phase. 
             We move security checks to the left of the timeline (earlier).
           </p>
         </div>
         <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
           <h4 className="font-bold text-white mb-2">Policy as Code (PaC)</h4>
           <p className="text-sm text-slate-400">
             Tools like Open Policy Agent (OPA) or Sentinel allow us to define security rules as code (e.g., "S3 buckets must not be public"). The pipeline fails if code violates policy.
           </p>
         </div>
      </div>
    </motion.div>
  );
};

const AmiFactory: React.FC = () => {
  const [baking, setBaking] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Server className="text-orange-500" />
              EC2 Image Builder: The AMI Factory
            </h3>
            <p className="text-slate-400 text-sm mt-1">Don't patch live servers. Bake security into the image (Immutable Infrastructure).</p>
          </div>
          <button 
            onClick={() => { setBaking(true); setTimeout(() => setBaking(false), 4000); }}
            disabled={baking}
            className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Play size={16} /> {baking ? 'Building Pipeline...' : 'Run Pipeline'}
          </button>
        </div>

        <div className="relative flex justify-between items-center gap-4">
          {/* Animated Background Flow */}
          {baking && (
            <motion.div 
               className="absolute top-1/2 left-0 w-8 h-8 bg-orange-500 blur-lg rounded-full z-0"
               animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
               transition={{ duration: 3, ease: 'linear' }}
            />
          )}

          <div className="z-10 bg-slate-800 p-4 rounded-xl border border-slate-700 text-center w-40">
             <div className="text-slate-500 text-xs uppercase font-bold mb-2">Source</div>
             <Server className="mx-auto text-slate-400 mb-2" />
             <div className="text-white font-bold text-sm">Amazon Linux 2</div>
          </div>

          <ArrowRight className="text-slate-600" />

          <div className="z-10 bg-slate-800 p-4 rounded-xl border border-slate-700 text-center w-40">
             <div className="text-slate-500 text-xs uppercase font-bold mb-2">Build Components</div>
             <div className="space-y-1">
               <div className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-1 rounded">Update OS</div>
               <div className="text-[10px] bg-purple-900/30 text-purple-300 px-2 py-1 rounded">Install Splunk</div>
               <div className="text-[10px] bg-red-900/30 text-red-300 px-2 py-1 rounded">CrowdStrike</div>
             </div>
          </div>

          <ArrowRight className="text-slate-600" />

          <div className="z-10 bg-slate-800 p-4 rounded-xl border border-slate-700 text-center w-40">
             <div className="text-slate-500 text-xs uppercase font-bold mb-2">Harden</div>
             <Lock className="mx-auto text-yellow-400 mb-2" />
             <div className="text-white font-bold text-sm">CIS Level 1</div>
             <div className="text-[10px] text-slate-500">STIG Compliance</div>
          </div>

          <ArrowRight className="text-slate-600" />

          <div className="z-10 bg-slate-800 p-4 rounded-xl border border-slate-700 text-center w-40">
             <div className="text-slate-500 text-xs uppercase font-bold mb-2">Validate</div>
             <Search className="mx-auto text-green-400 mb-2" />
             <div className="text-white font-bold text-sm">Inspector Scan</div>
             <div className="text-[10px] text-slate-500">CVE Check</div>
          </div>

          <ArrowRight className="text-slate-600" />

          <div className="z-10 bg-slate-800 p-4 rounded-xl border border-orange-500 text-center w-40 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
             <div className="text-slate-500 text-xs uppercase font-bold mb-2">Output</div>
             <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center mx-auto mb-2 font-bold text-xs">AMI</div>
             <div className="text-white font-bold text-sm">Golden Image</div>
             <div className="text-[10px] text-green-400">v1.0.4</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RemediationConsole: React.FC = () => {
  const [trigger, setTrigger] = useState(false);
  const [status, setStatus] = useState<'idle' | 'detected' | 'remediating' | 'resolved'>('idle');
  const [showCode, setShowCode] = useState(false);

  const runSimulation = () => {
    if (status !== 'idle') return;
    setTrigger(true);
    setStatus('detected');
    setTimeout(() => setStatus('remediating'), 2500);
    setTimeout(() => setStatus('resolved'), 5500);
    setTimeout(() => {
      setStatus('idle');
      setTrigger(false);
    }, 9000);
  };

  const codeSnippets = {
    config: `resource "aws_config_config_rule" "s3_public_read" {
  name = "s3-bucket-public-read-prohibited"
  source {
    owner             = "AWS"
    source_identifier = "S3_BUCKET_PUBLIC_READ_PROHIBITED"
  }
}`,
    lambda: `import boto3

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucket_name = event['detail']['resourceId']
    
    # Remediate: Remove Public Access Block
    s3.put_public_access_block(
        Bucket=bucket_name,
        PublicAccessBlockConfiguration={
            'BlockPublicAcls': True,
            'IgnorePublicAcls': True,
            'BlockPublicPolicy': True,
            'RestrictPublicBuckets': True
        }
    )
    return {"status": "Secure"}`
  };

  return (
     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-700 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
        <div className="flex justify-between items-start mb-10">
          <div>
             <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="text-yellow-500" />
              Scenario: Auto-Fix Public S3 Bucket
            </h3>
            <p className="text-slate-400 text-sm mt-1">Watch the pipeline detect and fix a vulnerability in real-time.</p>
          </div>
          
          <div className="flex gap-3">
             <button 
               onClick={() => setShowCode(!showCode)}
               className="flex items-center gap-2 px-4 py-2 rounded border border-slate-600 hover:bg-slate-800 text-slate-300 transition-colors"
             >
               <Code2 size={16} /> {showCode ? 'Hide Code' : 'Show Code'}
             </button>
             <button
              onClick={runSimulation}
              disabled={status !== 'idle'}
              className={`px-6 py-2 rounded font-bold shadow-lg transition-all ${
                status === 'idle' 
                  ? 'bg-red-600 hover:bg-red-500 text-white hover:scale-105' 
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {status === 'idle' ? 'Simulate Breach' : 'Running...'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Visual Pipeline */}
           <div className="space-y-8">
              {/* Step 1 */}
              <div className={`relative p-4 rounded-xl border-2 transition-all duration-500 ${status === 'detected' ? 'border-yellow-500 bg-yellow-900/10' : 'border-slate-700 bg-slate-800'}`}>
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white flex items-center gap-2">
                       <Shield size={16} className={status === 'detected' ? 'text-yellow-500' : 'text-slate-500'} /> 
                       Detection (AWS Config)
                    </span>
                    {status === 'detected' && <span className="text-xs text-yellow-500 animate-pulse">DETECTED</span>}
                 </div>
                 <p className="text-xs text-slate-400">Rule `s3-public-read-prohibited` evaluates the bucket configuration.</p>
              </div>

              <div className="flex justify-center -my-4 relative z-10"><ArrowRight className="text-slate-600 rotate-90" /></div>

              {/* Step 2 */}
              <div className={`relative p-4 rounded-xl border-2 transition-all duration-500 ${status === 'remediating' ? 'border-blue-500 bg-blue-900/10' : 'border-slate-700 bg-slate-800'}`}>
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white flex items-center gap-2">
                       <Bell size={16} className={status === 'remediating' ? 'text-blue-500' : 'text-slate-500'} /> 
                       Routing (EventBridge)
                    </span>
                    {status === 'remediating' && <span className="text-xs text-blue-500 animate-pulse">TRIGGERED</span>}
                 </div>
                 <p className="text-xs text-slate-400">Matches "Compliance Change" event and targets Lambda function.</p>
              </div>

              <div className="flex justify-center -my-4 relative z-10"><ArrowRight className="text-slate-600 rotate-90" /></div>

              {/* Step 3 */}
              <div className={`relative p-4 rounded-xl border-2 transition-all duration-500 ${status === 'resolved' || status === 'remediating' ? 'border-green-500 bg-green-900/10' : 'border-slate-700 bg-slate-800'}`}>
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white flex items-center gap-2">
                       <Terminal size={16} className={status === 'resolved' ? 'text-green-500' : 'text-slate-500'} /> 
                       Remediation (Lambda)
                    </span>
                    {status === 'resolved' && <span className="text-xs text-green-500">FIXED</span>}
                 </div>
                 <p className="text-xs text-slate-400">Python script forces "Block Public Access" on the bucket.</p>
              </div>
           </div>

           {/* Code / Logs View */}
           <div className="bg-black rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col h-[400px]">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <span className="text-slate-500 ml-2">{showCode ? 'infrastructure.tf & handler.py' : 'remediation.log'}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {showCode ? (
                  <div className="space-y-6">
                    <div>
                      <span className="text-slate-500 block mb-1">// 1. AWS Config Rule (Terraform)</span>
                      <pre className="text-purple-300">{codeSnippets.config}</pre>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">// 2. Remediation Logic (Python)</span>
                      <pre className="text-green-300">{codeSnippets.lambda}</pre>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                     <div className="text-slate-500">$ systemctl start security-watchdog</div>
                     <div className="text-slate-500">Monitoring for compliance events...</div>
                     
                     {status !== 'idle' && (
                       <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x:0}}>
                         <span className="text-red-500">[ALERT]</span> Resource 'doc-share-bucket' is NON_COMPLIANT.
                         <br/><span className="text-slate-600">Details: Public Read ACL found.</span>
                       </motion.div>
                     )}

                     {(status === 'remediating' || status === 'resolved') && (
                       <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x:0}} transition={{delay: 0.5}}>
                         <span className="text-blue-500">[EVENT]</span> EventBridge matched rule. Invoking Lambda...
                       </motion.div>
                     )}

                     {(status === 'remediating' || status === 'resolved') && (
                       <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x:0}} transition={{delay: 1.5}}>
                         <span className="text-yellow-500">[LAMBDA]</span> Applying BlockPublicAccess...
                       </motion.div>
                     )}

                     {status === 'resolved' && (
                       <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x:0}} transition={{delay: 0.5}}>
                         <span className="text-green-500">[SUCCESS]</span> Bucket secured. Incident closed.
                         <br/><span className="text-slate-600">Time to remediate: 2.3 seconds.</span>
                       </motion.div>
                     )}
                  </div>
                )}
              </div>
           </div>
        </div>
      </motion.div>
  );
};

const TabButton: React.FC<{id: Tab, label: string, icon: any, active: Tab, onClick: (id: Tab) => void}> = ({ id, label, icon, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
      active === id 
        ? 'border-green-500 text-green-400 bg-green-500/10' 
        : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </button>
);
