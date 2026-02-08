import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Button } from '../components/shared/Button';
import { 
  Brain, 
  Puzzle, 
  SquareStack, 
  Shield, 
  Settings, 
  RotateCw, 
  Send,
  ArrowLeft 
} from 'lucide-react';

export const ContextPage = () => {
  const navigate = useNavigate();
  const { markComplete } = useProgress();
  
  // Token visualizer state
  const [tokenInput, setTokenInput] = useState('');
  const [tokens, setTokens] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  
  // Chat simulator state
  const [messages, setMessages] = useState([]);
  const [windowSize, setWindowSize] = useState(8);
  const [userMsg, setUserMsg] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
  
  // Update token visualizer
  useEffect(() => {
    if (!tokenInput) {
      setTokens([]);
      setCharCount(0);
      setTokenCount(0);
      return;
    }
    
    const words = tokenInput.match(/\w+|[^\w\s]/g) || [];
    setTokens(words);
    setTokenCount(Math.ceil(words.length * 1.3));
    setCharCount(tokenInput.length);
  }, [tokenInput]);
  
  // Initialize with welcome message
  useEffect(() => {
    addMessage("Hello! Let's test my memory. Try sending more messages than the window limit.", 'ai');
  }, []);
  
  const addMessage = (text, role) => {
    setMessages(prev => [...prev, { text, role, id: Date.now() }]);
  };
  
  const handleSendMessage = () => {
    const text = userMsg.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    setUserMsg('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Understood. What else can I help with?",
        "That's an interesting point!",
        "I see. Tell me more about that.",
        "Got it. I'm keeping that in mind... as long as it's in my window!",
        "Can you elaborate on your previous point? (If I still remember it!)"
      ];
      addMessage(responses[Math.floor(Math.random() * responses.length)], 'ai');
    }, 600);
  };
  
  const handleComplete = () => {
    markComplete('context');
    navigate('/');
  };
  
  const resetChat = () => {
    setMessages([]);
    addMessage("Hello! Let's test my memory. Try sending more messages than the window limit.", 'ai');
  };
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
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
          <h1 className="text-lg font-bold">Module 2: Understanding AI Context</h1>
          <div className="w-32" />
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Teaching the <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">"Memory"</span> of AI
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          How do Large Language Models remember what you said? Explore the mechanics of Context Windows, Tokens, and System Prompts.
        </p>
      </section>
      
      {/* Core Concepts Grid */}
      <section id="what-is" className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
              <Puzzle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Tokens</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              AI doesn't read words; it reads "chunks" of characters. One word can be multiple tokens. Context limits are always measured in tokens.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
              <SquareStack className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Context Window</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The total amount of information the AI can "see" at once. If your conversation exceeds this limit, the AI starts "forgetting" the beginning.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">System Prompt</h3>
            <h4 className="text-xs uppercase text-slate-400 font-bold tracking-widest mt-1 mb-2">The "Hidden" Context</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Instructions given to the AI before the user even speaks. It defines the persona, rules, and boundaries of the AI.
            </p>
          </div>
        </div>
      </section>
      
      {/* Token Visualizer */}
      <section id="tokens" className="bg-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How AI Sees Your Text</h2>
          <div className="bg-white p-6 rounded-xl shadow-inner mb-6">
            <textarea 
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none" 
              placeholder="Type something to see it tokenized..."
            />
            <div className="mt-6 min-h-[100px] border-t pt-4">
              {tokens.length === 0 ? (
                <p className="text-slate-400 italic text-sm">Visualized tokens will appear here...</p>
              ) : (
                <div>
                  {tokens.map((token, i) => (
                    <span 
                      key={i}
                      className="inline-block px-1 mx-0.5 my-1 rounded bg-indigo-100 border-b-2 border-indigo-400 font-mono text-sm"
                    >
                      {token}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
            <div>Characters: <span className="text-indigo-600">{charCount}</span></div>
            <div>Est. Tokens: <span className="text-indigo-600">{tokenCount}</span></div>
          </div>
        </div>
      </section>
      
      {/* Interactive Playground */}
      <section id="playground" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Interactive Lab</span>
          <h2 className="text-4xl font-bold mt-2">The Sliding Window Simulator</h2>
          <p className="text-slate-600 mt-4">Simulate an AI with a very small context window (10 messages). See how it "forgets" the past.</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-400" /> Context Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Window Size (Messages)</label>
                  <input 
                    type="range" 
                    min="3" 
                    max="15" 
                    value={windowSize}
                    onChange={(e) => setWindowSize(parseInt(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Small (Forgetful)</span>
                    <span className="font-bold text-indigo-600">{windowSize}</span>
                    <span>Large (Retentive)</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-slate-700 mb-2">System Instruction</label>
                  <input 
                    type="text" 
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full p-2 text-sm border rounded bg-slate-50"
                  />
                  <p className="text-[10px] text-slate-400 mt-2">The System Prompt always stays in context and never gets deleted.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-2">Teaching Tip:</h3>
              <p className="text-sm text-indigo-700">
                Explain that "Forgetfulness" in AI isn't like a human forgetting; it's like a document being physically cut from the top because the file size got too big.
              </p>
            </div>
          </div>
          
          {/* Chat Simulator */}
          <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-white font-medium text-sm">Context Simulation</span>
              </div>
              <button 
                onClick={resetChat}
                className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" /> Reset
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* System prompt display */}
              <div className="bg-slate-800 text-slate-400 text-[10px] p-2 rounded text-center border border-slate-700">
                SYSTEM: {systemPrompt}
              </div>
              
              {/* Messages */}
              {messages.map((msg, index) => {
                const isOutOfContext = (messages.length - index) > windowSize;
                
                return (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                  >
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-700 text-slate-200'
                    } ${isOutOfContext ? 'opacity-30 grayscale line-through' : 'shadow-lg'}`}>
                      {isOutOfContext && (
                        <span className="block text-[10px] uppercase opacity-50 mb-1">Forgotten by AI</span>
                      )}
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              
              {messages.length > windowSize && (
                <p className="text-[10px] text-red-400 text-center italic mt-2">
                  The faded messages above are no longer visible to the AI's short-term memory.
                </p>
              )}
            </div>
            
            <div className="p-4 bg-slate-800 border-t border-slate-700">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-slate-700 border-none rounded-lg p-2 text-white text-sm focus:ring-1 focus:ring-indigo-500 outline-none" 
                  placeholder="Send a message..."
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6">Common Questions</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-6">
            <h3 className="text-xl font-bold mb-2">Does the AI learn from my context?</h3>
            <p className="text-slate-600">
              Usually, no. The "context" is temporary. It's like a notepad the AI uses during your conversation. Once you start a new session, the notepad is shredded. Permanent "learning" only happens during the massive training phase or fine-tuning.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-xl font-bold mb-2">What is 'Needle in a Haystack'?</h3>
            <p className="text-slate-600">
              A test used to see if an AI can remember a tiny specific detail buried in the middle of a massive context window (e.g., 200,000 words). Many AIs struggle with the middle parts and remember the beginning and end best.
            </p>
          </div>
        </div>
      </section>
      
      {/* Completion Button */}
      <div className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <Button onClick={handleComplete} size="lg">
          Mark Complete & Continue
        </Button>
      </div>
    </div>
  );
};
