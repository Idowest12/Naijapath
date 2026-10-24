import React, { useState } from 'react';
import { Menu, X, ArrowRight, Bot } from 'lucide-react';
import { NavItem } from '../types';
import { trackClick } from '../utils/analytics';
import { TechNavLogo } from './TechNavLogo';

interface HeaderProps {
  onStartAssessment?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onNavigateHome?: () => void;
  onOpenChatbot?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-pathways', label: 'Pathways', href: '#pathways' },
  { id: 'nav-framework', label: 'How It Works', href: '#framework' },
  { id: 'nav-day-one', label: 'Day-One Actions', href: '#day-one' },
  { id: 'nav-resources', label: 'Resources', href: '#resources' },
];

export const Header: React.FC<HeaderProps> = ({ 
  onStartAssessment, 
  onNavigateSection, 
  onNavigateHome,
  onOpenChatbot 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, label?: string) => {
    setMobileMenuOpen(false);
    trackClick(`nav_${sectionId.replace('#', '')}`, label || sectionId, 'Navigation');
    if (onNavigateSection) {
      onNavigateSection(sectionId.replace('#', ''));
    } else {
      const el = document.getElementById(sectionId.replace('#', ''));
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackClick('header_brand_logo', 'Brand Logo', 'Navigation');
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header id="site-header" className="sticky top-0 z-40 bg-white border-b-2 border-black transition-all">
      {/* Top Announcement Bar from Mockup */}
      <div className="bg-[#D4F938] text-black text-xs font-mono font-bold py-1.5 px-4 border-b-2 border-black text-center tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span>100% FREE</span>
          <span>/</span>
          <span>PHONE-FRIENDLY</span>
          <span>/</span>
          <span>12 PATHWAYS</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a 
              id="brand-logo-link" 
              href="#" 
              onClick={handleLogoClick}
              className="flex items-center group focus:outline-none py-1"
            >
              <TechNavLogo size="md" variant="default" />
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav id="desktop-navigation" aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                id={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.label);
                }}
                className="px-3.5 py-1.5 rounded-full text-sm font-bold text-black hover:bg-stone-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenChatbot && (
              <button
                id="header-open-chatbot-btn"
                type="button"
                onClick={() => {
                  trackClick('header_open_chatbot_btn', 'Ask Mentor Tizzi', 'AI Mentor');
                  onOpenChatbot();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-white text-black text-xs sm:text-sm font-bold hover:bg-stone-50 active:translate-x-0.5 active:translate-y-0.5 transition-all shadow-neo-sm cursor-pointer"
                title="Chat with Mentor Tizzi"
              >
                <Bot className="w-4 h-4 text-black" />
                <span>Ask Mentor Tizzi</span>
              </button>
            )}

            <button
              id="header-start-assessment-btn"
              type="button"
              onClick={() => {
                trackClick('header_start_assessment_btn', 'Take the quiz', 'CTA');
                onStartAssessment?.();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold hover:bg-[#13141F] active:translate-x-0.5 active:translate-y-0.5 transition-all shadow-neo-sm cursor-pointer border-2 border-black"
            >
              <span>Take the quiz</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Mobile Menu & Quiz CTA */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="header-mobile-quiz-btn"
              type="button"
              onClick={() => {
                trackClick('header_start_assessment_btn_mobile', 'Take quiz', 'CTA');
                onStartAssessment?.();
              }}
              className="px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold border-2 border-black shadow-neo-sm cursor-pointer"
            >
              Take the quiz
            </button>

            <button
              id="mobile-menu-toggle-btn"
              type="button"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border-2 border-black bg-white text-black shadow-neo-sm hover:bg-stone-50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer" 
          className="md:hidden border-t-2 border-black bg-[#F1F0FF] px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-150"
        >
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={`mobile-${item.id}`}
                id={`mobile-${item.id}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.label);
                }}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-black hover:bg-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t-2 border-black space-y-2">
            {onOpenChatbot && (
              <button
                id="mobile-header-chatbot-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChatbot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-black text-black text-sm font-bold shadow-neo active:translate-x-0.5 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-black" />
                <span>Ask Mentor Tizzi (AI)</span>
              </button>
            )}
            <button
              id="mobile-header-assessment-btn"
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartAssessment?.();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white text-sm font-bold shadow-neo active:translate-x-0.5 cursor-pointer border-2 border-black"
            >
              <span>Take the 3-Minute Quiz</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
