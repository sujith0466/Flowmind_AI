export const APP_NAME = 'FlowMind AI';

export const routes = [
  { label: 'Landing', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Workflow Results', path: '/results' },
  { label: 'History', path: '/history' },
];

export const agentStages = [
  {
    name: 'Summarizer Agent',
    status: 'Ready',
    description: 'Condenses messy context into the useful signal.',
  },
  {
    name: 'Task Agent',
    status: 'Ready',
    description: 'Converts intent into prioritized execution tasks.',
  },
  {
    name: 'Planner Agent',
    status: 'Ready',
    description: 'Builds a sequenced action plan for momentum.',
  },
  {
    name: 'Organizer Agent',
    status: 'Ready',
    description: 'Structures outputs into a clean workflow timeline.',
  },
];
