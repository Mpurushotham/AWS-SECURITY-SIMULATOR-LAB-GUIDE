# AWS Security Mastery: Zero to Hero 🛡️☁️

**Architecting, Automating, and Defending Modern Cloud Environments**

![AWS Security](https://img.shields.io/badge/AWS-Security-orange?style=for-the-badge&logo=amazon-aws)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Built with ❤️ and passion to learn and share knowledge globally for AWS Security aspirants.**  
> — *Purushotham Muktha*

---

## 🚀 Overview

**AWS Security Mastery** is an interactive, gamified educational platform designed to take IT professionals from **Zero to Hero** in Cloud Security. Unlike static documentation, this application features **real-time simulations**, **interactive architecture diagrams**, and **gamified learning paths** to teach complex concepts like IAM Policy Evaluation, WAF Tuning, and Threat Detection.

Whether you are a SysAdmin, Developer, or aspiring Cloud Security Architect, this app provides the mental models and hands-on experience needed to secure enterprise-grade AWS environments.

## ✨ Key Features

### 🎓 Interactive Learning Path
A guided, gamified "Metro Map" journey through 9 core modules. Track your XP, unlock new ranks (e.g., *Cloud Guardian*), and master topics sequentially.

### 🛠️ Interactive Simulations (The "Micro-Labs")
Don't just read about it—do it. The app includes fully functional React-based simulations of core AWS services:
*   **IAM Policy Engine**: Visualize how `Deny` > `SCP` > `Boundary` > `Identity` logic works in real-time.
*   **WAF Rule Tuner**: Configure Web ACLs and fire simulated SQL Injection attacks to test your defenses.
*   **GuardDuty Threat Hunter**: Analyze VPC Flow Logs to detect crypto-mining and SSH brute-force attacks.
*   **KMS Envelope Encryption**: Interactively encrypt/decrypt data using the Customer Master Key (CMK) hierarchy.
*   **Network Firewall**: Visualize packet flow through an Inspection VPC.

### 🏢 Enterprise Architecture Visualization
Explore a production-grade **Multi-Account Strategy (Control Tower)**.
*   Clickable "Deep Dive" zones (Edge, Security, Log Archive, Workloads).
*   Simulate user traffic flowing through Transit Gateways and ALB Ingress.
*   Visualize immutable log aggregation with S3 Object Lock.

### 🤖 Automation & DevSecOps
*   **"Golden Pipeline" Visualizer**: See where SAST, SCA, and DAST tools fit into CI/CD.
*   **Auto-Remediation**: Watch an EventBridge-driven workflow automatically detect and fix a public S3 bucket.
*   **Infrastructure as Code**: View real Terraform and Python snippets for every security task.

### 🗺️ 90-Day Execution Roadmap
A comprehensive, week-by-week implementation plan for organizations.
*   **Days 1-30**: Foundation & Visibility (CloudTrail, GuardDuty).
*   **Days 31-60**: Hardening (Encryption, S3 Block Public Access).
*   **Days 61-90**: Maturity (Security Hub, Automation).

---

## 🛠️ Tech Stack

This project was built using modern frontend technologies to ensure high performance and interactivity:

*   **Core**: [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (for complex orchestration and layout transitions)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **AI Integration**: Google Gemini API (for the embedded AI Tutor)

---

## 🎯 Learning Outcomes

By completing the modules in this application, learners will be able to:

1.  **Master the Shared Responsibility Model** and understand the separation of duties in the cloud.
2.  **Write and Debug IAM Policies** with confidence, understanding the exact evaluation logic.
3.  **Architect Secure Networks** using VPCs, Security Groups, NACLs, and AWS Network Firewall.
4.  **Implement Data Protection** using KMS Envelope Encryption and Secrets Manager rotation.
5.  **Build Detective Pipelines** using CloudTrail, GuardDuty, and Security Hub.
6.  **Automate Security** by integrating checks into CI/CD pipelines and using Lambda for remediation.

---

## 💻 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/PurushothamMuktha/aws-security-mastery.git
    cd aws-security-mastery
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 👤 Author

**Purushotham Muktha**

*   **LinkedIn**: [Purushotham Muktha](https://www.linkedin.com/in/purushotham-muktha)
*   **GitHub**: [@PurushothamMuktha](https://github.com/PurushothamMuktha)

*Built with passion to democratize cloud security knowledge.*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

*Disclaimer: This is an educational tool. Not affiliated with Amazon Web Services (AWS).*
