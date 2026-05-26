import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowUp, CornerDownLeft, BrainCircuit, Sparkles } from 'lucide-react';
import { fadeUp } from '../../animations/variants.js';

const DEMO_PROMPTS = [
  "Plan a product launch for our new AI feature next month.",
  "Summarize our latest engineering sync and extract action items."
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
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {DEMO_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onChange(prompt)}
            className="flex items-center gap-1.5 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1.5 text-[11px] text-slate-200 transition-colors hover:bg-cyan-300/20 hover:text-white"
          >
            <Sparkles size={10} className="text-cyan-200" />
            <span className="truncate max-w-[200px]">{prompt}</span>
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="relative">
        <div className="relative overflow-hidden rounded-[1.85rem] bg-white/[0.025] p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.06] backdrop-blur-3xl transition-all focus-within:bg-white/[0.035] focus-within:ring-blue-500/30">
          <div className="flex px-4 pt-4">
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

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] px-4 pb-2 pt-4">
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
