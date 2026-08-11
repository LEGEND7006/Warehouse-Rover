import { Activity, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ status }) {
  
  const getStatusColor = () => {
    switch(status) {
      case 'Running': return 'bg-yellow-500 animate-pulse';
      case 'Completed': return 'bg-emerald-500';
      case 'Idle': default: return 'bg-slate-500';
    }
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5">
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">Smart Warehouse</h1>
          <p className="text-xs text-slate-400">Simulation Phase 1</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-700/50">
          <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`} />
          <span className="text-sm text-slate-300 font-medium">System {status}</span>
        </div>
        
        <Link to="/" className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-medium">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Exit</span>
        </Link>
      </div>

    </nav>
  );
}
