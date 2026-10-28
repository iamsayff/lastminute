import React from 'react';
import { ChevronUp } from 'lucide-react';

interface SupportFloatingBadgeProps {
  supportedCount: number;
  maxSupports?: number;
  onClick: () => void;
}

export const SupportFloatingBadge: React.FC<SupportFloatingBadgeProps> = ({
  supportedCount,
  maxSupports = 5,
  onClick,
}) => {
  return (
    <aside
      aria-label="Voting ballot quick button"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none group"
      style={{ filter: 'drop-shadow(0 8px 18px rgba(220, 38, 38, 0.4))' }}
    >
      {/* 
        Side sticky button exactly matching image_7694e98b.png:
        - Compact reduced size
        - Vertically oriented with wider side flush against the right edge
        - Top circular white badge with red chevron pointing up
        - Yellow script "NOW" + White bold "VOTE"
        - Support counter badge (0/5)
        - Red speed marks at bottom
      */}
      <button
        onClick={onClick}
        type="button"
        title={`Cast your votes / View support list (${supportedCount}/${maxSupports})`}
        className="relative flex flex-col items-center justify-between w-9 sm:w-10 py-2.5 sm:py-3 px-1 rounded-l-2xl sm:rounded-l-3xl bg-gradient-to-b from-[#ff203e] via-[#dc2626] to-[#b91c1c] border-2 border-r-0 border-white/60 text-white shadow-xl hover:-translate-x-1 active:scale-95 transition-all duration-200 cursor-pointer"
        style={{ minHeight: '148px' }}
      >
        {/* Top Sound/Speed accent rays */}
        <div className="absolute -top-3 left-1 flex items-center gap-0.5 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="w-1 h-2 rounded-full bg-red-500 rotate-[-20deg]" />
          <span className="w-1 h-2.5 rounded-full bg-red-500 rotate-[-5deg]" />
        </div>

        {/* 1. Top White Circle with Red Chevron pointing UP */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow-md flex items-center justify-center text-[#dc2626] group-hover:scale-110 transition-transform flex-shrink-0">
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3.5]" />
        </div>

        {/* 2. Vertically Stacked Typography matching image_7694e98b.png */}
        <div className="flex flex-col items-center justify-center my-auto py-1">
          {/* Yellow script "NOW" */}
          <span
            className="font-script text-[#fef08a] font-extrabold text-sm sm:text-base leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transform -rotate-90 select-none my-2.5"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
          >
            NOW
          </span>

          {/* White bold sans-serif "VOTE" */}
          <span
            className="font-sans font-black text-white text-[11px] sm:text-xs tracking-wider uppercase leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] transform -rotate-90 select-none my-2"
          >
            VOTE
          </span>
        </div>

        {/* 3. Bottom Counter Pill Badge */}
        <div className="px-1.5 py-0.5 rounded-full bg-black/40 border border-white/30 text-[9px] font-mono font-black text-white/90 leading-none flex-shrink-0">
          {supportedCount}/{maxSupports}
        </div>

        {/* Bottom Red speed rays matching image_7694e98b.png */}
        <div className="absolute -bottom-3.5 left-0.5 flex items-center gap-1 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="w-1 h-3 rounded-full bg-red-500 rotate-[30deg]" />
          <span className="w-1 h-2 rounded-full bg-red-500 rotate-[15deg]" />
        </div>
      </button>
    </aside>
  );
};
