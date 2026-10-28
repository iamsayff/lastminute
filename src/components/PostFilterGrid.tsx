import React from 'react';
import { useApp } from '../context/AppContext';
import { Candidate } from '../types';

interface PostFilterGridProps {
  activePost: string;
  onSelectPost: (postId: string) => void;
  className?: string;
}

export const PostFilterGrid: React.FC<PostFilterGridProps> = ({
  activePost,
  onSelectPost,
  className = '',
}) => {
  const { candidates } = useApp();
  
  // Count candidates per post dynamically
  const counts = {
    all: candidates.length,
    President: candidates.filter((c: Candidate) => c.post === 'President').length,
    'Vice President': candidates.filter((c: Candidate) => c.post === 'Vice President').length,
    'Honorary Secretary': candidates.filter((c: Candidate) => c.post === 'Honorary Secretary').length,
    'Cabinet Member': candidates.filter((c: Candidate) => c.post === 'Cabinet Member').length,
    'Court Member': candidates.filter((c: Candidate) => c.post === 'Court Member').length,
  };

  const filterTabs = [
    {
      id: 'all',
      label: 'All Posts',
      sublabel: `${counts.all} Candidates`,
      activeBg: 'bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-2 ring-slate-900 ring-offset-2',
      inactiveBg: 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 hover:border-slate-300',
      dotColor: 'bg-slate-700',
      badgeColor: 'bg-slate-800 text-white',
    },
    {
      id: 'President',
      label: 'President',
      sublabel: `${counts.President} Candidates`,
      activeBg: 'bg-[#dc2626] text-white shadow-md shadow-red-600/30 ring-2 ring-red-600 ring-offset-2',
      inactiveBg: 'bg-white hover:bg-red-50/60 text-slate-800 hover:text-red-700 border-slate-200/90 hover:border-red-300',
      dotColor: 'bg-[#dc2626]',
      badgeColor: 'bg-red-100 text-red-800',
    },
    {
      id: 'Vice President',
      label: 'Vice President',
      sublabel: `${counts['Vice President']} Candidates`,
      activeBg: 'bg-[#059669] text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-600 ring-offset-2',
      inactiveBg: 'bg-white hover:bg-emerald-50/60 text-slate-800 hover:text-emerald-800 border-slate-200/90 hover:border-emerald-300',
      dotColor: 'bg-[#059669]',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'Honorary Secretary',
      label: 'Honorary Secretary',
      sublabel: `${counts['Honorary Secretary']} Candidates`,
      activeBg: 'bg-[#2563eb] text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-600 ring-offset-2',
      inactiveBg: 'bg-white hover:bg-blue-50/60 text-slate-800 hover:text-blue-700 border-slate-200/90 hover:border-blue-300',
      dotColor: 'bg-[#2563eb]',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'Cabinet Member',
      label: 'Cabinet Member',
      sublabel: `${counts['Cabinet Member']} Candidates`,
      activeBg: 'bg-[#7c3aed] text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-600 ring-offset-2',
      inactiveBg: 'bg-white hover:bg-purple-50/60 text-slate-800 hover:text-purple-700 border-slate-200/90 hover:border-purple-300',
      dotColor: 'bg-[#7c3aed]',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'Court Member',
      label: 'Court Member',
      sublabel: `${counts['Court Member']} Candidates`,
      activeBg: 'bg-[#d97706] text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-600 ring-offset-2',
      inactiveBg: 'bg-white hover:bg-amber-50/60 text-slate-800 hover:text-amber-800 border-slate-200/90 hover:border-amber-300',
      dotColor: 'bg-[#d97706]',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* 
        Responsive non-scrollable grid:
        - Mobile: 2 cols x 3 rows (comfortable touch targets on all mobile screens)
        - Tablet: 3 cols x 2 rows
        - Desktop: 6 cols x 1 row (seamless horizontal bar with zero scroll)
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 w-full">
        {filterTabs.map((tab) => {
          const isActive = activePost === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectPost(tab.id)}
              className={`relative flex flex-col items-center justify-center py-2.5 sm:py-3 px-2 sm:px-3 rounded-2xl border transition-all duration-200 cursor-pointer active:scale-96 select-none ${
                isActive ? tab.activeBg : tab.inactiveBg
              }`}
            >
              <div className="flex items-center gap-1.5 w-full justify-center">
                {/* Theme indicator dot */}
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 transition-transform ${
                    isActive ? 'bg-white scale-125 shadow-xs' : tab.dotColor
                  }`}
                />
                
                {/* Title */}
                <span className="text-xs sm:text-[13px] font-black tracking-tight leading-tight truncate">
                  {tab.label}
                </span>
              </div>

              {/* Candidate Count Subtitle */}
              <div
                className={`text-[10px] font-semibold mt-1 tracking-wide leading-none ${
                  isActive ? 'text-white/85' : 'text-slate-400'
                }`}
              >
                {tab.sublabel}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
