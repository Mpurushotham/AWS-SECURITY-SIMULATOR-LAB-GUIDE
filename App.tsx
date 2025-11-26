import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { GeminiTutor } from './components/GeminiTutor';
import { Footer } from './components/Footer';
import { ModuleId } from './types';
import { Home } from './modules/Home';
import { LearningPath } from './modules/LearningPath';
import { AllServices } from './modules/AllServices';
import { Introduction } from './modules/Introduction';
import { Identity } from './modules/Identity';
import { Infrastructure } from './modules/Infrastructure';
import { DataProtection } from './modules/DataProtection';
import { Detection } from './modules/Detection';
import { Automation } from './modules/Automation';
import { Advanced } from './modules/Advanced';
import { EnterpriseArch } from './modules/EnterpriseArch';
import { Roadmap } from './modules/Roadmap';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>(ModuleId.HOME);

  const renderModule = () => {
    switch (activeModule) {
      case ModuleId.HOME: return <Home onNavigate={setActiveModule} />;
      case ModuleId.LEARNING_PATH: return <LearningPath onNavigate={setActiveModule} />;
      case ModuleId.ALL_SERVICES: return <AllServices />;
      case ModuleId.INTRO: return <Introduction />;
      case ModuleId.IDENTITY: return <Identity />;
      case ModuleId.INFRASTRUCTURE: return <Infrastructure />;
      case ModuleId.DATA_PROTECTION: return <DataProtection />;
      case ModuleId.DETECTION: return <Detection />;
      case ModuleId.AUTOMATION: return <Automation />;
      case ModuleId.ADVANCED: return <Advanced />;
      case ModuleId.ARCHITECTURE: return <EnterpriseArch />;
      case ModuleId.ROADMAP: return <Roadmap />;
      default: return <Home onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30">
      <Sidebar activeModule={activeModule} onSelect={setActiveModule} />
      
      <main className="flex-1 overflow-y-auto relative scroll-smooth bg-[#0B1120]">
        <div className="p-8 md:p-12 min-h-full max-w-[1600px] mx-auto flex flex-col">
          <div className="flex-1">
            {renderModule()}
          </div>
          <Footer />
        </div>
        
        {/* Background gradient effects */}
        <div className="fixed top-0 left-72 right-0 h-32 bg-gradient-to-b from-[#0B1120] to-transparent pointer-events-none z-10" />
      </main>

      <GeminiTutor />
    </div>
  );
};

export default App;