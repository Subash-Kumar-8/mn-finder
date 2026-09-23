import React from 'react';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  TrendingUp,
  Wrench,
  Bell,
  FileText,
  BrainCircuit,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Layers,
  LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';

export function Sidebar({ currentRoute = '/dashboard', onNavigate, collapsed, onToggleCollapse, onSignOut }) {
  const navItems = [
    { id: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: '/exploration', label: 'Exploration Intelligence', icon: Compass },
    { id: '/prospectivity', label: 'Prospectivity Map', icon: MapPin, highlight: true },
    { id: '/production', label: 'Production Intelligence', icon: TrendingUp },
    { id: '/equipment', label: 'Equipment Monitoring', icon: Wrench },
    { id: '/alerts', label: 'Alerts & Recommendations', icon: Bell, badge: '3' },
    { id: '/reports', label: 'Reports', icon: FileText },
    { id: '/models', label: 'AI Model Insights', icon: BrainCircuit },
    { id: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className={cn(
        'bg-[#06172e] text-slate-100 flex flex-col justify-between h-screen transition-all duration-300 ease-in-out z-40 select-none shadow-2xl border-r border-slate-800/80 shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Top Section */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Top Header Branding */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 text-white font-bold flex items-center justify-center shrink-0 shadow-inner">
              <Layers className="w-5 h-5 text-blue-300" />
            </div>
            {!collapsed && (
              <div className="truncate">
                <div className="text-xs font-black tracking-tight text-white uppercase leading-tight">
                  MANGANESE MINING
                </div>
                <div className="text-[10px] text-blue-400 font-bold tracking-wider uppercase leading-tight">
                  INTELLIGENCE PLATFORM
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors hidden lg:flex items-center justify-center shrink-0"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Govt India Tag Pill */}
        {!collapsed && (
          <div className="px-4 py-2.5 bg-[#041021] border-b border-slate-800/60 flex items-center gap-2 text-[11px] font-medium text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Government of India • Ministry of Mines</span>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-150 relative group',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200')} />

                {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}

                {!collapsed && item.badge && (
                  <span className="w-5 h-5 rounded-full text-[10px] font-bold bg-red-600 text-white flex items-center justify-center shrink-0">
                    {item.badge}
                  </span>
                )}

                {!collapsed && item.highlight && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wider shrink-0">
                    HERO
                  </span>
                )}

                {/* Collapsed Tooltip */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Item (Covering all the way to the bottom) */}
      <div className="p-4 border-t border-slate-800/80 bg-[#041021] shrink-0">
        {!collapsed ? (
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SIH 2026 Prototype</span>
            </div>
            <button
              onClick={onSignOut || (() => window.location.reload())}
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="SIH 2026 Prototype Online" />
          </div>
        )}
      </div>

    </aside>
  );
}
