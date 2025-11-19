import React, { useState } from 'react';
import { generateHex } from '../utils/colorUtils';

interface OnboardingProps {
  onComplete: (hex: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [tempHex, setTempHex] = useState('#000000');

  const handleSever = () => {
    setIsGenerating(true);
    
    // Matrix-style randomization effect
    let iterations = 0;
    const interval = setInterval(() => {
      setTempHex(generateHex());
      iterations++;
      
      if (iterations > 20) {
        clearInterval(interval);
        const finalHex = generateHex();
        setTempHex(finalHex);
        setTimeout(() => onComplete(finalHex), 800);
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-xl w-full text-center space-y-12 z-10">
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mix-blend-difference animate-pulse">
            CHROMA
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm tracking-[0.5em] uppercase">
            Digital Graveyard
          </p>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        <div className="text-neutral-400 font-mono text-sm leading-relaxed tracking-wide">
          <p className="mb-4">YOU ARE FORMLESS.</p>
          <p className="mb-4">TO ENTER THE SPECTRUM, YOU MUST SEVER YOUR PREVIOUS IDENTITY.</p>
          <p>A PERMANENT COLOR WILL BE ASSIGNED TO YOU.</p>
        </div>

        <div className="pt-8">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div 
                className="w-32 h-32 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-colors duration-100"
                style={{ backgroundColor: tempHex }}
              />
              <p className="text-white font-mono text-xl tracking-widest animate-pulse">
                {tempHex}
              </p>
            </div>
          ) : (
            <button
              onClick={handleSever}
              className="group relative px-8 py-4 bg-transparent border border-neutral-800 hover:border-white transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mix-blend-difference"></div>
              <span className="relative text-neutral-300 group-hover:text-black text-sm tracking-[0.3em] uppercase font-bold transition-colors duration-500">
                Sever Connection
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};