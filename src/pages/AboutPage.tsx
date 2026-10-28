import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  MessageCircle, 
  Heart, 
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { AmusuLogo } from '../components/AmusuLogo';
import { MosqueSkyline } from '../components/MosqueSkyline';

export const AboutPage: React.FC = () => {
  const faqs = [
    {
      q: 'Is AMUSUElections.in an official university administrative website?',
      a: 'No. This is an independent, non-partisan student-led civic technology initiative created to inform and empower fellow AMU scholars, review candidate manifestos, and foster democratic engagement.'
    },
    {
      q: 'How does candidate endorsement (Support Now) work?',
      a: 'Each student can endorse up to 5 candidates across any contested posts. This represents a virtual, non-binding expression of student support to help leaders understand their campus traction.'
    },
    {
      q: 'Can any AMU student submit an issue or petition?',
      a: 'Yes. Any registered scholar from any faculty, department, or residential hall can submit campus concerns. Popular issues are surfaced to contesting candidates for formal manifesto responses.'
    },
    {
      q: 'How are candidate manifestos sourced?',
      a: 'Manifestos are gathered directly from the candidates’ official public statements, printed handouts, and public rallies to ensure accurate and unadulterated representation.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">About AMUSU Elections</span>
        </div>

        <div className="flex items-center gap-3">
          <AmusuLogo size="md" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Empowering the Student Voice of AMU
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-3xl leading-relaxed">
          AMUSUElections.in is built by Aligarh Muslim University scholars to democratize election access, promote transparent manifestos, and bridge student leaders with the entire campus electorate.
        </p>
      </div>

      {/* Slogan Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 to-teal-900 text-white p-8 sm:p-10 shadow-md">
        <div className="relative z-10 space-y-3 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-widest border border-white/20">
            Our Guiding Principle
          </span>
          <div className="font-script text-3xl sm:text-4xl font-extrabold">
            Same Campus. Bigger Dreams.
          </div>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Every hall resident, research scholar, and day-scholar has an equal stake in shaping the future of Aligarh Muslim University.
          </p>
        </div>

        <div className="absolute right-0 bottom-0 w-96 opacity-25 pointer-events-none">
          <MosqueSkyline fillColor="#ffffff" opacity={0.7} className="w-full h-20" />
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Non-Partisan</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Independent student platform completely free from external political interference and sectarian divisions.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Manifesto-Driven</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Focusing on concrete policy commitments, hostel infrastructure upgrades, and academic calendars rather than mere rhetoric.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Student-Powered</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            An organic volunteer initiative built and maintained by AMU students across all faculties, halls, and academic departments.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Open Dialogue</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Real-time campus issue discussions, democratic student accountability, and respectful debates.
          </p>
        </div>
      </div>

      {/* Sir Syed Quote Card */}
      <div className="rounded-3xl bg-[#eaf5ef] border border-emerald-200/80 p-6 sm:p-8 space-y-3 text-center sm:text-left">
        <blockquote className="font-quote italic text-base sm:text-lg text-slate-800">
          “When a nation becomes devoid of education and intellectual freedom, it ceases to be a nation.”
        </blockquote>
        <div className="font-bold text-sm text-[#059669]">
          — Sir Syed Ahmad Khan, Founder of Aligarh Muslim University
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Everything you need to know about the AMUSU Elections portal.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <h4 className="text-sm font-bold text-slate-800">{faq.q}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
