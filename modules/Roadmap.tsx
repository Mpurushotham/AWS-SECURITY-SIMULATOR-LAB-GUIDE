import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckSquare, Flag, ArrowRight, ShieldCheck, Lock, Eye, Zap, Award, ChevronDown, ChevronUp, CheckCircle2, Terminal, Code2, MousePointer2, Copy, X } from 'lucide-react';

// --- Types for the Rich Roadmap Data ---
interface ImplementationStep {
  type: 'console' | 'terraform' | 'cli';
  content: string; // For code or markdown description
  steps?: string[]; // For console walkthroughs
}

interface Task {
  title: string;
  description: string;
  implementation: {
    console?: { steps: string[] };
    terraform?: { code: string };
    cli?: { command: string };
  };
}

interface Week {
  title: string;
  tasks: Task[];
}

interface Phase {
  id: number;
  days: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  achievement: string;
  weeks: Week[];
}

export const Roadmap: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'console' | 'terraform' | 'cli'>('console');

  // --- Rich Data: The A-Z Execution Plan ---
  const phases: Phase[] = [
    {
      id: 0,
      days: "Days 1 - 30",
      title: "Foundation & Visibility",
      description: "Establish the bedrock of security. If you can't see it, you can't secure it. Focus on Identity and Logging.",
      icon: <Eye size={24} />,
      color: "blue",
      achievement: "Visibility Vigilante",
      weeks: [
        {
          title: "Week 1: Identity Zero Trust",
          tasks: [
            {
              title: "Secure Root Account",
              description: "The Root user has unlimited access. Secure it immediately.",
              implementation: {
                console: {
                  steps: [
                    "Sign in to the AWS Console as Root.",
                    "Go to IAM Dashboard > Security Recommendations.",
                    "Activate MFA on your Root account (Use a hardware key or Authenticator App).",
                    "Delete any existing Root Access Keys (Never use these!).",
                    "Create an IAM User/Role for daily administrative tasks and Sign Out of Root."
                  ]
                },
                cli: {
                  command: "# Check if Root has Access Keys (Should be empty)\naws iam get-account-summary --query 'SummaryMap.AccountAccessKeysPresent'"
                }
              }
            },
            {
              title: "Enforce Strong Password Policy",
              description: "Set strict rules for IAM user passwords.",
              implementation: {
                console: {
                  steps: [
                    "Go to IAM > Account Settings.",
                    "Click 'Change' next to Password Policy.",
                    "Select 'Custom'.",
                    "Min length: 14 characters.",
                    "Require at least one uppercase, lowercase, number, and symbol.",
                    "Enable 'Prevent password reuse' (last 24)."
                  ]
                },
                terraform: {
                  code: `resource "aws_iam_account_password_policy" "strict" {
  minimum_password_length        = 14
  require_lowercase_characters   = true
  require_numbers                = true
  require_uppercase_characters   = true
  require_symbols                = true
  allow_users_to_change_password = true
  password_reuse_prevention      = 24
}`
                }
              }
            }
          ]
        },
        {
          title: "Week 2: The Logging Fabric",
          tasks: [
            {
              title: "Enable CloudTrail (Organization)",
              description: "Log every API call made in your account.",
              implementation: {
                console: {
                  steps: [
                    "Go to CloudTrail console.",
                    "Click 'Create trail'.",
                    "Name: 'organization-audit-trail'.",
                    "Select 'Create new S3 bucket' (Enable Log File Validation).",
                    "Check 'Enable for all accounts in my organization' (if using Orgs).",
                    "Enable KMS encryption."
                  ]
                },
                terraform: {
                  code: `resource "aws_cloudtrail" "main" {
  name                          = "audit-trail"
  s3_bucket_name                = aws_s3_bucket.logs.id
  include_global_service_events = true
  is_multi_region_trail         = true
  enable_log_file_validation    = true
  kms_key_id                    = aws_kms_key.cloudtrail.arn
}`
                },
                cli: {
                  command: "aws cloudtrail create-trail --name audit-trail --s3-bucket-name my-audit-logs --is-multi-region-trail --include-global-service-events"
                }
              }
            },
            {
              title: "Enable GuardDuty",
              description: "Turn on intelligent threat detection.",
              implementation: {
                console: {
                  steps: [
                    "Go to GuardDuty console.",
                    "Click 'Get Started'.",
                    "Click 'Enable GuardDuty'.",
                    "Go to Settings > S3 Protection > Enable.",
                    "(Optional) Add a suppression rule for known safe IP testing."
                  ]
                },
                terraform: {
                  code: `resource "aws_guardduty_detector" "main" {
  enable = true
  finding_publishing_frequency = "FIFTEEN_MINUTES"
  datasources {
    s3_logs {
      enable = true
    }
  }
}`
                }
              }
            }
          ]
        },
        {
          title: "Week 3: Billing & Cost Hygiene",
          tasks: [
            {
              title: "Configure AWS Budgets",
              description: "Get alerted before you overspend (often an indicator of compromise).",
              implementation: {
                console: {
                  steps: [
                    "Go to Billing Dashboard > Budgets.",
                    "Create Budget > Cost budget.",
                    "Set amount (e.g., $100).",
                    "Configure Alerts: Send email to security@company.com when actual costs > 80%."
                  ]
                },
                terraform: {
                  code: `resource "aws_budgets_budget" "monthly" {
  name              = "monthly-budget"
  budget_type       = "COST"
  limit_amount      = "100"
  limit_unit        = "USD"
  time_unit         = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["admin@example.com"]
  }
}`
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: 1,
      days: "Days 31 - 60",
      title: "Hardening & Architecture",
      description: "Reduce the blast radius. Implement encryption everywhere and move towards immutable infrastructure.",
      icon: <Lock size={24} />,
      color: "orange",
      achievement: "Fortress Architect",
      weeks: [
        {
          title: "Week 5: Data Fortress",
          tasks: [
            {
              title: "S3 Block Public Access (Account Level)",
              description: "Prevent accidental data leaks globally.",
              implementation: {
                console: {
                  steps: [
                    "Go to S3 Console.",
                    "Click 'Block Public Access settings for this account' on sidebar.",
                    "Click Edit.",
                    "Check 'Block all public access'.",
                    "Save changes and Confirm."
                  ]
                },
                terraform: {
                  code: `resource "aws_s3_account_public_access_block" "main" {
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`
                }
              }
            },
            {
              title: "Enforce EBS Encryption",
              description: "Ensure all new volumes are encrypted by default.",
              implementation: {
                console: {
                  steps: [
                    "Go to EC2 Console.",
                    "Settings (in the sidebar).",
                    "EBS Encryption.",
                    "Check 'Always encrypt new EBS volumes'.",
                    "Select Default Key (aws/ebs) or Custom CMK."
                  ]
                },
                cli: {
                  command: "aws ec2 enable-ebs-encryption-by-default"
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: 2,
      days: "Days 61 - 90",
      title: "Maturity & Automation",
      description: "Scale security with the business. Shift left into the pipeline and automate incident response.",
      icon: <Zap size={24} />,
      color: "green",
      achievement: "Automation Alchemist",
      weeks: [
        {
          title: "Week 9: Governance",
          tasks: [
            {
              title: "Enable Security Hub",
              description: "Centralize findings and check compliance standards.",
              implementation: {
                console: {
                  steps: [
                    "Go to Security Hub.",
                    "Enable Security Hub.",
                    "Enable Standards: 'AWS Foundational Security Best Practices' and 'CIS AWS Foundations'.",
                    "Wait 24 hours for initial score."
                  ]
                },
                terraform: {
                  code: `resource "aws_securityhub_account" "main" {}

resource "aws_securityhub_standards_subscription" "cis" {
  depends_on    = [aws_securityhub_account.main]
  standards_arn = "arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0"
}`
                }
              }
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20 relative">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20">
          Part 5: Execution Strategy
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">The 90-Day Implementation Lab</h2>
        <p className="text-slate-400 text-lg max-w-3xl">
          Don't just read about security—deploy it. Click any task below to reveal the 
          <strong> A-Z Implementation Guide</strong>, including Terraform code, CLI commands, and Console walkthroughs.
        </p>
      </header>

      <div className="space-y-6">
        {phases.map((phase) => (
          <motion.div 
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: phase.id * 0.1 }}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              expandedPhase === phase.id 
                ? `bg-slate-900 border-${phase.color}-500/50 shadow-2xl` 
                : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900'
            }`}
          >
            {/* Phase Header */}
            <button 
              onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left"
            >
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                  expandedPhase === phase.id 
                    ? `bg-${phase.color}-900/20 border-${phase.color}-500 text-${phase.color}-400` 
                    : `bg-slate-800 border-slate-700 text-slate-500`
                }`}>
                  {React.cloneElement(phase.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                    expandedPhase === phase.id ? `text-${phase.color}-400` : 'text-slate-500'
                  }`}>
                    {phase.days}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                  <p className="text-slate-400 text-sm hidden md:block max-w-2xl">{phase.description}</p>
                </div>
              </div>
              <div className={`text-slate-500 transition-transform duration-300 ${expandedPhase === phase.id ? 'rotate-180' : ''}`}>
                {expandedPhase === phase.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedPhase === phase.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 md:p-8 pt-0 border-t border-slate-800">
                    <div className="grid grid-cols-1 gap-4 mt-6">
                      {phase.weeks.map((week, idx) => (
                        <div key={idx} className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                          <h4 className={`font-bold text-white mb-4 text-sm flex items-center gap-2`}>
                            <span className={`w-2 h-2 rounded-full bg-${phase.color}-500`}></span>
                            {week.title}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {week.tasks.map((task, tIdx) => (
                              <button 
                                key={tIdx} 
                                onClick={() => setSelectedTask(task)}
                                className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 transition-all text-left group"
                              >
                                <CheckSquare size={16} className={`shrink-0 mt-0.5 text-${phase.color}-500/50 group-hover:text-${phase.color}-500`} />
                                <div>
                                    <span className="text-sm text-slate-300 font-medium group-hover:text-white">{task.title}</span>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{task.description}</p>
                                </div>
                                <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity mt-1" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Task Implementation Drawer / Modal */}
      <AnimatePresence>
        {selectedTask && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end"
                onClick={() => setSelectedTask(null)}
            >
                <motion.div 
                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-full max-w-2xl bg-slate-900 border-l border-slate-700 h-full shadow-2xl overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Drawer Header */}
                    <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10 flex justify-between items-start">
                        <div>
                            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Implementation Guide</div>
                            <h2 className="text-2xl font-bold text-white">{selectedTask.title}</h2>
                            <p className="text-slate-400 mt-2">{selectedTask.description}</p>
                        </div>
                        <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="p-6 space-y-8">
                        {/* Tabs */}
                        <div className="flex bg-slate-800 p-1 rounded-lg">
                            <TabButton active={activeTab === 'console'} onClick={() => setActiveTab('console')} icon={<MousePointer2 size={16} />} label="Console" />
                            <TabButton active={activeTab === 'terraform'} onClick={() => setActiveTab('terraform')} icon={<Code2 size={16} />} label="Terraform" />
                            <TabButton active={activeTab === 'cli'} onClick={() => setActiveTab('cli')} icon={<Terminal size={16} />} label="AWS CLI" />
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[300px]">
                            {activeTab === 'console' && selectedTask.implementation.console && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                    <h4 className="font-bold text-white flex items-center gap-2">
                                        <MousePointer2 className="text-blue-500" size={20} /> Management Console Steps
                                    </h4>
                                    <div className="space-y-0">
                                        {selectedTask.implementation.console.steps.map((step, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-400">
                                                        {idx + 1}
                                                    </div>
                                                    {idx !== selectedTask.implementation.console!.steps.length - 1 && <div className="w-0.5 h-full bg-slate-800" />}
                                                </div>
                                                <p className="text-slate-300 text-sm pt-0.5">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'terraform' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-white flex items-center gap-2">
                                            <Code2 className="text-purple-500" size={20} /> Terraform Configuration
                                        </h4>
                                        <button 
                                          className="text-xs flex items-center gap-1 text-slate-400 hover:text-white"
                                          onClick={() => navigator.clipboard.writeText(selectedTask.implementation.terraform?.code || "")}
                                        >
                                            <Copy size={12} /> Copy
                                        </button>
                                    </div>
                                    {selectedTask.implementation.terraform ? (
                                        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-purple-200 overflow-x-auto custom-scrollbar leading-relaxed">
                                            {selectedTask.implementation.terraform.code}
                                        </pre>
                                    ) : (
                                        <EmptyState label="Terraform" />
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'cli' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-white flex items-center gap-2">
                                            <Terminal className="text-green-500" size={20} /> AWS CLI Command
                                        </h4>
                                        <button 
                                           className="text-xs flex items-center gap-1 text-slate-400 hover:text-white"
                                           onClick={() => navigator.clipboard.writeText(selectedTask.implementation.cli?.command || "")}
                                        >
                                            <Copy size={12} /> Copy
                                        </button>
                                    </div>
                                    {selectedTask.implementation.cli ? (
                                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                                            <div className="text-slate-500 select-none mb-2"># Run this in CloudShell or local terminal</div>
                                            <code className="text-green-400 block break-all whitespace-pre-wrap">
                                                {selectedTask.implementation.cli.command}
                                            </code>
                                        </div>
                                    ) : (
                                        <EmptyState label="CLI" />
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
            active ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
        }`}
    >
        {icon} {label}
    </button>
);

const EmptyState = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-700 rounded-xl bg-slate-900/50">
        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3">
            <Code2 size={24} className="text-slate-600" />
        </div>
        <p className="text-slate-500 text-sm">No {label} snippet available for this task.</p>
        <p className="text-slate-600 text-xs mt-1">Please use the Console Walkthrough.</p>
    </div>
);
