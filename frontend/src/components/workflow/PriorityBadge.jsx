import { cn } from '../../utils/cn.js';

const PRIORITY_ALIASES = {
  critical: 'Critical',
  urgent: 'Critical',
  blocker: 'Critical',
  high: 'High Impact',
  'high impact': 'High Impact',
  important: 'High Impact',
  medium: 'Quick Win',
  normal: 'Quick Win',
  quick: 'Quick Win',
  'quick win': 'Quick Win',
  low: 'Long Term',
  long: 'Long Term',
  'long term': 'Long Term',
  future: 'Long Term',
};

const PRIORITY_STYLES = {
  Critical: 'bg-rose-400/10 text-rose-100 ring-rose-300/25',
  'High Impact': 'bg-cyan-300/10 text-cyan-100 ring-cyan-200/25',
  'Quick Win': 'bg-emerald-300/10 text-emerald-100 ring-emerald-200/25',
  'Long Term': 'bg-violet-300/10 text-violet-100 ring-violet-200/25',
};

const CRITICAL_CUES = ['deadline', 'blocker', 'launch', 'submit', 'deploy', 'exam', 'due'];
const QUICK_WIN_CUES = ['draft', 'outline', 'quick', 'review', 'organize', 'clarify', 'list'];
const LONG_TERM_CUES = ['optimize', 'measure', 'scale', 'improve', 'iterate', 'follow', 'post'];

export function inferPriority(text = '', index = 0) {
  const normalized = String(text).toLowerCase();
  if (CRITICAL_CUES.some(cue => normalized.includes(cue))) return 'Critical';
  if (QUICK_WIN_CUES.some(cue => normalized.includes(cue))) return 'Quick Win';
  if (LONG_TERM_CUES.some(cue => normalized.includes(cue))) return 'Long Term';
  if (index === 0) return 'Critical';
  return 'High Impact';
}

export function normalizePriority(priority, fallback = 'High Impact') {
  if (typeof priority !== 'string') return fallback;

  const normalized = priority.trim().toLowerCase().replaceAll('_', ' ').replaceAll('-', ' ');
  const canonical = PRIORITY_ALIASES[normalized];
  if (canonical) return canonical;

  const trimmed = priority.trim();
  return PRIORITY_STYLES[trimmed] ? trimmed : fallback;
}

export function priorityForItem(item, index = 0) {
  const title = typeof item === 'object' && item !== null ? item.title || item.name || '' : item;
  const description = typeof item === 'object' && item !== null ? item.description || '' : '';
  const fallback = inferPriority(`${title} ${description}`, index);
  const priority = typeof item === 'object' && item !== null ? item.priority : undefined;

  return normalizePriority(priority, fallback);
}

export default function PriorityBadge({ priority, className = '' }) {
  const label = normalizePriority(priority);

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-[11px] font-medium leading-5 ring-1',
        PRIORITY_STYLES[label],
        className
      )}
    >
      {label}
    </span>
  );
}
