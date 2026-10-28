import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  ArrowLeft, 
  Send, 
  ShieldCheck, 
  Building2, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SubmitIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const { addIssue, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hostel & Accommodation');
  const [hallOrFaculty, setHallOrFaculty] = useState('Sir Syed Hall (North)');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addIssue({
        title,
        category,
        description: `${description} [Reported for ${hallOrFaculty}]`,
      });
      showToast('Your student issue has been published on the board!');
      setIsSubmitting(false);
      navigate('/issues');
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <span>/</span>
        <Link to="/issues" className="hover:text-emerald-700">Campus Issues</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">Submit Student Issue</span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#eaf5ef] border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                Submit a Campus Student Issue
              </h1>
              <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-0.5">
                Raise your voice for infrastructure, dining, library, or academic reforms.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/issues')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            title="Back to issues"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
              >
                <option value="Hostel & Accommodation">Hostel & Accommodation</option>
                <option value="Academics & Exams">Academics & Exams</option>
                <option value="Infrastructure">Infrastructure & Wi-Fi</option>
                <option value="Mess & Food">Mess Quality & Food Hygiene</option>
                <option value="Transport">Campus Transit & E-Rickshaws</option>
                <option value="Student Welfare">Student Welfare & Health Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Residential Hall / Faculty
              </label>
              <select
                value={hallOrFaculty}
                onChange={(e) => setHallOrFaculty(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
              >
                <option>Sir Syed Hall (North)</option>
                <option>Sir Syed Hall (South)</option>
                <option>Aftab Hall</option>
                <option>Sulaiman Hall</option>
                <option>VM Hall</option>
                <option>Nadeem Tarin Hall</option>
                <option>Abdullah Hall</option>
                <option>Sarojini Naidu Hall</option>
                <option>Indira Gandhi Hall</option>
                <option>Bibi Fatima Hall</option>
                <option>Faculty of Engineering & Tech</option>
                <option>Faculty of Arts / Social Sciences</option>
                <option>Maulana Azad Library</option>
                <option>General Campus-Wide</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Issue Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Inadequate solar hot water in winter & reading hall AC repair"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Detailed Description & Proposed Student Demands
            </label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context on how long this issue has persisted, which blocks are affected, and what concrete solution candidates should pledge in their manifestos..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
            />
          </div>

          {/* Submission Guidelines Callout */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>AMU Civic Discussion Standards</span>
            </div>
            <ul className="text-[11px] text-slate-500 space-y-1 list-disc list-inside">
              <li>Keep grievances respectful, factual, and constructive.</li>
              <li>Focus on student welfare, infrastructure, dining hygiene, and academic fairness.</li>
              <li>Issues with high student upvotes will be directly presented to contesting candidates.</li>
            </ul>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-2">
            <Link
              to="/issues"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Student Issue'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
