import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Library, Workflow, X, Box } from 'lucide-react';
import { APP_NAME } from '../../constants/app.js';
import { cn } from '../../utils/cn.js';

const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Outputs', path: '/results', icon: Workflow },
  { label: 'History', path: '/history', icon: Library },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm md:hidden" 
          onClick={onClose}
        />
      )}
      
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-sky-200/10 bg-[#0d1429]/95 backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] md:static md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sky-200/10 px-4">
          <Link to="/" className="flex items-center gap-2.5 text-primary" onClick={onClose}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-sky-300/40 to-cyan-300/20 text-cyan-100 ring-1 ring-cyan-100/30">
              <Box size={16} />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">{APP_NAME}</span>
          </Link>
          <button className="text-muted hover:text-primary md:hidden" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5">
          <div className="mb-2 px-3">
            <p className="px-2 text-[11px] font-medium uppercase tracking-wider text-slate-300/80">Product</p>
          </div>
          <nav className="space-y-1 px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition',
                      isActive
                        ? 'bg-gradient-to-r from-sky-400/22 to-cyan-300/16 text-white ring-1 ring-cyan-200/30'
                        : 'text-slate-300 hover:bg-sky-300/10 hover:text-white',
                    )
                  }
                >
                  <Icon size={16} className="shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
