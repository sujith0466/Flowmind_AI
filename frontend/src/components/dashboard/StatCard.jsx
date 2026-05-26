import { motion } from 'framer-motion';
import { fadeUp } from '../../animations/variants.js';

export default function StatCard({ label, value, helper }) {
  return (
    <motion.article
      variants={fadeUp}
      className="glass-panel flex h-[120px] flex-col justify-between rounded-xl p-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-slate-200">{label}</p>
      </div>
      <div>
        <p className="font-display text-2xl font-semibold tracking-tight text-primary">{value}</p>
        <p className="mt-1 text-[11px] text-muted">{helper}</p>
      </div>
    </motion.article>
  );
}
