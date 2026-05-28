import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleDot,
  FileText,
  GitBranch,
  Layers3,
  ListChecks,
  Network,
  Search,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const navItems = [
  { label: 'Product', href: '#hero' },
  { label: 'Agents', href: '#agents' },
  { label: 'Workflow', href: '#workflow' },
];

const agentNodes = [
  {
    name: 'Research',
    detail: 'Signal extraction',
    icon: Search,
    className: 'left-[8%] top-[26%]',
    color: 'cyan',
    delay: 0.08,
  },
  {
    name: 'Planner',
    detail: 'Action synthesis',
    icon: GitBranch,
    className: 'right-[8%] top-[26%]',
    color: 'violet',
    delay: 0.22,
  },
  {
    name: 'Workflow OS',
    detail: 'Execution map',
    icon: Workflow,
    className: 'right-[8%] bottom-[26%]',
    color: 'blue',
    delay: 0.34,
  },
  {
    name: 'Operator',
    detail: 'Structured output',
    icon: ListChecks,
    className: 'left-[8%] bottom-[26%]',
    color: 'emerald',
    delay: 0.46,
  },
];

const executionRows = [
  { label: 'Parse source context', icon: FileText },
  { label: 'Extract constraints', icon: BrainCircuit },
  { label: 'Prioritize next actions', icon: CheckCircle2 },
  { label: 'Render workflow roadmap', icon: Layers3 },
];

