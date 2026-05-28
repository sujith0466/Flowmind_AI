import { motion } from 'framer-motion';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';
import { fadeUp, staggerContainer } from '../../animations/variants.js';
import PriorityBadge, { priorityForItem } from './PriorityBadge.jsx';
import { groupWorkflowByPhase } from './executionPhases.js';

function normalizeList(value) {
  return Array.isArray(value) ? value : [];
}

function getItemTitle(item, fallback) {
  if (typeof item === 'object' && item !== null) {
    return item.title || item.name || fallback;
  }
  return String(item || fallback);
}

export default function WorkflowResultsPanel({ workflow }) {
  if (!workflow) return null;

  const insights = normalizeList(workflow.key_insights);
  const steps = normalizeList(workflow.workflow_steps);
  const phaseGroups = groupWorkflowByPhase(workflow);
  const actionPhaseGroups = phaseGroups.filter(group => group.action_items.length > 0);
  
  const handleCopy = () => {
    let md = `# FlowMind AI: Strategic Execution Roadmap\n\n**Summary:**\n${workflow.summary || 'No summary returned.'}\n\n---\n\n`;
    
    if (insights.length) {
      md += `## 💡 Key Insights\n\n`;
      insights.forEach(i => md += `- ${i}\n`);
      md += `\n---\n\n`;
    }
    
    if (phaseGroups.length) {
      md += `## ⚡ Execution Pipeline\n\n`;
      phaseGroups.forEach((group, groupIdx) => {
        md += `### ${groupIdx + 1}. ${group.label}\n`;
        if (group.description) md += `*${group.description}*\n\n`;
        
        if (group.action_items.length) {
          md += `**Action Items:**\n`;
          group.action_items.forEach((action, index) => {
            const title = getItemTitle(action, `Action item ${index + 1}`);
            const prio = priorityForItem(action, index);
            md += `- [ ] **${title}**  \`[ Priority: ${prio} ]\`\n`;
          });
          md += `\n`;
        }
        
        if (group.workflow_steps.length) {
          md += `**Roadmap Steps:**\n`;
          group.workflow_steps.forEach((step, index) => {
            const title = getItemTitle(step, `Step ${index + 1}`);
            const prio = priorityForItem(step, index);
            md += `${index + 1}. **${title}**  \`[ Priority: ${prio} ]\`\n`;
          });
          md += `\n`;
        }
        
        md += `---\n\n`;
      });
    } else if (steps.length) {
      md += `## ⚡ Execution Roadmap\n\n`;
      steps.forEach((step, index) => {
        const title = getItemTitle(step, `Step ${index + 1}`);
        const prio = priorityForItem(step, index);
        md += `${index + 1}. **${title}**  \`[ Priority: ${prio} ]\`\n`;
      });
      md += `\n---\n\n`;
    }
    
    navigator.clipboard.writeText(md.trim());
    toast.success('Copied to clipboard');
  };

  const handleDownloadTxt = () => {
    let txt = `FLOWMIND AI: STRATEGIC EXECUTION ROADMAP\n========================================\n\n`;
    txt += `SUMMARY:\n${workflow.summary || 'No summary returned.'}\n\n`;
    txt += `----------------------------------------\n\n`;
    
    if (insights.length) {
      txt += `KEY INSIGHTS:\n`;
      insights.forEach(i => txt += `* ${i}\n`);
      txt += `\n----------------------------------------\n\n`;
    }
    
    if (phaseGroups.length) {
      txt += `EXECUTION PIPELINE:\n\n`;
      phaseGroups.forEach((group, groupIdx) => {
        txt += `${groupIdx + 1}. ${group.label.toUpperCase()}\n`;
        if (group.description) txt += `   ${group.description}\n`;
        txt += `\n`;
        
        if (group.action_items.length) {
          txt += `   ACTION ITEMS:\n`;
          group.action_items.forEach((action, index) => {
            const title = getItemTitle(action, `Action item ${index + 1}`);
            const prio = priorityForItem(action, index);
            txt += `   [ ] ${title} (Priority: ${prio})\n`;
          });
          txt += `\n`;
        }
        
        if (group.workflow_steps.length) {
          txt += `   ROADMAP STEPS:\n`;
          group.workflow_steps.forEach((step, index) => {
            const title = getItemTitle(step, `Step ${index + 1}`);
            const prio = priorityForItem(step, index);
            txt += `   ${index + 1}. ${title} (Priority: ${prio})\n`;
          });
          txt += `\n`;
        }
        
        txt += `----------------------------------------\n\n`;
      });
    } else if (steps.length) {
      txt += `EXECUTION ROADMAP:\n\n`;
      steps.forEach((step, index) => {
        const title = getItemTitle(step, `Step ${index + 1}`);
        const prio = priorityForItem(step, index);
        txt += `${index + 1}. ${title} (Priority: ${prio})\n`;
      });
      txt += `\n----------------------------------------\n\n`;
    }
    
    const blob = new Blob([txt.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Execution_Roadmap_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Downloaded TXT export');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative mx-auto mt-12 w-full max-w-[800px] space-y-14">
      <motion.div variants={fadeUp} className="absolute right-0 top-0 flex flex-col gap-2 sm:flex-row sm:items-center">
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md border border-sky-200/25 bg-sky-300/10 px-3 py-1.5 text-[11px] font-medium text-slate-100 transition-colors hover:bg-sky-300/20"
        >
          <Copy size={12} className="text-cyan-200" />
          Copy MD
        </button>
        <button 
          onClick={handleDownloadTxt}
          className="flex items-center gap-2 rounded-md border border-indigo-200/25 bg-indigo-300/10 px-3 py-1.5 text-[11px] font-medium text-slate-100 transition-colors hover:bg-indigo-300/20"
        >
          <Download size={12} className="text-indigo-200" />
          Export TXT
        </button>
      </motion.div>

      <motion.div variants={fadeUp} className="border-b border-sky-200/15 pb-8 pt-12 pr-0 sm:pb-10 sm:pt-0 sm:pr-24">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">Execution Plan</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-400 sm:text-[16px]">{workflow.summary || 'No summary returned.'}</p>
      </motion.div>

      {insights.length > 0 && (
        <motion.section variants={fadeUp}>
          <h3 className="mb-5 text-xs font-bold tracking-widest uppercase text-cyan-200/80">Key Insights</h3>
          <ul className="space-y-3">
            {insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-4 text-[15px] text-slate-300 leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                {insight}
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {actionPhaseGroups.length > 0 && (
        <motion.section variants={fadeUp}>
          <h3 className="mb-5 text-xs font-bold tracking-widest uppercase text-cyan-200/80">Execution Pipeline</h3>
          <div className="space-y-6">
            {actionPhaseGroups.map((group) => (
              <div key={group.id} className="rounded-2xl border border-sky-200/10 bg-[#070d1d]/60 p-4 shadow-sm backdrop-blur-sm sm:p-5">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[14px] font-bold text-white/95">{group.label}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-400/90">{group.description}</p>
                  </div>
                  <span className="text-xs font-semibold tracking-wide text-slate-500">
                    {group.action_items.length} action{group.action_items.length === 1 ? '' : 's'}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.action_items.map((item, i) => {
                    const title = getItemTitle(item, `Action item ${i + 1}`);
                    const priority = priorityForItem(item, i);

                    return (
                      <div key={`${group.id}-${i}`} className="group flex flex-col gap-2 rounded-xl px-4 py-3 transition-colors hover:bg-sky-300/[0.04] sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded border border-sky-200/40 transition-colors group-hover:border-cyan-400/80 group-hover:bg-cyan-400/10" />
                          <span className="min-w-0 text-[15px] font-medium leading-relaxed text-slate-200 transition-colors group-hover:text-white">{title}</span>
                        </div>
                        <PriorityBadge priority={priority} className="ml-7 self-start sm:ml-3 sm:self-center" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}
      
    </motion.div>
  );
}
