import { useState, useRef, useCallback } from 'react';

export function useSimulation() {
  const [source, setSource] = useState('A1');
  const [currentPosition, setCurrentPosition] = useState('A1'); // Start at source
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState('Idle'); // Idle, Running, Completed
  const [path, setPath] = useState([]);
  const [remainingPath, setRemainingPath] = useState([]);
  const [traversedPath, setTraversedPath] = useState(['A1']);
  const [logs, setLogs] = useState([{ id: Date.now(), msg: 'Rover initialized at A1', time: new Date() }]);
  
  const timerRef = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs(prev => [{ id: Date.now() + Math.random(), msg, time: new Date() }, ...prev]);
  }, []);

  const handleSetSource = useCallback((node) => {
    if (status === 'Running') return;
    setSource(node);
    setCurrentPosition(node);
    setTraversedPath([node]);
    setPath([]);
    setRemainingPath([]);
    addLog(`Source set to ${node}`);
  }, [status, addLog]);

  const handleSetDestination = useCallback((node) => {
    if (status === 'Running') return;
    setDestination(node);
  }, [status]);

  const startSimulation = useCallback(async (startNode, destNode) => {
    if (!destNode) return;
    if (startNode === destNode) {
      addLog(`Rover is already at destination ${destNode}`);
      return;
    }

    setStatus('Running');
    setDestination(destNode);
    setTraversedPath([startNode]);
    
    addLog(`Requesting optimal path from ${startNode} to ${destNode}...`);

    try {
      const response = await fetch('http://localhost:3001/api/path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startNode, destinationNode: destNode })
      });

      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      const generatedPath = data.path; // e.g. ["A1", "B1", "C1"]
      
      setPath(generatedPath);
      setRemainingPath(generatedPath.slice(1)); // Exclude start node
      addLog(`Path received: ${generatedPath.join(' → ')}`);
      
      // Start Animation
      let step = 1;
      timerRef.current = setInterval(() => {
        if (step < generatedPath.length) {
          const nextNode = generatedPath[step];
          setCurrentPosition(nextNode);
          setRemainingPath(prev => prev.slice(1));
          setTraversedPath(prev => [...prev, nextNode]);
          addLog(`Rover moved to node ${nextNode}`);
          step++;
        } else {
          clearInterval(timerRef.current);
          setStatus('Completed');
          addLog(`Destination ${destNode} reached successfully.`);
        }
      }, 800);

    } catch (error) {
      console.error(error);
      addLog('Error: Failed to fetch path from API.');
      setStatus('Idle');
    }

  }, [addLog]);

  const resetSimulation = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentPosition(source);
    setDestination('');
    setStatus('Idle');
    setPath([]);
    setRemainingPath([]);
    setTraversedPath([source]);
    setLogs([{ id: Date.now(), msg: `Simulation reset to ${source}`, time: new Date() }]);
  }, [source]);

  return {
    source,
    currentPosition,
    destination,
    status,
    path,
    remainingPath,
    traversedPath,
    logs,
    startSimulation,
    resetSimulation,
    handleSetSource,
    handleSetDestination,
    addLog
  };
}
