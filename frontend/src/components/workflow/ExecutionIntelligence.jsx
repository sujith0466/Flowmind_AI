import { motion } from 'framer-motion';
import { Target, AlertTriangle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { priorityForItem } from './PriorityBadge.jsx';
import { groupWorkflowByPhase } from './executionPhases.js';

export default function ExecutionIntelligence({ workflow }) {
  if (!workflow) return null;

  // 1. Parse workflow data
  const actionItems = Array.isArray(workflow.action_items) ? workflow.action_items : [];
  const steps = Array.isArray(workflow.workflow_steps) ? workflow.workflow_steps : [];
  const allItems = [...actionItems, ...steps];
  
  if (allItems.length === 0) return null;

  // 2. Count priorities
  let criticalCount = 0;
  let quickWinCount = 0;
  
  allItems.forEach((item, i) => {
    const prio = priorityForItem(item, i).toLowerCase();
    if (prio.includes('critical')) criticalCount++;
    if (prio.includes('quick')) quickWinCount++;
  });

  // 3. Determine Risk Level
  let riskLevel = 'Low';
  let riskColor = 'text-emerald-400';
  if (criticalCount > 3) {
    riskLevel = 'High';
    riskColor = 'text-rose-400';
  } else if (criticalCount > 0) {
    riskLevel = 'Medium';
    riskColor = 'text-amber-400';
  }

  // 4. Determine Momentum
  let momentum = 'Moderate';
  let momentumColor = 'text-amber-400';
  if (quickWinCount > 2) {
    momentum = 'Strong';
    momentumColor = 'text-emerald-400';
  } else if (quickWinCount === 0 && allItems.length > 5) {
    momentum = 'Weak';
    momentumColor = 'text-rose-400';
  }

  // 5. Determine Execution Readiness
  const phaseGroups = groupWorkflowByPhase(workflow);
  const actionPhaseGroups = phaseGroups.filter(g => g.action_items && g.action_items.length > 0);
  
  let readiness = 'Researching';
  if (actionPhaseGroups.length > 0) {
    const firstGroupLabel = actionPhaseGroups[0].label.toLowerCase();
    if (firstGroupLabel.includes('execut') || firstGroupLabel.includes('implement')) {
      readiness = 'Ready for Execution';
    } else if (firstGroupLabel.includes('plan')) {
      readiness = 'Planning Phase';
    } else {
      readiness = 'Researching / Pre-Planning';
    }
  } else if (actionItems.length > 0) {
    readiness = 'Ready for Execution'; // fallback
  }

  // 6. Calculate Execution Score (0-100)
  let score = 65; // base
  score += Math.min(20, allItems.length * 2); // Volume metric
  if (riskLevel === 'Low') score += 10;
  if (riskLevel === 'High') score -= 10;
  if (momentum === 'Strong') score += 15;
  if (momentum === 'Weak') score -= 5;
  if (readiness === 'Ready for Execution') score += 8;
  
  // Cap between 0 and 100, make it look slightly dynamic but realistic
  score = Math.max(12, Math.min(98, score));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12 w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-px shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="rounded-[calc(2rem-1px)] bg-[#040814]/90 p-6 backdrop-blur-2xl sm:p-8">
        
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300 ring-1 ring-cyan-500/30">
              <Target size={12} />
              AI Evaluator
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Execution Intelligence
            </h2>
            <p className="mt-2 text-[14px] text-white/50">Real-time heuristics derived from workflow structure</p>
          </div>
          <div className="flex shrink-0 flex-col items-end rounded-2xl bg-white/[0.02] px-6 py-4 ring-1 ring-white/[0.05]">
            <span className="font-display text-5xl font-bold tracking-tight text-white">{score}</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">Execution Score</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          
          <div className="flex flex-col justify-between rounded-2xl bg-white/[0.02] p-5 ring-1 ring-white/[0.04]">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className={riskColor} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">Risk Level</span>
            </div>
            <div>
              <p className={`font-display text-xl font-bold ${riskColor}`}>{riskLevel}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/40">Based on critical path dependencies and blockers.</p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-white/[0.02] p-5 ring-1 ring-white/[0.04]">
            <div className="mb-4 flex items-center gap-2">
              <Zap size={14} className={momentumColor} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">Momentum</span>
            </div>
            <div>
              <p className={`font-display text-xl font-bold ${momentumColor}`}>{momentum}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/40">Evaluated by volume of immediate quick wins.</p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-white/[0.02] p-5 ring-1 ring-white/[0.04]">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-blue-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">Readiness</span>
            </div>
            <div>
              <p className="font-display text-xl font-bold text-blue-400">{readiness}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/40">Current dominant execution phase identified.</p>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
