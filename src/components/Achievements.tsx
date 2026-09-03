import React from 'react';
import { Award, Trophy, Star, Medal, GraduationCap, TrendingUp, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface AchievementsProps {
  language: Language;
}

export const Achievements: React.FC<AchievementsProps> = ({ language }) => {
  const stats = [
    { label: 'HSC Board GPA-5.00', value: '384 Students', desc: 'Highest distinction in Dhaka Board' },
    { label: 'SSC Board Pass Rate', value: '100%', desc: 'Consecutive 7th year milestone' },
    { label: 'BUET & Medical Intake', value: '142 Placements', desc: 'Admitted into public universities' },
    { label: 'Olympiad Medals', value: '28 Awards', desc: 'National Math & Science Olympiads' },
  ];

  const highlights = [
    {
      year: '2024–2025',
      title: 'Top 10 College Ranking (Dhaka Education Board)',
      desc: 'Quantum College was awarded the Academic Excellence Trophy by the Ministry of Education for outstanding board performance.',
      icon: Trophy,
      badge: 'Board Distinction',
    },
    {
      year: '2024',
      title: '1st Runner Up: Bangladesh National Science Fair',
      desc: 'Our Junior Robotics Team presented the "AI Solar Farm Drone", winning high praise from BUET professors.',
      icon: Medal,
      badge: 'Innovation',
    },
    {
      year: '2023–2024',
      title: 'Dhaka Regional Debate Champions',
      desc: 'English Language Debate Club secured 1st place in the Inter-College Parliamentary Championship.',
      icon: Award,
      badge: 'Oratory',
    },
  ];

  return (
    <section id="results" className="py-24 sm:py-32 lg:py-36 bg-[#faf8ff] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-xs font-bold tracking-wider text-[#00a896] uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/60">
            {language === 'en' ? 'Track Record of Excellence' : 'কৃতিত্ব ও গৌরবগাঁথা'}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0b2545] tracking-tight mt-4">
            {language === 'en' ? 'Academic Achievements & Board Results' : 'বোর্ড পরীক্ষার ফলাফল ও জাতীয় অর্জন'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed sm:leading-loose">
            {language === 'en'
              ? 'Our students consistently shine in SSC & HSC board exams, university admissions, and international scientific olympiads.'
              : 'এসএসসি ও এইচএসসি বোর্ড পরীক্ষা থেকে শুরু করে বুয়েট ও মেডিকেল ভর্তি পরীক্ষায় আমাদের শিক্ষার্থীরা অনন্য কৃতিত্বের স্বাক্ষর রেখে চলেছে।'}
          </p>
        </div>

        {/* 4 Stat Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 lg:mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 text-center shadow-xs hover:border-[#00a896] hover:shadow-md transition-all"
            >
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0b2545] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#00a896] mt-2">
                {stat.label}
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Prominent Accolades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-9 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 font-mono">
                      {item.year}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h4 className="font-display font-bold text-lg text-[#0b2545] leading-snug mb-3">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed sm:leading-loose font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified by Academic Council</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
