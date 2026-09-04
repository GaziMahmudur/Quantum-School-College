import React from 'react';
import {
  CheckCircle2,
  Tag,
  Star,
  ArrowRight,
  PlayCircle,
  FileDown,
  Target,
  Users,
  GraduationCap,
  ThumbsUp,
  ShieldCheck,
  Bot,
  Trees,
  Bus,
} from 'lucide-react';
import { Language } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  language: Language;
  onApplyClick: () => void;
  onTourClick: () => void;
  onProspectusClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onApplyClick,
  onTourClick,
  onProspectusClick,
}) => {
  return (
    <section id="home" className="relative bg-[#001026] text-white overflow-hidden pt-16 sm:pt-24 lg:pt-28">
      {/* Background glow & subtle academic grid accents */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-600 rounded-full blur-[128px]"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-600 rounded-full blur-[128px]"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <ScrollReveal direction="left" delay={100} className="lg:col-span-7 space-y-8">
            {/* Top pill tags */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0b2545] border border-cyan-500/30 text-cyan-300 shadow-2xs max-w-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{language === 'en' ? 'BISE Dhaka Board Approved' : 'ঢাকা শিক্ষা বোর্ড অনুমোদিত'}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0b2545] border border-white/15 text-slate-200 max-w-full">
                <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{language === 'en' ? 'From Class 5 to Class 12' : '৫ম থেকে ১২শ শ্রেণী পর্যন্ত'}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0b2545] border border-white/15 text-slate-200 max-w-full">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                <span className="truncate">{language === 'en' ? 'English & Bangla Medium' : 'ইংরেজি ও বাংলা ভার্সন'}</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.25] text-white">
              {language === 'en' ? (
                <>
                  Welcome to Quantum School &amp; College:{' '}
                  <span className="text-[#007A6E] underline decoration-cyan-400 decoration-2 underline-offset-8">
                    Where Learning is Inspiring &amp; Fun!
                  </span>
                </>
              ) : (
                <>
                  কোয়ান্টাম স্কুল অ্যান্ড কলেজে স্বাগতম:{' '}
                  <span className="text-[#007A6E] underline decoration-cyan-400 decoration-2 underline-offset-8">
                    আনন্দ ও অনুপ্রেরণায় শেখার আধুনিক ঠিকানা!
                  </span>
                </>
              )}
            </h1>

            {/* Lead Paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed sm:leading-loose max-w-2xl font-normal">
              {language === 'en'
                ? 'We provide a caring, friendly place where children love to learn, explore science and coding, play sports, and grow into confident leaders for tomorrow.'
                : 'আমরা একটি স্নেহশীল ও আনন্দময় শিক্ষাঙ্গন গড়ে তুলেছি যেখানে শিক্ষার্থীরা বিজ্ঞানের বিস্ময়, রোবটিক্স কোডিং এবং ক্রীড়ার মাধ্যমে আগামী দিনের আত্মবিশ্বাসী নেতা হয়ে ওঠে।'}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onApplyClick}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white bg-[#007A6E] hover:bg-[#008c7d] shadow-lg shadow-teal-900/40 transition-colors cursor-pointer text-center"
              >
                <span>{language === 'en' ? 'Apply Now (Simple 6 Steps)' : 'অনলাইন ভর্তি আবেদন (৬ ধাপ)'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={onTourClick}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white bg-[#0b2545] hover:bg-[#134074] border border-slate-700/80 transition-colors cursor-pointer text-center"
              >
                <PlayCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{language === 'en' ? 'Take Campus Tour' : 'ক্যাম্পাস ভিডিও ট্যুর'}</span>
              </button>

              <button
                onClick={onProspectusClick}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-3.5 sm:py-4 rounded-xl font-medium text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-center"
              >
                <FileDown className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{language === 'en' ? 'See Prospectus' : 'প্রসপেক্টাস দেখুন'}</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column: 2x2 Metric Cards Grid */}
          <ScrollReveal direction="right" delay={200} className="lg:col-span-5 pb-4 lg:pb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Metric Card 1: BOARD RESULT */}
              <div className="bg-[#0b2545]/90 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/10 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-wider text-cyan-300 uppercase">
                    Board Result
                  </span>
                  <Target className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight break-words">
                  99.8%
                </div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Pass rate in SSC &amp; HSC board exams with top GPA-5 grades
                </p>
              </div>

              {/* Metric Card 2: STUDENTS */}
              <div className="bg-[#0b2545]/90 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/10 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-wider text-cyan-300 uppercase">
                    Students
                  </span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  2,450+
                </div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Happy boys and girls learning together on our campus
                </p>
              </div>

              {/* Metric Card 3: TEACHERS */}
              <div className="bg-[#0b2545]/90 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/10 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-wider text-cyan-300 uppercase">
                    Teachers
                  </span>
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  145+
                </div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Caring, experienced teachers always ready to assist students
                </p>
              </div>

              {/* Metric Card 4: PARENT RATING */}
              <div className="bg-[#0b2545]/90 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/10 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-wider text-cyan-300 uppercase">
                    Parent Rating
                  </span>
                  <ThumbsUp className="w-4 h-4 text-amber-400" />
                </div>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight flex items-baseline gap-1">
                  <span>4.9</span>
                  <span className="text-lg text-slate-400 font-semibold">/5</span>
                  <span className="text-amber-400 text-2xl ml-1">★</span>
                </div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Trusted by thousands of families across Dhaka
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Hero Bottom Feature Strip (Marquee) */}
      <div className="mt-16 sm:mt-24 bg-[#00221e] border-y border-teal-900/60 text-teal-100 text-xs sm:text-sm font-medium py-5 sm:py-6 overflow-hidden flex w-full relative">
        {/* Left/Right fading gradients for a premium scrolling effect */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#00221e] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#00221e] to-transparent z-10 pointer-events-none"></div>

        <div className="flex items-center shrink-0 animate-marquee min-w-full">
          {[...Array(4)].map((_, arrayIdx) => (
            <div key={arrayIdx} className="flex items-center gap-12 sm:gap-16 px-6 sm:px-8">
              <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Safe &amp; Caring Environment</span>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
                <Bot className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Robotics, Coding &amp; Science Labs</span>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
                <Trees className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Large Green Sports Ground</span>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
                <Bus className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Safe AC Bus Service across Dhaka</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
