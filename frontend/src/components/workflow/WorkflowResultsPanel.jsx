import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { fadeUp, staggerContainer } from '../../animations/variants.js';

function normalizeList(value) {
  return Array.isArray(value) ? value : [];
}

export default function WorkflowResultsPanel({ workflow }) {
  if (!workflow) return null;

  const insights = normalizeList(workflow.key_insights);
  const actions = normalizeList(workflow.action_items);
  
  const handleCopy = () => {
    let md = `# Execution Plan\n\n${workflow.summary || 'No summary.'}\n\n`;
    if (insights.length) {
      md += `## Key Insights\n`;
      insights.forEach(i => md += `- ${i}\n`);
      md += `\n`;
    }
    if (actions.length) {
      md += `## Action Items\n`;
      actions.forEach(a => md += `- [ ] ${a.title || a} (Priority: ${a.priority || 'Normal'})\n`);
    }
    navigator.clipboard.writeText(md);
    toast.success('Copied to clipboard');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative mx-auto mt-12 w-full max-w-[800px] space-y-12">
      <motion.div variants={fadeUp} className="absolute right-0 top-0">
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md border border-sky-200/25 bg-sky-300/10 px-3 py-1.5 text-[11px] font-medium text-slate-100 transition-colors hover:bg-sky-300/20"
        >
          <Copy size={12} className="text-cyan-200" />
          Copy MD
        </button>
      </motion.div>

      <motion.div variants={fadeUp} className="border-b border-sky-200/15 pb-8 pr-24">
        <h1 className="font-display text-2xl font-semibold text-primary">Workflow Execution Plan</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{workflow.summary || 'No summary returned.'}</p>
      </motion.div>

      {insights.length > 0 && (
        <motion.section variants={fadeUp}>
          <h3 className="mb-4 text-sm font-semibold text-primary">Key Insights</h3>
          <ul className="space-y-2">
            {insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] text-muted leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                {insight}
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {actions.length > 0 && (
        <motion.section variants={fadeUp}>
          <h3 className="mb-4 text-sm font-semibold text-primary">Action Items</h3>
          <div className="space-y-1">
            {actions.map((item, i) => (
              <div key={i} className="group flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-sky-300/10">
                <div className="flex items-center gap-3">
                  <div className="h-3.5 w-3.5 rounded border border-sky-200/40 transition-colors group-hover:border-cyan-200/80" />
                  <span className="text-[14px] text-primary">{item.title || String(item)}</span>
                </div>
                {typeof item === 'object' && item.priority && (
                  <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-200">{item.priority}</span>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}
      
    </motion.div>
  );
}
