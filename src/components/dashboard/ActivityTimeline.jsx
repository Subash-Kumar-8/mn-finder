import React from 'react';
import { Clock, Compass, Wrench, TrendingUp, Database } from 'lucide-react';

const iconMap = {
  prospectivity: Compass,
  equipment: Wrench,
  production: TrendingUp,
  exploration: Database
};

export function ActivityTimeline({ activities = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="pb-3 border-b border-slate-100 mb-4">
        <h3 className="font-bold text-slate-900 text-sm">Recent Activity Log</h3>
        <p className="text-xs text-slate-500">Real-time system & model inference events</p>
      </div>

      <div className="space-y-4">
        {activities.map((act, index) => {
          const Icon = iconMap[act.type] || Clock;

          return (
            <div key={act.id || index} className="flex items-start gap-3 relative">
              {index !== activities.length - 1 && (
                <div className="absolute left-3.5 top-8 bottom-0 w-px bg-slate-200" />
              )}
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 z-10">
                <Icon className="w-3.5 h-3.5 text-[#0b2545]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{act.title}</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {act.time}
                  </span>
                </div>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{act.description}</p>
                {act.badge && (
                  <span className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {act.badge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
