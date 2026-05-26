import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '../animations/variants.js';
import { supabase } from '../lib/supabase.js';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setHistory(data);
      }
      setLoading(false);
    }

    fetchHistory();
  }, []);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      
      <motion.div variants={fadeUp} className="mb-12 border-b border-white/[0.05] pb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">Execution Archive</h1>
        <p className="mt-3 text-[16px] text-white/50">A chronological log of all orchestrations run in this workspace.</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="w-full rounded-[2.28rem] bg-[#04060b]/90 p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.05] backdrop-blur-3xl">
          <div className="min-h-[200px]">
            {loading ? (
              <div className="flex h-[200px] items-center justify-center text-white/30">
                <Loader2 size={24} className="animate-spin-slow" />
              </div>
            ) : history.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center text-white/40">
                <p className="text-[14px]">No orchestrations found in this workspace.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {history.map((item) => (
                  <div key={item.id} className="group flex items-center justify-between rounded-2xl px-5 py-4 transition-all hover:bg-white/[0.03]">
                    <div className="flex items-center gap-5 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] ring-1 ring-white/[0.06]">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[15px] font-medium text-white/90">{item.title}</div>
                        <div className="mt-1 text-[13px] text-white/40">{new Date(item.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="ml-4 flex shrink-0 items-center gap-6">
                      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-200 ring-1 ring-emerald-500/20">
                        Completed
                      </span>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white">
                        <MoreHorizontal size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
    </motion.div>
  );
}
