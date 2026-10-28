import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Building2, 
  GraduationCap, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  Calendar, 
  Award,
  Users,
  Target,
  Image as ImageIcon,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Instagram,
  MessageSquare,
  FileText,
  UserCheck,
  Check,
  X,
  Sparkles,
  Copy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MosqueSkyline } from '../components/MosqueSkyline';
import { StudentInitiativeBanner } from '../components/StudentInitiativeBanner';
import { ClaimProfileModal } from '../components/ClaimProfileModal';
import { CandidateEditModal } from '../components/CandidateEditModal';

import { CandidateCard } from '../components/CandidateCard';
import { VerifiedBadge } from '../components/VerifiedBadge';

export const CandidateProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { candidates, supportedCandidateIds, toggleSupport, showToast, firebaseUser, isAdmin } = useApp();
  
  const [copied, setCopied] = useState(false);
  const [isCandidateEditOpen, setIsCandidateEditOpen] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'vision' | 'achievements' | 'gallery' | 'contact'>('about');
  
  // Claim profile modal state
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  // Find candidate by id
  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Candidate Not Found</h2>
        <p className="text-slate-500 text-xs sm:text-sm">The candidate profile you requested could not be located.</p>
        <Link
          to="/candidates"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Candidates</span>
        </Link>
      </div>
    );
  }

  const isSupported = supportedCandidateIds.includes(candidate.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Candidate profile link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(label);
    showToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  // Other candidates contesting for the same post
  const relatedCandidates = candidates
    .filter((c) => c.post === candidate.post && c.id !== candidate.id)
    .slice(0, 4);

  const themeColors = {
    red: {
      bgHeader: 'from-[#b91c1c] via-[#dc2626] to-[#991b1b]',
      btn: 'bg-[#dc2626] hover:bg-[#b91c1c]',
      border: 'border-[#dc2626]',
      text: 'text-[#dc2626]',
      pillBg: 'bg-red-50 text-red-700 border-red-200',
    },
    emerald: {
      bgHeader: 'from-[#047857] via-[#059669] to-[#065f46]',
      btn: 'bg-[#059669] hover:bg-[#047857]',
      border: 'border-[#059669]',
      text: 'text-[#059669]',
      pillBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    blue: {
      bgHeader: 'from-[#1d4ed8] via-[#2563eb] to-[#1e40af]',
      btn: 'bg-[#2563eb] hover:bg-[#1d4ed8]',
      border: 'border-[#2563eb]',
      text: 'text-[#2563eb]',
      pillBg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    purple: {
      bgHeader: 'from-[#6d28d9] via-[#7c3aed] to-[#5b21b6]',
      btn: 'bg-[#7c3aed] hover:bg-[#6d28d9]',
      border: 'border-[#7c3aed]',
      text: 'text-[#7c3aed]',
      pillBg: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    amber: {
      bgHeader: 'from-[#b45309] via-[#d97706] to-[#92400e]',
      btn: 'bg-[#d97706] hover:bg-[#b45309]',
      border: 'border-[#d97706]',
      text: 'text-[#d97706]',
      pillBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  }[candidate.colorTheme];

  const profileTabs = [
    { id: 'about', label: 'About', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'vision', label: 'Vision & Goals', icon: <Target className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'gallery', label: 'Campaign Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 sm:gap-2 truncate">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link to="/candidates" className="hover:text-emerald-700">Candidates</Link>
          <span>/</span>
          <Link to={`/candidates?post=${encodeURIComponent(candidate.post)}`} className="hover:text-emerald-700 hidden sm:inline">
            {candidate.post}
          </Link>
          <span className="hidden sm:inline">/</span>
          <span className="text-slate-800 font-semibold truncate">{candidate.name}</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer flex-shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* 2. Unified Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        {/* Unified AMU Campus Banner Image (Identical for all candidate profiles) */}
        <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900">
          {/* Subtle architectural overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          
          {/* AMU Skyline & Campus Panorama Backdrop */}
          <div className="absolute inset-0 opacity-40 flex items-end">
            <MosqueSkyline fillColor="#ffffff" opacity={0.8} className="w-full h-32 object-cover" />
          </div>

          {/* Banner Tag */}
          <div className="absolute top-4 left-4 sm:left-6 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white border border-white/20">
              Aligarh Muslim University • {candidate.post}
            </span>
          </div>
        </div>

        {/* Candidate Profile Details (Exact Order: Profile Pic -> Name -> Tagline -> Faculty/Course -> Buttons) */}
        <div className="px-5 sm:px-8 pb-8 pt-0 flex flex-col items-center text-center">
          {/* 1. Profile Pic (Centered, overlapping the banner) */}
          <div className="relative -mt-16 sm:-mt-20 mb-3 z-20">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center">
              {candidate.isUnallotted ? (
                <div className={`w-full h-full rounded-full border-2 ${themeColors.border} flex flex-col items-center justify-center bg-slate-50 p-2 text-center`}>
                  <span className={`text-2xl sm:text-3xl font-black font-mono ${themeColors.text}`}>
                    {candidate.initials || 'AB'}
                  </span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                    UNALLOTTED
                  </span>
                </div>
              ) : candidate.avatarUrl ? (
                <div className={`w-full h-full rounded-full border-2 ${themeColors.border} bg-slate-100 overflow-hidden flex items-center justify-center`}>
                  <img
                    src={candidate.avatarUrl}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-full h-full rounded-full border-2 ${themeColors.border} bg-slate-100 flex flex-col items-center justify-center p-2 text-center`}>
                  <div className={`w-12 h-12 rounded-full ${themeColors.btn} text-white flex items-center justify-center text-lg font-bold mb-1 shadow-xs`}>
                    {candidate.initials || candidate.name[0]}
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 truncate max-w-full">
                    {candidate.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Candidate Name (Just below profile pic with Verified Blue Tick) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <span>{candidate.name}</span>
            {(candidate.isVerified || Boolean(candidate.assignedEmail && candidate.assignedEmail.trim().length > 0)) && (
              <VerifiedBadge className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </h1>

          {/* 3. Tagline or Quote (Just below candidate name) */}
          <p className="text-sm sm:text-base text-slate-600 italic font-medium max-w-xl mt-1 leading-snug">
            {candidate.tagQuote}
          </p>

          {/* 4. Faculty & Course (Just below tagline or quote) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700 mt-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 font-semibold text-slate-800">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{candidate.facultyOrDept}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 font-medium text-slate-600">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{candidate.program}</span>
            </div>
          </div>

          {/* 5. Buttons (Just below faculty, course) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-5">
            {/* Candidate Self Edit Profile Button */}
            {((firebaseUser?.email && candidate.assignedEmail && firebaseUser.email === candidate.assignedEmail) || isAdmin) && (
              <button
                onClick={() => setIsCandidateEditOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md active:scale-95 cursor-pointer"
                title="Edit candidate profile details live in Firestore"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Edit My Candidate Profile</span>
              </button>
            )}
            {/* 1. Support Button */}
            <button
              onClick={() => toggleSupport(candidate.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer ${
                isSupported ? 'bg-red-600 hover:bg-red-700' : themeColors.btn
              }`}
              title="Support this candidate"
            >
              <Heart className={`w-4 h-4 fill-current ${isSupported ? 'animate-bounce' : ''}`} />
              <span>
                {isSupported
                  ? `Supported (${candidate.supportsCount})`
                  : `Support (${candidate.supportsCount})`}
              </span>
            </button>

            {/* 2. View Manifesto Button */}
            <button
              onClick={() => {
                setActiveTab('vision');
                const el = document.getElementById('profile-content');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>View Manifesto</span>
            </button>

            {/* 3. Share Profile Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              title="Share candidate profile"
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              <span>{copied ? 'Copied!' : 'Share Profile'}</span>
            </button>

            {/* 4. Claim Profile Button */}
            <button
              onClick={() => setClaimModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-amber-300 bg-amber-50/90 hover:bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              title="Are you this candidate? Claim profile"
            >
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>Claim Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div id="profile-content" className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200/80">
        {profileTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content Sections */}
      <div className="space-y-6">
        {/* TAB 1: ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>About {candidate.name}</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {candidate.bio}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#eaf5ef] border border-emerald-100 text-xs text-emerald-900 space-y-1 mt-3">
                <span className="font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Student Representation Charter</span>
                </span>
                <p className="text-emerald-800 leading-relaxed text-[11px] sm:text-xs">
                  Nominated to contest as the representative of scholars across AMU residential halls and academic faculties.
                </p>
              </div>
            </div>

            {/* Core Manifesto Highlights */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Primary Manifesto Priorities</span>
              </h3>

              <ul className="space-y-2.5">
                {(candidate.manifestoSummary || []).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: VISION AND GOALS */}
        {activeTab === 'vision' && (
          <div className="space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Vision & Strategic Goals
                  </h3>
                  <p className="text-xs text-slate-500">
                    Detailed roadmap and measurable student commitments.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Key Agenda
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {(candidate.visionAndGoals || [
                  {
                    title: 'Transparent Budgeting & Union Ledger',
                    description: 'Publish quarterly receipts and audit statements of student funds on public bulletin boards and portal.',
                    category: 'Governance' as const
                  },
                  {
                    title: '24x7 Library Facilities',
                    description: 'Full air-conditioning, expanded reading capacity, and high-speed Wi-Fi access in Maulana Azad Library.',
                    category: 'Academic' as const
                  },
                  {
                    title: 'Nutritional Dining Standards',
                    description: 'Regular hygiene inspections of all residential halls with subsidized dietary supplements.',
                    category: 'Welfare & Dining' as const
                  },
                  {
                    title: 'Emergency Medical Desk at JNMC',
                    description: 'Priority counter and zero-deposit admission for university scholars needing acute medical attention.',
                    category: 'Welfare & Dining' as const
                  }
                ]).map((goal, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-white text-[9px] font-black uppercase tracking-wider text-emerald-800 border border-slate-200">
                        {goal.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">Goal #{idx + 1}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 pt-1">
                      {goal.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Student Achievements & Service Record
              </h3>
              <p className="text-xs text-slate-500">
                Demonstrated leadership, campus initiatives, community service, and academic contributions.
              </p>
            </div>

            <div className="space-y-3">
              {(candidate.achievements || [
                'Successfully represented scholar delegations during hall dining consultations.',
                'Active volunteer in university blood donation drives at JNMC.',
                'Organized campus academic discussions on student constitutional rights.'
              ]).map((ach, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-2xs mt-0.5">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                    {ach}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CAMPAIGN GALLERY */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Campaign Gallery & Campus Outreach
              </h3>
              <p className="text-xs text-slate-500">
                Photographic journal of student interactions, hall addresses, and campaign milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {(candidate.campaignGallery || [
                {
                  id: 'gal-def-1',
                  title: 'Student Assembly at Quad',
                  caption: 'Discussing academic reforms and research grants with faculty scholars.',
                  date: 'Oct 24, 2026',
                  tag: 'Campaign Speech',
                  location: 'Faculty Quad'
                },
                {
                  id: 'gal-def-2',
                  title: 'Hall Dining Consultation',
                  caption: 'Listening to resident scholars regarding water purifiers and food hygiene.',
                  date: 'Oct 25, 2026',
                  tag: 'Hall Welfare',
                  location: 'Dining Hall'
                },
                {
                  id: 'gal-def-3',
                  title: 'Nomination Process',
                  caption: 'Submitting nomination papers at the Kennedy House complex.',
                  date: 'Oct 26, 2026',
                  tag: 'Nomination',
                  location: 'Kennedy House'
                }
              ]).map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/50 hover:shadow-xs transition-all group">
                  <div className="relative h-36 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 flex flex-col items-center justify-center p-3 text-center">
                    <ImageIcon className="w-7 h-7 text-slate-400 group-hover:scale-110 transition-transform mb-1" />
                    <span className="text-[11px] font-bold text-slate-700">{item.title}</span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5">{item.location}</span>

                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[8.5px] font-black uppercase tracking-wider text-slate-700 shadow-2xs">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-3 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{item.location}</span>
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COMPACT TABLE CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Connect with Candidate
                </h3>
                <p className="text-xs text-slate-500">
                  Reach {candidate.name}'s campaign office directly or join official student groups.
                </p>
              </div>
            </div>

            {/* Table-like Structure */}
            <div className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50/50 divide-y divide-slate-200/80 text-xs sm:text-sm">
              {/* Row 1: Email */}
              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-100/50 transition-colors">
                <div className="flex items-center gap-2.5 min-w-[150px]">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                   Email Address
                  </span>
                </div>
                <div className="font-mono text-slate-900 font-semibold text-xs break-all flex-1">
                  {candidate.contact?.email ? candidate.contact.email : <span className="text-slate-400 font-sans italic">Not Available</span>}
                </div>
                {candidate.contact?.email ? (
                  <button
                    onClick={() => copyToClipboard(candidate.contact!.email, 'Email')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Copy className="w-3 h-3 text-slate-500" />
                    <span>{copiedContact === 'Email' ? 'Copied!' : 'Copy'}</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400 self-start sm:self-auto">Not Available</span>
                )}
              </div>

              {/* Row 2: Hall/Room */}
              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-100/50 transition-colors">
                <div className="flex items-center gap-2.5 min-w-[150px]">
                  <Building2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Hall/Room
                  </span>
                </div>
                <div className="text-slate-900 font-semibold text-xs flex-1">
                  {(candidate.contact?.hall || candidate.contact?.roomOrDesk) ? (
                    `${candidate.contact?.hall || ''}${candidate.contact?.hall && candidate.contact?.roomOrDesk ? ', ' : ''}${candidate.contact?.roomOrDesk || ''}`
                  ) : (
                    <span className="text-slate-400 font-sans italic">Not Available</span>
                  )}
                </div>
                {(candidate.contact?.hall || candidate.contact?.roomOrDesk) ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold self-start sm:self-auto">
                    Hostel
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400 self-start sm:self-auto">Not Available</span>
                )}
              </div>

              {/* Row 3: Helpline / Phone */}
              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-100/50 transition-colors">
                <div className="flex items-center gap-2.5 min-w-[150px]">
                  <Phone className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Phone Number
                  </span>
                </div>
                <div className="font-mono text-slate-900 font-semibold text-xs flex-1">
                  {(candidate.contact?.whatsappDesk || candidate.contact?.phone) ? (
                    candidate.contact?.whatsappDesk || candidate.contact?.phone
                  ) : (
                    <span className="text-slate-400 font-sans italic">Not Available</span>
                  )}
                </div>
                {(candidate.contact?.whatsappDesk || candidate.contact?.phone) ? (
                  <a
                    href={`tel:${(candidate.contact?.whatsappDesk || candidate.contact?.phone || '').replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Contact No.</span>
                  </a>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400 self-start sm:self-auto">Not Available</span>
                )}
              </div>

              {/* Row 4: WhatsApp Group Link */}
              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-100/50 transition-colors">
                <div className="flex items-center gap-2.5 min-w-[150px]">
                  <MessageSquare className="w-4 h-4 text-[#25D366] flex-shrink-0 fill-current" />
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    WhatsApp Group
                  </span>
                </div>
                <div className="text-slate-700 font-medium text-xs flex-1">
                  {candidate.contact?.whatsappGroupLink ? 'Official Campaign Supporters Group & Broadcast' : <span className="text-slate-400 italic">Not Available</span>}
                </div>
                {candidate.contact?.whatsappGroupLink ? (
                  <a
                    href={candidate.contact.whatsappGroupLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <MessageSquare className="w-3 h-3 fill-current" />
                    <span>Join Group</span>
                  </a>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400 self-start sm:self-auto">Not Available</span>
                )}
              </div>

              {/* Row 5: Instagram Handle */}
              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-100/50 transition-colors">
                <div className="flex items-center gap-2.5 min-w-[150px]">
                  <Instagram className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Instagram Handle
                  </span>
                </div>
                <div className="font-mono text-slate-900 font-bold text-xs flex-1">
                  {candidate.contact?.instagram ? candidate.contact.instagram : <span className="text-slate-400 font-sans italic">Not Available</span>}
                </div>
                {candidate.contact?.instagram ? (
                  <a
                    href={`https://instagram.com/${candidate.contact.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Follow Profile</span>
                  </a>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400 self-start sm:self-auto">Not Available</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Other Candidates for this Post */}
      {relatedCandidates.length > 0 && (
        <div className="space-y-3.5 pt-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Other Candidates for {candidate.post}
            </h3>
            <Link
              to={`/candidates?post=${encodeURIComponent(candidate.post)}`}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              View All ({relatedCandidates.length + 1})
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {relatedCandidates.map((rel, index) => (
              <CandidateCard
                key={`${rel.id}-${index}`}
                candidate={rel}
                isSupported={supportedCandidateIds.includes(rel.id)}
                onSupportToggle={toggleSupport}
              />
            ))}
          </div>
        </div>
      )}

      {/* 6. Student Led Initiative Graphic Banner */}
      <StudentInitiativeBanner onClaimClick={() => setClaimModalOpen(true)} />

      {/* 7. Claim Profile Modal Popup */}
      <ClaimProfileModal
        candidate={candidate}
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        showToast={showToast}
      />

      {/* 8. Candidate Self Edit Modal Popup */}
      <CandidateEditModal
        candidate={candidate}
        isOpen={isCandidateEditOpen}
        onClose={() => setIsCandidateEditOpen(false)}
      />
    </div>
  );
};
