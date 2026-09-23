import React from 'react';
import {
  Pickaxe,
  MapPin,
  Target,
  TrendingDown,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { getStatusStyle } from '../../utils/formatters';

const iconMap = {
  Pickaxe,
  MapPin,
  Target,
  TrendingDown,
  AlertTriangle,
  Activity
};

export function KpiCard({ label, value, trend, status = 'info', iconName, subtext, onClick }) {
  const Icon = iconMap[iconName] || Activity;
  const styles = getStatusStyle(status);

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group',
        onClick && 'cursor-pointer hover:border-slate-300'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {label}
          </span>
          <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {value}
          </div>
        </div>
        <div className={cn('p-2.5 rounded-xl border transition-colors', styles.bg, styles.border)}>
          <Icon className={cn('w-5 h-5', styles.text)} />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className={cn('font-semibold flex items-center gap-1', styles.text)}>
          {trend}
        </span>
        {subtext && <span className="text-slate-400 text-[11px] truncate">{subtext}</span>}
      </div>
    </div>
  );
}
