import React, { useState, useMemo } from 'react';
import { 
  Monitor, 
  Brain, 
  Rocket, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  RotateCcw,
  Clock,
  Zap,
  Layout,
  Code2
} from 'lucide-react';

const App = () => {
  const [completedModules, setCompletedModules] = useState([]);
  
  const modules = [
    {
      id: 1,
      title: "Where Does Copilot Live?",
      description: "Explore IDE, web, and CLI integrations. Master the environment where AI assistance thrives.",
      duration: "10 MIN",
      level: "Beginner",
      icon: <Monitor className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      id: 2,
      title: "Understanding AI Context",
      description: "Learn about tokens, context windows, and memory. How Copilot 'thinks' and sees your code.",
      duration: "15 MIN",
      level: "Intermediate",
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      id: 3,
      title: "Mastering Copilot",
      description: "Advanced prompting, best practices, and ethical considerations for elite AI-assisted development.",
      duration: "15 MIN",
      level: "Advanced",
      icon: <Rocket className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    }
  ];

  const progress = useMemo(() => {
    return Math.round((completedModules.length / modules.length) * 100);
  }, [completedModules, modules.length]);

  const toggleModule = (id) => {
    setCompletedModules(prev => 
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  const resetProgress = () => {
    setCompletedModules([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Light Header */}
      <header className="relative pt-16 pb-20 px-6 overflow-hidden border-b border-slate-200 bg-white">
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/5 blur-[100px] rounded-full" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
            <Zap className="w-3 h-3" /> Master the Future
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            GitHub Copilot <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Training</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Interactive curriculum designed to transform you into an AI-augmented engineering powerhouse.
          </p>

          {/* Progress Container */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-end mb-3 px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overall Mastery</span>
              <span className="text-2xl font-mono font-bold text-slate-900">{progress}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-[2px] shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Horizontal Grid */}
      <main className="max-w-7xl mx-auto px-6 -mt-10 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            
            return (
              <div 
                key={module.id}
                onClick={() => toggleModule(module.id)}
                className={`group relative flex flex-col h-full p-8 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${isCompleted 
                    ? 'bg-white border-blue-400 shadow-xl shadow-blue-500/10' 
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-slate-200/50'
                  }`}
              >
                {/* Status Indicator Top Right */}
                <div className="absolute top-6 right-6">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-blue-500 animate-in zoom-in duration-300" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-200 group-hover:text-slate-300 transition-colors" />
                  )}
                </div>

                {/* Icon Wrapper */}
                <div className={`relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border transition-all mb-6
                  ${module.bg} ${module.border} group-hover:scale-110 group-hover:shadow-md`}>
                  {module.icon}
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 tracking-wide uppercase">
                      <Clock className="w-3 h-3" /> {module.duration}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-400 tracking-wide uppercase">
                      {module.level}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-3 transition-colors ${isCompleted ? 'text-blue-600' : 'text-slate-900'}`}>
                    {module.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                    {module.description}
                  </p>
                  
                  <div className="mt-auto">
                    <button 
                      className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold transition-all
                        ${isCompleted 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-200'
                        }`}
                    >
                      {isCompleted ? 'Resume Lesson' : 'Start Module'}
                      <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isCompleted ? 'text-blue-500' : 'text-white'}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex flex-col items-center gap-8">
          <button 
            onClick={resetProgress}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-slate-400 hover:text-slate-600 transition-all text-sm font-semibold bg-transparent hover:bg-slate-100"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-[-180deg] transition-transform duration-500" />
            Reset My Progress
          </button>
          
          <div className="flex items-center gap-12 text-slate-300">
            <Code2 className="w-6 h-6" />
            <Layout className="w-6 h-6" />
            <Monitor className="w-6 h-6" />
          </div>
        </div>
      </main>

      {/* Decorative Bottom */}
      <footer className="py-12 text-center text-slate-400 text-xs border-t border-slate-200 bg-white">
        © 2024 GitHub Copilot Training Portal
      </footer>
    </div>
  );
};

export default App;