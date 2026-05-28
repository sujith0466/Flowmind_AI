export const EXECUTION_PHASES = [
  {
    id: 'research',
    label: 'Phase 1 - Research',
    name: 'Research',
    description: 'Clarify context, constraints, and leverage points.',
  },
  {
    id: 'planning',
    label: 'Phase 2 - Planning',
    name: 'Planning',
    description: 'Turn insight into sequence, scope, and priorities.',
  },
  {
    id: 'execution',
    label: 'Phase 3 - Execution',
    name: 'Execution',
    description: 'Ship the core work and create visible momentum.',
  },
  {
    id: 'optimization',
    label: 'Phase 4 - Optimization',
    name: 'Optimization',
    description: 'Measure, improve, and prepare the next iteration.',
  },
];

const PHASE_ALIASES = {
  'phase 1': 'Research',
  'phase 1 research': 'Research',
  research: 'Research',
  discovery: 'Research',
  analysis: 'Research',
  'phase 2': 'Planning',
  'phase 2 planning': 'Planning',
  planning: 'Planning',
  plan: 'Planning',
  strategy: 'Planning',
  'phase 3': 'Execution',
  'phase 3 execution': 'Execution',
  execution: 'Execution',
  execute: 'Execution',
  implementation: 'Execution',
  delivery: 'Execution',
  'phase 4': 'Optimization',
  'phase 4 optimization': 'Optimization',
  optimization: 'Optimization',
  optimisation: 'Optimization',
  iteration: 'Optimization',
  improvement: 'Optimization',
};

const RESEARCH_CUES = ['research', 'market', 'customer', 'user', 'competitor', 'analyze', 'analysis', 'insight', 'requirement', 'risk', 'constraint', 'survey'];
const PLANNING_CUES = ['plan', 'roadmap', 'strategy', 'scope', 'prioritize', 'define', 'schedule', 'outline', 'architecture', 'calendar', 'curriculum'];
const EXECUTION_CUES = ['build', 'create', 'implement', 'launch', 'deploy', 'ship', 'submit', 'record', 'publish', 'write', 'practice', 'deliver'];
const OPTIMIZATION_CUES = ['optimize', 'measure', 'analytics', 'improve', 'iterate', 'scale', 'refine', 'retrospective', 'post-launch', 'follow-up'];

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, ' ')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\s+/g, ' ');
}

export function inferExecutionPhase(text = '', index = 0) {
  const normalized = normalizeText(text);
  if (OPTIMIZATION_CUES.some(cue => normalized.includes(cue))) return 'Optimization';
  if (EXECUTION_CUES.some(cue => normalized.includes(cue))) return 'Execution';
  if (PLANNING_CUES.some(cue => normalized.includes(cue))) return 'Planning';
  if (RESEARCH_CUES.some(cue => normalized.includes(cue))) return 'Research';
  if (index === 0) return 'Research';
  if (index === 1) return 'Planning';
  return 'Execution';
}

export function normalizeExecutionPhase(phase, fallback = 'Execution') {
  if (typeof phase !== 'string') return fallback;

  const normalized = normalizeText(phase);
  return PHASE_ALIASES[normalized] || (EXECUTION_PHASES.some(item => item.name === phase.trim()) ? phase.trim() : fallback);
}

export function phaseForItem(item, index = 0) {
  const title = typeof item === 'object' && item !== null ? item.title || item.name || '' : item;
  const description = typeof item === 'object' && item !== null ? item.description || '' : '';
  const fallback = inferExecutionPhase(`${title} ${description}`, index);
  const phase = typeof item === 'object' && item !== null ? item.execution_phase || item.phase : undefined;

  return normalizeExecutionPhase(phase, fallback);
}

export function groupWorkflowByPhase(workflow) {
  const actionItems = Array.isArray(workflow?.action_items) ? workflow.action_items : [];
  const workflowSteps = Array.isArray(workflow?.workflow_steps) ? workflow.workflow_steps : [];
  const sourcePhases = Array.isArray(workflow?.execution_phases) ? workflow.execution_phases : [];

  return EXECUTION_PHASES.map(phase => {
    const sourcePhase = sourcePhases.find(item => normalizeExecutionPhase(item?.name || item?.label, phase.name) === phase.name);
    const phaseActions = Array.isArray(sourcePhase?.action_items)
      ? sourcePhase.action_items
      : actionItems.filter((item, index) => phaseForItem(item, index) === phase.name);
    const phaseSteps = Array.isArray(sourcePhase?.workflow_steps)
      ? sourcePhase.workflow_steps
      : workflowSteps.filter((item, index) => phaseForItem(item, index) === phase.name);

    return {
      ...phase,
      description: sourcePhase?.description || phase.description,
      action_items: phaseActions,
      workflow_steps: phaseSteps,
    };
  }).filter(phase => phase.action_items.length > 0 || phase.workflow_steps.length > 0);
}
