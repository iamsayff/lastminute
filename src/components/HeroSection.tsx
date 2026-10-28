import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Megaphone, 
  Heart, 
  ArrowRight, 
  FileText, 
  Search, 
  CheckSquare, 
  Users 
} from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ElectionCountdown } from './ElectionCountdown';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { setSupportModalOpen } = useApp();

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* 1. Main Headline & Badge */}
      <div className="space-y-3 pt-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf5ef] border border-emerald-200/70 text-[#059669] text-xs font-bold tracking-wide uppercase">
          <Megaphone className="w-3.5 h-3.5" />
          <span>AMU ELECTIONS 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Shape a Better <span className="text-[#059669]">AMU</span> Together
        </h1>

        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
          Meet the candidates, explore their vision, and make an informed choice for a stronger, brighter AMU.
        </p>
      </div>

      {/* 2. Graphically Designed Countdown to Nov 5, 9:00 AM */}
      <ElectionCountdown />

      {/* 3. Action CTA Buttons */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/candidates"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-95"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Support Your Candidates</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          <Link
            to="/manifesto"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 border border-emerald-500/80 font-bold text-xs sm:text-sm transition-all shadow-2xs active:scale-95"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>View Manifestos</span>
            <ArrowRight className="w-4 h-4 ml-0.5 text-emerald-600" />
          </Link>
        </div>

        <div className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#059669] uppercase">
          LIVE • STUDENT SUPPORT PLATFORM OPEN
        </div>
      </div>

      {/* 4. Four Feature Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 pt-1">
        <Link
          to="/candidates"
          className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-2xs flex items-center gap-3 hover:border-blue-200 cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
              Know<br />Your Candidates
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Profiles & vision.</div>
          </div>
        </Link>

        <Link
          to="/manifesto"
          className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-2xs flex items-center gap-3 hover:border-emerald-200 cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="w-10 h-10 rounded-full bg-[#059669] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
              Read<br />Their Manifesto
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Ideas for tomorrow.</div>
          </div>
        </Link>

        <button
          onClick={() => setSupportModalOpen(true)}
          className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-2xs flex items-center gap-3 hover:border-amber-200 cursor-pointer transition-all hover:shadow-xs group text-left"
        >
          <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
              Make<br />Your Choice
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Your support matters.</div>
          </div>
        </button>

        <Link
          to="/about"
          className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-2xs flex items-center gap-3 hover:border-rose-200 cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="w-10 h-10 rounded-full bg-rose-700 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-rose-700 transition-colors">
              Build a<br />Stronger AMU
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Together we can.</div>
          </div>
        </Link>
      </div>

      {/* 5. Heritage Campus Panorama Banner */}
      <div>
        <ImagePlaceholder
          type="strachey-hall"
          alt="AMU Strachey Hall & Victoria Gate"
          aspectRatio="aspect-[16/7] sm:aspect-[21/8]"
        />
      </div>
    </section>
  );
};
