import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Button } from '../components/shared/Button';
import { Footer } from '../components/shared/Footer';
import { 
  Monitor, 
  FolderSearch, 
  Wrench, 
  Users, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  Flame, 
  AlertTriangle, 
  Plus,
  Search,
  ArrowLeft,
  ChevronRight,
  Lightbulb,
  ExternalLink,
  X,
  Bot,
  Eye,
  Compass,
  GitPullRequest,
  Settings
} from 'lucide-react';

export const MasteringPage = () => {
  const navigate = useNavigate();
  const { markComplete } = useProgress();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  
  const features = [
    {
      title: "How and Where",
      category: "dev",
      icon: <Monitor className="w-6 h-6" />,
      desc: "Guides code implementation options contextually based on your current cursor position and workspace.",
      tags: ["Context", "Efficiency"],
      details: {
        howTo: "Place your cursor where you want code, then use Cmd+I (inline chat) or type a comment describing what you need.",
        example: "// fetch user data from API and handle errors → Copilot generates a full try/catch with fetch",
        tip: "The more specific your comment or prompt, the better the suggestion. Include types, error handling expectations, and naming conventions."
      }
    },
    {
      title: "Repo Questions",
      category: "analysis",
      icon: <FolderSearch className="w-6 h-6" />,
      desc: "Answers complex queries about repository structure, history, and architectural decisions.",
      tags: ["Search", "Discovery"],
      details: {
        howTo: "Open Copilot Chat and use @workspace to ask questions about your entire repository.",
        example: "@workspace How is authentication handled in this project?",
        tip: "Use @workspace for broad questions. For specific files, open them first or reference them with #file."
      }
    },
    {
      title: "Cleanup",
      category: "dev",
      icon: <Wrench className="w-6 h-6" />,
      desc: "Refines code by identifying and removing redundant logic, unused imports, or duplicate fragments.",
      tags: ["Refactor", "Quality"],
      details: {
        howTo: "Select a block of code, right-click → Copilot → 'Fix This' or ask in chat: 'Clean up this function'.",
        example: "Select a 50-line function → 'Simplify this and remove unused variables' → Copilot refactors to 25 lines.",
        tip: "Ask Copilot to explain what it removed and why. This helps you learn patterns and catch false positives."
      }
    },
    {
      title: "Dependency Analysis",
      category: "analysis",
      icon: <Users className="w-6 h-6" />,
      desc: "Maps library usage and identifies external dependencies to help manage project bloat and security.",
      tags: ["Security", "Bloat"],
      details: {
        howTo: "Ask Copilot Chat: '@workspace Which dependencies are unused?' or 'Are there known vulnerabilities in my dependencies?'",
        example: "@workspace List all npm packages that are imported but never used in the codebase.",
        tip: "Combine with 'npm audit' output — paste results into chat for Copilot to suggest fixes."
      }
    },
    {
      title: "Onboarding Help",
      category: "analysis",
      icon: <BookOpen className="w-6 h-6" />,
      desc: "Explains high-level repository logic and workflows as if onboarding a new team member.",
      tags: ["Docs", "Onboarding"],
      details: {
        howTo: "Use '@workspace Explain the architecture of this project' or ask about specific flows.",
        example: "@workspace Walk me through the checkout flow from cart to payment confirmation.",
        tip: "Great for new team members. Ask follow-up questions like 'Where would I add a discount code feature?'"
      }
    },
    {
      title: "PR Review",
      category: "dev",
      icon: <CheckCircle className="w-6 h-6" />,
      desc: "Automatically reviews pull requests for logical errors, security flaws, and coding standard violations.",
      tags: ["Workflow", "QA"],
      details: {
        howTo: "On GitHub.com, open a PR and click 'Copilot' → 'Review'. It analyzes diffs and leaves comments.",
        example: "Copilot flags: 'This SQL query is vulnerable to injection — use parameterised queries instead.'",
        tip: "Copilot review works best alongside human reviewers. Use it as a first pass to catch obvious issues."
      }
    },
    {
      title: "Scripts & Docs",
      category: "dev",
      icon: <FileText className="w-6 h-6" />,
      desc: "Generates automation scripts (Bash, Python) and maintains comprehensive project documentation.",
      tags: ["Automation", "Docs"],
      details: {
        howTo: "Ask: 'Write a bash script to deploy this app to staging' or 'Generate JSDoc for this module'.",
        example: "'Create a GitHub Actions workflow that runs tests on PR and deploys on merge to main.'",
        tip: "Always review generated scripts before running them. Ask Copilot to add error handling and logging."
      }
    },
    {
      title: "Copilot MD",
      category: "dev",
      icon: <FileText className="w-6 h-6" />,
      desc: "Extends Copilot capabilities into Markdown files for better READMEs and technical guides.",
      tags: ["Writing", "Markdown"],
      details: {
        howTo: "Open a .md file and start typing — Copilot autocompletes headings, tables, and documentation blocks.",
        example: "Type '## API Endpoints' and Copilot generates a formatted table of your routes with descriptions.",
        tip: "Use inline chat (Cmd+I) inside markdown files to ask: 'Add a troubleshooting section for common errors'."
      }
    },
    {
      title: "Setting Context",
      category: "dev",
      icon: <MessageSquare className="w-6 h-6" />,
      desc: "Allows chatting with the code environment to explain high-level goals and architectural needs.",
      tags: ["Chat", "Context"],
      details: {
        howTo: "Start a chat session and explain your goal before asking for code: 'I'm building a REST API with Express and PostgreSQL...'",
        example: "'I'm refactoring from class components to hooks. Help me convert UserProfile.jsx.'",
        tip: "Use custom instructions (.github/copilot-instructions.md) to set persistent context for your project."
      }
    },
    {
      title: "Performance Hotspot Hunt",
      category: "analysis",
      icon: <Flame className="w-6 h-6" />,
      desc: "Identifies inefficient code sections and algorithmic bottlenecks that could slow down your application.",
      tags: ["Perf", "Audit"],
      details: {
        howTo: "Select a function and ask: 'Are there any performance issues in this code?' or 'Optimize this for speed.'",
        example: "'This loop runs in O(n²) — Copilot suggests using a Map for O(n) lookup.'",
        tip: "Paste profiler output into chat for targeted optimization suggestions."
      }
    },
    {
      title: "Error Handling Audit",
      category: "analysis",
      icon: <AlertTriangle className="w-6 h-6" />,
      desc: "Reviews and suggests improvements for error management, catch blocks, and exception safety.",
      tags: ["Safety", "Bugs"],
      details: {
        howTo: "Ask: '@workspace Find all try/catch blocks that swallow errors silently' or 'Audit error handling in this file.'",
        example: "Copilot finds: 'catch(e) {}' blocks and suggests logging, re-throwing, or user-facing error messages.",
        tip: "Ask Copilot to generate a consistent error handling pattern you can apply across your codebase."
      }
    },
    {
      title: "Refactoring & More",
      category: "dev",
      icon: <Plus className="w-6 h-6" />,
      desc: "Proactively suggests code improvements, modernization, and explores alternative implementations.",
      tags: ["Suggest", "Refactor"],
      details: {
        howTo: "Select code and ask: 'Suggest improvements' or 'Modernize this to use async/await instead of callbacks.'",
        example: "'Convert this Express middleware chain to use a cleaner pipeline pattern.'",
        tip: "Ask for multiple approaches: 'Give me 3 different ways to implement this feature' — then choose the best fit."
      }
    }
  ];
  
  const filteredFeatures = features.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || f.category === activeFilter;
    return matchesSearch && matchesFilter;
  });
  
  const generateQuestion = () => {
    const correctFeature = features[Math.floor(Math.random() * features.length)];
    const decoys = features
      .filter(f => f.title !== correctFeature.title)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const choices = [correctFeature, ...decoys].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion({ correct: correctFeature, choices });
    setSelectedAnswer(null);
    setShowFeedback(false);
  };
  
  useEffect(() => {
    generateQuestion();
  }, []);
  
  const checkAnswer = (selectedTitle) => {
    setSelectedAnswer(selectedTitle);
    setShowFeedback(true);
  };
  
  const handleComplete = () => {
    markComplete('mastering');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-lg font-bold">Module 3: Mastering Copilot</h1>
          <div className="w-32" />
        </div>
      </header>
      
      {/* Hero */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold uppercase tracking-wider">
          Developer Resources
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mastering Copilot
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          A visual guide to the most powerful AI-assisted coding features. Learn how to optimize your workflow, analyze repositories, and clean your code.
        </p>
      </section>
      
      {/* Search & Filter */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search features..." 
              className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Features
            </button>
            <button 
              onClick={() => setActiveFilter('dev')}
              className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeFilter === 'dev' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Development
            </button>
            <button 
              onClick={() => setActiveFilter('analysis')}
              className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeFilter === 'analysis' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Analysis
            </button>
          </div>
        </div>
      </section>
      
      {/* Feature Grid */}
      <main className="max-w-6xl mx-auto px-6">
        {filteredFeatures.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            No features found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature, i) => (
              <div 
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col h-full hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    {feature.icon}
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {feature.tags.map((tag, j) => (
                      <span 
                        key={j}
                        className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{feature.desc}</p>

                <div className="mt-6 pt-5 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold uppercase tracking-tight">
                    {feature.category === 'dev' ? '🔧 Development' : '📊 Analysis'}
                  </span>
                  <button
                    onClick={() => setExpandedCard(i)}
                    className="text-slate-400 hover:text-blue-600 font-semibold transition flex items-center gap-1"
                  >
                    Details <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Quiz + Resources Side by Side */}
      <div className="max-w-7xl mx-auto px-6 mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quiz Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Lightbulb className="w-40 h-40" />
          </div>
          
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-slate-900">
            <span className="bg-purple-100 text-purple-600 p-2 rounded-lg">
              <Lightbulb className="w-6 h-6" />
            </span>
            Quick Knowledge Check
          </h2>
          
          {currentQuestion && (
            <div>
              <p className="text-xl font-semibold mb-6 text-slate-800 leading-snug">
                Scenario: Which feature helps you "{currentQuestion.correct.desc.toLowerCase()}"?
              </p>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {currentQuestion.choices.map((choice, i) => {
                  const isCorrect = choice.title === currentQuestion.correct.title;
                  const isSelected = selectedAnswer === choice.title;
                  
                  return (
                    <div
                      key={i}
                      onClick={() => !showFeedback && checkAnswer(choice.title)}
                      className={`rounded-xl p-4 font-semibold transition cursor-pointer ${
                        !showFeedback 
                          ? 'bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-500 text-slate-700'
                          : isSelected && isCorrect 
                            ? 'bg-green-50 border border-green-200 text-green-700'
                            : isSelected && !isCorrect
                              ? 'bg-red-50 border border-red-200 text-red-700'
                              : isCorrect
                                ? 'bg-green-50 border border-green-200 text-green-700'
                                : 'bg-white border border-slate-200 text-slate-400'
                      }`}
                    >
                      {choice.title}
                    </div>
                  );
                })}
              </div>
              
              {showFeedback && (
                <div className={`mb-6 p-5 rounded-xl border font-medium ${
                  selectedAnswer === currentQuestion.correct.title
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}>
                  {selectedAnswer === currentQuestion.correct.title ? (
                    `✓ Perfect! You've mastered identifying the ${currentQuestion.correct.title} feature.`
                  ) : (
                    <>✕ Not quite. That description belongs to <span className="font-bold underline">{currentQuestion.correct.title}</span>.</>
                  )}
                </div>
              )}
              
              {showFeedback && (
                <button 
                  onClick={generateQuestion}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
                >
                  Next Question
                </button>
              )}
            </div>
          )}
        </div>
      
        {/* Useful Resources */}
        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-emerald-600" /> Useful Resources
          </h3>
          <div className="grid grid-cols-1 gap-5 flex-1">
            <a
              href="https://docs.github.com/en/copilot/how-tos/chat-with-copilot/get-started-with-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-emerald-600 transition-colors">Getting Started with Chat Prompts</div>
                <div className="text-xs text-slate-400">docs.github.com</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
            <a
              href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                <Settings className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-emerald-600 transition-colors">Custom Instructions (Repo-level)</div>
                <div className="text-xs text-slate-400">docs.github.com</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
            <a
              href="https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-emerald-600 transition-colors">Copilot Coding Agent</div>
                <div className="text-xs text-slate-400">docs.github.com</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
            <a
              href="https://docs.github.com/en/copilot/concepts/agents/code-review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
                <Eye className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-emerald-600 transition-colors">Code Review with Copilot</div>
                <div className="text-xs text-slate-400">docs.github.com</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
            <a
              href="https://docs.github.com/en/copilot/concepts/tools/ai-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-emerald-600 transition-colors">Choosing the Right AI Tool</div>
                <div className="text-xs text-slate-400">docs.github.com</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
            <a
              href="https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/create-a-pr-summary"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
                <GitPullRequest className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm group-hover:text-emerald-600 transition-colors">Creating PR Summaries</div>
                <div className="text-xs text-slate-400">docs.github.com</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Completion Button */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <Button onClick={handleComplete} size="lg">
          Mark Complete & Finish Training
        </Button>
      </div>

      {/* Footer */}
      <Footer />

      {/* Details Modal */}
      {expandedCard !== null && features[expandedCard]?.details && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedCard(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal */}
          <div 
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-in zoom-in-95 fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setExpandedCard(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                {features[expandedCard].icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{features[expandedCard].title}</h3>
                <span className="text-xs font-bold uppercase tracking-tight text-blue-600">
                  {features[expandedCard].category === 'dev' ? '🔧 Development' : '📊 Analysis'}
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">{features[expandedCard].desc}</p>

            {/* Detail cards */}
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1.5">💡 How to Use</p>
                <p className="text-sm text-emerald-900 leading-relaxed">{features[expandedCard].details.howTo}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5">📝 Example</p>
                <p className="text-sm text-blue-900 leading-relaxed font-mono">{features[expandedCard].details.example}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1.5">⚡ Pro Tip</p>
                <p className="text-sm text-amber-900 leading-relaxed">{features[expandedCard].details.tip}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-6 pt-5 border-t border-slate-100">
              {features[expandedCard].tags.map((tag, j) => (
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
      )}
    </div>
  );
};