function PageSection({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative w-full min-w-0 ${className}`}>
      {children}
    </section>
  );
}

function AmbientSystem() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
      <motion.div
        animate={{ opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-[-25rem] h-[55rem] w-full max-w-[78rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15),rgba(99,102,241,0.08)_38%,transparent_66%)] blur-[80px] will-change-[opacity]"
      />
      <motion.div
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-10%] top-[15rem] h-[45rem] w-[45rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_66%)] blur-[80px] will-change-[opacity]"
      />
      <motion.div
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-10%] top-[15rem] h-[45rem] w-[45rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.1),transparent_66%)] blur-[80px] will-change-[opacity]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,4,10,0.2),rgba(2,4,10,0.85)_70%,#02040a)]" />
      <div className="surface-grid absolute inset-0 opacity-[0.03]" />
      <div className="noise-overlay opacity-[0.08]" />
    </div>
  );
}

function PremiumCta({ children, to, href, variant = 'primary' }) {
  const className =
    variant === 'primary'
      ? 'group relative inline-flex items-center justify-center overflow-hidden rounded-[1.15rem] bg-gradient-to-b from-white to-[#f0f4fb] px-7 py-4 text-sm font-bold text-[#050914] shadow-[inset_0_-2px_10px_rgba(0,0,0,0.06),0_12px_45px_rgba(59,130,246,0.22)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_-2px_10px_rgba(0,0,0,0.04),0_18px_60px_rgba(59,130,246,0.32)] hover:ring-blue-500/20'
      : 'group relative inline-flex items-center justify-center rounded-[1.15rem] bg-white/[0.035] px-7 py-4 text-sm font-semibold text-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.08] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:text-white hover:ring-white/[0.14] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_45px_rgba(0,0,0,0.35)]';

  const content = (
    <span className="relative flex items-center gap-2">
      {variant === 'primary' ? <span className="absolute inset-[-1.2rem] -z-10 bg-[radial-gradient(circle,rgba(147,197,253,0.42),transparent_62%)] opacity-0 blur-xl transition group-hover:opacity-100" /> : null}
      {children}
    </span>
  );

  if (to) {
    return <Link to={to} className={className}>{content}</Link>;
  }

  return <a href={href} className={className}>{content}</a>;
}

function FloatingNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      className="sticky top-5 z-50 flex w-full min-w-0 justify-center py-2"
    >
      <nav className="flex w-full max-w-[980px] min-w-0 items-center justify-between gap-3 rounded-full bg-[#03050d]/70 px-3 py-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_24px_100px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.08] backdrop-blur-md">
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1.5">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,rgba(147,197,253,0.18),rgba(255,255,255,0.08),rgba(34,211,238,0.12))] text-blue-100 ring-1 ring-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_0_40px_rgba(59,130,246,0.18)]">
            <Sparkles size={17} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-cyan-300 ring-2 ring-[#07080d]" />
          </span>
          <span className="hidden truncate font-display text-base font-bold tracking-tight text-white sm:block">FlowMind AI</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full bg-white/[0.025] p-1 ring-1 ring-white/[0.045] md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-white/50 transition hover:bg-white/[0.055] hover:text-white hover:shadow-sm">
              {item.label}
            </a>
          ))}
        </div>

        <Link to="/dashboard" className="group relative overflow-hidden rounded-full bg-gradient-to-b from-white to-[#f0f4fb] px-5 py-2.5 text-sm font-bold text-[#050914] shadow-[inset_0_-2px_8px_rgba(0,0,0,0.06),0_12px_40px_rgba(96,165,250,0.18)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.04),0_16px_50px_rgba(96,165,250,0.28)] hover:ring-blue-500/20">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-white/40 to-cyan-100/40 opacity-0 transition group-hover:opacity-100" />
          <span className="relative flex items-center gap-2">
            Dashboard <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </nav>
    </motion.header>
  );
}

function HeroSection() {
  return (
    <PageSection id="hero" className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center py-24 text-center lg:py-28">
      <div className="flex w-full flex-col items-center">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex w-full flex-col items-center">
        <motion.div variants={fadeUp} transition={{ duration: 0.65, ease }} className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full bg-white/[0.055] px-3.5 py-2 text-xs font-semibold text-white/68 ring-1 ring-white/[0.09] backdrop-blur-lg">
          <span className="status-live h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
          Multi-agent productivity operating system
        </motion.div>

        <motion.h1 variants={fadeUp} transition={{ duration: 0.86, ease }} className="mx-auto max-w-[1120px] text-balance font-display text-[3.45rem] font-bold leading-[0.9] tracking-[-0.08em] text-white sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.2rem]">
          The calm way to orchestrate work with AI agents.
        </motion.h1>

        <motion.p variants={fadeUp} transition={{ duration: 0.76, ease }} className="mx-auto mt-8 max-w-[690px] text-pretty text-lg leading-8 text-white/60 sm:text-xl sm:leading-9">
          FlowMind AI turns loose notes into research, action plans, and workflow roadmaps through a cinematic multi-agent execution engine.
        </motion.p>

        <motion.div variants={fadeUp} transition={{ duration: 0.72, ease }} className="mt-11 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <PremiumCta to="/dashboard">
            Start building free <ArrowRight size={18} />
          </PremiumCta>
          <PremiumCta href="#orchestration" variant="secondary">
            View orchestration <Network size={17} />
          </PremiumCta>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.72, ease }} className="mt-12 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
          {['Research', 'Plan', 'Execute'].map((item, index) => (
            <div key={item} className="flex min-w-0 items-center justify-center gap-2 rounded-full bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white/54 ring-1 ring-white/[0.05] backdrop-blur-md">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-300/10 font-mono text-[10px] text-blue-100 ring-1 ring-blue-200/14">{index + 1}</span>
              {item}
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, delay: 0.2, ease }} className="pointer-events-none relative mt-20 flex w-full flex-col items-center justify-center opacity-80">
          <div className="relative h-32 w-px bg-gradient-to-b from-blue-400/0 via-blue-400/20 to-blue-400/0">
            <motion.div animate={{ y: [0, 128], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-1/2 top-0 h-16 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
          </div>
          <div className="absolute top-1/2 h-48 w-4/5 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px]" />
        </motion.div>
        </motion.div>
      </div>
    </PageSection>
  );
}

function nodeTone(color) {
  const map = {
    cyan: 'from-cyan-300/[0.16] text-cyan-100 ring-cyan-200/18',
    violet: 'from-violet-300/[0.16] text-violet-100 ring-violet-200/18',
    blue: 'from-blue-300/[0.16] text-blue-100 ring-blue-200/18',
    emerald: 'from-emerald-300/[0.14] text-emerald-100 ring-emerald-200/18',
  };

  return map[color] || map.blue;
}

function AgentNode({ agent, index }) {
  const Icon = agent.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
      transition={{ opacity: { delay: 0.75 + agent.delay, duration: 0.45 }, scale: { delay: 0.75 + agent.delay, duration: 0.45 }, y: { delay: index * 0.16, duration: 6.6, repeat: Infinity, ease: 'easeInOut' } }}
      className={`absolute z-30 hidden w-[13.75rem] max-w-full rounded-[1.65rem] bg-[#050811]/85 p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_24px_90px_rgba(0,0,0,0.44)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:block ${agent.className}`}
    >
      <motion.div className={`absolute inset-0 rounded-[1.65rem] ring-1 ${nodeTone(agent.color).split(' ')[2]}`} animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: agent.delay }} />
      <div className={`absolute inset-0 rounded-[1.65rem] bg-gradient-to-br ${nodeTone(agent.color)} to-transparent opacity-[0.85]`} />
      <div className="relative flex items-start gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.055] ring-1 ${nodeTone(agent.color)}`}>
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-white">{agent.name}</p>
          <p className="mt-1 truncate text-xs text-white/42">{agent.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function OrchestrationVisual() {
  return (
    <PageSection id="orchestration" className="pb-24 lg:pb-32">
      <div className="relative mx-auto w-full max-w-[1180px] min-w-0">
        <div className="absolute left-1/2 top-1/2 h-48 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[70px]" />

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease }}
          className="relative min-w-0 overflow-hidden rounded-[2.8rem] bg-white/[0.025] p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.06] backdrop-blur-lg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_30%),radial-gradient(circle_at_15%_22%,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_86%_24%,rgba(168,85,247,0.1),transparent_30%),radial-gradient(circle_at_52%_100%,rgba(34,211,238,0.08),transparent_36%)]" />

          <div className="relative min-h-[660px] min-w-0 overflow-hidden rounded-[2.28rem] bg-[#04060b]/90 ring-1 ring-white/[0.05]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-300/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-300/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/70" />
              </div>
              <div className="hidden items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white/36 ring-1 ring-white/[0.055] sm:flex">
                <CircleDot size={12} className="text-cyan-300" /> orchestration.engine/live
              </div>
              <span className="badge badge-active status-live">Live</span>
            </div>

            <div className="relative h-[612px] overflow-hidden">
              <svg className="absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1120 600" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="pathBlue" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="rgba(96,165,250,0)" />
                    <stop offset="0.56" stopColor="rgba(96,165,250,0.58)" />
                    <stop offset="1" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>
                  <linearGradient id="pathPurple" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgba(168,85,247,0)" />
                    <stop offset="0.58" stopColor="rgba(168,85,247,0.5)" />
                    <stop offset="1" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>
                  <linearGradient id="pathCyan" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="rgba(34,211,238,0)" />
                    <stop offset="0.58" stopColor="rgba(34,211,238,0.5)" />
                    <stop offset="1" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>
                </defs>
                <motion.path className="flow-line" d="M560 300 C400 220 300 180 200 200" stroke="url(#pathBlue)" strokeWidth="2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.45, delay: 0.36, ease }} />
                <motion.path className="flow-line" d="M560 300 C720 220 820 180 920 200" stroke="url(#pathPurple)" strokeWidth="2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.45, delay: 0.52, ease }} />
                <motion.path className="flow-line" d="M560 300 C720 380 820 420 920 400" stroke="url(#pathCyan)" strokeWidth="2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.45, delay: 0.68, ease }} />
                <motion.path className="flow-line" d="M560 300 C400 380 300 420 200 400" stroke="rgba(52,211,153,0.38)" strokeWidth="1.8" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.45, delay: 0.84, ease }} />
              </svg>

              <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <motion.div animate={{ y: [0, -8, 0], scale: [1, 1.018, 1] }} transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }} className="relative grid h-56 w-56 place-items-center rounded-[2.45rem] bg-[#080d1a]/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),0_36px_130px_rgba(96,165,250,0.22)] ring-1 ring-white/[0.09] backdrop-blur-xl sm:h-64 sm:w-64">
                  <motion.span className="absolute inset-[-28px] rounded-[3.2rem] border border-blue-200/20" animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.15, 0.45, 0.15] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} />
                  <motion.span className="absolute inset-[-58px] rounded-[4.4rem] border border-cyan-200/15" animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.06, 0.22, 0.06] }} transition={{ duration: 5.3, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }} />
                  <div className="relative text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-200/20 to-cyan-200/12 text-blue-100 ring-1 ring-blue-100/16">
                      <BrainCircuit size={30} />
                    </span>
                    <p className="mt-5 font-display text-2xl font-bold text-white">FlowMind Core</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/34">Coordinating agents</p>
                  </div>
                </motion.div>
              </div>

              {agentNodes.map((agent, index) => <AgentNode key={agent.name} agent={agent} index={index} />)}

              <div className="absolute inset-x-5 bottom-5 z-40 grid gap-4 rounded-[1.85rem] bg-[#070a12]/84 p-4 shadow-[0_28px_95px_rgba(0,0,0,0.44)] ring-1 ring-white/[0.075] backdrop-blur-2xl lg:inset-x-8 lg:grid-cols-2">
                <div className="rounded-[1.4rem] bg-white/[0.035] p-5 ring-1 ring-white/[0.055]">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="section-label">Execution engine</p>
                      <p className="mt-1 font-display text-xl font-bold text-white">Live reasoning stream</p>
                    </div>
                    <div className="flex h-7 items-end gap-1">
                      {[0, 1, 2, 3, 4].map((bar) => <span key={bar} className="wave-bar" style={{ animationDelay: `${bar * 0.12}s` }} />)}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['Summary', 'Insights', 'Roadmap'].map((item) => (
                      <div key={item} className="rounded-2xl bg-black/18 p-3 text-center ring-1 ring-white/[0.045]">
                        <CheckCircle2 size={15} className="mx-auto text-cyan-200" />
                        <p className="mt-2 text-[11px] font-semibold text-white/56">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {executionRows.map((row, index) => {
                    const Icon = row.icon;
                    return (
                      <motion.div key={row.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.05 + index * 0.08, duration: 0.4, ease }} className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/[0.035] px-4 py-3 ring-1 ring-white/[0.05]">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-blue-300/10 text-blue-100 ring-1 ring-blue-300/14">
                          <Icon size={14} />
                        </span>
                        <span className="truncate text-sm font-medium text-white/70">{row.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
}

function AgentsShowcase() {
  const showcaseAgents = [
    { name: 'Research Agent', role: 'Context Extraction', icon: Search, color: 'cyan', detail: 'Parses complex notes and links into semantic signals.' },
    { name: 'Planner Agent', role: 'Action Synthesis', icon: GitBranch, color: 'violet', detail: 'Maps extracted constraints into an execution roadmap.' },
    { name: 'Productivity Agent', role: 'Priority Vectors', icon: Zap, color: 'emerald', detail: 'Balances workload and assigns operational urgency.' },
    { name: 'Summary Agent', role: 'Metric Compilation', icon: Layers3, color: 'blue', detail: 'Validates roadmap against execution constraints.' },
    { name: 'Workflow Engine', role: 'System Orchestration', icon: Workflow, color: 'cyan', detail: 'Assembles the final execution pipeline.' },
  ];

  return (
    <PageSection id="agents" className="pb-24 lg:pb-32">
      <div className="relative mx-auto w-full max-w-[1180px] min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease }}
          className="relative min-w-0 overflow-hidden rounded-[2.8rem] bg-white/[0.025] p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.06] backdrop-blur-lg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_40%)]" />
          
          <div className="relative min-w-0 overflow-hidden rounded-[2.28rem] bg-[#04060b]/90 ring-1 ring-white/[0.05] p-8 sm:p-12">
            <div className="mb-12 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50 ring-1 ring-white/[0.06] mb-4">
                <Network size={12} className="text-cyan-300" />
                Specialized Agents
              </div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Orchestrated Intelligence.</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/50">Each workflow is routed through a dedicated multi-agent cluster, ensuring execution plans are researched, balanced, and operationally viable.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseAgents.map((agent, idx) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease }}
                    className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] ring-1 ring-white/[0.05] hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.04] ring-1 ${nodeTone(agent.color)}`}>
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="font-display text-[15px] font-bold text-white/95">{agent.name}</p>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">{agent.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[13px] leading-relaxed text-white/60">
                      {agent.detail}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
}

function WorkflowShowcase() {
  const roadmapSteps = [
    { label: 'Parse source context & define constraints', priority: 'Critical', color: 'red' },
    { label: 'Prioritize next actions & assign vectors', priority: 'High', color: 'yellow' },
    { label: 'Generate execution pipeline roadmap', priority: 'Normal', color: 'emerald' },
  ];

  return (
    <PageSection id="workflow" className="pb-24 lg:pb-32">
      <div className="relative mx-auto w-full max-w-[1180px] min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease }}
          className="relative min-w-0 overflow-hidden rounded-[2.8rem] bg-white/[0.025] p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.06] backdrop-blur-lg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.08),transparent_40%)]" />

          <div className="relative min-w-0 flex flex-col lg:flex-row overflow-hidden rounded-[2.28rem] bg-[#04060b]/90 ring-1 ring-white/[0.05]">
            <div className="p-8 sm:p-12 lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex self-start items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50 ring-1 ring-white/[0.06] mb-4">
                <Workflow size={12} className="text-violet-300" />
                Execution Pipeline
              </div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Actionable Outputs.</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/50">From vague notes to a strategic execution console. The system synthesizes data into categorized pipelines, tracking critical priorities and clear timelines.</p>
            </div>
            
            <div className="p-8 sm:p-12 lg:w-1/2 bg-white/[0.015] border-t lg:border-t-0 lg:border-l border-white/[0.05]">
              <div className="rounded-2xl border border-sky-200/10 bg-[#070d1d]/60 p-5 shadow-sm backdrop-blur-sm">
                <h3 className="mb-6 text-[10px] font-bold tracking-widest uppercase text-cyan-200/80">Execution Roadmap</h3>
                <div className="space-y-6">
                  {roadmapSteps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 border-l border-sky-200/15 pl-5">
                      <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-cyan-400/60 ring-2 ring-[#070d1d]" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <p className="text-[14px] font-bold text-white/95">{step.label}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${step.color === 'red' ? 'bg-rose-400/10 text-rose-300 ring-1 ring-rose-400/20' : step.color === 'yellow' ? 'bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20' : 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20'}`}>
                            {step.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#02040a] text-white">
      <main className="relative mx-auto flex w-full max-w-[1440px] flex-col px-6 lg:px-10">
        <AmbientSystem />
        <FloatingNavbar />
        <HeroSection />
        <OrchestrationVisual />
        <AgentsShowcase />
        <WorkflowShowcase />
      </main>
    </div>
  );
}
