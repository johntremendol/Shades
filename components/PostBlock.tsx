import React, { useRef, useCallback } from 'react';
import { Post, Stain } from '../types';
import { getContrastColor } from '../utils/colorUtils';
import { Droplet } from 'lucide-react';

interface PostBlockProps {
  post: Post;
  currentUserHex: string;
  onStain: (postId: string, stain: Stain) => void;
}

export const PostBlock: React.FC<PostBlockProps> = ({ post, currentUserHex, onStain }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const textColor = getContrastColor(post.authorHex);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!blockRef.current) return;

    const rect = blockRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newStain: Stain = {
      id: crypto.randomUUID(),
      authorHex: currentUserHex,
      x,
      y,
      timestamp: Date.now(),
    };

    onStain(post.id, newStain);
  }, [currentUserHex, onStain, post.id]);

  return (
    <div 
      ref={blockRef}
      onClick={handleClick}
      className="relative w-full min-h-[300px] flex flex-col justify-center items-center cursor-crosshair overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
      style={{ backgroundColor: post.authorHex }}
    >
      {/* The Content */}
      <div 
        className="relative z-10 p-12 text-center max-w-2xl pointer-events-none select-none"
        style={{ color: textColor }}
      >
        <p className="text-2xl md:text-4xl font-bold tracking-tighter uppercase leading-tight mix-blend-hard-light">
          {post.content}
        </p>
        <div className="mt-8 flex justify-center items-center gap-4 opacity-60 text-xs tracking-[0.3em]">
          <span>{post.authorHex}</span>
          <span>//</span>
          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
        </div>
      </div>

      {/* The Stains */}
      {post.stains.map((stain) => (
        <div
          key={stain.id}
          className="absolute w-16 h-16 rounded-full blur-xl pointer-events-none mix-diff opacity-80 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out animate-pulse"
          style={{
            left: `${stain.x}%`,
            top: `${stain.y}%`,
            backgroundColor: stain.authorHex,
            boxShadow: `0 0 20px ${stain.authorHex}`
          }}
        />
      ))}

      {/* Hover Hint */}
      <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-50 transition-opacity duration-300 text-xs tracking-widest" style={{ color: textColor }}>
        <div className="flex items-center gap-2">
           <Droplet size={12} />
           <span>STAIN</span>
        </div>
      </div>
    </div>
  );
};