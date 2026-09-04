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
        {/* Top Notification Strip moved here so it scrolls up normally */}
        {isNoticeVisible && (
          <div className="bg-[#0b2545] text-white text-xs border-b border-white/10 shadow-sm relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-3 pr-10 sm:pr-12">
              <div className="flex items-center gap-3 md:gap-2 text-center md:text-left flex-col sm:flex-row justify-center md:justify-start">
                <span className="inline-flex items-center px-2 sm:px-2.5 py-1 sm:py-0.5 rounded-full text-[10px] font-bold bg-[#e11d48] text-white tracking-wider uppercase shrink-0">
                  Notice
                </span>
                <span className="text-slate-200 text-xs font-medium leading-relaxed sm:leading-relaxed max-w-2xl px-2 sm:px-0">
                  {language === 'en'
                    ? 'Admissions are open for Class 5 to Class 12 (2025–26) • Exam Routine & Model Test Schedule published.'
                    : '৫ম থেকে ১২শ শ্রেণীতে ভর্তি চলছে (২০২৫-২৬) • মডেল টেস্ট ও পরীক্ষার রুটিন প্রকাশিত হয়েছে।'}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-5 text-xs font-medium shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-700/50 w-full sm:w-auto justify-center sm:justify-end">
                <button
                  onClick={handleOpenRoutine}
                  className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors underline-offset-4 hover:underline cursor-pointer py-1"
                >
                  <span>{language === 'en' ? 'Download Routine (PDF)' : 'রুটিন ডাউনলোড (PDF)'}</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
                <span className="text-white/20 hidden sm:inline">|</span>
                <span className="text-slate-300 hidden sm:inline-flex items-center gap-1.5">
                  <span className="text-slate-400">EIIN:</span> <strong className="text-white">138492</strong>
                </span>
                <span className="text-white/20 hidden sm:inline">|</span>
                <a
                  href="tel:+88028951010"
                  className="hidden lg:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+880 2-8951010</span>
                </a>
              </div>
            </div>
            
            {/* Close Notice Button */}
            <button
              onClick={() => setIsNoticeVisible(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close Notice"
            >
              <X className="w-4 h-4" />
            </button>
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
