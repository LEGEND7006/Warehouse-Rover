import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Info } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 lg:p-24 animate-fade-in min-h-[calc(100vh-4rem)] w-full gap-16">
      
      {/* Left side text content */}
      <div className="flex-1 space-y-8 z-10 text-left w-full">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full mb-2 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
          <Bot className="w-12 h-12 text-indigo-400" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-pulse-slow leading-tight">
          Smart Warehouse <br /> Rover
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed">
          Experience the future of automated logistics. Phase 1 simulation is now active. Explore the digital twin of our warehouse environment.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 w-full max-w-2xl">
          <Link 
            to="/login" 
            className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-lg font-medium text-white transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] hover:-translate-y-1 w-full overflow-hidden"
          >
            <span>Access Simulation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/info" 
            className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-lg font-medium text-slate-200 transition-all duration-300 hover:shadow-lg w-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
            <Info className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span>Project Info</span>
          </Link>
        </div>
      </div>

      {/* Right side decorative graphic */}
      <div className="hidden lg:flex flex-1 justify-center items-center relative w-full">
        <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] mix-blend-screen" />
        <div className="relative glass-panel w-96 h-96 rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-700 bg-slate-900/60 backdrop-blur-2xl">
           <Bot className="w-48 h-48 text-indigo-300 opacity-80" />
           <div className="absolute inset-0 border border-indigo-500/30 rounded-[3rem] animate-[ping_3s_infinite] opacity-20" />
        </div>
      </div>

    </div>
  );
}
