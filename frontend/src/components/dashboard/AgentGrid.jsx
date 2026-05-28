import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants.js';

const agents = [
  { id: 'researching', label: 'Research' },
  { id: 'planning', label: 'Planner' },
  { id: 'prioritizing', label: 'Productivity' },
  { id: 'summarizing', label: 'Summary' },
  { id: 'structuring', label: 'Engine' },
];

export default function AgentGrid({ phase = 'idle', isLoading = false, hasResult = false }) {
  const phaseOrder = ['researching', 'planning', 'prioritizing', 'summarizing', 'structuring'];

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
            className={`flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-300 ${
              isActive
                ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-50 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                : isComplete
                ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
                : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.04]'
            }`}
          >
            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 animate-pulse" />}
            {isComplete && !isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
            {!isActive && !isComplete && <span className="h-1.5 w-1.5 rounded-full bg-slate-500/50" />}
            {agent.label}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
