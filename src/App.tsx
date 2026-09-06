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
import { DraggableAiButton } from './components/DraggableAiButton';
import { Bot, Sparkles, MessageSquare, ArrowUp, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
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
  const [isAiButtonExpanded, setIsAiButtonExpanded] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const saved = localStorage.getItem('naija_ai_button_expanded');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleAiButtonExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAiButtonExpanded(prev => {
      const next = !prev;
      try {
        localStorage.setItem('naija_ai_button_expanded', String(next));
      } catch {}
      return next;
    });
  };

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

      {/* Persistent Floating Controls (Back to Top & Draggable Chatbot Launcher) - Hidden on Admin View */}
      {currentView !== 'admin' && (
        <>
          {showBackToTop && (
            <div className="fixed bottom-24 right-5 z-40 pointer-events-none">
              <button
                id="floating-back-to-top-btn"
                type="button"
                onClick={handleScrollToTop}
                className="pointer-events-auto group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-emerald-700 shadow-md hover:shadow-lg border border-stone-200/90 backdrop-blur-xs transition-all duration-200 active:scale-95 animate-in fade-in slide-in-from-bottom-2 cursor-pointer"
                aria-label="Scroll back to top"
                title="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4 text-emerald-600 group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span className="text-xs font-bold tracking-tight text-stone-700 group-hover:text-emerald-700">Top</span>
              </button>
            </div>
          )}

          <DraggableAiButton
            isExpanded={isAiButtonExpanded}
            onToggleExpand={toggleAiButtonExpanded}
            onOpenChatbot={() => handleOpenChatbot()}
          />
        </>
      )}

      {/* Multi-turn Naija Chatbot Modal Panel */}
      <NaijaChatbot
        isOpen={isChatbotOpen}
        onClose={handleCloseChatbot}
        diagnosticContext={chatbotContext}
        initialPrompt={initialChatbotPrompt}
      />

      {/* Vercel Live Analytics */}
      <Analytics />
    </div>
  );
}

