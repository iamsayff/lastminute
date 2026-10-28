import React, { useState } from 'react';
import { Mail, Check, Copy, ExternalLink, Paperclip, X, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { Candidate } from '../types';

interface ClaimProfileModalProps {
  candidate?: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  showToast?: (msg: string) => void;
}

export const ClaimProfileModal: React.FC<ClaimProfileModalProps> = ({
  candidate,
  isOpen,
  onClose,
  showToast
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const targetEmail = 'reach.lastminute@gmail.com';
  const displayCandidateName = candidate?.name || '[Your Candidate Name]';
  const postTitle = candidate?.post || 'AMU Election Candidate';
  const facultyTitle = candidate?.facultyOrDept || '[Your Faculty / Department]';

  // Template to be automatically loaded in Gmail app / mail client
  const emailSubject = `Profile Claim Request - ${displayCandidateName} - AMUSU Elections.in Support`;
  
  const emailBody = `Dear AMUSU Elections.in Team,

I am writing to claim and verify my candidate profile on the AMU Student Election Information Portal (100% Free).

Candidate Profile Claim Details:
------------------------------------------
• Candidate Name: ${displayCandidateName}
• Post Contested: ${postTitle}
• Faculty / Department: ${facultyTitle}
• Student Enrolment Number: [Enter your Enrolment No. e.g. GK1234]
• Contact Email: [Enter your email]
• Mobile / WhatsApp Number: [Enter your phone number]

Supporting Verification Document:
------------------------------------------
[ATTACHMENT REQUIRED: I have attached a photo/PDF of my AMU Student ID Card / Admit Card / Registration Slip to this email]

Request:
Please grant profile claim access and verify my candidate listing on the portal.

Thank you,
${displayCandidateName}`;

  // Direct Gmail web / mobile app URL
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // Fallback standard mailto link
  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleOpenGmail = () => {
    window.open(gmailWebUrl, '_blank');
    if (showToast) {
      showToast('Opening Gmail with your pre-filled claim request...');
    }
  };

  const handleOpenMailClient = () => {
    window.location.href = mailtoUrl;
    if (showToast) {
      showToast('Opening default Mail app with pre-filled template...');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    if (showToast) showToast('Email address copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-6 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with 100% Free Pill */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              100% Free Profile Claim
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Verified Candidate Access
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Claim Profile via Email
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Are you <strong className="text-slate-900 font-bold">{displayCandidateName}</strong>? Click below to load your claim request directly in the <strong>Gmail app</strong> or mail client.
          </p>
        </div>

        {/* Target Email Highlight Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                Support Email
              </span>
              <span className="text-xs sm:text-sm font-black font-mono text-slate-900 select-all">
                {targetEmail}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95 flex-shrink-0"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Attachment Instructions Card */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3.5 text-amber-950 text-xs leading-relaxed shadow-2xs">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">
            <Paperclip className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <strong className="font-extrabold block text-amber-950 text-xs">
              Document Attachment Required:
            </strong>
            <p className="text-amber-900 text-[11px] sm:text-xs">
              When Gmail opens, please attach a photo or PDF of your <strong>AMU Student ID Card</strong> or <strong>Admit Card</strong>, or <strong>Registration Slip</strong> along with your enrolment details.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          {/* Primary Action: Load in Gmail App */}
          <button
            onClick={handleOpenGmail}
            className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all cursor-pointer group"
          >
            <Send className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
            <span>Open in Gmail App</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </button>

          {/* Secondary Action: Fallback Default Mail App */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={handleOpenMailClient}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              <span>Use Default Mail App</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
