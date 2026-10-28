import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Newspaper, 
  Calendar, 
  Megaphone, 
  ExternalLink, 
  FileText, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

export const NewsPage: React.FC = () => {
  const newsItems = [
    {
      id: 'news-1',
      date: 'October 27, 2026',
      tag: 'Official Notification',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      title: 'Final Scrutiny of Nominations for AMUSU Office Bearers Released',
      summary: 'The Tribunal of the Chief Election Officer has completed scrutiny of all valid nomination papers for President, Vice-President, and Honorary Secretary.',
      author: 'Office of the Chief Election Officer'
    },
    {
      id: 'news-2',
      date: 'October 25, 2026',
      tag: 'Debate Schedule',
      tagColor: 'bg-blue-50 text-blue-800 border-blue-200',
      title: 'Annual Union Hall Presidential Debate Scheduled at Kennedy Auditorium',
      summary: 'Contesting candidates for the post of President will present their 10-minute visions followed by student audience Q&A on November 02, 2026 at 6:30 PM.',
      author: 'Debating & Literary Club, AMU'
    },
    {
      id: 'news-3',
      date: 'October 22, 2026',
      tag: 'Advisory',
      tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
      title: 'Proctor Advisory on Noise Levels & Campaigning Vehicles Inside Campus',
      summary: 'Strict prohibition on modified silencer motorcycles and loudspeaker rallies past 10:00 PM in residential halls and hospital campus zones.',
      author: 'Office of the Proctor'
    },
    {
      id: 'news-4',
      date: 'October 18, 2026',
      tag: 'Voter List',
      tagColor: 'bg-purple-50 text-purple-800 border-purple-200',
      title: 'Publication of Electoral Rolls for All Residential and Non-Resident Halls',
      summary: 'Scholars are advised to verify their names and faculty enrolment numbers at their provost offices before the correction deadline.',
      author: 'Electoral Registry Cell'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Election News & Circulars</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf5ef] text-[#059669] text-xs font-bold tracking-wide uppercase mb-2">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Campus Bulletins</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              AMUSU Elections 2026 News & Updates
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Official circulars, debate schedules, voter advisories, and administrative releases.
            </p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="space-y-4">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className={`px-2.5 py-0.5 rounded-full font-bold border ${item.tagColor}`}>
                {item.tag}
              </span>

              <div className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {item.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.summary}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Issued by: <strong className="text-slate-700">{item.author}</strong>
              </span>

              <button
                onClick={() => alert(`Showing bulletin details for: ${item.title}`)}
                className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full Circular</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
