import React from 'react';
import { Link } from 'react-router-dom';
import { User, Star, ArrowRight } from 'lucide-react';
import { CandidatePost } from '../types';

interface ExploreAllCardProps {
  post: CandidatePost;
}

export const ExploreAllCard: React.FC<ExploreAllCardProps> = ({
  post,
}) => {
  const configs = {
    'President': {
      bgIcon: 'bg-red-50 text-[#dc2626] border-red-100',
      btnBg: 'bg-[#dc2626] hover:bg-[#b91c1c]',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    'Vice President': {
      bgIcon: 'bg-emerald-50 text-[#059669] border-emerald-100',
      btnBg: 'bg-[#059669] hover:bg-[#047857]',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    'Honorary Secretary': {
      bgIcon: 'bg-blue-50 text-[#2563eb] border-blue-100',
      btnBg: 'bg-[#2563eb] hover:bg-[#1d4ed8]',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    'Cabinet Member': {
      bgIcon: 'bg-purple-50 text-[#7c3aed] border-purple-100',
      btnBg: 'bg-[#7c3aed] hover:bg-[#6d28d9]',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    'Court Member': {
      bgIcon: 'bg-amber-50 text-[#d97706] border-amber-100',
      btnBg: 'bg-[#d97706] hover:bg-[#b45309]',
      icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  }[post];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-3 sm:p-4 flex flex-col items-center justify-between text-center min-h-[290px] sm:min-h-[330px]">
      <div className="flex flex-col items-center my-auto">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center mb-2 sm:mb-3 ${configs.bgIcon}`}>
          {configs.icon}
        </div>

        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          {post}
        </span>

        <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
          View All
        </h4>

        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 max-w-[140px]">
          All candidates & manifestos
        </p>
      </div>

      <Link
        to={`/candidates?post=${encodeURIComponent(post)}`}
        className={`w-full py-2 px-3 rounded-xl text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${configs.btnBg} active:scale-98 cursor-pointer shadow-xs`}
      >
        <span>Explore All</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
