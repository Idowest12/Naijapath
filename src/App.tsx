/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { AssessmentPage } from './components/AssessmentPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'assessment'>('home');

  const handleStartAssessment = () => {
    setCurrentView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
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
    <div id="app-root" className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans antialiased">
      {currentView === 'assessment' ? (
        <AssessmentPage 
          onBackToHome={handleBackToHome}
        />
      ) : (
        <>
          {/* Responsive Header */}
          <Header 
            onStartAssessment={handleStartAssessment} 
            onNavigateSection={handleNavigateSection}
            onNavigateHome={handleBackToHome}
          />

          {/* Main Content Area */}
          <MainContent 
            onStartAssessment={handleStartAssessment} 
          />

          {/* Responsive Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}

