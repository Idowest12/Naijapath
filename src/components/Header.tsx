import React, { useState } from 'react';
import { Compass, Menu, X, ArrowRight, Laptop, Sparkles, Bot, MessageSquare } from 'lucide-react';
import { NavItem } from '../types';
import { trackClick } from '../utils/analytics';

interface HeaderProps {
  onStartAssessment?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onNavigateHome?: () => void;
  onOpenChatbot?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-pathways', label: 'Career Pathways', href: '#pathways' },
  { id: 'nav-framework', label: 'How It Works', href: '#framework' },
  { id: 'nav-day-one', label: 'Day-One Actions', href: '#day-one' },
  { id: 'nav-resources', label: 'Curated Resources', href: '#resources' },
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
    <header id="site-header" className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Context Top Banner */}
      <div id="top-context-banner" className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <p className="font-medium tracking-tight">
              <span className="font-bold">Naija Tech Guide:</span> Tailored for young Nigerians & career switchers
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-emerald-200/90 text-[11px]">
            <span className="flex items-center gap-1">
              <Laptop className="w-3.5 h-3.5" /> 100% Free learning resources
            </span>
          </div>
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
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-800 transition-colors">
                <Compass className="w-5 h-5 text-emerald-100 transition-transform group-hover:rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-stone-900 leading-tight">
                  Naija Tech Guide
                </span>
                <span className="text-xs text-stone-500 font-normal">Real tech niches for real constraints</span>
              </div>
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
                  handleNavClick(item.href);
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:text-emerald-800 hover:bg-stone-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button & Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenChatbot && (
              <button
                id="header-open-chatbot-btn"
                type="button"
                onClick={() => {
                  trackClick('header_open_chatbot_btn', 'Ask Naija AI', 'AI Mentor');
                  onOpenChatbot();
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm font-semibold hover:border-emerald-600 hover:text-emerald-800 hover:bg-emerald-50/50 active:scale-[0.99] transition-all shadow-2xs"
                title="Chat with Tizzi, our Naija Tech AI Mentor"
              >
                <div className="relative flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald-700" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                </div>
                <span>Ask Naija AI</span>
              </button>
            )}

            <button
              id="header-start-assessment-btn"
              type="button"
              onClick={() => {
                trackClick('header_start_assessment_btn', 'Find Your Niche', 'CTA');
                onStartAssessment?.();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 active:scale-[0.99] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Find Your Niche</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer" 
          className="md:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={`mobile-${item.id}`}
                id={`mobile-${item.id}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 hover:text-emerald-800 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-stone-200 space-y-2">
            {onOpenChatbot && (
              <button
                id="mobile-header-chatbot-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChatbot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-semibold shadow-2xs active:bg-stone-50"
              >
                <Bot className="w-4 h-4 text-emerald-700" />
                <span>Ask Naija AI Mentor (Tizzi)</span>
              </button>
            )}
            <button
              id="mobile-header-assessment-btn"
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartAssessment?.();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 text-white font-semibold shadow-sm active:bg-emerald-800"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Find Your Niche (3-Min Quiz)</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
