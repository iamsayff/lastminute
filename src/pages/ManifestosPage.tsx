import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Sparkles,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostFilterGrid } from '../components/PostFilterGrid';

export const ManifestosPage: React.FC = () => {
  const { candidates, supportedCandidateIds, toggleSupport } = useApp();
  const [selectedPost, setSelectedPost] = useState<string>('all');
  const [searchWord, setSearchWord] = useState('');

  const posts = [
    'all',
    'President',
    'Vice President',
    'Honorary Secretary',
    'Cabinet Member',
    'Court Member'
  ];

  const filteredCandidates = (candidates || []).filter((c) => {
    if (!c) return false;
    const name = (c.name || '').toLowerCase();
    const query = (searchWord || '').toLowerCase();
    const matchesPost = selectedPost === 'all' || c.post === selectedPost;
    const matchesSearch = 
      name.includes(query) ||
      (c.manifestoSummary && c.manifestoSummary.some(m => (m || '').toLowerCase().includes(query)));
    return matchesPost && matchesSearch;
  }).sort((a, b) => (b.supportsCount || 0) - (a.supportsCount || 0));

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Candidate Manifestos</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf5ef] text-[#059669] text-xs font-bold tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Candidate Policy Priorities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Candidate Manifestos & Reform Agendas
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Read policy declarations, student union budgets, hostel upgrades, and academic calendars.
            </p>
          </div>

          <div className="relative w-full md:w-80 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="Search manifestos (e.g. Wi-Fi, mess, fee)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-slate-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Post Filter Grid (Non-scrollable, 100% visible on all devices) */}
      <PostFilterGrid
        activePost={selectedPost}
        onSelectPost={setSelectedPost}
      />

      {/* Manifestos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCandidates.map((cand, index) => {
          const isSupported = supportedCandidateIds.includes(cand.id);

          return (
            <div
              key={`${cand.id}-${index}`}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Candidate Info Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-emerald-500/80 flex items-center justify-center font-bold text-sm text-slate-800">
                      {cand.initials || cand.name[0]}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">
                        {cand.post}
                      </span>
                      <Link
                        to={`/candidate/${cand.id}`}
                        className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-700 block leading-tight"
                      >
                        {cand.name}
                      </Link>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{cand.facultyOrDept}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSupport(cand.id)}
                    className={`p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isSupported
                        ? 'bg-red-50 text-red-600'
                        : 'bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                    title={isSupported ? 'Supported' : 'Support Candidate'}
                  >
                    <Heart className={`w-4 h-4 ${isSupported ? 'fill-current text-red-600' : ''}`} />
                  </button>
                </div>

                {/* Manifesto Points */}
                <div className="pt-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    Key Agenda Commitments
                  </h4>

                  <ul className="space-y-2.5">
                    {(cand.manifestoSummary || [
                      'Ensure student representation across university standing committees',
                      'Strict quality control for residential mess catering and diet allowances',
                      'Revamp campus internet and high-speed fiber Wi-Fi in reading rooms'
                    ]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Public Manifesto Submission
                </span>

                <Link
                  to={`/candidate/${cand.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:underline"
                >
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
