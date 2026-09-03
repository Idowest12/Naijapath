/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { AssessmentPage } from './components/AssessmentPage';
import { NaijaChatbot } from './components/NaijaChatbot';
import { AdminPortal } from './components/AdminPortal';
import { Bot, Sparkles, MessageSquare, ArrowUp } from 'lucide-react';
import { trackPageView, trackClick, syncLocalRecordsToServer, initGlobalClickListener } from './utils/analytics';

function getInitialView(): 'home' | 'assessment' | 'admin' {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;

  if (path === '/admin' || search.includes('view=admin') || hash === '#admin') {
    return 'admin';
  }
  if (path === '/assessment' || search.includes('view=assessment') || hash === '#assessment') {
    return 'assessment';
  }
  return 'home';
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'assessment' | 'admin'>(getInitialView);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotContext, setChatbotContext] = useState<any>(undefined);
  const [initialChatbotPrompt, setInitialChatbotPrompt] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync with browser URL popstate (Back/Forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track initial page view & sync any local assessment records + listen for all user clicks
  useEffect(() => {
    trackPageView(window.location.pathname || '/');
    syncLocalRecordsToServer();
    const cleanupClickListener = initGlobalClickListener();
    return () => {
      cleanupClickListener();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    trackClick('floating_back_to_top_btn', 'Floating Back to Top', 'Navigation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAssessment = () => {
    trackClick('start_assessment_btn', 'Start Career Assessment', 'CTA');
    window.history.pushState(null, '', '/assessment');
    setCurrentView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setCurrentView('admin');
    trackPageView('/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChatbot = (prompt?: string, context?: any) => {
    trackClick('open_tizzi_chatbot_btn', 'Open Tizzi AI Mentor', 'AI Mentor');
    if (context) setChatbotContext(context);
    if (prompt) setInitialChatbotPrompt(prompt);
    setIsChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
    setInitialChatbotPrompt(undefined);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      window.history.pushState(null, '', '/');
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans antialiased relative">
      {currentView === 'admin' ? (
        <AdminPortal onBackToSite={handleBackToHome} />
      ) : currentView === 'assessment' ? (
        <AssessmentPage 
          onBackToHome={handleBackToHome}
          onOpenChatbot={handleOpenChatbot}
        />
      ) : (
        <>
          {/* Responsive Header */}
          <Header 
            onStartAssessment={handleStartAssessment} 
            onNavigateSection={handleNavigateSection}
            onNavigateHome={handleBackToHome}
            onOpenChatbot={() => handleOpenChatbot()}
          />

          {/* Main Content Area */}
          <MainContent 
            onStartAssessment={handleStartAssessment} 
            onOpenChatbot={handleOpenChatbot}
          />

          {/* Responsive Footer with discreet Admin Portal access */}
          <Footer onOpenAdmin={handleNavigateAdmin} />
        </>
      )}

      {/* Persistent Floating Controls (Back to Top & Chatbot Launcher) - Hidden on Admin View */}
      {currentView !== 'admin' && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
          {showBackToTop && (
            <button
              id="floating-back-to-top-btn"
              type="button"
              onClick={handleScrollToTop}
              className="pointer-events-auto group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-emerald-700 shadow-md hover:shadow-lg border border-stone-200/90 backdrop-blur-xs transition-all duration-200 active:scale-95 animate-in fade-in slide-in-from-bottom-2"
              aria-label="Scroll back to top"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 text-emerald-600 group-hover:-translate-y-0.5 transition-transform duration-200" />
              <span className="text-xs font-bold tracking-tight text-stone-700 group-hover:text-emerald-700">Top</span>
            </button>
          )}

          <button
            id="floating-chatbot-launcher-btn"
            type="button"
            onClick={() => handleOpenChatbot()}
            className="pointer-events-auto group flex items-center gap-2.5 px-4 py-3 rounded-full bg-stone-900 text-white hover:bg-emerald-800 shadow-xl border border-stone-700/60 hover:border-emerald-600 transition-all duration-200 active:scale-95"
            title="Chat with Tizzi, your Naija Tech AI Mentor"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 group-hover:bg-emerald-500 text-white shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-stone-900 rounded-full animate-pulse"></span>
            </div>
            <div className="flex flex-col items-start pr-1">
              <span className="text-xs font-black tracking-tight leading-none text-white">Ask Naija AI</span>
              <span className="text-[10px] text-stone-300 font-medium leading-tight">Mentor Tizzi 🇳🇬</span>
            </div>
          </button>
        </div>
      )}

      {/* Multi-turn Naija Chatbot Modal Panel */}
      <NaijaChatbot
        isOpen={isChatbotOpen}
        onClose={handleCloseChatbot}
        diagnosticContext={chatbotContext}
        initialPrompt={initialChatbotPrompt}
      />
    </div>
  );
}

