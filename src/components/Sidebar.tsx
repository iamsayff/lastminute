import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Newspaper, 
  Info,
  X
} from 'lucide-react';
import { AmusuLogo } from './AmusuLogo';
import { MosqueSkyline } from './MosqueSkyline';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenMobile = false,
  onCloseMobile
}) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/candidates', label: 'Candidates', icon: <Users className="w-4 h-4" /> },
    { path: '/manifesto', label: 'Manifesto', icon: <FileText className="w-4 h-4" /> },
    { path: '/issues', label: 'Issues', icon: <MessageSquare className="w-4 h-4" /> },
    { path: '/dates', label: 'Important Dates', icon: <Calendar className="w-4 h-4" /> },
    { path: '/news', label: 'News', icon: <Newspaper className="w-4 h-4" /> },
    { path: '/about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
  ];

  const isItemActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between py-6 px-4 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Mobile Close */}
          <div className="flex items-center justify-between pb-6 px-2 border-b border-slate-100">
            <Link to="/" onClick={onCloseMobile}>
              <AmusuLogo size="sm" />
            </Link>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const active = isItemActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    active
                      ? 'bg-[#eaf5ef] text-[#059669] font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className={active ? 'text-[#059669]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Graphic Card */}
        <div className="mt-auto pt-6">
          <Link to="/" onClick={onCloseMobile} className="block group">
            <div className="relative overflow-hidden rounded-2xl bg-[#eaf5ef] border border-emerald-100/80 p-4 text-center transition-all group-hover:border-emerald-200">
              {/* Mosque Skyline graphic in soft teal */}
              <div className="mb-2">
                <MosqueSkyline
                  fillColor="#10b981"
                  opacity={0.38}
                  className="w-full h-12 mx-auto"
                />
              </div>

              {/* Handwritten cursive slogan */}
              <div className="font-script text-[#047857] leading-none select-none">
                <span className="block text-xl font-bold tracking-wide">Your Voice</span>
                <span className="block text-2xl font-bold mt-0.5">Your AMU</span>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};
