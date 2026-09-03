import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ChevronRight,
  Send,
  ShieldCheck,
  Facebook,
  Youtube,
  Linkedin,
  Award,
  BookOpen,
} from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenAdmission: () => void;
  onOpenRoutine: () => void;
  onOpenProspectus: () => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenAdmission,
  onOpenRoutine,
  onOpenProspectus,
  onOpenPortal,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#0b2545] text-white border-t border-white/10">
      {/* Quick Help & Contact Bar */}
      <div className="border-b border-white/10 bg-[#07192f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs sm:text-sm">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 text-[#00a896] shrink-0 border border-white/10">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block mb-1">Campus Location</span>
                <span className="text-slate-300 text-xs leading-relaxed">Plot 18, Road 7, Sector 4, Uttara, Dhaka-1230</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 text-[#00a896] shrink-0 border border-white/10">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block mb-1">Admission Hotline</span>
                <span className="text-slate-300 text-xs leading-relaxed">+880 2-8951010 / +880 1711-234567</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 text-[#00a896] shrink-0 border border-white/10">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block mb-1">Official Email</span>
                <span className="text-slate-300 text-xs leading-relaxed">admissions@quantumschool.edu.bd</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 text-[#00a896] shrink-0 border border-white/10">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block mb-1">Office Hours</span>
                <span className="text-slate-300 text-xs leading-relaxed">Saturday – Thursday: 8:00 AM – 4:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00a896] to-teal-400 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                Q
              </div>
              <div>
                <span className="font-display font-black text-xl sm:text-2xl text-white tracking-tight block">
                  QUANTUM
                </span>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block -mt-1">
                  SCHOOL &amp; COLLEGE • DHAKA
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed sm:leading-loose max-w-sm">
              Quantum School &amp; College is a premier Bengali &amp; English Version educational institution dedicated to intellectual curiosity, character building, modern robotics, and national board excellence.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-cyan-200 font-mono">
                EIIN: 138492
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-cyan-200 font-mono">
                College Code: 1104
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#contact"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#00a896] text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#00a896] text-white flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#00a896] text-white flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {language === 'en' ? 'Quick Access' : 'জরুরি লিংক'}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li>
                <button
                  onClick={onOpenAdmission}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#00a896]" />
                  <span>Online Admission 2025</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRoutine}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#00a896]" />
                  <span>Exam Routine (PDF)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProspectus}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#00a896]" />
                  <span>Academic Prospectus</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#00a896]" />
                  <span>Student ERP Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Sections */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {language === 'en' ? 'Academics' : 'শিক্ষা কার্যক্রম'}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li>
                <a href="#academics" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#00a896]" />
                  <span>Pre-Primary &amp; Kindergarten</span>
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#00a896]" />
                  <span>Primary Wing (Class 1–5)</span>
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#00a896]" />
                  <span>Junior &amp; Secondary (Class 6–10)</span>
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#00a896]" />
                  <span>Higher Secondary College (Class 11–12)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Notifications */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {language === 'en' ? 'Circular Alerts' : 'বিজ্ঞপ্তি সাবস্ক্রিপশন'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get official announcements, exam updates, and holidays delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-900/60 border border-emerald-500 rounded-xl text-emerald-200 text-xs font-semibold">
                Thank you! You will now receive official Quantum circulars.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="parent.email@example.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-[#00a896]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-3.5 bg-[#00a896] hover:bg-[#008c7d] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe Alerts</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Board Accreditation */}
        <div className="pt-12 mt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Quantum School &amp; College. All rights reserved. Registered under Dhaka Board of Intermediate &amp; Secondary Education.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Academic Code</span>
            <span className="hover:text-white transition-colors cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
