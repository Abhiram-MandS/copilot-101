import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, Monitor, Brain, Rocket } from 'lucide-react';
import { Card } from './shared/Card';
import { Badge } from './shared/Badge';

export const Roadmap = ({ progress }) => {
  const navigate = useNavigate();
  
  const modules = [
    {
      id: 'where',
      path: '/where',
      title: 'Where Does Copilot Live?',
      description: 'Explore IDE, web, and CLI integrations',
      icon: <Monitor className="w-8 h-8" />,
      time: '10 min',
      color: 'blue'
    },
    {
      id: 'context',
      path: '/context',
      title: 'Understanding AI Context',
      description: 'Learn about tokens, windows, and memory',
      icon: <Brain className="w-8 h-8" />,
      time: '15 min',
      color: 'purple'
    },
    {
      id: 'mastering',
      path: '/mastering',
      title: 'Mastering Copilot',
      description: 'Advanced features and best practices',
      icon: <Rocket className="w-8 h-8" />,
      time: '15 min',
      color: 'green'
    }
  ];
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 -translate-x-1/2 hidden md:block" />
        
        {/* Module cards */}
        <div className="space-y-8">
          {modules.map((module, index) => {
            const isComplete = progress[module.id];
            const isLocked = false;
            
            return (
              <div 
                key={module.id}
                className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
              >
                {/* Module card */}
                <Card 
                  hoverable={!isLocked}
                  className={`p-6 cursor-pointer ${isLocked ? 'opacity-50' : ''}`}
                  onClick={() => !isLocked && navigate(module.path)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${
                      module.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      module.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {module.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{module.title}</h3>
                        {isComplete && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {isLocked && <Lock className="w-5 h-5 text-slate-400" />}
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{module.description}</p>
                      <Badge variant={module.color}>{module.time}</Badge>
                    </div>
                  </div>
                </Card>
                
                {/* Progress indicator dot */}
                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-blue-500" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
