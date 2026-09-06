/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CircularNotice, Language } from './types';

// Lazy Load Below-the-fold Sections to vastly reduce initial main JS bundle
const PrincipalMessage = React.lazy(() => import('./components/PrincipalMessage').then(m => ({ default: m.PrincipalMessage })));
const AcademicPrograms = React.lazy(() => import('./components/AcademicPrograms').then(m => ({ default: m.AcademicPrograms })));
const CampusFacilities = React.lazy(() => import('./components/CampusFacilities').then(m => ({ default: m.CampusFacilities })));
const Achievements = React.lazy(() => import('./components/Achievements').then(m => ({ default: m.Achievements })));
const AdmissionWizard = React.lazy(() => import('./components/AdmissionWizard').then(m => ({ default: m.AdmissionWizard })));
const NoticesAndEvents = React.lazy(() => import('./components/NoticesAndEvents').then(m => ({ default: m.NoticesAndEvents })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const AdmissionProcessTimeline = React.lazy(() => import('./components/AdmissionProcessTimeline').then(m => ({ default: m.AdmissionProcessTimeline })));

// Lazy load Modals to remove their JS bundle from the Critical Request Path (LCP optimization)
const StudentPortalModal = React.lazy(() => import('./components/StudentPortalModal').then(m => ({ default: m.StudentPortalModal })));
const CampusTourModal = React.lazy(() => import('./components/CampusTourModal').then(m => ({ default: m.CampusTourModal })));
const DocumentModal = React.lazy(() => import('./components/DocumentModal').then(m => ({ default: m.DocumentModal })));

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [preSelectedClass, setPreSelectedClass] = useState<string>('');

  const [docModal, setDocModal] = useState<{
    isOpen: boolean;
    type: 'routine' | 'prospectus' | 'admit_slip' | 'notice';
    noticeData?: CircularNotice | null;
  }>({
    isOpen: false,
    type: 'routine',
    noticeData: null,
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const scrollToSection = (id: string) => {
    // Defer geometry read (scrollIntoView) until after React's DOM commit
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleApplyForClass = (className: string) => {
    setPreSelectedClass(className);
    scrollToSection('admissions');
  };

  const handleOpenRoutine = () => {
    setDocModal({
      isOpen: true,
      type: 'routine',
      noticeData: null,
    });
  };

  const handleOpenProspectus = () => {
    setDocModal({
      isOpen: true,
      type: 'prospectus',
      noticeData: null,
    });
  };

  const handleViewNotice = (notice: CircularNotice) => {
    setDocModal({
      isOpen: true,
      type: 'notice',
      noticeData: notice,
    });
  };

  const handleOpenDocByType = (docType: string) => {
    if (docType === 'routine') {
      handleOpenRoutine();
    } else if (docType === 'prospectus') {
      handleOpenProspectus();
    } else {
      setDocModal({
        isOpen: true,
        type: 'admit_slip',
        noticeData: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col selection:bg-[#007A6E] selection:text-white overflow-x-hidden max-w-full relative">
      {/* Top Navbar */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenRoutineModal={handleOpenRoutine}
        onScrollToSection={scrollToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <Hero
          language={language}
          onApplyClick={() => scrollToSection('admissions')}
          onTourClick={() => setIsTourOpen(true)}
          onProspectusClick={handleOpenProspectus}
        />

        {/* Below the Fold Deferred Content */}
        <React.Suspense fallback={<div className="h-96 w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#007A6E]/20 border-t-[#007A6E] rounded-full animate-spin"></div></div>}>
          {/* Principal's Note & Governance */}
          <PrincipalMessage language={language} />

          {/* Academic Offerings & Programs */}
          <AcademicPrograms
            language={language}
            onApplyForClass={handleApplyForClass}
          />

          {/* The New Staggered Timeline Animation component */}
          <AdmissionProcessTimeline language={language} />

          {/* Interactive 6-Step Admission Wizard */}
          <AdmissionWizard
            language={language}
            preSelectedClass={preSelectedClass}
            onOpenDocumentModal={handleOpenDocByType}
          />

          {/* Notices & Upcoming Events */}
          <NoticesAndEvents
            language={language}
            onViewNotice={handleViewNotice}
          />

          {/* Campus Facilities & Laboratories */}
          <CampusFacilities language={language} />

          {/* Board Results & Honors */}
          <Achievements language={language} />

          {/* Testimonials & Community Voices */}
          <Testimonials language={language} />
        </React.Suspense>
      </main>

      {/* Comprehensive Footer */}
      <React.Suspense fallback={<div className="h-64 bg-[#0b2545]"></div>}>
        <Footer
          language={language}
          onOpenAdmission={() => scrollToSection('admissions')}
          onOpenRoutine={handleOpenRoutine}
          onOpenProspectus={handleOpenProspectus}
          onOpenPortal={() => setIsPortalOpen(true)}
        />
      </React.Suspense>

      {/* Lazy Suspense Boundary for Heavy Modals */}
      <React.Suspense fallback={null}>
        {/* Modals placed outside main flow, only loaded when state variables trigger their mount */}
        {isPortalOpen && (
          <StudentPortalModal 
            isOpen={isPortalOpen} 
            onClose={() => setIsPortalOpen(false)} 
            language={language} 
          />
        )}
        
        {isTourOpen && (
          <CampusTourModal 
            isOpen={isTourOpen} 
            onClose={() => setIsTourOpen(false)} 
            language={language} 
          />
        )}
        
        {docModal.isOpen && (
          <DocumentModal
            isOpen={docModal.isOpen}
            onClose={() => setDocModal({ ...docModal, isOpen: false, noticeData: null })}
            documentType={docModal.type}
            language={language}
            noticeData={docModal.noticeData}
          />
        )}
      </React.Suspense>
    </div>
  );
}
