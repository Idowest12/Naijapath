/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { AssessmentPage } from './components/AssessmentPage';
import { PathwayDetailPage } from './components/PathwayDetailPage';
import { NaijaChatbot } from './components/NaijaChatbot';
import { AdminPortal } from './components/AdminPortal';
import { DraggableAiButton } from './components/DraggableAiButton';
import { Bot, Sparkles, MessageSquare, ArrowUp, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { trackPageView, trackClick, syncLocalRecordsToServer, initGlobalClickListener } from './utils/analytics';

interface ViewState {
  view: 'home' | 'assessment' | 'admin' | 'pathway';
  pathwayId?: string;
}

function getInitialViewState(): ViewState {
  if (typeof window === 'undefined') return { view: 'home' };
  const path = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;

  if (path === '/admin' || search.includes('view=admin') || search.includes('admin=true') || hash === '#admin') {
    return { view: 'admin' };
  }
  if (path === '/assessment' || search.includes('view=assessment') || hash === '#assessment') {
    return { view: 'assessment' };
  }
  if (path.startsWith('/pathway/')) {
    const pId = path.replace('/pathway/', '').split('/')[0];
    if (pId) return { view: 'pathway', pathwayId: pId };
  }
  if (search.includes('pathway=')) {
    const params = new URLSearchParams(search);
    const pId = params.get('pathway');
    if (pId) return { view: 'pathway', pathwayId: pId };
  }
  if (hash.startsWith('#pathway-')) {
    const pId = hash.replace('#pathway-', '');
    if (pId) return { view: 'pathway', pathwayId: pId };
  }
  if (hash.startsWith('#niche-')) {
    const pId = hash.replace('#', '');
    if (pId) return { view: 'pathway', pathwayId: pId };
  }
  return { view: 'home' };
}

export default function App() {
  const initial = getInitialViewState();
  const [currentView, setCurrentView] = useState<'home' | 'assessment' | 'admin' | 'pathway'>(initial.view);
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>(initial.pathwayId || 'niche-va');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotContext, setChatbotContext] = useState<any>(undefined);
  const [initialChatbotPrompt, setInitialChatbotPrompt] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [targetNicheId, setTargetNicheId] = useState<string | null>(null);
  const [targetStrategyKey, setTargetStrategyKey] = useState<string | null>(null);
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

  // Sync with browser URL popstate & hashchange (e.g. /admin, #admin, browser Back/Forward)
  useEffect(() => {
    const handleUrlChange = () => {
      const next = getInitialViewState();
      setCurrentView(next.view);
      if (next.pathwayId) {
        setSelectedPathwayId(next.pathwayId);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Discreet Admin Shortcut for site administrators (Ctrl + Shift + A or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (currentView === 'admin') {
          window.history.pushState(null, '', '/');
          setCurrentView('home');
        } else {
          window.history.pushState(null, '', '/admin');
          setCurrentView('admin');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView]);

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

  const handleNavigateToPathway = (nicheId: string) => {
    trackClick(`navigate_to_pathway_${nicheId}`, `View Pathway ${nicheId}`, 'Navigation');
    setSelectedPathwayId(nicheId);
    window.history.pushState(null, '', `/pathway/${nicheId}`);
    setCurrentView('pathway');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNicheFromFooter = (nicheId: string) => {
    handleNavigateToPathway(nicheId);
  };

  const handleSelectStrategyFromFooter = (strategyKey: string) => {
    if (currentView !== 'home') {
      window.history.pushState(null, '', '/');
      setCurrentView('home');
    }
    setTargetStrategyKey(strategyKey);
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
      ) : currentView === 'pathway' ? (
        <PathwayDetailPage
          nicheId={selectedPathwayId}
          onBack={handleBackToHome}
          onStartAssessment={handleStartAssessment}
          onOpenChatbot={handleOpenChatbot}
          onSelectNiche={handleNavigateToPathway}
          onSelectStrategy={handleSelectStrategyFromFooter}
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
            targetNicheId={targetNicheId}
            targetStrategyKey={targetStrategyKey}
            onSelectPathway={handleNavigateToPathway}
            onClearTarget={() => {
              setTargetNicheId(null);
              setTargetStrategyKey(null);
            }}
          />

          {/* Responsive Footer */}
          <Footer 
            onSelectNiche={handleSelectNicheFromFooter}
            onSelectStrategy={handleSelectStrategyFromFooter}
          />
        </>
      )}

      {/* Persistent Floating Controls (Back to Top & Draggable Chatbot Launcher) - Hidden on Admin View */}
      {currentView !== 'admin' && (
        <>
          {currentView === 'home' && showBackToTop && (
            <div className="fixed bottom-22 right-4 sm:right-6 z-30 pointer-events-none">
              <button
                id="floating-back-to-top-btn"
                type="button"
                onClick={handleScrollToTop}
                className="pointer-events-auto group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-600 hover:text-stone-950 shadow-sm hover:shadow-md border border-stone-200/90 backdrop-blur-md transition-all duration-200 active:scale-95 animate-in fade-in cursor-pointer"
                aria-label="Scroll back to top"
                title="Scroll back to top"
              >
                <ArrowUp className="w-3.5 h-3.5 text-stone-500 group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span className="text-xs font-medium tracking-tight text-stone-600 group-hover:text-stone-900">Top</span>
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

