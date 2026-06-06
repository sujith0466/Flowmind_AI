import { motion } from 'framer-motion';
import { Database, Activity, GitCommit, Search, Layers } from 'lucide-react';

export default function AgentMemory({ history = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="mb-8 w-full animate-pulse overflow-hidden rounded-[1.85rem] bg-white/[0.025] p-5 ring-1 ring-white/[0.05]">
        <div className="mb-4 h-6 w-32 rounded bg-white/10"></div>
        <div className="h-4 w-48 rounded bg-white/5"></div>
      </div>
    );
  }

  const memoryActive = history && history.length > 0;
  const projectCount = memoryActive ? history.length : 0;
  
  // Lightweight memory insight logic based on simple heuristics
  const insights = [];
  if (memoryActive) {
    insights.push(`${projectCount} Previous execution plans available`);
    
    const text = history.map(h => h.title || '').join(' ').toLowerCase();
    if (text.includes('startup') || text.includes('launch') || text.includes('product')) {
      insights.push('Startup-related workflows detected');
      if (text.includes('launch')) insights.push('Product launch patterns identified');
    }
    if (text.includes('exam') || text.includes('study')) {
      insights.push('Educational study patterns identified');
    }
    if (insights.length < 3) {
      insights.push('Similar goals found in history');
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 w-full overflow-hidden rounded-[1.85rem] bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ring-1 ring-white/[0.08] backdrop-blur-xl"
    >
      <div className="flex flex-col items-start justify-between border-b border-white/[0.05] bg-white/[0.01] px-5 py-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className={`grid h-8 w-8 place-items-center rounded-full ring-1 ${memoryActive ? 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'bg-slate-500/20 text-slate-400 ring-slate-500/40'}`}>
            <Database size={14} />
          </div>
          <div>
            <h3 className="font-display text-[15px] font-bold text-white">Agent Memory</h3>
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/40">
              {memoryActive ? 'Context Layer: Active' : 'Context Layer: Inactive'}
            </p>
          </div>
        </div>
        {memoryActive && (
          <div className="mt-3 flex items-center gap-2 rounded-full bg-cyan-950/40 px-3 py-1.5 ring-1 ring-cyan-500/20 sm:mt-0">
            <Activity size={12} className="text-cyan-400" />
            <span className="text-[11px] font-bold text-cyan-200">{projectCount} Projects in Memory</span>
          </div>
        )}
      </div>

      {memoryActive ? (
        <div className="grid gap-px bg-white/[0.05] sm:grid-cols-2">
          <div className="bg-[#02040a]/50 p-5">
            <h4 className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-white/50">
              <Layers size={14} /> Recent Context
            </h4>
            <div className="space-y-3">
              {history.slice(0, 3).map((item, i) => (
                <div key={item.id || i} className="flex items-start gap-3">
                  <GitCommit size={14} className="mt-0.5 shrink-0 text-cyan-400/60" />
                  <p className="line-clamp-2 text-[13px] leading-relaxed text-white/80">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#02040a]/50 p-5">
            <h4 className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-white/50">
              <Search size={14} /> Memory Insights
            </h4>
            <div className="space-y-2">
              {insights.slice(0, 3).map((insight, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 ring-1 ring-white/[0.04]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                  <span className="text-[12px] font-medium text-white/70">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center">
          <p className="text-[13px] text-white/40">No previous workflows found. Memory context is empty.</p>
        </div>
      )}
    </motion.div>
  );
}
