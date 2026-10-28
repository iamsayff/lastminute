import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  User, 
  Star, 
  Filter, 
  Building2, 
  Check, 
  X, 
  Layers, 
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CandidateCard } from '../components/CandidateCard';
import { CandidatePost, FacultyCategory } from '../types';
import { MosqueSkyline } from '../components/MosqueSkyline';
import { PostFilterGrid } from '../components/PostFilterGrid';
import { FACULTY_CATEGORIES } from '../data/constants';
import { StudentInitiativeBanner } from '../components/StudentInitiativeBanner';
import { ClaimProfileModal } from '../components/ClaimProfileModal';

export const CandidatesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { candidates, supportedCandidateIds, toggleSupport, showToast } = useApp();

  const initialCategory = searchParams.get('post') || 'all';
  const initialFaculty = searchParams.get('faculty') || 'all';

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>(initialCategory);
  const [activeFacultyFilter, setActiveFacultyFilter] = useState<string>(initialFaculty);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  // Sync state if URL search param changes
  useEffect(() => {
    const postParam = searchParams.get('post');
    const facultyParam = searchParams.get('faculty');
    if (postParam) setActiveCategoryFilter(postParam);
    if (facultyParam) setActiveFacultyFilter(facultyParam);
  }, [searchParams]);

  const updateUrlParams = (newPost: string, newFaculty: string) => {
    const params: Record<string, string> = {};
    if (newPost !== 'all') params.post = newPost;
    if (newFaculty !== 'all') params.faculty = newFaculty;
    setSearchParams(params);
  };

  const handlePostFilterChange = (cat: string) => {
    setActiveCategoryFilter(cat);
    updateUrlParams(cat, activeFacultyFilter);
  };

  const handleFacultyFilterChange = (fac: string) => {
    setActiveFacultyFilter(fac);
    setIsFacultyDropdownOpen(false);
    updateUrlParams(activeCategoryFilter, fac);
  };

  const handleResetFilters = () => {
    setActiveCategoryFilter('all');
    setActiveFacultyFilter('all');
    setSearchQuery('');
    setSearchParams({});
  };

  const categoriesConfig: {
    post: CandidatePost;
    title: string;
    icon: React.ReactNode;
    badgeColor: string;
    skylineColor: string;
  }[] = [
    {
      post: 'President',
      title: 'President',
      icon: <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
      badgeColor: 'bg-[#dc2626]',
      skylineColor: '#dc2626',
    },
    {
      post: 'Vice President',
      title: 'Vice President',
      icon: <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
      badgeColor: 'bg-[#059669]',
      skylineColor: '#059669',
    },
    {
      post: 'Honorary Secretary',
      title: 'Honorary Secretary',
      icon: <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
      badgeColor: 'bg-[#2563eb]',
      skylineColor: '#2563eb',
    },
    {
      post: 'Cabinet Member',
      title: 'Cabinet Member',
      icon: <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
      badgeColor: 'bg-[#7c3aed]',
      skylineColor: '#7c3aed',
    },
    {
      post: 'Court Member',
      title: 'Court Member',
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
      badgeColor: 'bg-[#d97706]',
      skylineColor: '#d97706',
    },
  ];

  // Candidates count per faculty
  const facultyCounts = useMemo(() => {
    const map: Record<string, number> = { all: candidates.length };
    FACULTY_CATEGORIES.forEach((fac) => {
      map[fac] = candidates.filter((c) => c.facultyCategory === fac).length;
    });
    return map;
  }, [candidates]);

  // Filter candidates based on Search, Post, and Faculty
  const filteredCandidates = useMemo(() => {
    return (candidates || []).filter((c) => {
      if (!c) return false;
      const q = (searchQuery || '').toLowerCase();
      const name = (c.name || '').toLowerCase();
      const quote = (c.tagQuote || '').toLowerCase();
      const dept = (c.facultyOrDept || '').toLowerCase();
      const post = (c.post || '').toLowerCase();
      const cat = (c.facultyCategory || '').toLowerCase();

      const matchesSearch =
        name.includes(q) ||
        quote.includes(q) ||
        dept.includes(q) ||
        post.includes(q) ||
        cat.includes(q);

      const matchesCategory =
        activeCategoryFilter === 'all' || c.post === activeCategoryFilter;

      const matchesFaculty =
        activeFacultyFilter === 'all' || c.facultyCategory === activeFacultyFilter;

      return matchesSearch && matchesCategory && matchesFaculty;
    }).sort((a, b) => (b.supportsCount || 0) - (a.supportsCount || 0));
  }, [candidates, searchQuery, activeCategoryFilter, activeFacultyFilter]);

  return (
    <div className="space-y-7 animate-in fade-in">
      {/* 1. Header with Breadcrumb and Title */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Candidates Directory</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              All Candidates • AMU Elections 2026
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Explore candidate profiles, faculty representatives, and manifestos.
            </p>
          </div>

          {/* Search box & Faculty Filter Button Row */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64 md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Faculty Filter Button */}
            <div className="relative">
              <button
                onClick={() => setIsFacultyDropdownOpen(!isFacultyDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer select-none active:scale-95 ${
                  activeFacultyFilter !== 'all'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/20'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
                aria-expanded={isFacultyDropdownOpen}
              >
                <Building2 className={`w-4 h-4 ${activeFacultyFilter !== 'all' ? 'text-white' : 'text-emerald-600'}`} />
                <span className="truncate max-w-[140px] sm:max-w-[180px]">
                  {activeFacultyFilter === 'all' ? 'Filter Faculty' : activeFacultyFilter}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFacultyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Faculty Dropdown Popover */}
              {isFacultyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsFacultyDropdownOpen(false)}
                  />
                  <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 z-40 w-80 sm:w-96 rounded-3xl bg-white border border-slate-200 shadow-2xl p-4 space-y-3 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <span>Filter by Faculty</span>
                      </div>
                      {activeFacultyFilter !== 'all' && (
                        <button
                          onClick={() => handleFacultyFilterChange('all')}
                          className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Clear Faculty</span>
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                      {/* All Faculties Option */}
                      <button
                        onClick={() => handleFacultyFilterChange('all')}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                          activeFacultyFilter === 'all'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-slate-400" />
                          <span>All Faculties</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {candidates.length}
                        </span>
                      </button>

                      {/* 12 AMU Faculties */}
                      {FACULTY_CATEGORIES.map((fac) => {
                        const count = facultyCounts[fac] || 0;
                        const isSelected = activeFacultyFilter === fac;

                        return (
                          <button
                            key={fac}
                            onClick={() => handleFacultyFilterChange(fac)}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate pr-2">
                              {isSelected ? (
                                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                              )}
                              <span className="truncate">{fac}</span>
                            </span>
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter Badges Strip */}
        {(activeFacultyFilter !== 'all' || activeCategoryFilter !== 'all' || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              Active Filters:
            </span>

            {activeCategoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white font-bold text-xs">
                <span>Post: {activeCategoryFilter}</span>
                <button
                  onClick={() => handlePostFilterChange('all')}
                  className="hover:text-red-300 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFacultyFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white font-bold text-xs">
                <Building2 className="w-3 h-3" />
                <span>Faculty: {activeFacultyFilter}</span>
                <button
                  onClick={() => handleFacultyFilterChange('all')}
                  className="hover:text-emerald-200 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-semibold text-xs">
                <span>Query: “{searchQuery}”</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-red-600 font-bold hover:underline ml-2 cursor-pointer"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* 2. Non-Scrollable Post Filter Grid (Fully visible across all screen sizes) */}
      <PostFilterGrid
        activePost={activeCategoryFilter}
        onSelectPost={handlePostFilterChange}
      />

      {/* 3. Candidates Grid: 4 cards in a row on PC, 2 cards in a row on mobile */}
      <div className="space-y-10">
        {categoriesConfig.map((catConfig) => {
          if (activeCategoryFilter !== 'all' && activeCategoryFilter !== catConfig.post) {
            return null;
          }

          const catCandidates = filteredCandidates.filter(
            (c) => c.post === catConfig.post
          );

          if (catCandidates.length === 0) {
            return null;
          }

          return (
            <div key={catConfig.post} className="space-y-4">
              {/* Category Header Bar */}
              <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-100 p-3 sm:px-5 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3 z-10">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${catConfig.badgeColor} flex items-center justify-center flex-shrink-0 shadow-xs`}>
                    {catConfig.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {catConfig.title}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      {catCandidates.length} CANDIDATES
                    </span>
                  </div>
                </div>

                {/* Decorative skyline */}
                <div className="absolute right-16 top-0 bottom-0 w-80 pointer-events-none opacity-20 hidden md:block">
                  <MosqueSkyline
                    fillColor={catConfig.skylineColor}
                    opacity={0.4}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Cards Grid: 4 cards in a row in PC, 2 cards in a row in mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
                {catCandidates.map((cand, index) => (
                  <CandidateCard
                    key={`${cand.id}-${index}`}
                    candidate={cand}
                    onSupportToggle={toggleSupport}
                    isSupported={supportedCandidateIds.includes(cand.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-100 p-6">
            <Filter className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No candidates match your current filter</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no candidates found under {activeFacultyFilter !== 'all' ? `Faculty of ${activeFacultyFilter}` : ''} {activeCategoryFilter !== 'all' ? `for ${activeCategoryFilter}` : ''}.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Student Led Initiative Graphic Banner */}
      <StudentInitiativeBanner onClaimClick={() => setClaimModalOpen(true)} />

      {/* 5. Claim Profile Modal */}
      <ClaimProfileModal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        showToast={showToast}
      />
    </div>
  );
};
