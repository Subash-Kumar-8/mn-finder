import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Component with Government Navy Primary styling
 */
export function Button({
  children,
  variant = 'primary', // primary | secondary | outline | danger | ghost
  size = 'md', // sm | md | lg
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-[#0b2545] text-white hover:bg-[#091e36] active:bg-[#061426] shadow-sm',
    secondary: 'bg-blue-50 text-blue-900 hover:bg-blue-100 active:bg-blue-200 border border-blue-200',
    outline: 'bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 border border-slate-300 shadow-2xs',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200'
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5 font-semibold'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
