import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowUp, CornerDownLeft, BrainCircuit, Sparkles } from 'lucide-react';
import { fadeUp } from '../../animations/variants.js';

const WORKFLOW_TEMPLATES = [
  {
    title: "Startup Launch Strategy",
    description: "Plan a complete go-to-market and launch roadmap.",
    prompt: "Plan a product launch for our new AI feature next month. Include go-to-market strategy, marketing channels, and a weekly execution timeline."
  },
  {
    title: "AI Hackathon Sprint",
    description: "Rapidly build and deploy an AI prototype.",
    prompt: "Structure a 48-hour AI hackathon sprint. Map out architecture planning, MVP features, execution phases, and demo preparation."
  },
  {
    title: "Exam Preparation",
    description: "Organize study materials and timelines.",
    prompt: "Create a 4-week exam preparation system. Break down subjects, allocate daily study blocks, and build a review schedule with practice tests."
  },
  {
    title: "Product Roadmap",
    description: "Prioritize features and engineering cycles.",
    prompt: "Generate a Q3 product roadmap. Focus on technical debt reduction, two major feature releases, and prioritize tasks for the engineering team."
  },
  {
    title: "Content Strategy",
    description: "Plan a month of engaging professional content.",
    prompt: "Develop a 30-day LinkedIn content strategy. Include theme pillars, post formats, scheduling cadences, and engagement tactics."
  },
  {
    title: "Deep Work System",
    description: "Optimize daily routines for maximum focus.",
    prompt: "Design a deep work productivity system. Block out daily focus hours, minimize context switching, and establish weekly review rituals."
  }
];

export default function UploadPanel({ value, onChange, onSubmit, isLoading, error, phase = 'idle' }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <motion.div variants={fadeUp} className="w-full">
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORKFLOW_TEMPLATES.map((template, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSubmit(null, template.prompt)}
            disabled={isLoading}
            className="group relative flex flex-col items-start gap-2.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-900/10 hover:shadow-[0_8px_24px_-12px_rgba(34,211,238,0.25)] disabled:pointer-events-none disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative flex w-full items-center justify-between">
              <span className="text-[13px] font-semibold tracking-wide text-slate-200 transition-colors duration-300 group-hover:text-cyan-50">
                {template.title}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] transition-colors duration-300 group-hover:bg-cyan-400/20">
                <Sparkles size={12} className="text-slate-400 transition-colors duration-300 group-hover:text-cyan-300" />
              </div>
            </div>
            
            <span className="relative text-xs leading-relaxed text-slate-400/70 transition-colors duration-300 group-hover:text-slate-300/90 pr-4">
              {template.description}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="relative">
        <div className={`relative overflow-hidden rounded-[1.85rem] bg-white/[0.025] p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.5)] ring-1 backdrop-blur-3xl transition-all duration-500 ${isLoading ? 'ring-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'ring-white/[0.06] focus-within:bg-white/[0.035] focus-within:ring-blue-500/30'}`}>
          {isLoading && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
            />
          )}
          
          <div className="relative z-10 flex px-4 pt-4">
            <BrainCircuit size={18} className="mr-3 mt-1 shrink-0 text-white/30" />
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Provide notes, a meeting transcript, or an objective to orchestrate..."
              className="composer-input min-h-[80px] max-h-[400px] w-full text-[16px] leading-relaxed text-white placeholder:text-white/30 disabled:opacity-50"
            />
          </div>

          <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/[0.05] px-4 pb-2 pt-4">
            <div className="flex items-center gap-2">
              <span className="badge badge-active text-[10px]">Auto Orchestrate</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1 font-mono text-[10px] text-white/40 sm:flex">
                <CornerDownLeft size={10} /> Enter
              </span>
              <button
                type="submit"
                disabled={isLoading || !value.trim()}
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-white to-[#f0f4fb] shadow-[inset_0_-2px_6px_rgba(0,0,0,0.06),0_8px_20px_rgba(96,165,250,0.22)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(96,165,250,0.3)] disabled:pointer-events-none disabled:opacity-40"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-100/40 to-cyan-100/40 opacity-0 transition group-hover:opacity-100" />
                {isLoading ? <Loader2 size={16} className="relative text-[#050914] animate-spin-slow" /> : <ArrowUp size={16} strokeWidth={3} className="relative text-[#050914] transition-transform group-hover:-translate-y-0.5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute -bottom-8 left-0 text-sm font-medium text-rose-300"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
