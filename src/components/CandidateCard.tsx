import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Building2, GraduationCap, ArrowRight } from 'lucide-react';
import { Candidate } from '../types';
import { VerifiedBadge } from './VerifiedBadge';

interface CandidateCardProps {
  candidate: Candidate;
  onSupportToggle?: (candidateId: string) => void;
  isSupported?: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onSupportToggle,
  isSupported = false,
}) => {
  const getThemeKey = (post: string, theme?: string) => {
    if (post === 'President') return 'red';
    if (post === 'Vice President') return 'emerald';
    if (post === 'Honorary Secretary') return 'blue';
    if (post === 'Cabinet Member') return 'purple';
    if (post === 'Court Member') return 'amber';
    return theme && ['red','emerald','blue','purple','amber'].includes(theme) ? theme : 'emerald';
  };

  const themeKey = getThemeKey(candidate.post, candidate.colorTheme);

  const colorStyles = {
    red: {
      ribbonBg: 'bg-[#dc2626]',
      badgeBg: 'bg-[#dc2626] text-white',
      ringColor: 'border-[#dc2626]',
      outlineBtn: 'border-[#dc2626] text-[#dc2626] hover:bg-red-50',
      initialsColor: 'text-[#dc2626]',
    },
    emerald: {
      ribbonBg: 'bg-[#059669]',
      badgeBg: 'bg-[#059669] text-white',
      ringColor: 'border-[#059669]',
      outlineBtn: 'border-[#059669] text-[#059669] hover:bg-emerald-50',
      initialsColor: 'text-[#059669]',
    },
    blue: {
      ribbonBg: 'bg-[#2563eb]',
      badgeBg: 'bg-[#2563eb] text-white',
      ringColor: 'border-[#2563eb]',
      outlineBtn: 'border-[#2563eb] text-[#2563eb] hover:bg-blue-50',
      initialsColor: 'text-[#2563eb]',
    },
    purple: {
      ribbonBg: 'bg-[#7c3aed]',
      badgeBg: 'bg-[#7c3aed] text-white',
      ringColor: 'border-[#7c3aed]',
      outlineBtn: 'border-[#7c3aed] text-[#7c3aed] hover:bg-purple-50',
      initialsColor: 'text-[#7c3aed]',
    },
    amber: {
      ribbonBg: 'bg-[#d97706]',
      badgeBg: 'bg-[#d97706] text-white',
      ringColor: 'border-[#d97706]',
      outlineBtn: 'border-[#d97706] text-[#d97706] hover:bg-amber-50',
      initialsColor: 'text-[#d97706]',
    },
  }[themeKey as 'red' | 'emerald' | 'blue' | 'purple' | 'amber'];

  const profileUrl = `/candidate/${candidate.id}`;

  const hasAssignedEmail = Boolean(candidate.assignedEmail && candidate.assignedEmail.trim().length > 0);
  const isVerifiedCandidate = Boolean(candidate.isVerified || hasAssignedEmail);

  // Split post into two-word label for longer names (Vice President, Honorary Secretary, etc.)
  const postWords = candidate.post.split(' ');
  const isTwoWords = postWords.length >= 2;

  return (
    <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between p-3 sm:p-4 pt-8 sm:pt-9 group">
      {/* 1. Diagonal Corner Ribbon for Post (Two-word stacked label for longer titles) */}
      <div className="absolute top-0 left-0 w-28 h-28 sm:w-32 sm:h-32 overflow-hidden pointer-events-none z-10">
        <div
          className={`absolute top-4 sm:top-5 -left-10 sm:-left-11 w-36 sm:w-40 py-1 ${colorStyles.ribbonBg} text-white text-center shadow-xs transform -rotate-45 flex flex-col items-center justify-center leading-none`}
        >
          {isTwoWords ? (
            <>
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider">{postWords[0]}</span>
              <span className="text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider mt-0.5">{postWords.slice(1).join(' ')}</span>
            </>
          ) : (
            <span className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider py-0.5">{candidate.post}</span>
          )}
        </div>
      </div>

      {/* 2. Top-Right Corner Supports Badge (matching image_044173da.png) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onSupportToggle) onSupportToggle(candidate.id);
        }}
        className={`absolute top-0 right-0 z-20 ${colorStyles.ribbonBg} text-white pt-1.5 sm:pt-2 pb-1.5 sm:pb-2 px-2.5 sm:px-3.5 rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-[16px] sm:rounded-bl-[20px] shadow-xs flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 group/support`}
        title={isSupported ? 'Supported! Click to remove' : 'Click to support this candidate'}
      >
        <div className="flex items-center justify-center gap-1 leading-none">
          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white ${isSupported ? 'animate-bounce' : ''}`} />
          <span className="text-xs sm:text-sm font-black tracking-tight text-white font-sans">
            {candidate.supportsCount}
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-extrabold text-white tracking-tight mt-0.5 leading-tight">
          Supports
        </span>
      </button>

      {/* 3. Center Candidate Avatar / Ballot Circle */}
      <Link to={profileUrl} className="flex flex-col items-center mt-1 sm:mt-2 mb-2 sm:mb-3 block group-hover:opacity-95">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 sm:border-3 bg-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-102">
          {candidate.isUnallotted ? (
            <div className={`w-full h-full rounded-full border-2 ${colorStyles.ringColor} flex flex-col items-center justify-center bg-slate-50/50 p-1.5 text-center`}>
              <span className={`text-xl sm:text-2xl font-extrabold ${colorStyles.initialsColor} tracking-wider font-mono leading-none`}>
                {candidate.initials || 'AB'}
              </span>
              <span className="text-[7px] sm:text-[8px] font-bold text-slate-500 uppercase tracking-tight mt-0.5">
                UNALLOTTED
              </span>
            </div>
          ) : candidate.avatarUrl ? (
            <div className={`relative w-full h-full rounded-full overflow-hidden border-2 ${colorStyles.ringColor} bg-slate-100 flex items-center justify-center`}>
              <img
                src={candidate.avatarUrl}
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className={`relative w-full h-full rounded-full overflow-hidden border-2 ${colorStyles.ringColor} bg-slate-100 flex items-center justify-center`}>
              <div className="w-full h-full bg-gradient-to-b from-slate-200 to-slate-300 flex flex-col items-center justify-center p-1 text-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${colorStyles.ribbonBg} text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs mb-0.5`}>
                  {candidate.initials || candidate.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-700 leading-none truncate max-w-full px-0.5">
                  {candidate.name.split(' ')[0]}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Candidate Name: allowed to wrap in 2 lines with blue verified tick */}
        <h3 className="mt-2 text-xs sm:text-sm md:text-base font-bold text-slate-900 text-center tracking-tight leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[34px] sm:min-h-[38px] flex items-center justify-center gap-1 w-full px-1">
          <span>{candidate.name}</span>
          {isVerifiedCandidate && <VerifiedBadge className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </h3>
        
        <p className="text-[11px] sm:text-xs text-slate-500 italic text-center mt-0.5 px-1 line-clamp-1 min-h-[18px]">
          {candidate.tagQuote}
        </p>

        {/* 5. Department & Program Badges */}
        <div className="w-full mt-2 pt-2 border-t border-slate-100 space-y-1 text-center text-[10px] sm:text-[11px] text-slate-600">
          <div className="flex items-center justify-center gap-1 font-medium text-slate-700">
            <Building2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{candidate.facultyOrDept.replace(', Faculty of', ' •')}</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-slate-500">
            <GraduationCap className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="truncate">{candidate.program}</span>
          </div>
        </div>
      </Link>

      {/* 6. View Profile Direct URL Button */}
      <Link
        to={profileUrl}
        className={`w-full py-1.5 sm:py-2 px-3 rounded-xl border text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 ${colorStyles.outlineBtn} active:scale-98 cursor-pointer mt-1`}
      >
        <span>View Profile</span>
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
};
