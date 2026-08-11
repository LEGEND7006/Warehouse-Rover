import { Play, RotateCcw, Crosshair, MapPin, Navigation } from 'lucide-react';

const NODES = [
  'A1', 'A2', 'A3', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4'
];

export default function ControlPanel({
  currentPosition,
  destination,
  status,
  handleSetDestination,
  startSimulation,
  resetSimulation
}) {
  
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col h-full">
      
      <h2 className="text-xl font-bold text-white mb-6">Mission Control</h2>

      {/* Live Info */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <MapPin className="w-4 h-4 text-indigo-400" /> Current Pos
          </div>
          <div className="text-3xl font-mono font-bold text-white">{currentPosition}</div>
        </div>
        
        <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Crosshair className="w-4 h-4 text-emerald-400" /> Destination
          </div>
          <div className="text-3xl font-mono font-bold text-white">{destination || '--'}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6 flex-1">

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Set Destination Node</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Crosshair className="w-4 h-4 text-emerald-400" />
            </div>
            <select 
              value={destination}
              onChange={(e) => handleSetDestination(e.target.value)}
              disabled={status === 'Running'}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg pl-10 p-3 text-white outline-none focus:border-emerald-500 transition-colors disabled:opacity-50 appearance-none"
            >
              <option value="" disabled>Select Destination...</option>
              {NODES.map(node => (
                <option key={node} value={node} disabled={node === currentPosition}>
                  {node}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 grid grid-cols-1 gap-4">
          <button
            onClick={() => startSimulation(currentPosition, destination)}
            disabled={!destination || status === 'Running'}
            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" /> 
            {status === 'Running' ? 'Executing...' : 'Start Mission'}
          </button>
          
          <button
            onClick={resetSimulation}
            disabled={status === 'Running'}
            className="btn-secondary w-full py-3 flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:border-red-500/50"
          >
            <RotateCcw className="w-4 h-4" /> Reset Simulation
          </button>
        </div>

      </div>

    </div>
  );
}
