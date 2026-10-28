import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Heart, 
  BookmarkCheck, 
  Building, 
  GraduationCap, 
  LogOut, 
  ExternalLink,
  Edit3,
  Shield,
  User,
  Users,
  UserCheck,
  Award,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';

import { VerifiedBadge } from './VerifiedBadge';

// 1. Candidate Support Desk / Vote Now Popup (Matching image_21a2f9a5.png & image_15ed86a0.png)
export const SupportNowPopup: React.FC = () => {
  const { 
    isSupportModalOpen, 
    setSupportModalOpen, 
    supportedCandidateIds, 
    userVotes,
    candidates, 
    toggleSupport 
  } = useApp();

  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  if (!isSupportModalOpen) return null;

  const positions = [
    { 
      title: 'President', 
      icon: <User className="w-5 h-5 text-white" />, 
      bg: 'bg-[#dc2626]',
      votedName: candidates.find((c) => c.id === userVotes.presidentId)?.name 
    },
    { 
      title: 'Vice President', 
      icon: <Users className="w-5 h-5 text-white" />, 
      bg: 'bg-[#059669]',
      votedName: candidates.find((c) => c.id === userVotes.vicePresidentId)?.name 
    },
    { 
      title: 'Honorary Secretary', 
      icon: <UserCheck className="w-5 h-5 text-white" />, 
      bg: 'bg-[#2563eb]',
      votedName: candidates.find((c) => c.id === userVotes.secretaryId)?.name 
    },
    { 
      title: 'Cabinet Member', 
      icon: <Award className="w-5 h-5 text-white" />, 
      bg: 'bg-[#7c3aed]',
      votedName: userVotes.cabinetMemberIds && userVotes.cabinetMemberIds.length > 0 
        ? `${userVotes.cabinetMemberIds.length} candidate${userVotes.cabinetMemberIds.length > 1 ? 's' : ''} supported`
        : null 
    },
    { 
      title: 'Court Member', 
      icon: <Star className="w-5 h-5 text-white" />, 
      bg: 'bg-[#d97706]',
      votedName: candidates.find((c) => c.id === userVotes.courtMemberId)?.name 
    },
  ];

  const filteredCandidates = selectedPost 
    ? candidates.filter((c) => c.post === selectedPost).sort((a, b) => (b.supportsCount || 0) - (a.supportsCount || 0))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg sm:max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner (Matching Green #00875a header in screenshots) */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/20 flex items-center justify-between bg-[#00875a] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black leading-tight tracking-tight text-white">
                {selectedPost ? `${selectedPost} Candidates` : 'Candidate Support Desk'}
              </h3>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">
                {selectedPost 
                  ? 'Choose a candidate to express or update your support'
                  : 'Select any union position to express or update your candidate choice'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSupportModalOpen(false);
              setSelectedPost(null);
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[70vh]">
          {/* LEVEL 1: POSITIONS LIST */}
          {!selectedPost ? (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Click on any position to view contestants and cast your ballot. You can change your choice anytime before election day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {positions.map((pos) => (
                  <div
                    key={pos.title}
                    onClick={() => setSelectedPost(pos.title)}
                    className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-emerald-500 hover:shadow-xs transition-all cursor-pointer bg-white flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-2xl ${pos.bg} flex items-center justify-center shadow-xs flex-shrink-0`}>
                        {pos.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                          {pos.title}
                        </h4>
                        <p className={`text-xs font-semibold truncate ${pos.votedName ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                          {pos.votedName || 'No vote cast yet'}
                        </p>
                      </div>
                    </div>

                    <span className="text-slate-300 group-hover:text-emerald-600 transition-colors text-lg font-black flex-shrink-0">
                      ›
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* LEVEL 2: CANDIDATES LIST FOR SELECTED POSITION */
            <div className="space-y-3.5">
              {/* Back button bar */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-700 hover:text-emerald-700 cursor-pointer transition-colors"
                >
                  <span>← Back to Positions</span>
                </button>

                <span className="text-xs font-bold text-slate-400">
                  {selectedPost}
                </span>
              </div>

              {/* Candidate Cards List matching image_15ed86a0.png */}
              <div className="space-y-3">
                {filteredCandidates.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <p className="text-sm font-bold text-slate-700">No candidates found for {selectedPost}</p>
                    <p className="text-xs text-slate-500">Check back later or add candidate via admin panel.</p>
                  </div>
                ) : (
                  filteredCandidates.map((c, index) => {
                    const isSupported = supportedCandidateIds.includes(c.id);
                    const isVerified = Boolean(c.isVerified || (c.assignedEmail && c.assignedEmail.trim().length > 0));

                    const postThemeRing = {
                      'President': 'border-[#dc2626]',
                      'Vice President': 'border-[#059669]',
                      'Honorary Secretary': 'border-[#2563eb]',
                      'Cabinet Member': 'border-[#7c3aed]',
                      'Court Member': 'border-[#d97706]',
                    }[c.post] || 'border-[#059669]';

                    return (
                      <div
                        key={`${c.id}-${index}`}
                        className="p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 bg-white flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar Circle with Ballot Number Tag #0 */}
                          <div className="relative flex-shrink-0">
                            <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full border-2 ${postThemeRing} p-0.5 bg-white flex items-center justify-center overflow-hidden shadow-2xs`}>
                              {c.avatarUrl ? (
                                <img
                                  src={c.avatarUrl}
                                  alt={c.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs sm:text-sm">
                                  {c.initials || c.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              )}
                            </div>
                            <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-slate-900 text-white text-[8px] font-black border border-white">
                              #0
                            </span>
                          </div>

                          {/* Candidate Info */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug truncate">
                                {c.name}
                              </h4>

                              {/* Blue Verified Badge */}
                              {isVerified && <VerifiedBadge className="w-3.5 h-3.5" />}

                              {/* Supports Pill Badge */}
                              <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] sm:text-[11px] font-black inline-flex items-center gap-1 shadow-2xs">
                                <span>♥</span>
                                <span>{c.supportsCount} Supports</span>
                              </span>
                            </div>

                            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                              {c.facultyOrDept}
                            </p>
                          </div>
                        </div>

                        {/* Support Action Button */}
                        <button
                          onClick={() => toggleSupport(c.id)}
                          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex-shrink-0 shadow-2xs active:scale-95 ${
                            isSupported
                              ? 'bg-slate-800 text-white hover:bg-slate-900'
                              : 'bg-[#00c853] text-white hover:bg-[#00e676]'
                          }`}
                        >
                          {isSupported ? 'Supported ✓' : 'Support'}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <Link
            to="/candidates"
            onClick={() => setSupportModalOpen(false)}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Explore candidate profiles →
          </Link>

          <button
            onClick={() => setSupportModalOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Compact User Profile Dropdown
export const UserProfilePopup: React.FC = () => {
  const { 
    currentUser, 
    firebaseUser,
    isUserProfileModalOpen, 
    setUserProfileModalOpen, 
    setSupportModalOpen, 
    signOutUser 
  } = useApp();

  if (!isUserProfileModalOpen || !firebaseUser) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-transparent"
        onClick={() => setUserProfileModalOpen(false)}
      />

      <div 
        className="fixed top-14 right-3 sm:right-6 z-50 w-64 sm:w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 space-y-3 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Identification Header */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              {firebaseUser.displayName || 'AMU Student Voter'}
            </h3>
            <span className="w-3.5 h-3.5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[9px] font-black">
              ✓
            </span>
          </div>

          <p className="text-[11px] text-slate-500 font-normal truncate">
            {firebaseUser.email}
          </p>

          <p className="text-[11px] font-bold text-emerald-600">
            User Profile
          </p>
        </div>

        <div className="border-t border-slate-100" />

        {/* Menu Actions */}
        <div className="space-y-0.5">
          <button
            onClick={() => {
              setUserProfileModalOpen(false);
              setSupportModalOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors text-left cursor-pointer group"
          >
            <Shield className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-800">
              My Support / Candidate Ballot
            </span>
          </button>
        </div>

        <div className="border-t border-slate-100" />

        {/* Sign Out */}
        <button
          onClick={() => {
            signOutUser();
            setUserProfileModalOpen(false);
          }}
          className="w-full flex items-center gap-2 px-1 py-1 text-red-600 hover:text-red-700 font-bold text-xs transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );
};

export const EditVoterProfileModal: React.FC = () => {
  return null;
};
