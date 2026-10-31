import React, { useState } from 'react';
import { X, Save, Sparkles, Image, FileText, Mail, Phone, Building2, Instagram, Link2, Plus, Trash2, CheckCircle2, Award, Target, BookOpen } from 'lucide-react';
import { Candidate, CampaignGalleryItem, CandidateGoal } from '../types';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'manifesto' | 'achievements' | 'gallery' | 'contact'>('overview');

  const [form, setForm] = useState<Partial<Candidate>>({
    name: candidate.name,
    tagQuote: candidate.tagQuote,
    facultyOrDept: candidate.facultyOrDept,
    program: candidate.program,
    bio: candidate.bio || '',
    avatarUrl: candidate.avatarUrl || '',
    bannerUrl: candidate.bannerUrl || '',
    manifestoPdfUrl: candidate.manifestoPdfUrl || '',
    manifestoSummary: candidate.manifestoSummary || [],
    visionAndGoals: candidate.visionAndGoals || [],
    achievements: candidate.achievements || [],
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

  // Manifesto summary helpers
  const handleAddManifestoPoint = () => {
    setForm(prev => ({
      ...prev,
      manifestoSummary: [...(prev.manifestoSummary || []), '']
    }));
  };

  const handleUpdateManifestoPoint = (index: number, val: string) => {
    const updated = [...(form.manifestoSummary || [])];
    updated[index] = val;
    setForm(prev => ({ ...prev, manifestoSummary: updated }));
  };

  const handleRemoveManifestoPoint = (index: number) => {
    setForm(prev => ({
      ...prev,
      manifestoSummary: (prev.manifestoSummary || []).filter((_, i) => i !== index)
    }));
  };

  // Vision & Goals helpers
  const handleAddGoal = () => {
    const newGoal: CandidateGoal = {
      title: '',
      description: '',
      category: 'Academic'
    };
    setForm(prev => ({
      ...prev,
      visionAndGoals: [...(prev.visionAndGoals || []), newGoal]
    }));
  };

  const handleUpdateGoal = (index: number, field: keyof CandidateGoal, val: string) => {
    const updated = [...(form.visionAndGoals || [])];
    updated[index] = { ...updated[index], [field]: val };
    setForm(prev => ({ ...prev, visionAndGoals: updated }));
  };

  const handleRemoveGoal = (index: number) => {
    setForm(prev => ({
      ...prev,
      visionAndGoals: (prev.visionAndGoals || []).filter((_, i) => i !== index)
    }));
  };

  // Achievements helpers
  const handleAddAchievement = () => {
    setForm(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), '']
    }));
  };

  const handleUpdateAchievement = (index: number, val: string) => {
    const updated = [...(form.achievements || [])];
    updated[index] = val;
    setForm(prev => ({ ...prev, achievements: updated }));
  };

  const handleRemoveAchievement = (index: number) => {
    setForm(prev => ({
      ...prev,
      achievements: (prev.achievements || []).filter((_, i) => i !== index)
    }));
  };

  // Campaign Gallery helpers
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

  const handleUpdateGalleryItem = (id: string, field: keyof CampaignGalleryItem, val: string) => {
    const updated = (form.campaignGallery || []).map(item => {
      if (item.id === id) {
        return { ...item, [field]: val };
      }
      return item;
    });
    setForm(prev => ({ ...prev, campaignGallery: updated }));
  };

  const handleRemoveGalleryItem = (id: string) => {
    setForm(prev => ({
      ...prev,
      campaignGallery: (prev.campaignGallery || []).filter(item => item.id !== id)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl sm:max-w-4xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-100 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
        
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
              Comprehensive Candidate Profile Editor
            </h3>
            <p className="text-xs text-slate-500">
              Live updates directly saved to AMU Student Election Database
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Bio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('manifesto')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'manifesto' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manifesto & Goals ({form.manifestoSummary?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'achievements' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Achievements ({form.achievements?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'gallery' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Campaign Gallery ({form.campaignGallery?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'contact' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contact & Social
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          
          {/* TAB 1: OVERVIEW & BIO */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Basic Information & Branding
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
            </div>
          )}

          {/* TAB 2: MANIFESTO & GOALS */}
          {activeTab === 'manifesto' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Manifesto Summary Points */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Manifesto Summary Points</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddManifestoPoint}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Point</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {(form.manifestoSummary || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2 text-center">No manifesto summary points added yet. Click 'Add Point' above.</p>
                  ) : (
                    (form.manifestoSummary || []).map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 w-6 text-right">{idx + 1}.</span>
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => handleUpdateManifestoPoint(idx, e.target.value)}
                          placeholder="e.g. 24x7 Reading Room access during exams"
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveManifestoPoint(idx)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                          title="Remove point"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Vision & Goals */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    <span>Vision & Strategic Goals</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddGoal}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Goal</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(form.visionAndGoals || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2 text-center">No strategic goals added yet. Click 'Add Goal' above.</p>
                  ) : (
                    (form.visionAndGoals || []).map((goal, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2.5 relative">
                        <button
                          type="button"
                          onClick={() => handleRemoveGoal(idx)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                          title="Remove goal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pr-8 text-xs">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Goal Title</label>
                            <input
                              type="text"
                              value={goal.title}
                              onChange={(e) => handleUpdateGoal(idx, 'title', e.target.value)}
                              placeholder="e.g. Mess Hygiene Audit Committee"
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Category</label>
                            <select
                              value={goal.category}
                              onChange={(e) => handleUpdateGoal(idx, 'category', e.target.value as any)}
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                            >
                              <option value="Academic">Academic</option>
                              <option value="Welfare & Dining">Welfare & Dining</option>
                              <option value="Digital & Infrastructure">Digital & Infrastructure</option>
                              <option value="Governance">Governance</option>
                              <option value="Campus Life">Campus Life</option>
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={goal.description}
                              onChange={(e) => handleUpdateGoal(idx, 'description', e.target.value)}
                              placeholder="Detail how this goal will be executed..."
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Key Achievements & Milestones</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddAchievement}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Achievement</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {(form.achievements || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2 text-center">No achievements added yet. Click 'Add Achievement' above.</p>
                  ) : (
                    (form.achievements || []).map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 w-6 text-right">{idx + 1}.</span>
                        <input
                          type="text"
                          value={ach}
                          onChange={(e) => handleUpdateAchievement(idx, e.target.value)}
                          placeholder="e.g. Former Hall President / Debating Union Secretary"
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAchievement(idx)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                          title="Remove achievement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CAMPAIGN GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-purple-600" />
                    <span>Campaign Gallery Events & Photos</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddGalleryItem}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Gallery Item</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(form.campaignGallery || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2 text-center">No gallery items added yet. Click 'Add Gallery Item' above.</p>
                  ) : (
                    (form.campaignGallery || []).map((item) => (
                      <div key={item.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2.5 relative">
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryItem(item.id)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                          title="Remove gallery item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pr-8 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Event Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleUpdateGalleryItem(item.id, 'title', e.target.value)}
                              placeholder="e.g. Engineering Faculty Hall Meet"
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Tag</label>
                            <input
                              type="text"
                              value={item.tag}
                              onChange={(e) => handleUpdateGalleryItem(item.id, 'tag', e.target.value)}
                              placeholder="e.g. Campaign Rally"
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Date</label>
                            <input
                              type="text"
                              value={item.date}
                              onChange={(e) => handleUpdateGalleryItem(item.id, 'date', e.target.value)}
                              placeholder="e.g. October 24, 2026"
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Location</label>
                            <input
                              type="text"
                              value={item.location}
                              onChange={(e) => handleUpdateGalleryItem(item.id, 'location', e.target.value)}
                              placeholder="e.g. Kennedy Auditorium"
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Caption / Description</label>
                            <input
                              type="text"
                              value={item.caption}
                              onChange={(e) => handleUpdateGalleryItem(item.id, 'caption', e.target.value)}
                              placeholder="Brief description of the event..."
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT & SOCIAL */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-in fade-in">
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
            </div>
          )}

          {/* Form Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">
              Changes will immediately reflect across all candidate profile views.
            </span>
            <div className="flex items-center gap-2.5">
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
                <span>Save All Profile Tabs</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
