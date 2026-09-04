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
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);

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
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col selection:bg-[#007A6E] selection:text-white">
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
        {/* Floating Toast Notice (Alternative to the hated top bar) */}
        {isNoticeVisible && (
          <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-[90] animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="bg-[#001026]/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl rounded-2xl p-4 sm:p-5 sm:max-w-sm w-full relative">
              
              {/* Close Button */}
              <button
                onClick={() => setIsNoticeVisible(false)}
                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close Notice"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">
                    {language === 'en' ? 'Admission & Updates' : 'ভর্তি ও নোটিশ'}
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3 pr-4">
                    {language === 'en'
                      ? 'Admissions are now open for Class 5 to Class 12 (2025–26). Model Test Schedule published.'
                      : '৫ম থেকে ১২শ শ্রেণীতে ভর্তি চলছে (২০২৫-২৬)। মডেল টেস্ট রুটিন প্রকাশিত হয়েছে।'}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleOpenRoutine}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Exam Routine' : 'রুটিন'}</span>
                    </button>
                    
                    <a
                      href="tel:+88028951010"
                      className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-xs transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-medium">+880 2-8951010</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
