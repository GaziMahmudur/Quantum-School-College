import React, { useState } from 'react';
import { Download, Globe, LogIn, Menu, X, ShieldCheck, PhoneCall } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenPortal: () => void;
  onOpenRoutineModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenPortal,
  onOpenRoutineModal,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: language === 'en' ? 'Home' : 'হোম', id: 'home' },
    { label: language === 'en' ? 'About Us' : 'আমাদের পরিচিতি', id: 'about' },
    { label: language === 'en' ? 'Academics' : 'শিক্ষা কার্যক্রম', id: 'academics' },
    { label: language === 'en' ? 'Admissions' : 'ভর্তি তথ্য', id: 'admissions' },
    { label: language === 'en' ? 'Notices & Calendar' : 'নোটিশ ও বর্ষপঞ্জি', id: 'notices' },
    { label: language === 'en' ? 'Campus Facilities' : 'ক্যাম্পাস', id: 'facilities' },
    { label: language === 'en' ? 'Achievements' : 'কৃতিত্ব ও ফলাফল', id: 'results' },
    { label: language === 'en' ? 'Contact' : 'যোগাযোগ', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Top Notification Strip */}
      <div className="bg-[#0b2545] text-white text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Notice pill & text */}
          <div className="flex items-center gap-2.5 text-center md:text-left flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e11d48] text-white tracking-wider uppercase">
              Notice
            </span>
            <span className="text-slate-200 text-xs font-medium">
              {language === 'en'
                ? 'Admissions are open for Class 5 to Class 12 (2025–26) • Exam Routine & Model Test Schedule published.'
                : '৫ম থেকে ১২শ শ্রেণীতে ভর্তি চলছে (২০২৫-২৬) • মডেল টেস্ট ও পরীক্ষার রুটিন প্রকাশিত হয়েছে।'}
            </span>
          </div>

          {/* Right quick links */}
          <div className="flex items-center gap-5 text-xs font-medium shrink-0">
            <button
              onClick={onOpenRoutineModal}
              className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors underline-offset-4 hover:underline cursor-pointer"
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
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Crest */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none"
          >
            {/* Geometric academic emblem */}
            <div className="w-11 h-11 rounded-xl bg-[#0b2545] text-white flex items-center justify-center shadow-md relative overflow-hidden border border-cyan-500/30 group-hover:bg-[#134074] transition-colors shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/30 to-transparent"></div>
              <div className="relative font-display font-extrabold text-xl tracking-tight text-white flex items-center">
                <span className="text-cyan-400">Q</span>
                <span className="text-xs text-amber-300 font-bold ml-0.5">SC</span>
              </div>
            </div>

            <div>
              <div className="font-display font-extrabold text-lg tracking-tight text-[#0b2545] leading-tight">
                QUANTUM
              </div>
              <div className="text-[10px] font-semibold text-[#00a896] tracking-wider uppercase leading-none mt-0.5">
                School &amp; College
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2 text-[13.5px] font-medium text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#0b2545] hover:bg-slate-100/80 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0b2545] hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              title="Toggle Language / ভাষা পরিবর্তন"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className={language === 'en' ? 'font-bold text-[#0b2545]' : 'text-slate-500'}>EN</span>
              <span className="text-slate-300">/</span>
              <span className={language === 'bn' ? 'font-bold text-[#00a896]' : 'text-slate-500'}>বাংলা</span>
            </button>

            {/* Portal Login Button */}
            <button
              onClick={onOpenPortal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0b2545] bg-[#e6f7f5] hover:bg-[#d0f1ed] text-[#006359] rounded-lg border border-[#99e3db] shadow-2xs transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#008c7d]" />
              <span>{language === 'en' ? 'Portal Login' : 'পোর্টাল লগইন'}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-[#0b2545] hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0b2545] rounded-md cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRoutineModal();
              }}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-md"
            >
              <span>{language === 'en' ? 'Download Exam Routine (PDF)' : 'পরীক্ষার রুটিন (PDF)'}</span>
              <Download className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
