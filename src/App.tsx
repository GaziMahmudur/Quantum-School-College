/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, PhoneCall, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PrincipalMessage } from './components/PrincipalMessage';
import { AcademicPrograms } from './components/AcademicPrograms';
import { CampusFacilities } from './components/CampusFacilities';
import { Achievements } from './components/Achievements';
import { AdmissionWizard } from './components/AdmissionWizard';
import { NoticesAndEvents } from './components/NoticesAndEvents';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AdmissionProcessTimeline } from './components/AdmissionProcessTimeline';
import { StudentPortalModal } from './components/StudentPortalModal';
import { CampusTourModal } from './components/CampusTourModal';
import { DocumentModal } from './components/DocumentModal';
import { CircularNotice, Language } from './types';

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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          language={language}
          onApplyClick={() => scrollToSection('admissions')}
          onTourClick={() => setIsTourOpen(true)}
          onProspectusClick={handleOpenProspectus}
        />

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
      </main>

      {/* Comprehensive Footer */}
      <Footer
        language={language}
        onOpenAdmission={() => scrollToSection('admissions')}
        onOpenRoutine={handleOpenRoutine}
        onOpenProspectus={handleOpenProspectus}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Student ERP Portal Modal */}
      <StudentPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        language={language}
      />

      {/* 360° Virtual Campus Tour Modal */}
      <CampusTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        language={language}
      />

      {/* Official PDF Document & Routine Viewer Modal */}
      <DocumentModal
        isOpen={docModal.isOpen}
        onClose={() => setDocModal((prev) => ({ ...prev, isOpen: false }))}
        documentType={docModal.type}
        noticeData={docModal.noticeData}
        language={language}
      />
    </div>
  );
}
