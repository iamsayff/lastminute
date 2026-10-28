import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  ThumbsUp, 
  PlusCircle, 
  Building, 
  BookOpen, 
  Wifi, 
  UtensilsCrossed, 
  Bus, 
  HeartHandshake,
  Search,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const IssuesPage: React.FC = () => {
  const { issues, upvoteIssue } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'Hostel & Accommodation',
    'Academics & Exams',
    'Infrastructure',
    'Mess & Food',
    'Transport',
    'Student Welfare',
  ];

  const getCategoryDetails = (category: string) => {
    switch (category) {
      case 'Hostel & Accommodation':
        return {
          pill: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <Building className="w-5 h-5 text-blue-600" />,
          avatarColor: 'bg-blue-100 text-blue-700',
        };
      case 'Academics & Exams':
        return {
          pill: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
          avatarColor: 'bg-indigo-100 text-indigo-700',
        };
      case 'Infrastructure':
        return {
          pill: 'bg-sky-50 text-sky-700 border-sky-200',
          icon: <Wifi className="w-5 h-5 text-sky-600" />,
          avatarColor: 'bg-sky-100 text-sky-700',
        };
      case 'Mess & Food':
        return {
          pill: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <UtensilsCrossed className="w-5 h-5 text-amber-700" />,
          avatarColor: 'bg-amber-100 text-amber-800',
        };
      case 'Transport':
        return {
          pill: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: <Bus className="w-5 h-5 text-purple-600" />,
          avatarColor: 'bg-purple-100 text-purple-700',
        };
      case 'Student Welfare':
        return {
          pill: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <HeartHandshake className="w-5 h-5 text-emerald-700" />,
          avatarColor: 'bg-emerald-100 text-emerald-800',
        };
      default:
        return {
          pill: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: <MessageSquare className="w-5 h-5 text-slate-600" />,
          avatarColor: 'bg-slate-100 text-slate-700',
        };
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesCategory = activeCategory === 'all' || issue.category === activeCategory;
    const matchesSearch =
      (issue.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (issue.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Campus Issues & Student Voices</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf5ef] text-[#059669] text-xs font-bold tracking-wide uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              <span>Democracy in Action</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Campus Issues & Student Voices
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Student-submitted grievances, hall infrastructure priorities, and reform petitions for contesting candidates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct button to separate submit page */}
            <Link
              to="/submit-issue"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Issue</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Issues' : cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72 flex-shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search issues..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredIssues.map((issue) => {
          const catInfo = getCategoryDetails(issue.category);

          return (
            <div
              key={issue.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs hover:border-emerald-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${catInfo.avatarColor}`}>
                    {catInfo.icon}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${catInfo.pill}`}>
                    {issue.category}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {issue.title}
                </h3>

                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  {issue.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 text-[11px]">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>{issue.talksCount}</span>
                  </div>

                  <button
                    onClick={() => upvoteIssue(issue.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-md border transition-all cursor-pointer text-[11px] ${
                      issue.hasUpvoted
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${issue.hasUpvoted ? 'fill-current text-emerald-700' : ''}`} />
                    <span>{issue.upvotes}</span>
                  </button>
                </div>

                <button
                  onClick={() => upvoteIssue(issue.id)}
                  className="font-bold text-[11px] text-slate-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Vote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
