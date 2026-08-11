import { Terminal, Clock } from 'lucide-react';

export default function ActivityLog({ logs }) {
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col h-full max-h-[300px] lg:max-h-full">
      
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
        <Terminal className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">Activity Log</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 font-mono text-sm scroll-smooth">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 animate-fade-in group">
            <div className="text-slate-500 whitespace-nowrap flex items-center gap-1.5 shrink-0 mt-0.5">
              <Clock className="w-3 h-3" />
              {formatTime(log.time)}
            </div>
            <div className="text-slate-300 group-hover:text-white transition-colors">
              {log.msg}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
