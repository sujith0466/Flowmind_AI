import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants.js';

const agents = [
  { id: 'analyzing', label: 'Research' },
  { id: 'planning', label: 'Planning' },
  { id: 'organizing', label: 'Orchestration' },
];

export default function AgentGrid({ phase = 'idle', isLoading = false, hasResult = false }) {
  const phaseOrder = ['analyzing', 'planning', 'organizing'];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-2">
      {agents.map((agent, index) => {
        const isActive = isLoading && phase === agent.id;
        const isComplete =
          hasResult ||
          (phase !== 'idle' && phaseOrder.indexOf(phase) > phaseOrder.indexOf(agent.id)) ||
          phase === 'completed';

        return (
          <motion.div
            key={agent.id}
            variants={fadeUp}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? 'border-cyan-200/40 bg-cyan-300/20 text-cyan-100'
                : isComplete
                ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100'
                : 'border-slate-300/15 bg-slate-300/5 text-slate-400'
            }`}
          >
            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyan-100 animate-pulse" />}
            {isComplete && !isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />}
            {!isActive && !isComplete && <span className="h-1.5 w-1.5 rounded-full bg-slate-400/60" />}
            {agent.label}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
