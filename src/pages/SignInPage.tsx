import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AmusuLogo } from '../components/AmusuLogo';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { firebaseUser, currentUser, signInWithGoogleAuth, signOutUser } = useApp();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogleAuth();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 max-w-md mx-auto py-8 animate-in fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">Google Sign In</span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#eaf5ef] border-b border-emerald-100 text-center space-y-2">
          <div className="inline-flex justify-center mb-2">
            <AmusuLogo size="sm" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Google Account Sign In
          </h1>
          <p className="text-xs text-emerald-800 font-medium">
            Official Authentication for AMU Student Election Information Portal
          </p>
        </div>

        {firebaseUser ? (
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
              {firebaseUser.photoURL ? (
                <img src={firebaseUser.photoURL} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <CheckCircle2 className="w-8 h-8" />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Signed In as {firebaseUser.displayName || 'Voter'}
              </h2>
              <p className="text-xs font-mono text-slate-500 mt-1">
                {firebaseUser.email}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                to="/"
                className="w-full py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors text-center shadow-xs"
              >
                Return to Home
              </Link>

              <button
                onClick={signOutUser}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Account</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
              Anyone can view candidate profiles, manifestos, and timeline without logging in. Sign in with Google to cast votes or support candidates.
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#0f172a] hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-3 shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"
                />
              </svg>
              <span>Sign In with Google</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Secure Single Sign-On</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
