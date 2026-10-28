import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Star, ArrowRight } from 'lucide-react';
import { Candidate, CandidatePost } from '../types';
import { CandidateCard } from './CandidateCard';
import { ExploreAllCard } from './ExploreAllCard';
import { MosqueSkyline } from './MosqueSkyline';
import { ImagePlaceholder } from './ImagePlaceholder';
import { PostFilterGrid } from './PostFilterGrid';

interface CandidatesSectionProps {
  candidates: Candidate[];
  onSupportToggle: (candidateId: string) => void;
  supportedCandidateIds: string[];
  activeCategoryFilter?: string;
  setActiveCategoryFilter?: (cat: string) => void;
}

export const CandidatesSection: React.FC<CandidatesSectionProps> = ({
  candidates,
  onSupportToggle,
  supportedCandidateIds,
  activeCategoryFilter = 'all',
  setActiveCategoryFilter,
}) => {
  const [internalCategoryFilter, setInternalCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = setActiveCategoryFilter ? activeCategoryFilter : internalCategoryFilter;
  const setCategory = setActiveCategoryFilter || setInternalCategoryFilter;

  const filterTabs = [
    { id: 'all', label: 'All Posts' },
    { id: 'President', label: 'President' },
    { id: 'Vice President', label: 'Vice President' },
    { id: 'Honorary Secretary', label: 'Honorary Secretary' },
    { id: 'Cabinet Member', label: 'Cabinet Member' },
    { id: 'Court Member', label: 'Court Member' },
  ];

  const categoriesConfig: {
    post: CandidatePost;
    title: string;
    icon: React.ReactNode;
    colorTheme: 'red' | 'emerald' | 'blue' | 'purple' | 'amber';
    badgeColor: string;
    btnColor: string;
    skylineColor: string;
  }[] = [
    {
      post: 'President',
      title: 'President',
      icon: <User className="w-5 h-5 text-white" />,
      colorTheme: 'red',
      badgeColor: 'bg-[#dc2626]',
      btnColor: 'bg-[#dc2626] hover:bg-[#b91c1c] text-white',
      skylineColor: '#dc2626',
    },
    {
      post: 'Vice President',
      title: 'Vice President',
      icon: <User className="w-5 h-5 text-white" />,
      colorTheme: 'emerald',
      badgeColor: 'bg-[#059669]',
      btnColor: 'bg-[#059669] hover:bg-[#047857] text-white',
      skylineColor: '#059669',
    },
    {
      post: 'Honorary Secretary',
      title: 'Honorary Secretary',
      icon: <User className="w-5 h-5 text-white" />,
      colorTheme: 'blue',
      badgeColor: 'bg-[#2563eb]',
      btnColor: 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white',
      skylineColor: '#2563eb',
    },
    {
      post: 'Cabinet Member',
      title: 'Cabinet Member',
      icon: <User className="w-5 h-5 text-white" />,
      colorTheme: 'purple',
      badgeColor: 'bg-[#7c3aed]',
      btnColor: 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white',
      skylineColor: '#7c3aed',
    },
    {
      post: 'Court Member',
      title: 'Court Member',
      icon: <Star className="w-5 h-5 text-white" />,
      colorTheme: 'amber',
      badgeColor: 'bg-[#d97706]',
      btnColor: 'bg-[#d97706] hover:bg-[#b45309] text-white',
      skylineColor: '#d97706',
    },
  ];

  const filteredCandidates = useMemo(() => {
    return (candidates || []).filter((c) => {
      if (!c) return false;
      const name = (c.name || '').toLowerCase();
      const quote = (c.tagQuote || '').toLowerCase();
      const dept = (c.facultyOrDept || '').toLowerCase();
      const post = (c.post || '').toLowerCase();
      const query = (searchQuery || '').toLowerCase();

      const matchesSearch =
        name.includes(query) ||
        quote.includes(query) ||
        dept.includes(query) ||
        post.includes(query);

      const matchesCategory =
        currentCategory === 'all' || c.post === currentCategory;

      return matchesSearch && matchesCategory;
    });
  }, [candidates, searchQuery, currentCategory]);

  return (
    <section id="candidates" className="space-y-8 pt-4">
      {/* 1. Header with Title, Description, and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Meet the Candidates
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Explore the profiles and manifestos of candidate leaders contesting in AMU Elections 2026.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 flex-shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>



      {/* 3. Candidate Rows by Category */}
      <div className="space-y-12">
        {categoriesConfig.map((catConfig) => {
          if (currentCategory !== 'all' && currentCategory !== catConfig.post) {
            return null;
          }

          const catCandidates = filteredCandidates
            .filter((c) => c.post === catConfig.post)
            .sort((a, b) => b.supportsCount - a.supportsCount);

          if (catCandidates.length === 0 && searchQuery) {
            return null;
          }

          return (
            <div key={catConfig.post} className="space-y-5">
              {/* Category Header Row with subtle skyline background */}
              <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-100 p-4 sm:px-6 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3.5 z-10">
                  <div className={`w-9 h-9 rounded-full ${catConfig.badgeColor} flex items-center justify-center flex-shrink-0 shadow-xs`}>
                    {catConfig.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      {catConfig.title}
                    </h3>
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      CANDIDATES
                    </span>
                  </div>
                </div>

                <div className="absolute right-36 top-0 bottom-0 w-80 pointer-events-none opacity-20 hidden md:block">
                  <MosqueSkyline
                    fillColor={catConfig.skylineColor}
                    opacity={0.4}
                    className="w-full h-full"
                  />
                </div>

                {/* Direct link to /candidates?post=... */}
                <Link
                  to={`/candidates?post=${encodeURIComponent(catConfig.post)}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs z-10 ${catConfig.btnColor}`}
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Grid of Candidate Cards: 4 in a row on PC, 2 in a row on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
                {catCandidates.slice(0, 4).map((cand, index) => (
                  <CandidateCard
                    key={`${cand.id}-${index}`}
                    candidate={cand}
                    onSupportToggle={onSupportToggle}
                    isSupported={supportedCandidateIds.includes(cand.id)}
                  />
                ))}
              </div>

              {/* Panoramic sunset banner after Court Member */}
              {catConfig.post === 'Court Member' && (
                <div className="pt-4">
                  <ImagePlaceholder
                    type="campus-sunset"
                    alt="Golden Sunset at AMU Campus"
                    aspectRatio="aspect-[16/7] sm:aspect-[21/8]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
