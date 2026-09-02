import React from 'react';
import { Compass, ExternalLink, Globe, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
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
            <span className="text-stone-400">
              Built for the Nigerian Tech Community
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
