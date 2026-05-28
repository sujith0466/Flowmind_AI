import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants.js';
import PriorityBadge, { priorityForItem } from './PriorityBadge.jsx';
import { groupWorkflowByPhase } from './executionPhases.js';

function getStepTitle(step, fallback) {
  if (typeof step === 'object' && step !== null) {
    return step.title || step.name || fallback;
  }
  return String(step || fallback);
}

export default function WorkflowTimeline({ phase = 'idle', workflowSteps = [], workflow = null }) {
  const sourceWorkflow = workflow || { workflow_steps: workflowSteps };
  const phaseGroups = groupWorkflowByPhase(sourceWorkflow).filter(group => group.workflow_steps.length > 0);

  if (phaseGroups.length === 0) return null;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="glass-panel rounded-2xl p-5 sm:p-7">
      <h3 className="mb-6 text-xs font-bold tracking-widest uppercase text-cyan-200/80">Execution Roadmap</h3>
      <div className="space-y-8">
        {phaseGroups.map((group) => (
          <motion.section key={group.id} variants={fadeUp} className="border-l border-sky-200/15 pl-5">
            <div className="mb-4">
              <p className="text-[14px] font-bold text-white/95">{group.label}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-400/90">{group.description}</p>
            </div>

            <div className="space-y-5">
              {group.workflow_steps.map((step, index) => {
                const title = getStepTitle(step, `Step ${index + 1}`);
                const description = typeof step === 'object' && step !== null ? step.description : '';
                const priority = priorityForItem(step, index);

                return (
                  <div key={`${group.id}-${index}`} className="relative flex items-start gap-4">
                    <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-cyan-400/60 ring-2 ring-cyan-200/20" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
                        <p className="min-w-0 text-[14px] font-bold leading-5 text-slate-200">{title}</p>
                        <PriorityBadge priority={priority} />
                      </div>
                      {description && (
                        <p className="mt-2 text-[13px] text-slate-400/90 leading-relaxed">{description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>
    </motion.div>
  );
}
