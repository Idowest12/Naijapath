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

  // Sync with browser URL popstate & hashchange (e.g. /admin, #admin, browser Back/Forward & phone swipe gestures)
  useEffect(() => {
    // Anchor initial entry in browser history if no state exists yet
    if (typeof window !== 'undefined' && !window.history.state) {
      window.history.replaceState({ ...getInitialViewState(), root: true }, '', window.location.href);
    }

    const handleUrlChange = (event: PopStateEvent) => {
      // If AI Mentor chatbot was open and user swiped back or pressed phone back, close the modal first
      if (isChatbotOpen && (!event.state || !event.state.modal)) {
        setIsChatbotOpen(false);
        setInitialChatbotPrompt(undefined);
        return;
      }
      if (event.state?.modal === 'chatbot') {
        setIsChatbotOpen(true);
        return;
      }

      const next = getInitialViewState();
      setCurrentView(next.view);
      if (next.pathwayId) {
        setSelectedPathwayId(next.pathwayId);
      }
      trackPageView(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [isChatbotOpen]);

  // Discreet Admin Shortcut for site administrators (Ctrl + Shift + A or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (currentView === 'admin') {
          handleBackToHome();
        } else {
          handleNavigateAdmin();
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

  const handleStartAssessment = (stage?: unknown) => {
    trackClick('start_assessment_btn', 'Start Career Assessment', 'CTA');
    try {
      if (typeof stage === 'string') sessionStorage.setItem('technav_start_stage', stage);
    } catch {}
    window.history.pushState({ view: 'assessment', fromAppNav: true }, '', '/assessment?step=1&q=0');
    setCurrentView('assessment');
    trackPageView('/assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    trackClick('app_back_to_home_btn', 'Back to Home', 'Navigation');
    // If we came from an in-app navigation, use browser back so forward button/gesture remains enabled!
    if (window.history.state && (window.history.state.fromAppNav || window.history.state.fromAssessmentNav) && window.history.length > 1) {
      window.history.back();
    } else {
      window.history.pushState({ view: 'home', root: true }, '', '/');
      setCurrentView('home');
      trackPageView('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateAdmin = () => {
    window.history.pushState({ view: 'admin', fromAppNav: true }, '', '/admin');
    setCurrentView('admin');
    trackPageView('/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChatbot = (prompt?: string, context?: any) => {
    trackClick('open_tizzi_chatbot_btn', 'Open Tizzi AI Mentor', 'AI Mentor');
    if (context) setChatbotContext(context);
    if (prompt) setInitialChatbotPrompt(prompt);
    // Push modal state so user's phone back gesture closes the chatbot modal first
    window.history.pushState({ ...(window.history.state || {}), modal: 'chatbot' }, '', window.location.href);
    setIsChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    if (window.history.state?.modal === 'chatbot') {
      window.history.back();
    } else {
      setIsChatbotOpen(false);
      setInitialChatbotPrompt(undefined);
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      window.history.pushState({ view: 'home', fromAppNav: true }, '', '/');
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToPathway = (nicheId: string) => {
    trackClick(`navigate_to_pathway_${nicheId}`, `View Pathway ${nicheId}`, 'Navigation');
    setSelectedPathwayId(nicheId);
    window.history.pushState({ view: 'pathway', pathwayId: nicheId, fromAppNav: true }, '', `/pathway/${nicheId}`);
    setCurrentView('pathway');
    trackPageView(`/pathway/${nicheId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNicheFromFooter = (nicheId: string) => {
    handleNavigateToPathway(nicheId);
  };

  const handleSelectStrategyFromFooter = (strategyKey: string) => {
    if (currentView !== 'home') {
      window.history.pushState({ view: 'home', fromAppNav: true }, '', '/');
      setCurrentView('home');
    }
    setTargetStrategyKey(strategyKey);
  };

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-[#F1F0FF] text-black font-sans antialiased relative">
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
                className="pointer-events-auto group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#D4F938] text-black border-2 border-black shadow-neo-sm transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer font-display font-black text-xs"
                aria-label="Scroll back to top"
                title="Scroll back to top"
              >
                <ArrowUp className="w-3.5 h-3.5 text-black group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span className="text-xs font-mono-tech font-bold uppercase tracking-tight text-black">Top</span>
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

