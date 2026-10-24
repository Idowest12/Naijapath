import React from 'react';
import { ArrowUp } from 'lucide-react';
import { trackClick } from '../utils/analytics';
import { TechNavLogo } from './TechNavLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
  onSelectNiche?: (nicheId: string) => void;
  onSelectStrategy?: (strategyKey: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNiche, onSelectStrategy }) => {
  return (
    <footer id="site-footer" className="bg-[#5D45FD] text-white border-t-2 border-black selection:bg-[#D4F938] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <TechNavLogo size="lg" variant="footer" />
            </div>
            <p className="text-base text-white/90 leading-relaxed max-w-sm font-sans font-medium">
              Realistic tech paths for young Nigerians. Built around your device, your hours and your budget.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono font-bold">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black text-white border-2 border-black shadow-neo-sm">
                Low-data friendly
              </span>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black text-white border-2 border-black shadow-neo-sm">
                100% free
              </span>
            </div>
          </div>

          {/* Column 1: Non-Coding Niches */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                NON-CODING NICHES
              </h3>
              <div className="h-1 w-14 bg-[#D4F938] rounded-full mt-1.5"></div>
            </div>
            <ul className="space-y-2.5 text-sm font-sans font-semibold">
              <li>
                <button
                  id="footer-link-uiux"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_uiux', 'UI/UX & Product Design', 'Footer Navigation');
                    onSelectNiche?.('niche-uiux');
                  }}
                  className="text-white/90 hover:text-[#D4F938] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  UI/UX & Product Design
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
                  className="text-white/90 hover:text-[#D4F938] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Virtual Assistance & Tech VA
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
                  className="text-white/90 hover:text-[#D4F938] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Social Media & Community
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
                  className="text-white/90 hover:text-[#D4F938] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Technical Content Writing
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
                  className="text-white/90 hover:text-[#D4F938] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Product Management
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Technical Niches */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                TECHNICAL NICHES
              </h3>
              <div className="h-1 w-14 bg-[#FED74C] rounded-full mt-1.5"></div>
            </div>
            <ul className="space-y-2.5 text-sm font-sans font-semibold">
              <li>
                <button
                  id="footer-link-frontend"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_frontend', 'Frontend Web Development', 'Footer Navigation');
                    onSelectNiche?.('niche-frontend');
                  }}
                  className="text-white/90 hover:text-[#FED74C] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Frontend Web Development
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
                  className="text-white/90 hover:text-[#FED74C] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Data Analysis & BI
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
                  className="text-white/90 hover:text-[#FED74C] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Cybersecurity Fundamentals
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
                  className="text-white/90 hover:text-[#FED74C] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Backend API Engineering
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
                  className="text-white/90 hover:text-[#FED74C] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Quality Assurance & Testing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Survival & Strategy */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                SURVIVAL & STRATEGY
              </h3>
              <div className="h-1 w-14 bg-[#FF6A55] rounded-full mt-1.5"></div>
            </div>
            <ul className="space-y-2.5 text-sm font-sans font-semibold">
              <li>
                <button
                  id="footer-link-phone-guide"
                  type="button"
                  onClick={() => {
                    trackClick('footer_link_phone_guide', 'Phone-Only Tech Strategies', 'Footer Navigation');
                    onSelectStrategy?.('phone_friendly');
                  }}
                  className="text-white/90 hover:text-[#FF6A55] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Phone-Only Tech Strategies
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
                  className="text-white/90 hover:text-[#FF6A55] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Power & Data Hacks
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
                  className="text-white/90 hover:text-[#FF6A55] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Career Switcher Guide
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
                  className="text-white/90 hover:text-[#FF6A55] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  First Portfolio Proofs
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
                  className="text-white/90 hover:text-[#FF6A55] transition-colors text-left cursor-pointer hover:underline underline-offset-4"
                >
                  Receiving Foreign Payments
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t-2 border-black/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/80">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 TIZZITECH.</span>
            <span className="hidden sm:inline">·</span>
            <span>Dedicated to empowering young Nigerian talent.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="/admin" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/admin');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-[#D4F938] transition-colors font-mono font-bold"
            >
              Admin Portal
            </a>
            <span className="text-white/40 hidden sm:inline">|</span>
            <button
              id="footer-back-to-top-btn"
              type="button"
              onClick={() => {
                trackClick('footer_back_to_top_btn', 'Footer Back to Top', 'Navigation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-stone-900 border-2 border-black shadow-neo-sm transition-all font-bold text-xs cursor-pointer active:translate-x-0.5"
              title="Scroll back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5 text-white" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
