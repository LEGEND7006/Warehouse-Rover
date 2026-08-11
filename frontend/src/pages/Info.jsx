import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Route as RouteIcon, Box } from 'lucide-react';

export default function Info() {
  return (
    <div className="flex-1 flex flex-col w-full animate-slide-up min-h-screen p-8 md:p-16 lg:p-24 relative overflow-hidden">
      
      {/* Decorative blurred blobs for full page */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />
      
      <Link to="/" className="inline-flex items-center text-slate-400 hover:text-indigo-400 transition-colors mb-12 w-fit gap-2 group z-10">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="w-full z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-slate-400 tracking-tight">
          Project Information
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-16 leading-relaxed max-w-4xl">
          The Smart Warehouse Rover project is a next-generation automated logistics system designed to streamline warehouse operations through autonomous pathfinding and real-time tracking.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 w-full">
          
          {/* Feature 1 */}
          <div className="p-8 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-300 group">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Autonomous Navigation</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Utilizing advanced pathfinding algorithms to determine the most efficient route across the warehouse grid, ensuring optimal delivery times.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all duration-300 group">
            <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <RouteIcon className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Real-time Tracking</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Live updates on rover position, precise coordinate tracking, and comprehensive activity logging for full operational transparency.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Box className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Grid Management</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Interactive 5x5 digital twin of the warehouse layout. Dynamically manage nodes, simulate blockages, and visualize paths.
            </p>
          </div>

        </div>

        <div className="w-full max-w-5xl border-t border-white/10 pt-16">
          <h2 className="text-4xl font-bold mb-8 text-white">Phase 1: Simulation</h2>
          <div className="space-y-6 text-slate-300 text-xl leading-relaxed">
            <p>
              In Phase 1, we are rolling out a virtual environment to validate our pathfinding logic and monitoring dashboard. 
              The simulation allows operators to interact with a digital twin of the warehouse layout before physical deployment.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4 mt-8">
              <li className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Interactive Grid UI mapping nodes</span>
              </li>
              <li className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Dynamic path calculation via API</span>
              </li>
              <li className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Visual progression & state handling</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
}
