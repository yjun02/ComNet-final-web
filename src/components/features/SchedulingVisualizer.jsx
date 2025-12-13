import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SchedulingVisualizer() {
  const [mode, setMode] = useState('FCFS');
  const [packets, setPackets] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [queue, setQueue] = useState([]);

  // Packet generator
  useEffect(() => {
    const interval = setInterval(() => {
      if (queue.length < 5) {
        const priority = Math.random() > 0.5 ? 'High' : 'Low';
        const newPacket = {
          id: Date.now(),
          priority,
          color: priority === 'High' ? 'bg-red-500' : 'bg-blue-500',
        };
        setQueue(prev => [...prev, newPacket]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [queue.length]);

  // Packet processor
  useEffect(() => {
    const processInterval = setInterval(() => {
      if (queue.length > 0) {
        let packetToProcessIndex = 0;

        if (mode === 'Priority') {
          // Find first high priority packet
          const highPrioIndex = queue.findIndex(p => p.priority === 'High');
          if (highPrioIndex !== -1) {
            packetToProcessIndex = highPrioIndex;
          }
        }
        // FCFS and RR just take the first one (simplified for visual)
        
        const packet = queue[packetToProcessIndex];
        const newQueue = queue.filter((_, i) => i !== packetToProcessIndex);
        
        setQueue(newQueue);
        setProcessed(prev => [packet, ...prev].slice(0, 5));
      }
    }, 3000);
    return () => clearInterval(processInterval);
  }, [queue, mode]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Packet Scheduling Simulator</h3>
      
      <div className="flex gap-2 mb-6">
        {['FCFS', 'Priority'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              mode === m 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Queue */}
        <div className="border border-dashed border-gray-700 rounded p-4 min-h-[120px] relative">
          <div className="absolute top-2 left-2 text-xs text-gray-500">Input Queue</div>
          <div className="flex gap-2 flex-wrap mt-4">
            <AnimatePresence>
              {queue.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={`w-10 h-10 rounded ${p.color} flex items-center justify-center text-xs font-bold text-white shadow-lg`}
                >
                  {p.priority === 'High' ? 'H' : 'L'}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Router */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl">🔄</div>
          <div className="text-xs text-gray-500 mt-1">Processing</div>
        </div>

        {/* Output */}
        <div className="border border-dashed border-gray-700 rounded p-4 min-h-[120px] relative">
          <div className="absolute top-2 left-2 text-xs text-gray-500">Output Interface</div>
          <div className="flex gap-2 flex-wrap mt-4">
            <AnimatePresence>
              {processed.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={`w-10 h-10 rounded ${p.color} flex items-center justify-center text-xs font-bold text-white shadow-lg opacity-50`}
                >
                  {p.priority === 'High' ? 'H' : 'L'}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>Current Policy: <span className="text-emerald-400 font-bold">{mode}</span></p>
        <p className="text-xs mt-1">
          {mode === 'FCFS' && 'First Come First Served: 도착한 순서대로 처리합니다.'}
          {mode === 'Priority' && 'Priority: High(H, Red) 패킷이 Low(L, Blue) 패킷보다 먼저 처리됩니다.'}
        </p>
      </div>
    </div>
  );
}
