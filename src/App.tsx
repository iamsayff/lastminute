import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SupportFloatingBadge } from './components/SupportFloatingBadge';
import { SupportNowPopup, UserProfilePopup, EditVoterProfileModal } from './components/Popups';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ImagePlaceholder } from './components/ImagePlaceholder';

// Pages
import { HomePage } from './pages/HomePage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateProfilePage } from './pages/CandidateProfilePage';
import { ManifestosPage } from './pages/ManifestosPage';
import { IssuesPage } from './pages/IssuesPage';
import { SubmitIssuePage } from './pages/SubmitIssuePage';
import { TimelinePage } from './pages/TimelinePage';
import { NewsPage } from './pages/NewsPage';
import { AboutPage } from './pages/AboutPage';
import { SignInPage } from './pages/SignInPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { 
    supportedCandidateIds, 
    setSupportModalOpen, 
    isAdminPanelOpen,
    setAdminPanelOpen,
    toastMessage 
  } = useApp();

  // Top banner displayed on all pages EXCEPT candidate profile pages
  const isCandidateProfile = 
    location.pathname.startsWith('/candidate/') || 
    location.pathname.startsWith('/candidates/');

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col w-full overflow-x-clip">
      <ScrollToTop />

      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* 2. Side Sticky "VOTE NOW" Button */}
      <SupportFloatingBadge
        supportedCount={supportedCandidateIds.length}
        maxSupports={5}
        onClick={() => setSupportModalOpen(true)}
      />

      {/* 3. Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 w-full">
        {/* Sticky Header */}
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] text-white px-5 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dynamic Route Pages Container with Responsive Width */}
        <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 overflow-x-clip min-w-0">
          {/* Top Most Banner Image (Displayed on ALL pages except candidate profile pages) */}
          {!isCandidateProfile && (
            <div className="mb-4 sm:mb-5">
              <ImagePlaceholder
                type="bab-e-syed"
                alt="Aligarh Muslim University Campus Entrance"
                aspectRatio="aspect-[16/6] sm:aspect-[21/7]"
              />
            </div>
          )}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/candidate/:id" element={<CandidateProfilePage />} />
            <Route path="/candidates/:id" element={<CandidateProfilePage />} />
            <Route path="/manifesto" element={<ManifestosPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="/submit-issue" element={<SubmitIssuePage />} />
            <Route path="/issues/submit" element={<SubmitIssuePage />} />
            <Route path="/dates" element={<TimelinePage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>

      {/* 4. Floating WhatsApp Channel Button */}
      <a
        href="https://whatsapp.com/channel/0029VbDP92P8F2p9PrEios38" 
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#20bd5a] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        aria-label="Join WhatsApp Channel"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 16.67c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.01 4.54-3.69 8.23-8.22 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.65 4.2 3.71.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
        </svg>
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
          Join Official Channel
        </span>
      </a>

      {/* 5. Popups */}
      <SupportNowPopup />
      <UserProfilePopup />
      <EditVoterProfileModal />
      <AdminPanelModal isOpen={isAdminPanelOpen} onClose={() => setAdminPanelOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
