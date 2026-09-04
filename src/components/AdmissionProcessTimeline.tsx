import React from 'react';
import { Language } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { CheckCircle2, ClipboardEdit, GraduationCap, ArrowRight, UserCheck, CreditCard, Building } from 'lucide-react';

interface AdmissionProcessTimelineProps {
  language: Language;
}

const STEPS = [
  {
    id: 1,
    time: 'Step 1',
    title: { en: 'Online Application', bn: 'অনলাইন আবেদন' },
    desc: {
      en: 'Fill out the initial application form via our portal with basic details.',
      bn: 'আমাদের পোর্টালের মাধ্যমে প্রাথমিক তথ্য দিয়ে আবেদন ফর্মটি পূরণ করুন।'
    },
    icon: ClipboardEdit,
    badge: 'Application',
    badgeColor: 'bg-blue-500/20 text-blue-300'
  },
  {
    id: 2,
    time: 'Step 2',
    title: { en: 'Entrance Assessment', bn: 'ভর্তি পরীক্ষা' },
    desc: {
      en: 'Written and Viva evaluation to understand student proficiency.',
      bn: 'শিক্ষার্থীর মেধা যাচাইয়ের জন্য লিখিত ও মৌখিক মূল্যায়ন।'
    },
    icon: Building,
    badge: 'Assessment',
    badgeColor: 'bg-purple-500/20 text-purple-300'
  },
  {
    id: 3,
    time: 'Step 3',
    title: { en: "Principal's Interview", bn: 'অধ্যক্ষের সাক্ষাৎকার' },
    desc: {
      en: 'A short, friendly meeting between parents, child, and the Principal.',
      bn: 'বাবা-মা, সন্তান এবং অধ্যক্ষের মধ্যে একটি আন্তরিক সাক্ষাৎ।'
    },
    icon: UserCheck,
    badge: 'Interview',
    badgeColor: 'bg-emerald-500/20 text-emerald-300'
  },
  {
    id: 4,
    time: 'Step 4',
    title: { en: 'Document Verification', bn: 'কাগজপত্র যাচাই' },
    desc: {
      en: 'Submission of Birth Certificate, previous school transcripts, and photos.',
      bn: 'জন্ম নিবন্ধন, পূর্ববর্তী স্কুলের ফলাফল এবং ছবি জমা দেওয়া।'
    },
    icon: CheckCircle2,
    badge: 'Verification',
    badgeColor: 'bg-amber-500/20 text-amber-300'
  },
  {
    id: 5,
    time: 'Step 5',
    title: { en: 'Fee Payment', bn: 'ভর্তি ফি প্রদান' },
    desc: {
      en: 'Clear the admission fees securely via bank or online portal.',
      bn: 'ব্যাংক বা অনলাইনের মাধ্যমে নিরাপদে ভর্তি ফি পরিশোধ করুন।'
    },
    icon: CreditCard,
    badge: 'Finance',
    badgeColor: 'bg-rose-500/20 text-rose-300'
  },
  {
    id: 6,
    time: 'Step 6',
    title: { en: 'Welcome to Quantum!', bn: 'কোয়ান্টামে স্বাগতম!' },
    desc: {
      en: 'Receive your student ID card, books, and orientation schedule.',
      bn: 'স্টুডেন্ট আইডি কার্ড, বই এবং ওরিয়েন্টেশনের রুটিন সংগ্রহ করুন।'
    },
    icon: GraduationCap,
    badge: 'Enrollment',
    badgeColor: 'bg-cyan-500/20 text-cyan-300'
  }
];

export const AdmissionProcessTimeline: React.FC<AdmissionProcessTimelineProps> = ({ language }) => {
  return (
    <section id="process" className="py-24 sm:py-32 bg-[#001026] text-white relative overflow-hidden text-center sm:text-left">
      
      {/* Background Subtle Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16 sm:mb-24">
            <span className="inline-block px-3 py-1 bg-cyan-900/40 text-cyan-400 text-xs font-bold tracking-wider uppercase rounded-full border border-cyan-800/50 mb-4">
              {language === 'en' ? 'Admission Process' : 'ভর্তি প্রক্রিয়া'}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {language === 'en' ? 'How to Apply' : 'কীভাবে আবেদন করবেন'}
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              {language === 'en' 
                ? 'A simple, transparent 6-step journey from application to joining our vibrant academic community.'
                : 'আবেদন থেকে শুরু করে আমাদের শিক্ষা কার্যক্রমে যুক্ত হওয়া পর্যন্ত ৬টি সহজ ধাপ।'}
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Central Line (hidden on very small screens, aligns to left instead) */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 md:-translate-x-1/2 rounded-full"></div>

          <div className="flex flex-col gap-8 sm:gap-12 md:gap-0">
            {STEPS.map((step, idx) => {
              const isEven = idx % 2 === 1; // 0-indexed, so 1, 3, 5 are right-aligned on desktop
              const delay = 100 + (idx * 50);

              return (
                <ScrollReveal 
                  key={step.id} 
                  direction={window.innerWidth > 768 ? (isEven ? 'right' : 'left') : 'up'}
                  delay={delay}
                  className={`relative flex items-start md:items-center w-full md:w-1/2 ${
                    isEven ? 'md:ml-auto md:pl-12' : 'md:pr-12'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-[28px] md:top-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#001026] border-[3px] border-[#0b2545] text-cyan-400 shrink-0 md:-translate-y-1/2 z-10 
                    ${isEven ? 'md:-left-6' : 'md:left-auto md:-right-6'} 
                    shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>

                  {/* Spacer for mobile dot */}
                  <div className="w-16 shrink-0 md:hidden"></div>

                  {/* Content Card */}
                  <div className="flex-1 w-full text-left bg-[#0b2545]/60 hover:bg-[#134074]/60 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-7 transition-all duration-300 group shadow-lg">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-cyan-400 font-bold text-sm tracking-wide">
                        {step.time}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="text-xl text-white font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                      {step.title[language]}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.desc[language]}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
