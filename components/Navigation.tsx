import React from 'react';
import { ViewState } from '../types';
import { Activity, Fingerprint, Plus } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onCompose: () => void;
  userHex: string;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, onCompose, userHex }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-8 px-8 py-4 bg-black/80 border border-white/10 backdrop-blur-md rounded-full">
      <button
        onClick={() => onNavigate(ViewState.SPECTRUM)}
        className={`flex flex-col items-center gap-1 group ${currentView === ViewState.SPECTRUM ? 'text-white' : 'text-neutral-600'}`}
      >
        <Activity size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">FEED</span>
      </button>

      <button
        onClick={onCompose}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:rotate-90 hover:scale-110 active:scale-95"
        style={{ backgroundColor: userHex, boxShadow: `0 0 20px ${userHex}40` }}
      >
        <Plus size={24} className="text-black mix-blend-hard-light" />
      </button>

      <button
        onClick={() => onNavigate(ViewState.MONOLITH)}
        className={`flex flex-col items-center gap-1 group ${currentView === ViewState.MONOLITH ? 'text-white' : 'text-neutral-600'}`}
      >
        <Fingerprint size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">SELF</span>
      </button>
    </div>
  );
};