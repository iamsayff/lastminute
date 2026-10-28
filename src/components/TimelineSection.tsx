import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { TimelinePhase } from '../types';

interface TimelineSectionProps {
  phases: TimelinePhase[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  phases,
}) => {
  return (
    <section id="dates" className="space-y-5 pt-4">
      {/* 1. Header Pill & Titles */}
      <div className="text-center space-y-1.5 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#eaf5ef] text-[#059669] text-[11px] font-bold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
          <span>ELECTION ROADMAP</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Key Election Dates & Schedule
        </h2>

        <p className="text-slate-500 text-xs">
          Schedule for voter list scrutiny, nominations, and polling day.
        </p>
      </div>

      {/* 2. Compact Grid of Timeline Schedule Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
        {phases.map((phase) => {
          const isElectionDay = phase.title.toUpperCase().includes('ELECTION DAY');

          return (
            <Link
              key={phase.id}
              to="/dates"
              className={`rounded-2xl border p-3 sm:p-3.5 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-xs ${
                isElectionDay
                  ? 'bg-gradient-to-br from-rose-50/70 via-white to-red-50/40 border-rose-200 hover:border-red-300 ring-1 ring-red-400/20'
                  : 'bg-white border-slate-200/80 hover:border-emerald-300'
              }`}
            >
              <div>
                {/* Header: Date Block + Phase/Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-black leading-none shadow-2xs flex-shrink-0 ${
                        isElectionDay
                          ? 'bg-red-600 text-white'
                          : phase.status === 'Completed'
                          ? 'bg-slate-800 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      <span className="text-sm font-black leading-none">{phase.day || phase.date.split(' ')[0]}</span>
                      <span className="text-[8px] uppercase tracking-wider mt-0.5 opacity-90">{phase.month || phase.date.split(' ')[1]}</span>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {phase.phaseNum}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      isElectionDay
                        ? 'bg-red-100 text-red-800'
                        : phase.status === 'Completed'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {phase.status}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {phase.title}
                </h4>

                {/* Details Description */}
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {phase.description}
                </p>
              </div>

              {/* Time Info / Badge */}
              {phase.timeInfo && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-slate-600 font-semibold truncate">
                    <Clock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    <span>{phase.timeInfo}</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* 3. Detailed Schedule Link */}
      <div className="text-center pt-1">
        <Link
          to="/dates"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>View Full Schedule</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </Link>
      </div>
    </section>
  );
};
