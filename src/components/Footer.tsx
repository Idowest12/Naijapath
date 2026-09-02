import React, { useState } from 'react';
import { Compass, ExternalLink, Globe, ArrowUpRight, ShieldCheck, Zap, Database, Download, X, Sparkles } from 'lucide-react';
import { getAllAssessmentRecords, exportRecordsAsJSON, exportRecordsAsCSV } from '../utils/submissionStorage';

export const Footer: React.FC = () => {
  const [showDataModal, setShowDataModal] = useState(false);
  const records = getAllAssessmentRecords();

  return (
    <footer id="site-footer" className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">TIZZITECH</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Helping Nigerians navigate the real tech industry. We debunk the "coding-only" myth and provide honest, constraint-aware roadmaps tailored to your actual device, time, and budget.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 text-emerald-400 border border-stone-700">
                <Zap className="w-3.5 h-3.5" /> Low-Data Optimized
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Free Resources
              </span>
            </div>
          </div>

          {/* Column 1: Non-Technical Pathways */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Non-Coding Niches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a id="footer-link-uiux" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  UI/UX & Product Design
                </a>
              </li>
              <li>
                <a id="footer-link-va" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Virtual Assistance & Tech VA
                </a>
              </li>
              <li>
                <a id="footer-link-smm" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Social Media & Community
                </a>
              </li>
              <li>
                <a id="footer-link-tech-writing" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Technical Content Writing
                </a>
              </li>
              <li>
                <a id="footer-link-pm" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Product Management
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Technical Pathways */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Technical Niches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a id="footer-link-frontend" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Frontend Web Development
                </a>
              </li>
              <li>
                <a id="footer-link-data" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Data Analysis & BI
                </a>
              </li>
              <li>
                <a id="footer-link-cyber" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Cybersecurity Fundamentals
                </a>
              </li>
              <li>
                <a id="footer-link-backend" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Backend API Engineering
                </a>
              </li>
              <li>
                <a id="footer-link-qa" href="#pathways" className="text-stone-400 hover:text-white transition-colors">
                  Quality Assurance & Testing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Nigerian Realities & Framework */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Survival & Strategy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a id="footer-link-phone-guide" href="#framework" className="text-stone-400 hover:text-white transition-colors flex items-center gap-1">
                  Phone-Only Tech Strategies
                </a>
              </li>
              <li>
                <a id="footer-link-power-data" href="#framework" className="text-stone-400 hover:text-white transition-colors">
                  Power & Data Hacks
                </a>
              </li>
              <li>
                <a id="footer-link-career-switch" href="#framework" className="text-stone-400 hover:text-white transition-colors">
                  Career Switcher Guide
                </a>
              </li>
              <li>
                <a id="footer-link-portfolio" href="#day-one" className="text-stone-400 hover:text-white transition-colors">
                  First Portfolio Proofs
                </a>
              </li>
              <li>
                <a id="footer-link-remote" href="#resources" className="text-stone-400 hover:text-white transition-colors">
                  Receiving Foreign Payments
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} TIZZITECH.</span>
            <span>Dedicated to empowering young Nigerian talent.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowDataModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 hover:border-emerald-500/50 transition-colors font-medium text-xs"
            >
              <Database className="w-3.5 h-3.5" />
              <span>AI Training Data Hub ({records.length})</span>
            </button>

            <span className="text-stone-400 hidden sm:inline">
              Built for the Nigerian Tech Community
            </span>
          </div>
        </div>
      </div>

      {/* AI Training & Dataset Modal */}
      {showDataModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 text-stone-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Learner Assessment Data Hub</h3>
                  <p className="text-xs text-stone-400">AI Dataset & Pathway Optimization</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDataModal(false)}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 text-xs space-y-2">
              <div className="flex items-center justify-between text-stone-200 font-semibold">
                <span>Stored Submissions:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  {records.length} {records.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                Whenever anyone completes the assessment, their hardware constraints, time availability, aptitude weights, qualitative answers, and calculated career match are saved securely.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Export Options for Model Training:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={exportRecordsAsJSON}
                  disabled={records.length === 0}
                  className="p-3 rounded-xl border border-emerald-600 bg-emerald-600/10 hover:bg-emerald-600/20 disabled:opacity-40 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JSON (LLM Fine-Tuning)</span>
                </button>

                <button
                  type="button"
                  onClick={exportRecordsAsCSV}
                  disabled={records.length === 0}
                  className="p-3 rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CSV (Spreadsheets)</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-relaxed">
              <strong>Future Multi-Device Cloud Storage:</strong> If you want submissions from every visitor on any phone to automatically store centrally in real-time, we can easily connect a Cloud Database (like Firestore or PostgreSQL).
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
