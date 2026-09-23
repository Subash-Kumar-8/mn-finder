import React from 'react';
import { AlertCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';

export function AlertsPanel({ onNavigateToAlerts }) {
  const alerts = [
    {
      id: '1',
      type: 'critical',
      title: 'Production shortfall predicted',
      location: 'Block B-12',
      details: '78% shortfall risk. Estimated ~1,580 T deficit.',
      icon: AlertCircle
    },
    {
      id: '2',
      type: 'warning',
      title: 'Drill-02 downtime risk',
      location: 'Block B-12',
      details: '14 hours predicted downtime. Imminent bearing failure.',
      icon: AlertTriangle
    },
    {
      id: '3',
      type: 'info',
      title: 'New high prospectivity zone',
      location: 'Block C-04',
      details: '81% prospectivity score. Manganese deposit identified.',
      icon: Info
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">AI Critical Alerts</h3>
          <p className="text-xs text-slate-500">Decision support insights requiring attention</p>
        </div>
        <button
          onClick={onNavigateToAlerts}
          className="text-xs font-semibold text-[#0b2545] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-4 space-y-3 flex-1">
        {alerts.map((item) => {
          const Icon = item.icon;
          const isCritical = item.type === 'critical';
          const isWarning = item.type === 'warning';

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-lg border text-xs transition-all duration-150 ${
                isCritical
                  ? 'bg-red-50/70 border-red-200 text-red-900'
                  : isWarning
                  ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                  : 'bg-blue-50/70 border-blue-200 text-blue-900'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isCritical ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-blue-600'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/80 border border-slate-200 text-slate-700">
                      {item.location}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">{item.details}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
