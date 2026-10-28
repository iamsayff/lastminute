import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  ThumbsUp, 
  ArrowRight, 
  PlusCircle, 
  Building, 
  BookOpen, 
  Wifi, 
  UtensilsCrossed, 
  Bus, 
  HeartHandshake 
} from 'lucide-react';
import { CampusIssue } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface IssuesSectionProps {
  issues: CampusIssue[];
  onUpvoteIssue: (issueId: string) => void;
}

export const IssuesSection: React.FC<IssuesSectionProps> = ({
  issues,
  onUpvoteIssue,
}) => {
  const getCategoryDetails = (category: string) => {
    switch (category) {
      case 'Hostel & Accommodation':
        return {
          pill: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <Building className="w-5 h-5 text-blue-600" />,
          avatarColor: 'bg-blue-100 text-blue-700',
          tagLabel: 'Hostel & Accommodation',
        };
      case 'Academics & Exams':
        return {
          pill: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
          avatarColor: 'bg-indigo-100 text-indigo-700',
          tagLabel: 'Academics & Exams',
        };
      case 'Infrastructure':
        return {
          pill: 'bg-sky-50 text-sky-700 border-sky-200',
          icon: <Wifi className="w-5 h-5 text-sky-600" />,
          avatarColor: 'bg-sky-100 text-sky-700',
          tagLabel: 'Infrastructure',
        };
      case 'Mess & Food':
        return {
          pill: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <UtensilsCrossed className="w-5 h-5 text-amber-700" />,
          avatarColor: 'bg-amber-100 text-amber-800',
          tagLabel: 'Mess & Food',
        };
      case 'Transport':
        return {
          pill: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: <Bus className="w-5 h-5 text-purple-600" />,
          avatarColor: 'bg-purple-100 text-purple-700',
          tagLabel: 'Transport',
        };
      case 'Student Welfare':
        return {
          pill: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <HeartHandshake className="w-5 h-5 text-emerald-700" />,
          avatarColor: 'bg-emerald-100 text-emerald-800',
          tagLabel: 'Student Welfare',
        };
      default:
        return {
          pill: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: <MessageSquare className="w-5 h-5 text-slate-600" />,
          avatarColor: 'bg-slate-100 text-slate-700',
          tagLabel: category,
        };
    }
  };

  return (
    <section id="issues" className="space-y-8 pt-8">
      {/* 1. Header with Badge & Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf5ef] text-[#059669] text-xs font-bold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
          <span>REAL VOICES • REAL STUDENT CHANGE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus Issues & Student Voices
        </h2>

        <p className="text-slate-500 text-xs sm:text-sm">
          Key challenges and student reforms raised across AMU residential halls, academic faculties, and libraries.
        </p>
      </div>

      {/* 2. Grid of Compact Issues Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
        {issues.map((issue) => {
          const catInfo = getCategoryDetails(issue.category);

          return (
            <div
              key={issue.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-emerald-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${catInfo.avatarColor}`}>
                    {catInfo.icon}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${catInfo.pill}`}>
                    {catInfo.tagLabel}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {issue.title}
                </h4>

                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                  {issue.description}
                </p>
              </div>

              {/* Bottom stats row */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 text-[10px]">
                    <MessageSquare className="w-3 h-3 text-slate-400" />
                    <span>{issue.talksCount} Talks</span>
                  </div>

                  <button
                    onClick={() => onUpvoteIssue(issue.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer text-[10px] ${
                      issue.hasUpvoted ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-600'
                    }`}
                    title="Upvote this student issue"
                  >
                    <ThumbsUp className={`w-3 h-3 ${issue.hasUpvoted ? 'fill-current' : ''}`} />
                    <span>{issue.upvotes}</span>
                  </button>
                </div>

                <Link
                  to="/issues"
                  className="inline-flex items-center gap-1 font-bold text-[11px] text-slate-800 hover:text-emerald-700 transition-colors"
                >
                  <span>Vote</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Action Buttons with Direct URL Links */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
        <Link
          to="/submit-issue"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-emerald-600" />
          <span>Submit Student Issue</span>
        </Link>

        <Link
          to="/issues"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <span>View All Issues & Discussions</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4. Campus Quad Photo Banner */}
      <div className="pt-4">
        <ImagePlaceholder
          type="student-lawn"
          alt="AMU Students at Campus Lawn"
          aspectRatio="aspect-[16/7] sm:aspect-[21/8]"
        />
      </div>
    </section>
  );
};
