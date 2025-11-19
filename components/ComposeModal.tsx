import React, { useState } from 'react';
import { X } from 'lucide-react';
import { getContrastColor } from '../utils/colorUtils';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  userHex: string;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose, onSubmit, userHex }) => {
  const [content, setContent] = useState('');
  const textColor = getContrastColor(userHex);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl p-1 aspect-square md:aspect-video animate-in fade-in zoom-in duration-300"
      >
        <div 
          className="absolute inset-0 opacity-20 animate-pulse"
          style={{ backgroundColor: userHex }}
        />
        
        <div className="relative z-10 flex flex-col h-full p-8 md:p-16 border border-white/10 bg-black">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-white text-xs tracking-[0.5em] uppercase">The Etching</h2>
            <button 
              onClick={onClose}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <textarea
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={140}
              placeholder="ECHO INTO THE VOID..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-2xl md:text-4xl font-bold uppercase tracking-wider text-neutral-300 placeholder:text-neutral-800 focus:text-white transition-colors"
              style={{ caretColor: userHex }}
            />
            
            <div className="mt-8 flex justify-between items-end">
              <span className={`text-xs tracking-widest ${content.length >= 140 ? 'text-red-500' : 'text-neutral-600'}`}>
                {content.length} / 140
              </span>

              <button 
                type="submit"
                disabled={!content.trim()}
                className="group relative px-8 py-3 overflow-hidden"
              >
                <div 
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                  style={{ backgroundColor: userHex }}
                />
                <span 
                  className="relative text-neutral-500 group-hover:text-black transition-colors duration-300 text-sm tracking-[0.3em] uppercase font-bold"
                  style={{ color: content.trim() ? undefined : '#333' }}
                >
                  Etch
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};