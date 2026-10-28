import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  FileCheck, 
  ArrowRight,
  Vote
} from 'lucide-react';
import { TIMELINE_PHASES } from '../data/constants';

export const TimelinePage: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in">
      {/* Header */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Important Dates & Schedule</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#eaf5ef] text-[#059669] text-xs font-bold tracking-wide uppercase mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              <span>University Election Calendar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AMUSU Elections 2026 Calendar & Schedule
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Approved schedule for voter list scrutiny, candidate nominations, speeches, and polling.
            </p>
          </div>
        </div>
      </div>

      {/* Main Roadmap Timeline Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Official Election Schedule (7 Phases)
              </h2>
              <span className="text-[11px] text-slate-500">Scheduled under AMUSU Constitution & Lyngdoh Guidelines</span>
            </div>
          </div>

          <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            Active Election Schedule
          </span>
        </div>

        {/* Compact Grid of Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
          {TIMELINE_PHASES.map((phase) => {
            const isCompleted = phase.status === 'Completed';
            const isOngoing = phase.status === 'Ongoing';
            const isVotingDay = phase.status === 'Voting Day';

            return (
              <div
                key={phase.id}
                className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isVotingDay
                    ? 'border-red-300 bg-gradient-to-br from-rose-50/70 to-red-50/30 shadow-2xs'
                    : isOngoing
                    ? 'border-emerald-400 bg-emerald-50/30 shadow-2xs'
                    : 'border-slate-200/80 bg-slate-50/40'
                }`}
              >
                {/* Date Block */}
                <div
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-black flex-shrink-0 shadow-2xs ${
                    isVotingDay
                      ? 'bg-red-600 text-white'
                      : isCompleted
                      ? 'bg-slate-800 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  <span className="text-base leading-tight font-black">{phase.day || phase.date.split(' ')[0]}</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-90">{phase.month || phase.date.split(' ')[1]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {phase.phaseNum}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        isVotingDay
                          ? 'bg-red-100 text-red-800'
                          : isCompleted
                          ? 'bg-slate-200 text-slate-700'
                          : isOngoing
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {phase.status}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                    {phase.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {phase.description}
                  </p>

                  {phase.timeInfo && (
                    <div className="mt-2 pt-1.5 border-t border-slate-100/80 flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                      <Clock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{phase.timeInfo}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guidelines & Polling Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Polling Protocol */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Vote className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Voting Day Protocol (Nov 05, 2026)
            </h3>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Polling Timings:</strong> 9:00 AM – 5:00 PM (1:00 PM – 2:00 PM lunch break). Counting begins at 7:00 PM.</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Booths:</strong> Respective Residential Halls & Faculty Non-Resident common rooms.</span>
            </div>
            <div className="flex items-start gap-2">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>ID Requirement:</strong> Valid AMU Student Identity Card or Hall Fee receipt with photograph.</span>
            </div>
          </div>
        </div>

        {/* Code of Conduct */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Lyngdoh Committee Compliance
            </h3>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
            <li>Strict campaign expenditure cap of ₹5,000 per contesting candidate.</li>
            <li>No wall posters, graffiti, or banners on historical university gates and heritage arches.</li>
            <li>All public campaigning must conclude 24 hours prior to polling commencement.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
