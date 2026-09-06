import React from 'react';
import { Compass, ShieldCheck, Zap, ArrowUp } from 'lucide-react';
import { trackClick } from '../utils/analytics';

interface FooterProps {
  onOpenAdmin?: () => void;
  onSelectNiche?: (nicheId: string) => void;
  onSelectStrategy?: (strategyKey: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNiche, onSelectStrategy }) => {
  return (
    <footer id="site-footer" className="bg-[#181a18] text-stone-300 border-t border-[#272b27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-18 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-800/70 text-emerald-200 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display text-2xl text-white font-normal tracking-tight">
                  Naija Tech Guide
                </span>
                <span className="text-[11px] text-stone-400 font-sans">
                  Honest African tech pathways
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm font-sans">
              Demystifying tech pathways for young Nigerians. We provide realistic, constraint-aware roadmaps tailored to your actual device, weekly hours, and budget.
            </p>
            <div className="pt-1 flex flex-wrap gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 text-stone-300 border border-stone-700/60">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> Low-Data Friendly
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 text-stone-300 border border-stone-700/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Free Resources
              </span>
            </div>
          </div>

          {/* Column 1: Non-Technical Pathways */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-stone-200">
                Non-Coding Niches
              </h3>
            </div>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <button
                  id="footer-link-uiux"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_uiux', 'UI/UX & Product Design', 'Footer Navigation');
                    onSelectNiche?.('niche-uiux');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>UI/UX & Product Design</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-va"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_va', 'Virtual Assistance & Tech VA', 'Footer Navigation');
                    onSelectNiche?.('niche-va');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Virtual Assistance & Tech VA</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-smm"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_smm', 'Social Media & Community', 'Footer Navigation');
                    onSelectNiche?.('niche-smm');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Social Media & Community</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-tech-writing"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_tech_writing', 'Technical Content Writing', 'Footer Navigation');
                    onSelectNiche?.('niche-tech-writing');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Technical Content Writing</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-pm"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_pm', 'Product Management', 'Footer Navigation');
                    onSelectNiche?.('niche-pm');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Product Management</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Technical Pathways */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-stone-200">
                Technical Niches
              </h3>
            </div>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <button
                  id="footer-link-frontend"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_frontend', 'Frontend Web Development', 'Footer Navigation');
                    onSelectNiche?.('niche-frontend');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Frontend Web Development</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-data"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_data', 'Data Analysis & BI', 'Footer Navigation');
                    onSelectNiche?.('niche-data');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Data Analysis & BI</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-cyber"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_cyber', 'Cybersecurity Fundamentals', 'Footer Navigation');
                    onSelectNiche?.('niche-cyber');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Cybersecurity Fundamentals</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-backend"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_backend', 'Backend API Engineering', 'Footer Navigation');
                    onSelectNiche?.('niche-backend');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Backend API Engineering</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-qa"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_qa', 'Quality Assurance & Testing', 'Footer Navigation');
                    onSelectNiche?.('niche-qa');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Quality Assurance & Testing</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Nigerian Realities & Framework */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-stone-200">
                Survival & Strategy
              </h3>
            </div>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <button
                  id="footer-link-phone-guide"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_phone_guide', 'Phone-Only Tech Strategies', 'Footer Navigation');
                    onSelectStrategy?.('phone_friendly');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Phone-Only Tech Strategies</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-power-data"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_power_data', 'Power & Data Hacks', 'Footer Navigation');
                    onSelectStrategy?.('power_data');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Power & Data Hacks</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-career-switch"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_career_switch', 'Career Switcher Guide', 'Footer Navigation');
                    onSelectStrategy?.('career_switch');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Career Switcher Guide</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-portfolio"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_portfolio', 'First Portfolio Proofs', 'Footer Navigation');
                    onSelectStrategy?.('first_portfolio');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>First Portfolio Proofs</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-remote"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_remote', 'Receiving Foreign Payments', 'Footer Navigation');
                    onSelectStrategy?.('foreign_payments');
                  }}
                  className="text-stone-400 hover:text-stone-100 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Receiving Foreign Payments</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#272b27] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-2 text-stone-400">
            <span>© {new Date().getFullYear()} TIZZITECH.</span>
            <span className="hidden sm:inline">·</span>
            <span>Dedicated to empowering young Nigerian talent.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              id="footer-back-to-top-btn"
              type="button"
              onClick={() => {
                trackClick('footer_back_to_top_btn', 'Footer Back to Top', 'Navigation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 hover:text-white border border-stone-700/70 transition-colors font-medium text-xs cursor-pointer"
              title="Scroll back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5 text-stone-400" />
              <span>Back to Top</span>
            </button>

            <span className="text-stone-500 hidden sm:inline font-sans">
              Built for the Nigerian Tech Community
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
