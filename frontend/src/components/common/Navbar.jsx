import { Menu, Search, Command } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-white/[0.05] bg-[#03050d]/70 px-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-3xl">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-sky-300/10 hover:text-primary md:hidden"
        onClick={onMenuClick}
      >
        <Menu size={16} />
      </button>

      <div className="flex flex-1 items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="font-medium text-primary">FlowMind Workspace</span>
          <span className="text-slate-500">/</span>
          <span className="text-muted">AI Orchestration Console</span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <button className="hidden sm:flex items-center gap-2 rounded-lg border border-sky-200/20 bg-sky-300/10 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-sky-300/20 hover:text-white">
            <Search size={14} className="text-cyan-200" />
            <span>Search...</span>
            <span className="ml-4 flex items-center gap-0.5 rounded border border-sky-200/20 bg-slate-950/80 px-1 py-0.5 font-mono text-[10px] text-slate-300">
              <Command size={10} /> K
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
