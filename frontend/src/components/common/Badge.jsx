import React from 'react';
import { cn } from '../../utils/cn';
import { getStatusStyle } from '../../utils/formatters';

/**
 * Status and level indicator badge component
 */
export function Badge({ children, status = 'info', variant = 'subtle', className = '' }) {
  const styles = getStatusStyle(status);

  if (variant === 'dot') {
    return (
      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border', styles.bg, styles.text, styles.border, className)}>
        <span className={cn('w-1.5 h-1.5 rounded-full', styles.dot)} />
        {children}
      </span>
    );
  }

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border', styles.bg, styles.text, styles.border, className)}>
      {children}
    </span>
  );
}
