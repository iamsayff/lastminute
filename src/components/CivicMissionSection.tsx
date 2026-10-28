import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  MessageCircle, 
  ChevronRight,
  Instagram, 
  Phone,
  Mail,
  Send,
  Heart,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AmusuLogo } from './AmusuLogo';
import { MosqueSkyline } from './MosqueSkyline';
import { useApp } from '../context/AppContext';

export const CivicMissionSection: React.FC = () => {
  const { showToast, setAdminPanelOpen } = useApp();
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;
    setSubscribed(true);
    showToast('Subscribed to election alerts & notification bulletins!');
    setTimeout(() => {
      setSubscriberEmail('');
      setSubscribed(false);
    }, 3000);
  };

  const portalLinks = [
    { label: 'Home Page', path: '/' },
    { label: 'All Candidates', path: '/candidates' },
    { label: 'Candidate Manifestos', path: '/manifesto' },
    { label: 'Key Election Dates', path: '/dates' },
    { label: 'Campus Issues & Discussions', path: '/issues' },
  ];

  const studentResources = [
    { label: 'Submit Student Grievance', path: '/submit-issue' },
    { label: 'Lyngdoh Committee Guidelines', path: '/dates' },
    { label: 'Official Election News', path: '/news' },
    { label: 'About This Platform', path: '/about' },
    { label: 'Student Voter Sign In', path: '/signin' },
  ];

  return (
    <div id="about" className="space-y-8 pt-4">
      {/* 1. Civic Mission Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f0fdf4] via-[#ecfdf5] to-[#f7fee7] border border-emerald-200/90 p-5 sm:p-7 space-y-5 shadow-xs">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />

        {/* Title & Awareness bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-emerald-200/70">
          <div className="flex items-center gap-3">
            <AmusuLogo size="sm" />
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              AMUSU Elections • Know Your Candidates
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-emerald-200 text-xs font-semibold text-emerald-900 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Democracy, Transparency & Student Awareness
          </span>
        </div>

        {/* 4 Feature Cards with elevated design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">100% Non-Partisan</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Independent student platform free from external political interference.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-emerald-100 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Manifesto-Driven</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Comprehensive policy scrutiny, student priorities & institutional reforms.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-emerald-100 shadow-xs hover:shadow-md hover:border-purple-300 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Student-Powered</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Initiative built by AMU peers across all faculties, halls & departments.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-emerald-100 shadow-xs hover:shadow-md hover:border-amber-300 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Open Dialogue</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Real-time campus issue discussions and democratic accountability.
            </p>
          </div>
        </div>

        {/* Quote Banner: Sir Syed Ahmad Khan */}
        <div className="relative overflow-hidden bg-[#eaf5ef] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-emerald-200">
          <blockquote className="font-quote italic text-sm sm:text-base text-slate-800 text-center md:text-left leading-relaxed">
            “When a nation becomes devoid of education and intellectual freedom, it ceases to be a nation.”
            <span className="font-sans font-black text-emerald-800 not-italic block sm:inline sm:ml-2 mt-1 sm:mt-0">
              — Sir Syed Ahmad Khan
            </span>
          </blockquote>

          <Link
            to="/about"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-emerald-300/80 text-[11px] font-bold text-emerald-800 shadow-xs hover:bg-emerald-50 transition-all"
          >
            <span>Civic Platform Manifesto</span>
            <ExternalLink className="w-3 h-3 text-emerald-600" />
          </Link>
        </div>
      </div>

      {/* 2. Beautified Multi-Column Footer */}
      <footer className="relative bg-gradient-to-b from-white to-slate-50/80 rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8 overflow-hidden">
        {/* Decorative Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/">
              <AmusuLogo size="md" />
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Connecting, informing, and empowering the AMU student community. Your voice shapes the future of our university and democracy.
            </p>

            {/* Handwritten Script Slogan */}
            <div className="pt-2">
              <div className="font-script text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide">
                Same Campus. Bigger Dreams.
              </div>
              <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                Aligarh Muslim University • Founded 1875
              </div>
            </div>

            {/* Mosque Skyline Illustration */}
            <div className="pt-2 max-w-xs">
              <MosqueSkyline
                fillColor="#10b981"
                opacity={0.45}
                className="w-full h-12"
              />
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              {portalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center justify-between text-slate-600 hover:text-emerald-700 transition-colors group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Student Resources (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Resources & Rules
            </h4>
            <ul className="space-y-2.5 text-xs">
              {studentResources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center justify-between text-slate-600 hover:text-emerald-700 transition-colors group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Stay Connected & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Stay Connected
            </h4>

            {/* Social & Channel Buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <a
                  href="https://whatsapp.com/channel/0029VbDP92P8F2p9PrEios38"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs hover:shadow transition-all group cursor-pointer flex-1"
                  aria-label="Join WhatsApp Channel"
                  title="Join WhatsApp Channel"
                >
                  <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 16.67c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.01 4.54-3.69 8.23-8.22 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.65 4.2 3.71.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
                  </svg>
                  <span className="truncate">Join WhatsApp Channel</span>
                </a>

                <a
                  href="https://www.instagram.com/amusuelections.in"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs cursor-pointer flex-shrink-0"
                  aria-label="Instagram"
                  title="Follow on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Instant Election Alerts Form */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-slate-700 block">
                Get Instant Result Alerts
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  placeholder="Enter scholar email..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all cursor-pointer flex-shrink-0 shadow-2xs"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Founder Note Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#eaf5ef] to-emerald-50/50 border border-emerald-200 p-3.5 text-xs space-y-2 shadow-2xs">
              <p className="italic text-slate-700 leading-relaxed font-quote text-[11px]">
                “A stronger AMU begins with Student AWARENESS. We help fellow students know about their candidates with objective clarity.”
              </p>
              
              <div className="flex items-center justify-between pt-1 border-t border-emerald-100/70">
                <span className="font-extrabold text-slate-900 text-[10px]">
                  • AMUSUElections Team
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Platform
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-6 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 AMUSU Elections. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={() => setAdminPanelOpen(true)}
              className="text-slate-700 font-semibold flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer"
              title="Open AMUSU Elections Admin Panel"
            >
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 hover:scale-125 transition-transform" />
              <span>Built for the AMU Community</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <Link to="/about" className="hover:text-emerald-700 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-emerald-700 transition-colors">
              Community Guidelines
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-emerald-700 transition-colors">
              Voter Guide
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
