import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export const ElectionCountdown: React.FC = () => {
  // Target: November 5 at 9:00 AM IST (+05:30)
  const calculateTimeRemaining = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Construct target in IST (+05:30)
    let target = new Date(`${currentYear}-11-05T09:00:00+05:30`);
    
    // If November 5 9:00 AM IST has passed in current year, target next year
    if (now.getTime() > target.getTime()) {
      target = new Date(`${currentYear + 1}-11-05T09:00:00+05:30`);
    }

    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isVotingLive: true, targetYear: target.getFullYear() };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isVotingLive: false, targetYear: target.getFullYear() };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl sm:max-w-2xl mx-auto py-1 select-none">
      {/* 1. Compact Top Graphic Header Pill */}
      <div className="relative z-10 flex items-center justify-between mx-auto max-w-lg px-2 sm:px-4">
        {/* Left Ballot Box Graphic */}
        <div className="relative flex-shrink-0 -mr-3 sm:-mr-4 z-20">
          <div className="relative w-10 sm:w-13 h-10 sm:h-13 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
              <polygon points="35,5 65,5 62,35 32,35" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M42,18 L48,24 L58,12" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15,35 L85,35 L78,48 L22,48 Z" fill="#dc2626" />
              <line x1="33" y1="35" x2="67" y2="35" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M22,48 L78,48 L74,90 L26,90 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <path d="M24,70 L76,70 L74,90 L26,90 Z" fill="#065f46" />
              <path d="M32,70 L34,64 L36,70 M40,70 L42,62 L44,70 M47,70 Q50,60 53,70 M56,70 L58,62 L60,70 M64,70 L66,64 L68,70" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Center Pill Frame: "ELECTION COUNTDOWN" */}
        <div className="flex-1 mx-1.5 sm:mx-3 py-1.5 sm:py-2 px-3 sm:px-5 rounded-full bg-white border-2 sm:border-3 border-[#065f46] shadow-xs flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-1.5 leading-none">
            <span className="font-sans font-black text-xs sm:text-base md:text-lg tracking-tight text-[#065f46] uppercase">
              ELECTION
            </span>
            <span className="font-sans font-black text-xs sm:text-base md:text-lg tracking-tight text-[#dc2626] uppercase">
              COUNTDOWN
            </span>
          </div>
          <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent rounded-full mt-0.5" />
        </div>

        {/* Right Megaphone Graphic */}
        <div className="relative flex-shrink-0 -ml-3 sm:-ml-4 z-20">
          <div className="relative w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
              <polygon points="30,42 68,26 68,74 30,58" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="18" y="44" width="12" height="12" rx="3" fill="#dc2626" />
              <path d="M22,56 L20,72 L26,72 L28,56 Z" fill="#94a3b8" />
              <ellipse cx="68" cy="50" rx="6" ry="24" fill="#dc2626" />
              <ellipse cx="68" cy="50" rx="3" ry="14" fill="#0f172a" />
              <path d="M78,36 L86,30 M82,50 L92,50 M78,64 L86,70" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Compact Four Solid Color Cards Row (NO divided digits!) */}
      <div className="relative mt-2.5 flex items-center justify-center gap-1 sm:gap-2 max-w-xl mx-auto px-1 sm:px-2">
        {/* CARD 1: RED (DAYS) */}
        <div className="flex-1 max-w-[70px] sm:max-w-[92px] md:max-w-[104px] aspect-square rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#ff2a44] via-[#dc2626] to-[#b91c1c] border border-white/40 shadow-sm flex flex-col items-center justify-between p-1.5 sm:p-2 overflow-hidden hover:scale-102 transition-transform">
          <div className="w-full h-2 bg-white/15 rounded-t-lg pointer-events-none" />

          {/* Solid unbroken digits */}
          <div className="my-auto text-xl sm:text-3xl md:text-4xl font-black text-white font-sans tracking-tight leading-none drop-shadow-xs">
            {String(timeLeft.days).padStart(2, '0')}
          </div>

          <div className="w-full py-0.5 px-1 rounded-full bg-white shadow-2xs text-center">
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-[#991b1b]">
              DAYS
            </span>
          </div>
        </div>

        {/* Separator 1 */}
        <div className="flex flex-col items-center justify-center gap-1 px-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>

        {/* CARD 2: GREEN (HOURS) */}
        <div className="flex-1 max-w-[70px] sm:max-w-[92px] md:max-w-[104px] aspect-square rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#059669] via-[#047857] to-[#065f46] border border-white/40 shadow-sm flex flex-col items-center justify-between p-1.5 sm:p-2 overflow-hidden hover:scale-102 transition-transform">
          <div className="w-full h-2 bg-white/15 rounded-t-lg pointer-events-none" />

          <div className="my-auto text-xl sm:text-3xl md:text-4xl font-black text-white font-sans tracking-tight leading-none drop-shadow-xs">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>

          <div className="w-full py-0.5 px-1 rounded-full bg-white shadow-2xs text-center">
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-[#065f46]">
              HOURS
            </span>
          </div>
        </div>

        {/* Separator 2 */}
        <div className="flex flex-col items-center justify-center gap-1 px-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>

        {/* CARD 3: AMBER/YELLOW (MINUTES) */}
        <div className="flex-1 max-w-[70px] sm:max-w-[92px] md:max-w-[104px] aspect-square rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#fbbf24] via-[#f59e0b] to-[#d97706] border border-white/40 shadow-sm flex flex-col items-center justify-between p-1.5 sm:p-2 overflow-hidden hover:scale-102 transition-transform">
          <div className="w-full h-2 bg-white/15 rounded-t-lg pointer-events-none" />

          <div className="my-auto text-xl sm:text-3xl md:text-4xl font-black text-white font-sans tracking-tight leading-none drop-shadow-xs">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>

          <div className="w-full py-0.5 px-1 rounded-full bg-white shadow-2xs text-center">
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-[#92400e]">
              MINUTES
            </span>
          </div>
        </div>

        {/* Separator 3 */}
        <div className="flex flex-col items-center justify-center gap-1 px-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>

        {/* CARD 4: BLUE (SECONDS) */}
        <div className="flex-1 max-w-[70px] sm:max-w-[92px] md:max-w-[104px] aspect-square rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] border border-white/40 shadow-sm flex flex-col items-center justify-between p-1.5 sm:p-2 overflow-hidden hover:scale-102 transition-transform">
          <div className="w-full h-2 bg-white/15 rounded-t-lg pointer-events-none" />

          <div className="my-auto text-xl sm:text-3xl md:text-4xl font-black text-white font-sans tracking-tight leading-none drop-shadow-xs">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>

          <div className="w-full py-0.5 px-1 rounded-full bg-white shadow-2xs text-center">
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-[#1e40af]">
              SECONDS
            </span>
          </div>
        </div>

        {/* Right Clock Icon */}
        <div className="hidden sm:flex flex-col items-center justify-center flex-shrink-0 ml-1">
          <div className="relative w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white border border-[#065f46] shadow-2xs flex items-center justify-center text-[#065f46]">
            <svg viewBox="0 0 40 40" className="w-6 h-6">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#065f46" strokeWidth="2.5" />
              <line x1="20" y1="20" x2="20" y2="9" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="20" y1="20" x2="28" y2="20" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="2" fill="#dc2626" />
            </svg>
            <span className="absolute -top-1 -right-0.5 w-1 h-2 bg-red-500 rounded-full rotate-45" />
          </div>
        </div>
      </div>

      {/* 3. Compact Milestone Subtext */}
      <div className="mt-2.5 flex items-center justify-between px-3 py-1 rounded-xl bg-white/80 border border-slate-200/70 text-[10px] sm:text-[11px] text-slate-600 max-w-lg mx-auto">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
          <Calendar className="w-3 h-3 text-emerald-600" />
          <span>Polling: <strong>5th November 9:00 AM – 5:00 PM</strong></span>
        </div>
        <div className="text-emerald-700 font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Counting: 7:00 PM</span>
        </div>
      </div>
    </div>
  );
};
