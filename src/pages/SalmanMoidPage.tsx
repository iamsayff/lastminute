import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { VerifiedBadge } from '../components/VerifiedBadge';
import { CandidateCard } from '../components/CandidateCard';

export const SalmanMoidPage: React.FC = () => {
  const { candidates, supportedCandidateIds, toggleSupport, showToast, firebaseUser, isAdmin } = useApp();
  
  const [copied, setCopied] = useState(false);
  const [isCandidateEditOpen, setIsCandidateEditOpen] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'vision' | 'achievements' | 'gallery' | 'contact'>('about');
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  // Find Salman Moid in candidates list or fallback to default custom profile data
  const candidate = candidates.find((c) => c.name.toLowerCase().includes('salman moid')) || {
    id: 'salman-moid-custom',
    name: 'Salman Moid',
    post: 'Court Member' as const,
    facultyCategory: 'Management Studies and International Studies' as const,
    tagQuote: '“Representation with integrity and accountable student leadership.”',
    facultyOrDept: 'Faculty of Management Studies & International Studies',
    program: 'Masters Program',
    supportsCount: 325,
    colorTheme: 'amber' as const,
    initials: 'SM',
    bannerUrl: '',
    isVerified: true,
    assignedEmail: 'salmanmoid@myamu.ac.in',
    bio: 'Salman Moid is a dedicated postgraduate scholar contesting for the Court Member position in the AMUSU Elections 2026. Committed to transparent university governance, student welfare, and bridging communication between residential halls and administrative bodies.',
    manifestoSummary: [
      'Enhanced infrastructural support and high-speed Wi-Fi across department seminar rooms and libraries.',
      'Transparent student grievance redressal mechanism with fortnightly open-house progress updates.',
      'Fair representation of research scholars and postgraduate students in university court proceedings.'
    ],
    visionAndGoals: [
      {
        title: 'Library & Reading Room Upgrade',
        description: 'Extending library hours and ensuring 24x7 high-speed internet access for all research scholars.',
        category: 'Academic' as const
      },
      {
        title: 'Hostel Mess Hygiene & Quality Audit',
        description: 'Establishing a student-led inspection committee for hall mess menus and drinking water purity testing.',
        category: 'Welfare & Dining' as const
      }
    ],
    achievements: [
      'Active student volunteer across university academic symposia and cultural forums.',
      'Represented departmental research initiatives at national student conferences.'
    ],
    campaignGallery: [
      {
        id: 'gal-1',
        title: 'Faculty Interaction Meet',
        caption: 'Discussing student welfare and research funding with management scholars.',
        date: 'October 24, 2026',
        tag: 'Hall Meeting',
        location: 'Management Department Hall'
      }
    ],
    contact: {
      email: 'salmanmoid@myamu.ac.in',
      phone: '+91 98765 43210',
      hall: 'Sir Syed Hall (North)',
      roomOrDesk: 'Room 22',
      instagram: '@salman_moid_amu',
      whatsappGroupLink: 'https://whatsapp.com'
    }
  };

  const isSupported = supportedCandidateIds.includes(candidate.id);

  const rawBallot = candidate.initials?.trim();
  const ballotNo = rawBallot && /^\d+$/.test(rawBallot) ? rawBallot : '0';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Salman Moid profile link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(label);
    showToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const relatedCandidates = candidates
    .filter((c) => c.post === candidate.post && c.id !== candidate.id)
    .slice(0, 4);

  const themeColors = {
    amber: {
      bgHeader: 'from-[#b45309] via-[#d97706] to-[#92400e]',
      btn: 'bg-[#d97706] hover:bg-[#b45309]',
      border: 'border-[#d97706]',
      text: 'text-[#d97706]',
      pillBg: 'bg-amber-50 text-amber-800 border-amber-200',
    }
  }.amber;

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

        <Link
          to="/candidates"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 shadow-2xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Candidates</span>
        </Link>
      </div>

      {/* 2. Main Candidate Profile Header Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm">
        {/* Banner */}
        <div className={`relative h-40 sm:h-64 ${candidate.bannerUrl ? 'bg-slate-900' : `bg-gradient-to-r ${themeColors.bgHeader}`} overflow-hidden flex items-center justify-center p-6 text-center`}>
          {candidate.bannerUrl ? (
            <img src="https://i.ibb.co/gMb9fJhZ/A-degree-should-not-end-with-a-certificate-in-hand-and-uncertainty-in-the-other-2.png" alt="Candidate Banner" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
              <MosqueSkyline fillColor="#ffffff" opacity={0.6} className="w-full h-full" />
            </div>
          )}
        </div>

        {/* Profile Card Content */}
        <div className="px-4 sm:px-8 pb-8 pt-0 relative flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative -mt-16 sm:-mt-20 mb-4 select-none">
            {/* Stylish Circular Ballot Number Badge */}
            <div 
              className={`absolute -top-2 -left-2 sm:-top-2.5 sm:-left-2.5 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 sm:border-[2.5px] ${themeColors.border} shadow-lg flex flex-col items-center justify-center select-none font-mono ${themeColors.text}`} 
              title={`Ballot No. ${ballotNo}`}
            >
              <span className="text-[6.5px] sm:text-[7px] font-extrabold uppercase tracking-tight leading-none opacity-80">BALLOT</span>
              <span className="text-xs sm:text-sm font-black leading-none mt-0.5">{ballotNo}</span>
            </div>

            {candidate.avatarUrl ? (
              <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white ${themeColors.border} bg-slate-100 overflow-hidden flex items-center justify-center shadow-lg`}>
                <img src={candidate.avatarUrl} alt={candidate.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white ${themeColors.border} bg-amber-600 text-white flex flex-col items-center justify-center shadow-lg`}>
                <span className="text-3xl sm:text-4xl font-black">{candidate.initials || 'SM'}</span>
              </div>
            )}
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs" title="Verified Candidate">
              ✓
            </span>
          </div>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <span>{candidate.name}</span>
            <VerifiedBadge className="w-5 h-5 sm:w-6 sm:h-6" />
          </h1>

          {/* Tagline */}
          <p className="text-sm sm:text-base text-slate-600 italic font-medium max-w-xl mt-1 leading-snug">
            {candidate.tagQuote}
          </p>

          {/* Faculty & Course */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-slate-700 mt-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 font-semibold text-slate-800">
              <Building2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>{candidate.facultyOrDept}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 font-medium text-slate-600">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{candidate.program}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-5">
            {isAdmin && (
              <button
                onClick={() => setIsCandidateEditOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Edit Profile</span>
              </button>
            )}

            <button
              onClick={() => toggleSupport(candidate.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer ${
                isSupported ? 'bg-red-600 hover:bg-red-700' : themeColors.btn
              }`}
            >
              <Heart className={`w-4 h-4 ${isSupported ? 'fill-white' : ''}`} />
              <span>{isSupported ? 'Supported (' + candidate.supportsCount + ')' : 'Support Candidate (' + candidate.supportsCount + ')'}</span>
            </button>

            {candidate.manifestoPdfUrl && (
              <a
                href="https://drive.google.com/drive/folders/1HYUiJm8MaXhuOQsthQN1ACs8gtu6CUi3?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>View Manifesto</span>
              </a>
            )}

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>{copied ? 'Link Copied!' : 'Share Profile'}</span>
            </button>

            <button
              onClick={() => setClaimModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-amber-700" />
              <span>Claim Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Profile Tab Navigation */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        {profileTabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                active
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={active ? 'text-white' : 'text-slate-400'}>{tab.icon}</span>
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
                <UserCheck className="w-4 h-4 text-amber-600" />
                <span>About {candidate.name}</span>
              </h3>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                {(() => {
                  const renderWhatsAppFormatting = (text: string) => {
                    if (!text) return null;
                    const paragraphs = text.split('\n');

                    return paragraphs.map((para, pIdx) => {
                      const boldRegex = /\*([^*]+)\*/g;
                      const parts = [];
                      let lastIndex = 0;
                      let match;

                      while ((match = boldRegex.exec(para)) !== null) {
                        if (match.index > lastIndex) {
                          parts.push(para.substring(lastIndex, match.index));
                        }
                        parts.push(
                          <strong key={`${pIdx}-${match.index}`} className="font-extrabold text-slate-900">
                            {match[1]}
                          </strong>
                        );
                        lastIndex = boldRegex.lastIndex;
                      }

                      if (lastIndex < para.length) {
                        parts.push(para.substring(lastIndex));
                      }

                      return (
                        <p key={pIdx} className={para === '' ? 'h-2' : ''}>
                          {parts.length > 0 ? parts : para}
                        </p>
                      );
                    });
                  };

                  return renderWhatsAppFormatting(candidate.bio || '');
                })()}
              </div>
            </div>

            {/* Core Manifesto Highlights */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Primary Manifesto Priorities</span>
              </h3>

              <ul className="space-y-2.5">
                {(candidate.manifestoSummary || []).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Stylish Download Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="https://drive.google.com/file/d/1ZU-8xDgVWa-T-NOT8Xsz9JEuTItC8O7c/view?usp=drive_link"
                  download
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-200" />
                  <span>Read: Student Agenda</span>
                </a>

                <a
                  href="https://drive.google.com/file/d/12I_W7xYuJ7G9LlPCkhHjQXLzDaMniABz/view?usp=sharing"
                  download
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Read: Vote Appeal</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VISION & GOALS */}
        {activeTab === 'vision' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600" />
                <span>Strategic Vision & Goals</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(candidate.visionAndGoals || []).map((goal, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-slate-900">{goal.title}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{goal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Key Achievements & Milestones</span>
            </h3>

            <ul className="space-y-3">
              {(candidate.achievements || []).map((ach, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                    {ach}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TAB 4: CAMPAIGN GALLERY */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>Campaign Gallery & Interactions</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(candidate.campaignGallery || []).map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.caption}</p>
                  <div className="text-[11px] text-slate-500 font-semibold pt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-600" />
              <span>Contact & Campaign Office</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Official Email</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{candidate.contact?.email || candidate.assignedEmail || 'salmanmoid@myamu.ac.in'}</span>
                  <button
                    onClick={() => copyToClipboard(candidate.contact?.email || 'salmanmoid@myamu.ac.in', 'Email')}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Helpline Phone</span>
                <span className="font-mono font-bold text-slate-900">{candidate.contact?.phone || '+91 98765 43210'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Hostel Room / Desk</span>
                <span className="font-bold text-slate-900">{candidate.contact?.hall || 'Sir Syed Hall (North), Room 22'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Instagram</span>
                <span className="font-bold text-slate-900">{candidate.contact?.instagram || '@salman_moid_amu'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Related Candidates for Court Member */}
      {relatedCandidates.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200/80">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Other Candidates for Court Member
            </h3>
            <Link to="/candidates?post=Court%20Member" className="text-xs font-bold text-emerald-700 hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {relatedCandidates.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onSupportToggle={toggleSupport}
                isSupported={supportedCandidateIds.includes(c.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 6. Student Initiative Banner */}
      <div className="pt-4">
        <StudentInitiativeBanner />
      </div>

      {/* Modals */}
      <ClaimProfileModal
        candidate={candidate}
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        showToast={showToast}
      />

      {isCandidateEditOpen && (
        <CandidateEditModal
          candidate={candidate as any}
          isOpen={isCandidateEditOpen}
          onClose={() => setIsCandidateEditOpen(false)}
        />
      )}
    </div>
  );
};
