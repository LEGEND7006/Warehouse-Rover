import { useSimulation } from '../hooks/useSimulation';
import Navbar from '../components/Navbar';
import WarehouseGrid from '../components/WarehouseGrid';
import ControlPanel from '../components/ControlPanel';
import ActivityLog from '../components/ActivityLog';

export default function Dashboard() {
  
  const simulation = useSimulation();

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950/50 backdrop-blur-3xl animate-fade-in relative z-10">
      
      <Navbar status={simulation.status} />

      <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[600px]">
            
            {/* Left Column: Grid */}
            <div className="lg:col-span-2 flex flex-col">
              <WarehouseGrid 
                currentPosition={simulation.currentPosition}
                destination={simulation.destination}
                traversedPath={simulation.traversedPath}
                remainingPath={simulation.remainingPath}
                handleSetDestination={simulation.handleSetDestination}
                status={simulation.status}
              />
            </div>
            
            {/* Right Column: Controls and Logs */}
            <div className="flex flex-col gap-6">
              
              <div className="flex-none">
                <ControlPanel 
                  currentPosition={simulation.currentPosition}
                  destination={simulation.destination}
                  status={simulation.status}
                  handleSetDestination={simulation.handleSetDestination}
                  startSimulation={simulation.startSimulation}
                  resetSimulation={simulation.resetSimulation}
                />
              </div>

              <div className="flex-1 min-h-[300px]">
                <ActivityLog logs={simulation.logs} />
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
