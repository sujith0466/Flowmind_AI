import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { fadeUp } from '../../animations/variants.js';

const logsData = {
  analyzing: [
    "[System] Initializing context extraction engine...",
    "[Research Agent] Parsing raw input constraints...",
    "[Research Agent] Normalizing text into semantic blocks...",
    "[Research Agent] Identifying core objectives..."
  ],
  planning: [
    "[System] Handoff to Planner Agent.",
    "[Planner Agent] Mapping dependencies and prerequisites...",
    "[Planner Agent] Generating priority matrix...",
    "[Planner Agent] Formatting task list..."
  ],
  organizing: [
    "[System] Handoff to Organizer Agent.",
    "[Organizer Agent] Compiling structured document...",
    "[Organizer Agent] Validating schema constraints...",
    "[Organizer Agent] Finalizing execution plan..."
  ]
};

export default function LiveTerminal({ phase }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (phase === 'idle' || phase === 'completed') return;

    const currentPhaseLogs = logsData[phase] || logsData.analyzing;
    let index = 0;
    
    // Clear previous logs on phase change, or append? Let's just append for realism.
    const interval = setInterval(() => {
      if (index < currentPhaseLogs.length) {
        const newLine = currentPhaseLogs[index];
        setLogs(prev => [...prev.slice(-4), newLine]); // Keep last 5 logs
        index++;
      }
    }, 400);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <motion.div variants={fadeUp} className="mt-6 w-full max-w-[800px] rounded-xl border border-sky-200/15 bg-[#0c152d]/85 p-4 font-mono text-[12px] shadow-[0_10px_30px_rgba(8,16,40,0.45)]">
      <div className="mb-3 flex items-center gap-2 border-b border-sky-200/10 pb-2 text-slate-300/70">
        <Terminal size={14} className="text-cyan-200" />
        <span className="uppercase tracking-widest text-[10px]">Live Execution Terminal</span>
      </div>
      
      <div className="min-h-[100px] flex flex-col justify-end space-y-1">
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div
            key={`${log}-${i}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`leading-relaxed ${log.includes('[System]') ? 'text-slate-300/70' : 'text-cyan-200'}`}
          >
              <span className="mr-2 text-blue-300/70">{'>'}</span>
              {log}
            </motion.div>
          ))}
          <motion.div
            key="cursor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="mt-1 h-3 w-2 bg-cyan-200/70"
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
