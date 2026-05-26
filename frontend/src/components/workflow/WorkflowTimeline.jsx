import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants.js';

export default function WorkflowTimeline({ phase = 'idle', workflowSteps = [] }) {
  if (workflowSteps.length === 0) return null;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="glass-panel rounded-2xl p-6">
      <h3 className="mb-4 text-sm font-medium text-primary">Execution Roadmap</h3>
      <div className="space-y-4 relative">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-sky-200/20" />
        
        {workflowSteps.map((step, index) => (
          <motion.div key={index} variants={fadeUp} className="relative flex items-start gap-4">
            <div className="z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#0b1228] bg-cyan-300/60 ring-1 ring-cyan-200/40" />
            <div>
              <p className="text-[13px] font-semibold text-primary">{step.title}</p>
              {step.description && (
                <p className="mt-1 text-xs text-muted leading-relaxed">{step.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
