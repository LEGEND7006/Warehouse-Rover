import { Box, Target, Navigation } from 'lucide-react';

const ROWS = ['A', 'B', 'C'];
const COLS = [1, 2, 3, 4];

export default function WarehouseGrid({ 
  currentPosition, 
  destination, 
  traversedPath, 
  remainingPath,
  handleSetDestination,
  status
}) {
  
  // Coordinates mapping (using percentages to be responsive)
  const getCoord = (nodeId) => {
    if (!nodeId) return { x: 0, y: 0 };
    const row = nodeId.charAt(0);
    const col = parseInt(nodeId.substring(1));
    const rowIndex = ROWS.indexOf(row);
    const colIndex = COLS.indexOf(col);
    
    // Y ranges from 20% to 80%
    const y = 20 + (rowIndex * 60) / (ROWS.length - 1);
    // X ranges from 15% to 85%
    const x = 15 + (colIndex * 70) / (COLS.length - 1);
    
    return { x, y };
  };

  const renderNode = (row, col) => {
    const nodeId = `${row}${col}`;
    const { x, y } = getCoord(nodeId);
    
    const isCurrent = nodeId === currentPosition;
    const isDest = nodeId === destination;
    const isTraversed = traversedPath.includes(nodeId) && !isCurrent;
    const isRemaining = remainingPath.includes(nodeId) && !isDest && !isCurrent;

    let nodeClasses = "absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-2 ";
    
    if (isCurrent) {
      nodeClasses += "bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.5)] z-30 scale-125";
    } else if (isDest) {
      nodeClasses += "bg-emerald-600 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] z-20 scale-110";
    } else if (isTraversed) {
      nodeClasses += "bg-slate-700 border-indigo-500/30 z-10 text-slate-300";
    } else if (isRemaining) {
      nodeClasses += "bg-slate-800 border-indigo-500/50 border-dashed z-10 text-slate-300";
    } else {
      nodeClasses += "bg-slate-900 border-slate-700 hover:bg-slate-700 hover:border-slate-500 z-10 text-slate-500";
    }

    if (status === 'Running') {
      nodeClasses += " pointer-events-none";
    }

    return (
      <div 
        key={nodeId} 
        className={nodeClasses}
        style={{ left: `${x}%`, top: `${y}%` }}
        onClick={() => handleSetDestination(nodeId)}
      >
        <span className="text-xs font-bold font-mono">
          {nodeId}
        </span>
        
        {/* Floating Icons */}
        {isCurrent && (
          <div className="absolute -top-7 animate-bounce">
            <Navigation className="w-5 h-5 text-indigo-300 drop-shadow-md" />
          </div>
        )}
        {isDest && !isCurrent && (
          <div className="absolute -top-6">
            <Target className="w-5 h-5 text-emerald-300 drop-shadow-md" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col relative overflow-hidden">
      
      <div className="flex items-center justify-between mb-4 relative z-40">
        <h2 className="text-xl font-bold text-white">Grid View</h2>
        <div className="flex gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-indigo-600 rounded-sm"></div> Rover</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Dest</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-700 rounded-sm"></div> Path</div>
        </div>
      </div>

      <div className="flex-1 relative w-full h-full min-h-[450px]">
        
        {/* SVG Base Grid and Path Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          
          {/* Horizontal lines */}
          {ROWS.map(row => {
            const { y } = getCoord(`${row}1`);
            const startX = getCoord(`${row}1`).x;
            const endX = getCoord(`${row}${COLS[COLS.length-1]}`).x;
            return <line key={`h-${row}`} x1={`${startX}%`} y1={`${y}%`} x2={`${endX}%`} y2={`${y}%`} stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          })}
          
          {/* Vertical lines */}
          {COLS.map(col => {
            const { x } = getCoord(`A${col}`);
            const startY = getCoord(`A${col}`).y;
            const endY = getCoord(`${ROWS[ROWS.length-1]}${col}`).y;
            return <line key={`v-${col}`} x1={`${x}%`} y1={`${startY}%`} x2={`${x}%`} y2={`${endY}%`} stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          })}

          {/* Remaining Path Lines (Dashed) */}
          {remainingPath.length > 0 && [currentPosition, ...remainingPath].map((node, i, arr) => {
            if (i === 0) return null;
            const prev = getCoord(arr[i-1]);
            const curr = getCoord(node);
            return (
              <line 
                key={`r-${i}`} 
                x1={`${prev.x}%`} y1={`${prev.y}%`} 
                x2={`${curr.x}%`} y2={`${curr.y}%`} 
                stroke="#6366f1" // indigo-500
                strokeWidth="4" 
                strokeDasharray="8 8"
                strokeLinecap="round"
                className="opacity-60"
              />
            );
          })}

          {/* Traversed Path Lines (Solid) */}
          {traversedPath.map((node, i) => {
            if (i === 0) return null;
            const prev = getCoord(traversedPath[i-1]);
            const curr = getCoord(node);
            return (
              <line 
                key={`t-${i}`} 
                x1={`${prev.x}%`} y1={`${prev.y}%`} 
                x2={`${curr.x}%`} y2={`${curr.y}%`} 
                stroke="#4f46e5" // indigo-600
                strokeWidth="6" 
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            );
          })}

        </svg>

        {/* Nodes layer */}
        <div className="absolute inset-0">
          {ROWS.map(row => (
            COLS.map(col => renderNode(row, col))
          ))}
        </div>

      </div>
      
    </div>
  );
}
