import React, { useState, useMemo } from 'react';
import { 
  X, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Mail, 
  Sparkles, 
  Sliders, 
  UserCheck, 
  Lock, 
  Search, 
  ExternalLink,
  ArrowLeft,
  Building2,
  Users,
  Vote,
  FileText,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Candidate, CandidatePost, FacultyCategory } from '../types';
import { FACULTY_CATEGORIES } from '../data/constants';
import { CandidateEditModal } from './CandidateEditModal';
import { VerifiedBadge } from './VerifiedBadge';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { 
    candidates, 
    currentUser, 
    isAdmin, 
    signInWithGoogleAuth, 
    addBlankCandidate, 
    deleteCandidateById, 
    deleteAllCandidates,
    importFromCsv,
    assignCandidateEmail, 
    updateCandidateVotesCount, 
    updateCandidateFields,
    showToast 
  } = useApp();

  // Admin Portal Tab
  const [activeAdminTab, setActiveAdminTab] = useState<'candidates' | 'claims' | 'issues'>('candidates');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyFilter, setFacultyFilter] = useState<string>('all');
  const [postFilter, setPostFilter] = useState<string>('all');

  // Inline Quick Edit state
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [rowEmail, setRowEmail] = useState('');
  const [rowVotes, setRowVotes] = useState<number>(0);
  const [rowBallot, setRowBallot] = useState<string>('0');

  // Full Profile Editor Modal state
  const [fullEditCandidate, setFullEditCandidate] = useState<Candidate | null>(null);

  // Add Candidate modal form
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newPost, setNewPost] = useState<CandidatePost>('President');
  const [newFaculty, setNewFaculty] = useState<FacultyCategory>('Engineering & Technology');
  const [newName, setNewName] = useState('');

  // Delete candidate confirm modal state
  const [deleteTargetCandidate, setDeleteTargetCandidate] = useState<{ id: string; name: string } | null>(null);

  if (!isOpen) return null;

  // Total Statistics
  const totalCandidates = candidates.length;
  const assignedCandidatesCount = candidates.filter(c => !!c.assignedEmail && c.assignedEmail.trim() !== '').length;
  const unassignedCount = totalCandidates - assignedCandidatesCount;
  const totalVotesCast = candidates.reduce((sum, c) => sum + (c.supportsCount || 0), 0);

  // Filtered Candidates List
  const filteredCandidates = (candidates || []).filter((c) => {
    if (!c) return false;
    const q = (searchQuery || '').toLowerCase();
    const name = (c.name || '').toLowerCase();
    const post = (c.post || '').toLowerCase();
    const cat = (c.facultyCategory || '').toLowerCase();
    const email = (c.assignedEmail || '').toLowerCase();

    const matchesSearch = 
      name.includes(q) ||
      post.includes(q) ||
      cat.includes(q) ||
      email.includes(q);

    const matchesFaculty = facultyFilter === 'all' || c.facultyCategory === facultyFilter;
    const matchesPost = postFilter === 'all' || c.post === postFilter;

    // Filter out potential corruption (docs with no name/id)
    const isValidDoc = !!c.id && !!c.name;

    return matchesSearch && matchesFaculty && matchesPost && isValidDoc;
  }).sort((a, b) => (b.supportsCount || 0) - (a.supportsCount || 0));

  const handleStartQuickEdit = (cand: Candidate) => {
    setEditingRowId(cand.id);
    setRowEmail(cand.assignedEmail || '');
    setRowVotes(cand.supportsCount || 0);
    setRowBallot(cand.initials || '0');
  };

  const handleSaveQuickEdit = async (candId: string) => {
    try {
      const emailValue = rowEmail.trim();
      await updateCandidateFields(candId, {
        assignedEmail: emailValue,
        isVerified: !!emailValue, // Verified badge appears for assigned candidates
        supportsCount: Math.max(0, Number(rowVotes) || 0),
        initials: rowBallot.trim() || '0'
      });
      setEditingRowId(null);
      showToast('Candidate quick details saved to Firestore!');
    } catch (e) {
      showToast('Failed to save quick edit');
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBlankCandidate(newPost, newFaculty, newName.trim());
      setNewName('');
      setAddModalOpen(false);
      showToast('New candidate document added to Firestore!');
    } catch (e) {
      showToast('Failed to add candidate');
    }
  };

  const confirmDeleteAction = async () => {
    if (!deleteTargetCandidate) return;
    try {
      await deleteCandidateById(deleteTargetCandidate.id);
      showToast(`Deleted ${deleteTargetCandidate.name} from Firestore`);
      setDeleteTargetCandidate(null);
    } catch (e) {
      showToast('Error deleting candidate');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0f1d]/80 backdrop-blur-md flex flex-col overflow-y-auto animate-in fade-in p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl w-full mx-auto space-y-5 my-auto">

        {/* 1. TOP HEADER BANNER (Matching image_82a7ce26.png) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0d1527] border border-slate-800 text-white p-5 sm:p-8 shadow-2xl space-y-6">
          {/* Breadcrumb & Exit Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <button 
                onClick={onClose} 
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to AMUSU Elections Public Site</span>
              </button>
              <span>/</span>
              <span className="text-emerald-400 font-bold">Admin Control Center</span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <X className="w-4 h-4 text-slate-400" />
              <span>Exit Admin Mode</span>
            </button>
          </div>

          {/* Title Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Election Master Database & Admin Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Live Realtime Firestore Database Controller • Authorized Administrator Session Active
              </p>
            </div>
          </div>

          {/* Stat Cards Row (Matching image_82a7ce26.png) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="bg-[#131d33] p-4 sm:p-5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                TOTAL CANDIDATES
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">{totalCandidates}</div>
              <span className="text-[10px] text-slate-400 block">Across 5 union posts</span>
            </div>

            <div className="bg-[#131d33] p-4 sm:p-5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                CLAIMED / ASSIGNED
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">{assignedCandidatesCount}</div>
              <span className="text-[10px] text-slate-400 block">{unassignedCount} unassigned</span>
            </div>

            <div className="bg-[#131d33] p-4 sm:p-5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                PENDING CLAIMS
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">0</div>
              <span className="text-[10px] text-slate-400 block">Verification requests</span>
            </div>

            <div className="bg-[#131d33] p-4 sm:p-5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                TOTAL VOTES CAST
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#ef4444] font-mono">
                {totalVotesCast.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 block">Real-time tally</span>
            </div>
          </div>

          {/* Admin Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setActiveAdminTab('candidates')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                activeAdminTab === 'candidates' 
                  ? 'bg-[#059669] text-white shadow-md' 
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Candidates & Email Assignment ({totalCandidates})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('claims')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                activeAdminTab === 'claims' 
                  ? 'bg-[#059669] text-white shadow-md' 
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Verification Claims (0)</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('issues')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                activeAdminTab === 'issues' 
                  ? 'bg-[#059669] text-white shadow-md' 
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Campus Issues Moderation (6)</span>
            </button>
          </div>
        </div>

        {!isAdmin ? (
          /* Login Guard */
          <div className="bg-white rounded-3xl p-8 text-center space-y-4 max-w-md mx-auto shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Admin Session Required</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Please sign in with authorized (<strong>Authorized Credentials</strong>) to access the Election Master Database.
            </p>
            <button
              onClick={signInWithGoogleAuth}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md mx-auto cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Sign In with Google Admin Account</span>
            </button>
          </div>
        ) : (
          /* 2. MAIN ADMIN CONTENT CARD (Matching image_82a7ce26.png & image_bbb80b17.png) */
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
            
            {/* Header Title + Add New Candidate Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Manage Election Candidates
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Add new candidates or manage existing election profiles.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="csv-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onerror = () => {
                        showToast('Error reading the CSV file.');
                      };
                      reader.onload = (event) => {
                        const content = event.target?.result as string;
                        if (window.confirm('Import candidates from this CSV file into Firestore database?')) {
                          importFromCsv(content);
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                  <label
                    htmlFor="csv-upload"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Import CSV Candidates</span>
                  </label>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete ALL candidates from the database? This action is irreversible.')) {
                      deleteAllCandidates();
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete All Candidates</span>
                </button>

                <button
                  onClick={() => setAddModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Candidate</span>
                </button>
              </div>
            </div>

            {/* Filter Bar (Matching image_bbb80b17.png) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidates or emails..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Faculty Dropdown Filter */}
              <select
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 cursor-pointer focus:outline-hidden"
              >
                <option value="all">All Faculties</option>
                {FACULTY_CATEGORIES.map((fac) => (
                  <option key={fac} value={fac}>{fac}</option>
                ))}
              </select>

              {/* Post Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                {['all', 'President', 'Vice President', 'Honorary Secretary', 'Cabinet Member', 'Court Member'].map((post) => (
                  <button
                    key={post}
                    onClick={() => setPostFilter(post)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      postFilter === post
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {post === 'all' ? 'All' : post}
                  </button>
                ))}
              </div>
            </div>

            {/* CANDIDATES TABLE (Exact Column Layout matching image_bbb80b17.png) */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-black uppercase tracking-wider text-slate-600">
                    <th className="p-3.5 pl-4">CANDIDATE & POST</th>
                    <th className="p-3.5 text-center">BALLOT NO.</th>
                    <th className="p-3.5">ASSIGNED OWNER EMAIL (GOOGLE LOGIN)</th>
                    <th className="p-3.5 text-center">LIVE VOTES</th>
                    <th className="p-3.5 text-right pr-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredCandidates.map((cand, index) => {
                    const isEditingThisRow = editingRowId === cand.id;
                    const hasAssignedEmail = !!cand.assignedEmail && cand.assignedEmail.trim() !== '';

                    return (
                      <tr key={`${cand.id}-${index}`} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* 1. Candidate & Post Column */}
                        <td className="p-3.5 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0 overflow-hidden">
                              {cand.avatarUrl ? (
                                <img src={cand.avatarUrl} alt={cand.name || 'Candidate'} className="w-full h-full object-cover" />
                              ) : (
                                <span>{cand.initials || (cand.name ? cand.name[0] : '?')}</span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-slate-900 text-sm">{cand.name}</span>
                                {/* Verified Blue Tick Badge appears when assigned email access */}
                                {(cand.isVerified || hasAssignedEmail) && (
                                  <VerifiedBadge className="w-4 h-4" />
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                <span className="font-semibold text-slate-700">{cand.post}</span>
                                <span> • {cand.facultyCategory}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. Ballot No Column */}
                        <td className="p-3.5 text-center">
                          {isEditingThisRow ? (
                            <input
                              type="text"
                              value={rowBallot}
                              onChange={(e) => setRowBallot(e.target.value)}
                              className="w-16 px-2 py-1 text-center font-bold font-mono border border-slate-300 rounded-lg bg-white"
                            />
                          ) : (
                            <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 font-bold font-mono text-slate-700 text-xs">
                              #{cand.initials || '0'}
                            </span>
                          )}
                        </td>

                        {/* 3. Assigned Owner Email Column */}
                        <td className="p-3.5">
                          {isEditingThisRow ? (
                            <div className="relative max-w-xs">
                              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                              <input
                                type="email"
                                value={rowEmail}
                                onChange={(e) => setRowEmail(e.target.value)}
                                placeholder="candidate@myamu.ac.in"
                                className="w-full pl-8 pr-2 py-1.5 border border-slate-300 rounded-xl font-mono text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                              />
                            </div>
                          ) : (
                            <div>
                              {hasAssignedEmail ? (
                                <span className="font-mono text-blue-700 font-bold text-xs bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 inline-block">
                                  {cand.assignedEmail}
                                </span>
                              ) : (
                                <span className="text-slate-400 italic text-xs">
                                  Unassigned (Click Quick Edit to assign email)
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* 4. Live Votes Column */}
                        <td className="p-3.5 text-center">
                          {isEditingThisRow ? (
                            <input
                              type="number"
                              min="0"
                              value={rowVotes}
                              onChange={(e) => setRowVotes(parseInt(e.target.value) || 0)}
                              className="w-20 px-2 py-1 text-center font-black font-mono text-red-700 border border-slate-300 rounded-lg bg-white"
                            />
                          ) : (
                            <span className="inline-block px-3 py-1 rounded-xl bg-[#991b1b] text-white font-extrabold font-mono text-xs shadow-2xs">
                              {cand.supportsCount || 0} Votes
                            </span>
                          )}
                        </td>

                        {/* 5. Actions Column (Matching image_bbb80b17.png) */}
                        <td className="p-3.5 text-right pr-4">
                          {isEditingThisRow ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleSaveQuickEdit(cand.id)}
                                className="px-3.5 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95"
                              >
                                <Save className="w-3.5 h-3.5" />
                                <span>Save</span>
                              </button>
                              <button
                                onClick={() => setEditingRowId(null)}
                                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleStartQuickEdit(cand)}
                                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                                <span>Assign Email</span>
                              </button>

                              <button
                                onClick={() => setFullEditCandidate(cand)}
                                className="px-3.5 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Full Profile Editor Page</span>
                              </button>

                              <button
                                onClick={() => setDeleteTargetCandidate({ id: cand.id, name: cand.name })}
                                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* DELETE CANDIDATE CONFIRMATION MODAL */}
      {deleteTargetCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900">Delete Candidate Profile?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900">{deleteTargetCandidate.name}</strong> from Firestore?
            </p>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTargetCandidate(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteAction}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm cursor-pointer active:scale-95 transition-all"
              >
                Yes, Delete Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CANDIDATE MODAL DIALOG */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900">Add New Candidate</h3>
            <p className="text-xs text-slate-500">Creates a new candidate record in Firestore. Details remain blank until updated.</p>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Candidate Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter candidate full name..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Union Post</label>
                <select
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value as CandidatePost)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                >
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="Honorary Secretary">Honorary Secretary</option>
                  <option value="Court Member">Court Member</option>
                  <option value="Cabinet Member">Cabinet Member</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Faculty Category</label>
                <select
                  value={newFaculty}
                  onChange={(e) => setNewFaculty(e.target.value as FacultyCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                >
                  {FACULTY_CATEGORIES.map((fac) => (
                    <option key={fac} value={fac}>{fac}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#059669] text-white text-xs font-bold shadow-xs"
                >
                  Create Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL PROFILE EDITOR MODAL */}
      {fullEditCandidate && (
        <CandidateEditModal
          candidate={fullEditCandidate}
          isOpen={!!fullEditCandidate}
          onClose={() => setFullEditCandidate(null)}
        />
      )}

    </div>
  );
};
