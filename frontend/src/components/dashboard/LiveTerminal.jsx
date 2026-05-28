import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { fadeUp } from '../../animations/variants.js';

const logsData = {
  researching: [
    "[System] Allocating context extraction nodes...",
    "[Research Agent] Parsing raw input constraints...",
    "[Research Agent] Building semantic dependency graph...",
    "[Research Agent] Core objectives isolated."
  ],
  planning: [
    "[System] Context verified. Handoff to Planner Agent.",
    "[Planner Agent] Constructing execution roadmap...",
    "[Planner Agent] Mapping node prerequisites...",
    "[Planner Agent] Roadmap finalized."
  ],
  prioritizing: [
    "[System] Roadmap active. Handoff to Productivity Agent.",
    "[Productivity Agent] Calculating workload distribution...",
    "[Productivity Agent] Balancing phase complexity...",
    "[Productivity Agent] Priority vectors assigned."
  ],
  summarizing: [
    "[System] Priorities locked. Handoff to Summary Agent.",
    "[Summary Agent] Organizing output schemas...",
    "[Summary Agent] Validating against execution constraints...",
    "[Summary Agent] Metrics compilation complete."
  ],
  structuring: [
    "[System] Final handoff to Workflow Engine.",
    "[Workflow Engine] Assembling execution pipeline...",
    "[Workflow Engine] Optimizing final parameters...",
    "[Workflow Engine] System prompt finalized. Generating..."
  ]
};

export default function LiveTerminal({ phase }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (phase === 'idle' || phase === 'completed') return;

    const currentPhaseLogs = logsData[phase] || logsData.researching;
    let index = 0;
    
    // Clear previous logs on phase change, or append? Let's just append for realism.
    const interval = setInterval(() => {
      if (index < currentPhaseLogs.length) {
        const newLine = currentPhaseLogs[index];
        setLogs(prev => [...prev.slice(-4), newLine]); // Keep last 5 logs
        index++;
      }
    }, 300);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <motion.div variants={fadeUp} className="mt-6 w-full max-w-[800px] rounded-2xl border border-sky-300/10 bg-[#070c1a]/95 p-5 font-mono text-[12px] shadow-[0_12px_40px_rgba(8,16,40,0.6)] ring-1 ring-white/[0.02] backdrop-blur-md">
      <div className="mb-4 flex items-center gap-2.5 border-b border-sky-200/10 pb-3 text-slate-300/70">
        <Terminal size={14} className="text-cyan-400" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Live Execution Terminal</span>
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
