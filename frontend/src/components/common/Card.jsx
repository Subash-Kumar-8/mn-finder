import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Card container for Government UI presentation
 */
export function Card({ children, className = '', header, action, footer, title, subtitle }) {
  return (
    <div className={cn('bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow duration-200 overflow-hidden flex flex-col', className)}>
      {(header || title) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
          <div>
            {title && <h3 className="font-semibold text-slate-900 text-sm tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            {header}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5 flex-1">{children}</div>
      {footer && <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">{footer}</div>}
    </div>
  );
}
