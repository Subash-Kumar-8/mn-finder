import React from 'react';
import { X, Layers, ShieldCheck } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function MobileNav({ isOpen, onClose, currentRoute, onNavigate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative flex-1 max-w-xs w-full bg-[#0b2545] h-full flex flex-col z-10 animate-in slide-in-from-left duration-200">
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Layers className="w-5 h-5 text-blue-400" />
            <span>Manganese Intelligence</span>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Sidebar
            currentRoute={currentRoute}
            onNavigate={(route) => {
              onNavigate(route);
              onClose();
            }}
            collapsed={false}
            onToggleCollapse={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
