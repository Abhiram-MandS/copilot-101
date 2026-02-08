import React, { useState } from 'react';
import { 
  Code2, 
  Github, 
  Terminal, 
  ChevronRight, 
  Lightbulb, 
  Play, 
  CheckCircle2,
  Info
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('editors');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('Welcome to Copilot CLI Simulator. Type "help" to start.');

  const modules = [
    {
      id: 'editors',
      title: 'Code Editors',
      icon: <Code2 className="w-5 h-5" />,
      color: 'blue',
      content: {
        summary: 'Copilot lives inside your favorite IDE, providing autocomplete and chat support.',
        list: [
          { name: 'VS Code', status: 'Full Support' },
          { name: 'Visual Studio 2022+', status: 'Native' },
          { name: 'JetBrains (IntelliJ, etc)', status: 'Plugin' },
          { name: 'Neovim / Vim', status: 'Lua/VimScript' }
        ],
        tip: 'Pro Tip: Use Cmd+I in VS Code to open the inline chat directly in your code block.'
      }
    },
    {
      id: 'github',
      title: 'GitHub Web',
      icon: <Github className="w-5 h-5" />,
      color: 'purple',
      content: {
        summary: 'Copilot extends beyond the IDE into the GitHub.com web interface.',
        list: [
          { name: 'Repo Explainer', status: 'Understand complex codebases' },
          { name: 'PR Summaries', status: 'Auto-generate descriptions' },
          { name: 'Issue Assistance', status: 'Plan feature implementation' },
          { name: 'Direct Coding', status: 'Edit files in browser with AI' }
        ],
        tip: 'GitHub Copilot Chat on the web is great for high-level architectural questions across many files.'
      }
    },
    {
      id: 'cli',
      title: 'Command Line',
      icon: <Terminal className="w-5 h-5" />,
      color: 'green',
      content: {
        summary: 'The GitHub Copilot CLI translates natural language into shell commands.',
        interactive: true,
        tip: 'Try typing: "how to find large files" in the simulator below.'
      }
    }
  ];

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.toLowerCase();
    let response = '';

    if (cmd.includes('large files')) {
      response = '`gh copilot suggest "find files over 50MB"`\n\nGenerated command:\nfind . -type f -size +50M';
    } else if (cmd.includes('help')) {
      response = 'Try: "how to delete a git branch" or "find large files"';
    } else if (cmd.includes('delete branch')) {
      response = '`gh copilot suggest "delete local branch named feat-1"`\n\nGenerated command:\ngit branch -d feat-1';
    } else {
      response = `Searching Copilot for: "${terminalInput}"...\n(Simulation) Result: Command found for ${terminalInput}`;
    }

    setTerminalOutput(response);
    setTerminalInput('');
  };

  const currentModule = modules.find(m => m.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Github className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">GitHub Copilot Ecosystem</h1>
          </div>
          <p className="text-slate-500">Learn how Copilot integrates into your development workflow.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-4 space-y-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveTab(module.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all border ${
                  activeTab === module.id 
                    ? 'bg-white border-blue-500 shadow-md transform scale-102 ring-1 ring-blue-500' 
                    : 'bg-transparent border-transparent hover:bg-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg bg-${module.color}-100 text-${module.color}-600`}>
                  {module.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{module.title}</div>
                  <div className="text-xs text-slate-400">Section {modules.indexOf(module) + 1}</div>
                </div>
                {activeTab === module.id && <ChevronRight className="ml-auto w-4 h-4 text-blue-500" />}
              </button>
            ))}
          </nav>

          {/* Main Content Area */}
          <main className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-6 md:p-8 flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-600 tracking-wider`}>
                  Module Details
                </span>
                <h2 className="text-2xl font-bold">{currentModule.title}</h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  {currentModule.content.summary}
                </p>

                {currentModule.content.list && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentModule.content.list.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-slate-400">{item.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactive CLI Simulator */}
                {currentModule.id === 'cli' && (
                  <div className="mt-8 rounded-lg bg-slate-900 overflow-hidden border border-slate-700">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-xs text-slate-400 ml-2 font-mono">zsh — copilot-simulator</span>
                    </div>
                    <div className="p-4 font-mono text-sm h-48 overflow-y-auto whitespace-pre-wrap">
                      <div className="text-blue-400 mb-2">➜ ~ github-copilot-cli</div>
                      <div className="text-slate-300 mb-4">{terminalOutput}</div>
                    </div>
                    <form onSubmit={handleTerminalSubmit} className="flex border-t border-slate-700">
                      <span className="bg-slate-800 px-3 py-2 text-green-400 font-mono text-sm self-center leading-none">?</span>
                      <input 
                        type="text" 
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="What would you like to do?"
                        className="flex-1 bg-slate-900 px-3 py-3 text-white font-mono text-sm outline-none focus:ring-0"
                      />
                      <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold uppercase transition-colors"
                      >
                        Ask
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Tip Footer */}
            <div className="p-4 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800 italic">
                {currentModule.content.tip}
              </p>
            </div>
          </main>
        </div>

        {/* Action Callouts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-blue-600 rounded-xl text-white shadow-lg">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" /> Get Started
            </h3>
            <p className="text-sm text-blue-100 mb-4">Most users start by installing the extension in VS Code.</p>
            <button className="text-xs font-bold bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Marketplace Link
            </button>
          </div>
          <div className="p-5 bg-slate-800 rounded-xl text-white shadow-lg md:col-span-2 flex items-center justify-between">
            <div>
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" /> Summary Checklist
              </h3>
              <ul className="text-xs text-slate-300 grid grid-cols-2 gap-x-8 gap-y-1 list-disc pl-4">
                <li>IDE Autocomplete</li>
                <li>GitHub Web Chat</li>
                <li>CLI Command Generation</li>
                <li>Pull Request Summaries</li>
                <li>Repository Explanations</li>
                <li>Code Explainers</li>
              </ul>
            </div>
            <div className="hidden sm:block">
              <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center opacity-50">
                <Github size={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;