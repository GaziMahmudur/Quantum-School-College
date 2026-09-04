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
    <header className="sticky top-0 z-[80] w-full bg-white shadow-xs">

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Crest */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3.5 text-left group cursor-pointer focus:outline-none shrink min-w-0 pr-1"
          >
            {/* Geometric academic emblem */}
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#0b2545] text-white flex items-center justify-center shadow-md relative overflow-hidden border border-cyan-500/30 group-hover:bg-[#134074] transition-colors shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/30 to-transparent"></div>
              <div className="relative font-display font-extrabold text-sm sm:text-xl tracking-tight text-white flex items-center">
                <span className="text-cyan-400">Q</span>
                <span className="text-[9px] sm:text-xs text-amber-300 font-bold ml-0.5 hidden sm:inline">SC</span>
              </div>
            </div>

            <div className="min-w-0 shrink">
              <div className="font-display font-extrabold text-sm sm:text-lg tracking-tight text-[#0b2545] leading-tight truncate">
                QUANTUM
              </div>
              <div className="text-[8px] sm:text-[10px] font-semibold text-[#007A6E] tracking-wider uppercase leading-none mt-0.5 truncate">
                School <span className="hidden min-[360px]:inline">&amp; College</span>
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
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-slate-700 hover:text-[#0b2545] hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer shrink-0"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 hidden min-[370px]:block" />
              <span className={language === 'en' ? 'font-bold text-[#0b2545]' : 'text-slate-500'}>EN</span>
              <span className="text-slate-300 mx-0.5">/</span>
              <span className={language === 'bn' ? 'font-bold text-[#007A6E]' : 'text-slate-500'}>বাংলা</span>
            </button>

            {/* Portal Login Button */}
            <button
              onClick={onOpenPortal}
              className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-[#0b2545] bg-[#e6f7f5] hover:bg-[#d0f1ed] text-[#006359] rounded-lg border border-[#99e3db] shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#008c7d] hidden min-[320px]:block" />
              <span>
                {language === 'en' ? 'Portal' : 'পোর্টাল'}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 text-slate-700 hover:text-[#0b2545] hover:bg-slate-100 rounded-lg shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0b2545] rounded-md cursor-pointer"
            >
              {item.label}
            </button>
          ))}

        </div>
      )}
    </header>
  );
};
