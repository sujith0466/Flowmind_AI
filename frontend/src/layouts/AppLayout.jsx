import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from '../components/common/Navbar.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import { ensureAnonymousSession } from '../lib/supabase.js';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    ensureAnonymousSession();
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-cyan-200/30">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_60%)] blur-[120px]" />
        <div className="absolute right-[-10%] top-[40%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.05),transparent_60%)] blur-[120px]" />
        <div className="surface-grid absolute inset-0 opacity-[0.02]" />
        <div className="noise-overlay opacity-[0.08]" />
      </div>
      <div className="relative z-10 flex h-screen overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className={`mx-auto w-full px-6 py-8 sm:px-8 md:py-12 ${isDashboard ? 'max-w-[1200px]' : 'max-w-[900px]'}`}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Toaster theme="dark" richColors position="bottom-right" />
    </div>
  );
}
