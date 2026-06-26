import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  LayoutDashboard,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Sliders,
  ExternalLink,
  Database,
  Search,
  Bell
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Tooltip } from '../ui/Tooltip';

interface NavItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onNavigateLanding: () => void;
  currentUser?: { email: string; name: string } | null;
  onLogout?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  onNavigateLanding,
  currentUser,
  onLogout
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notificationsCount, setNotificationsCount] = React.useState(3);

  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'DI';
  const userEmail = currentUser?.email || 'innovator@formflow.io';
  const userName = currentUser?.name || 'Demo Innovator';

  // Task 3: Map navigation items strictly to: Dashboard, Forms, Analytics, Settings
  const navigationItems: NavItem[] = [
    { id: 'builder', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'templates', name: 'Forms', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart2 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex overflow-hidden font-sans">
      
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop/Mobile Sidebar */}
      <motion.aside
        animate={{
          width: isSidebarCollapsed ? '72px' : '280px', // Task 3: 280px width
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          "fixed top-0 bottom-0 left-0 bg-[#09090B] border-r border-white/[0.08] z-50 flex flex-col transition-transform md:translate-x-0",
          isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full md:relative"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.08] select-none shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-[#6366F1] rounded-md flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(99,102,241,0.25)]">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-12"></div>
            </div>
            {!isSidebarCollapsed && (
              <span className="font-sans font-bold tracking-tight text-white text-base">
                FormFlow
              </span>
            )}
          </div>
          
          {/* Collapse toggle (Desktop only) */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex h-6 w-6 rounded border border-white/[0.08] items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </button>

          {/* Close drawer (Mobile only) */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto select-none">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  if (isMobileOpen) setIsMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group cursor-pointer outline-none relative duration-150",
                  isActive
                    ? "bg-white/[0.03] text-white border-l-2 border-l-[#6366F1]"
                    : "text-zinc-500 hover:text-zinc-350 hover:bg-white/[0.02]"
                )}
              >
                <div className="relative flex items-center justify-center shrink-0">
                  <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-102", isActive ? "text-[#6366F1]" : "text-zinc-500 group-hover:text-zinc-300")} />
                </div>
                {!isSidebarCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/[0.08] space-y-3 shrink-0">
          {!isSidebarCollapsed ? (
            <div className="bg-[#0F0F12] rounded-lg p-3 border border-white/[0.08] mx-2">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-[#71717A] uppercase font-mono">
                  SLA Status
                </span>
              </div>
              <p className="text-[11px] text-[#71717A] leading-normal font-sans">
                Active & fully operational.
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
          )}

          <button
            onClick={onNavigateLanding}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/5 cursor-pointer outline-none text-left",
              isSidebarCollapsed && "justify-center"
            )}
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            {!isSidebarCollapsed && <span>Landing Preview</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Workspace Navbar */}
        <header className="h-16 border-b border-white/[0.08] bg-[#09090B] px-6 flex items-center justify-between z-30 select-none shrink-0">
          
          {/* Header Left: Menu Toggle + Search bar */}
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            {/* Mobile Sidebar toggle button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-1.5 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop Search bar */}
            <div className="hidden sm:flex items-center relative w-full">
              <Search className="absolute left-3.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workspace..."
                className="w-full h-9 pl-10 pr-12 rounded-lg bg-white/[0.02] border border-white/[0.08] text-xs text-[#FAFAFA] placeholder-zinc-500 outline-none focus:border-[#6366F1] focus:bg-[#111113] transition-all"
              />
              <span className="absolute right-3 px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-[9px] font-semibold text-zinc-550 select-none pointer-events-none font-mono">
                ⌘K
              </span>
            </div>
          </div>

          {/* Header Right: Notifications + Database Pill + Profile avatar */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Notifications Button with active badge */}
            <Tooltip content={`${notificationsCount} unread updates`} position="bottom">
              <button
                onClick={() => setNotificationsCount(0)}
                className="relative p-2 rounded-lg hover:bg-white/[0.04] text-zinc-400 hover:text-[#FAFAFA] cursor-pointer transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-4.5 w-4.5" />
                {notificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#09090B]" />
                )}
              </button>
            </Tooltip>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/[0.08] text-[10px] font-semibold uppercase tracking-wider text-zinc-500 rounded-[6px]">
              <Database className="h-3 w-3 text-zinc-500" />
              Development
            </span>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.14] transition-all outline-none cursor-pointer"
              >
                <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-indigo-500/20">
                  {userInitials}
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-58 rounded-xl border border-white/[0.08] bg-[#0F0F12] shadow-[0_12px_32px_rgba(0,0,0,0.5)] py-1.5 z-50 text-sm overflow-hidden"
                    >
                      <div className="px-3.5 py-2.5 border-b border-white/[0.08]">
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{userName}</p>
                        <p className="font-semibold text-zinc-300 truncate text-xs mt-0.5">
                          {userEmail}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          onTabChange('settings');
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] text-left cursor-pointer outline-none transition-all"
                      >
                        <Sliders className="h-4 w-4 text-zinc-500" />
                        Account Roles
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          if (onLogout) {
                            onLogout();
                          } else {
                            onNavigateLanding();
                          }
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] text-left cursor-pointer outline-none border-t border-white/[0.08] transition-all"
                      >
                        <LogOut className="h-4 w-4 text-rose-500" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content View space */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#09090B] relative">
          {children}
        </main>
      </div>
    </div>
  );
};
