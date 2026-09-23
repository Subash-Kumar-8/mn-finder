import React, { useState } from 'react';
import { Search, Bell, Menu, ShieldCheck, User, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export function Header({ currentRoute = '/dashboard', onToggleMobileSidebar, searchQuery, setSearchQuery, onSignOut }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Map route to breadcrumb label
  const breadcrumbs = {
    '/dashboard': 'Mining Intelligence Overview',
    '/exploration': 'Exploration Intelligence',
    '/prospectivity': 'Prospectivity Map',
    '/production': 'Production Intelligence',
    '/equipment': 'Equipment Monitoring',
    '/alerts': 'Alerts & Recommendations',
    '/reports': 'Reports & Analytics',
    '/models': 'AI Model Insights',
    '/settings': 'System Settings'
  };

  const pageTitle = breadcrumbs[currentRoute] || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 lg:px-6 py-3 flex items-center justify-between gap-4 shadow-2xs">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Ministry of Mines</span>
            <span>/</span>
            <span className="text-slate-700">Government of India</span>
            <span>/</span>
            <span className="text-[#0b2545] font-semibold">{pageTitle}</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight hidden sm:block">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search mining blocks (B-12), equipment (DRL-02), alerts, or reports..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b2545]/20 focus:border-[#0b2545] transition-all"
          />
        </div>
      </div>

      {/* Right: Status, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* System Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYSTEM OPERATIONAL</span>
        </div>

        {/* Demo Data Tag */}
        <div className="hidden xl:inline-flex items-center px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800 uppercase tracking-wider">
          DEMO DATA
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-900">AI Alerts & System Notifications</span>
                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">3 UNREAD</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span>Production Shortfall Warning</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">Block B-12 shortfall risk calculated at 78% probability.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>Equipment Downtime Risk</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">Drill DRL-02 predicted 14 hours downtime.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">25 mins ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>New Prospectivity Anomaly</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">Block C-04 scored 81% prospectivity potential.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative border-l border-slate-200 pl-3">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-[#0b2545] text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-200">
              AK
            </div>
            <div className="hidden lg:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">Arvind Kumar</div>
              <div className="text-[10px] text-slate-500 leading-tight">Senior Geologist</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-900">Arvind Kumar</p>
                <p className="text-slate-500 text-[10px]">demo.geologist@gov.in</p>
              </div>
              <a href="#settings" className="block px-3 py-2 text-slate-700 hover:bg-slate-50">Profile & Credentials</a>
              <a href="#settings" className="block px-3 py-2 text-slate-700 hover:bg-slate-50">Map Preferences</a>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={onSignOut || (() => window.location.reload())}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 font-medium"
              >
                Sign Out
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
