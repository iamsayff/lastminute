import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, Heart } from 'lucide-react';
import { AmusuLogo } from './AmusuLogo';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
}) => {
  const { 
    currentUser, 
    firebaseUser,
    signInWithGoogleAuth,
    setUserProfileModalOpen, 
    isUserProfileModalOpen, 
    supportedCandidateIds, 
    setSupportModalOpen 
  } = useApp();
  const location = useLocation();

  const quickNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'Candidates', path: '/candidates' },
    { label: 'Manifestos', path: '/manifesto' },
    { label: 'Issues', path: '/issues' },
    { label: 'Timeline', path: '/dates' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] px-4 sm:px-8 py-3 flex items-center justify-between transition-all">
      {/* Left side: Hamburger on mobile + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer active:scale-95 transition-all"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="lg:hidden">
          <AmusuLogo size="sm" />
        </Link>

        <Link to="/" className="hidden lg:block">
          <AmusuLogo size="md" />
        </Link>
      </div>

      {/* Center: Desktop Quick Nav Links */}
      <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 text-xs font-semibold">
        {quickNavLinks.map((item) => {
          const active = isLinkActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                active
                  ? 'bg-white text-emerald-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Support quick badge button in header */}
        <button
          onClick={() => setSupportModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/80 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          title="Manage candidate supports"
        >
          <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
          <span>{supportedCandidateIds.length} Votes Cast</span>
        </button>

        {firebaseUser ? (
          /* Profile Icon / Photo - clicking opens details popover */
          <button
            onClick={() => setUserProfileModalOpen(!isUserProfileModalOpen)}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#059669] to-[#10b981] text-white flex items-center justify-center shadow-xs border-2 border-white ring-2 ring-emerald-500/30 transition-all cursor-pointer active:scale-95 select-none overflow-hidden"
            title="Open Voter Profile"
            aria-label="User Profile"
          >
            {firebaseUser.photoURL ? (
              <img src={firebaseUser.photoURL} alt={firebaseUser.displayName || 'Voter'} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
          </button>
        ) : (
          /* Direct Google Sign In Button */
          <button
            onClick={signInWithGoogleAuth}
            className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>Sign In with Google</span>
          </button>
        )}
      </div>
    </header>
  );
};
