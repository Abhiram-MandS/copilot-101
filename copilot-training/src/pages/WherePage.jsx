import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Button } from '../components/shared/Button';
import { Footer } from '../components/shared/Footer';
import { 
  Code2, 
  Github, 
  Terminal, 
  ChevronRight, 
  Lightbulb, 
  Play, 
  CheckCircle2,
  Info,
  ArrowLeft,
  ExternalLink,
  X
} from 'lucide-react';

export const WherePage = () => {
  const navigate = useNavigate();
  const { markComplete } = useProgress();
  const [activeTab, setActiveTab] = useState('editors');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('Welcome to Copilot CLI Simulator. Type "help" to start.');
  const [showDetail, setShowDetail] = useState(null);

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
      },
      tags: ['Context', 'Efficiency'],
      details: {
        howTo: 'Place your cursor where you want code, then use Cmd+I (inline chat) or type a comment describing what you need. Copilot will suggest completions based on your file context.',
        example: '// fetch user data from API and handle errors → Copilot generates a full try/catch with fetch',
        tip: 'The more specific your comment or prompt, the better the suggestion. Include types, error handling expectations, and naming conventions.'
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
      },
      tags: ['Web', 'Collaboration'],
      details: {
        howTo: 'Navigate to any repository on GitHub.com and click the Copilot icon in the top-right. Ask questions about the repo, generate PR summaries, or get help planning issues.',
        example: 'Open a PR → Click "Copilot" → "Summarize" → Copilot generates a structured description with changes, impact, and testing notes.',
        tip: 'Use Copilot on GitHub.com for cross-file questions — it has access to the entire repository context, unlike local IDE which focuses on open files.'
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
      },
      tags: ['CLI', 'Productivity'],
      details: {
        howTo: 'Install with "gh extension install github/gh-copilot", then use "gh copilot suggest" followed by a natural language description of what you want to do.',
        example: 'gh copilot suggest "find all files modified in the last 24 hours" → Copilot generates: find . -type f -mtime -1',
        tip: 'Use "gh copilot explain" to understand complex commands. Paste any shell command and Copilot breaks it down step by step.'
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

  const handleComplete = () => {
    markComplete('where');
    navigate('/');
  };

  const currentModule = modules.find(m => m.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-lg font-bold">Module 1: Where Does Copilot Live?</h1>
          <div className="w-32" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-4 md:p-8">
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
                <div className={`p-2 rounded-lg ${
                  module.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  module.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
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
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-600 tracking-wider">
                  Module Details
                </span>
                <h2 className="text-2xl font-bold flex-1">{currentModule.title}</h2>
                <button
                  onClick={() => setShowDetail(currentModule.id)}
                  className="text-slate-400 hover:text-blue-600 font-semibold transition flex items-center gap-1 text-sm"
                >
                  Details <ChevronRight className="w-3.5 h-3.5" />
                </button>
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

        {/* Useful Links */}
        <div className="mt-12 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-blue-600" /> Useful Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="https://github.com/copilot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-slate-900 text-white">
                <Github className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">GitHub Copilot</div>
                <div className="text-xs text-slate-400">github.com/copilot</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
            <a
              href="https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">IDE Code Suggestions</div>
                <div className="text-xs text-slate-400">docs.github.com</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
            <a
              href="https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">Copilot CLI Guide</div>
                <div className="text-xs text-slate-400">docs.github.com</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
          </div>
        </div>

        {/* Completion Button */}
        <div className="mt-8 text-center">
          <Button onClick={handleComplete} size="lg">
            Mark Complete & Continue
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Details Modal */}
      {showDetail && (() => {
        const mod = modules.find(m => m.id === showDetail);
        if (!mod?.details) return null;
        return (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetail(null)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div 
              className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowDetail(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${
                  mod.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  mod.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {mod.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{mod.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-tight text-blue-600">
                    {mod.color === 'blue' ? '💻 IDE' : mod.color === 'purple' ? '🌐 Web' : '⌨️ CLI'}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">{mod.content.summary}</p>

              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1.5">💡 How to Use</p>
                  <p className="text-sm text-emerald-900 leading-relaxed">{mod.details.howTo}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5">📝 Example</p>
                  <p className="text-sm text-blue-900 leading-relaxed font-mono">{mod.details.example}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1.5">⚡ Pro Tip</p>
                  <p className="text-sm text-amber-900 leading-relaxed">{mod.details.tip}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-5 border-t border-slate-100">
                {mod.tags.map((tag, j) => (
                  <span 
                    key={j}
                    className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
