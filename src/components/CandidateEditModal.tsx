import React, { useState } from 'react';
import { X, Save, Sparkles, Image, FileText, Mail, Phone, Building2, Instagram, Link2, Plus, Trash2 } from 'lucide-react';
import { Candidate, CampaignGalleryItem } from '../types';
import { useApp } from '../context/AppContext';

interface CandidateEditModalProps {
  candidate: Candidate;
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateEditModal: React.FC<CandidateEditModalProps> = ({
  candidate,
  isOpen,
  onClose
}) => {
  const { updateCandidateFields, showToast } = useApp();

  const [form, setForm] = useState<Partial<Candidate>>({
    name: candidate.name,
    tagQuote: candidate.tagQuote,
    facultyOrDept: candidate.facultyOrDept,
    program: candidate.program,
    bio: candidate.bio || '',
    avatarUrl: candidate.avatarUrl || '',
    bannerUrl: candidate.bannerUrl || '',
    manifestoPdfUrl: candidate.manifestoPdfUrl || '',
    contact: candidate.contact || {
      email: candidate.assignedEmail || '',
      phone: '',
      hall: 'Sir Syed Hall (North)',
      roomOrDesk: 'Room 14',
      instagram: '',
      whatsappGroupLink: '',
    },
    campaignGallery: candidate.campaignGallery || []
  });

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCandidateFields(candidate.id, {
        ...form,
        isUnallotted: false,
      });
      showToast('Candidate profile updated live in Firestore!');
      onClose();
    } catch (error) {
      showToast('Failed to update candidate profile.');
    }
  };

  const handleAddGalleryItem = () => {
    const newItem: CampaignGalleryItem = {
      id: `gal-${Date.now()}`,
      title: 'Campaign Event',
      caption: 'Student interaction & manifesto discussion',
      date: '2026',
      tag: 'Campaign Rally',
      location: 'AMU Union Hall',
    };
    setForm(prev => ({
      ...prev,
      campaignGallery: [...(prev.campaignGallery || []), newItem]
    }));
  };

  const handleRemoveGalleryItem = (id: string) => {
    setForm(prev => ({
      ...prev,
      campaignGallery: (prev.campaignGallery || []).filter(item => item.id !== id)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl sm:max-w-3xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-100 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 pr-8">
          <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Edit Your Candidate Profile
            </h3>
            <p className="text-xs text-slate-500">
              Live updates directly saved to AMU Student Election Database
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Basic Details */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Profile Overview & Branding
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Tagline / Campaign Quote
                </label>
                <input
                  type="text"
                  value={form.tagQuote || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, tagQuote: e.target.value }))}
                  placeholder="e.g. For Academic Excellence & Student Welfare"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Faculty / Department
                </label>
                <input
                  type="text"
                  value={form.facultyOrDept || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, facultyOrDept: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Academic Course / Program
                </label>
                <input
                  type="text"
                  value={form.program || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, program: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Media & Images */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-blue-600" />
              <span>Media, Photos & Manifesto PDF</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Profile Picture Image URL
                </label>
                <input
                  type="url"
                  value={form.avatarUrl || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, avatarUrl: e.target.value }))}
                  placeholder="https://... (direct photo URL)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Banner Background Image URL
                </label>
                <input
                  type="url"
                  value={form.bannerUrl || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, bannerUrl: e.target.value }))}
                  placeholder="https://... (banner photo URL)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Manifesto Document PDF / Drive Link
                </label>
                <input
                  type="url"
                  value={form.manifestoPdfUrl || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, manifestoPdfUrl: e.target.value }))}
                  placeholder="https://drive.google.com/file/d/... or PDF link"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* About Bio */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              About Bio & Vision Summary
            </label>
            <textarea
              rows={4}
              value={form.bio || ''}
              onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Write a brief introduction about your student journey, background, and vision for AMU..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Contact & Social Handles
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  value={form.contact?.email || ''}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    contact: { ...prev.contact!, email: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Phone / Helpline Number
                </label>
                <input
                  type="tel"
                  value={form.contact?.phone || ''}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    contact: { ...prev.contact!, phone: e.target.value }
                  }))}
                  placeholder="+91 94120 XXXXX"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Hostel Hall & Room
                </label>
                <input
                  type="text"
                  value={form.contact?.hall || ''}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    contact: { ...prev.contact!, hall: e.target.value }
                  }))}
                  placeholder="Sir Syed Hall South, Room 14"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={form.contact?.instagram || ''}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    contact: { ...prev.contact!, instagram: e.target.value }
                  }))}
                  placeholder="@candidate_amu2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Live</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
