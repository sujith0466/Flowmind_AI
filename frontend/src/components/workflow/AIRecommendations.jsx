import { motion } from 'framer-motion';
import { Lightbulb, Target, ShieldAlert, Database, ArrowRight } from 'lucide-react';
import { priorityForItem } from './PriorityBadge.jsx';
import { groupWorkflowByPhase } from './executionPhases.js';

export default function AIRecommendations({ workflow, history = [] }) {
  if (!workflow) return null;

  const actionItems = Array.isArray(workflow.action_items) ? workflow.action_items : [];
  const steps = Array.isArray(workflow.workflow_steps) ? workflow.workflow_steps : [];
  const allItems = [...actionItems, ...steps];
  
  if (allItems.length === 0) return null;

  let criticalCount = 0;
  let quickWinCount = 0;
  allItems.forEach((item, i) => {
    const prio = priorityForItem(item, i).toLowerCase();
    if (prio.includes('critical')) criticalCount++;
    if (prio.includes('quick')) quickWinCount++;
  });

  // Next Best Action
  let nextAction = 'Awaiting specific tasks to begin execution.';
  if (actionItems.length > 0) {
    nextAction = actionItems[0].title || actionItems[0].name || nextAction;
  } else if (steps.length > 0) {
    nextAction = steps[0].title || steps[0].name || nextAction;
  }

  // Priority Recommendation
  const phaseGroups = groupWorkflowByPhase(workflow);
  let priorityRec = "Focus on clearing high priority tasks immediately.";
  if (phaseGroups.length > 0 && phaseGroups[0].label.toLowerCase().includes('research')) {
    priorityRec = "Complete research tasks before moving to downstream implementation.";
  } else if (quickWinCount > 0) {
    priorityRec = "Execute quick wins first to build immediate execution momentum.";
  } else if (criticalCount > 0) {
    priorityRec = "Address critical blockers before moving to secondary tasks.";
  }

  // Risk Mitigation
  let riskRec = "Maintain current trajectory. No critical blockers detected.";
  if (criticalCount > 3) {
    riskRec = "High density of critical tasks. Delegate to reduce bottleneck risks.";
  } else if (criticalCount > 0) {
    riskRec = "Reduce execution risk by validating assumptions on critical path items.";
  } else if (allItems.length > 10) {
    riskRec = "High task volume. Ensure clear ownership to prevent scope creep.";
  }

  // Memory Insight
  let memoryInsight = "No historical patterns detected for this workflow type.";
  if (history && history.length > 0) {
    const summary = (workflow.summary || '').toLowerCase();
    const historyText = history.map(h => h.title || '').join(' ').toLowerCase();
    
    if (summary.includes('launch') || summary.includes('product')) {
      if (historyText.includes('launch') || historyText.includes('product')) {
        memoryInsight = "Similar launch workflows detected. Consider reusing previous validation strategies.";
      } else {
        memoryInsight = "New product domain detected. Document key decisions for future reference.";
      }
    } else if (summary.includes('startup') || summary.includes('business')) {
      if (historyText.includes('startup') || historyText.includes('business')) {
        memoryInsight = "Historical startup patterns identified. Leverage past market research.";
      } else {
        memoryInsight = "Similar startup workflows detected. Reuse past operational frameworks.";
      }
    } else {
      memoryInsight = `Analyzing against ${history.length} previous execution models to optimize routing.`;
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-12 w-full"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)] ring-1 ring-indigo-500/30">
          <Lightbulb size={20} className="text-indigo-400" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">AI Recommendations</h2>
          <p className="text-[13px] text-white/50">Proactive execution guidance</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/[0.05] transition-all hover:bg-white/[0.04]">
          <div className="mb-3 flex items-center gap-2">
            <Target size={16} className="text-cyan-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-cyan-200/80">Next Best Action</h3>
          </div>
          <p className="text-[15px] leading-relaxed text-white/90">{nextAction}</p>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/[0.05] transition-all hover:bg-white/[0.04]">
          <div className="mb-3 flex items-center gap-2">
            <ArrowRight size={16} className="text-emerald-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-200/80">Priority Strategy</h3>
          </div>
          <p className="text-[15px] leading-relaxed text-white/90">{priorityRec}</p>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/[0.05] transition-all hover:bg-white/[0.04]">
          <div className="mb-3 flex items-center gap-2">
            <ShieldAlert size={16} className="text-amber-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-200/80">Risk Mitigation</h3>
          </div>
          <p className="text-[15px] leading-relaxed text-white/90">{riskRec}</p>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/[0.05] transition-all hover:bg-white/[0.04]">
          <div className="mb-3 flex items-center gap-2">
            <Database size={16} className="text-violet-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-violet-200/80">Memory Context</h3>
          </div>
          <p className="text-[15px] leading-relaxed text-white/90">{memoryInsight}</p>
        </div>
      </div>
    </motion.div>
  );
}
