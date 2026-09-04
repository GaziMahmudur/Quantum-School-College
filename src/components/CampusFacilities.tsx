import React, { useState } from 'react';
import { CAMPUS_FACILITIES } from '../data/schoolData';
import { Language } from '../types';
import { CheckCircle2, ChevronRight, Sparkles, Building2 } from 'lucide-react';

interface CampusFacilitiesProps {
  language: Language;
}

export const CampusFacilities: React.FC<CampusFacilitiesProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="facilities" className="py-24 sm:py-32 lg:py-36 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#007A6E] uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
              {language === 'en' ? 'Modern Infrastructure' : 'উন্নত অবকাঠামো'}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0b2545] tracking-tight mt-4">
              {language === 'en' ? 'Campus Facilities & Learning Spaces' : 'শিক্ষাবান্ধব ক্যাম্পাস ও আধুনিক সুবিধাসমূহ'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed sm:leading-loose">
            {language === 'en'
              ? 'Our 2.5-acre campus in Uttara, Dhaka provides state-of-the-art laboratories, high-tech robotics studios, expansive playgrounds, and an air-conditioned bus fleet.'
              : 'উত্তরায় অবস্থিত আমাদের ক্যাম্পাসটিতে রয়েছে আধুনিক বিজ্ঞানাগার, রোবটিক্স স্টুডিও, সুবিশাল খেলার মাঠ এবং সার্বক্ষণিক সিসিটিভি নিয়ন্ত্রিত নিরাপদ পরিবেশ।'}
          </p>
        </div>

        {/* Featured Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Hero Card: Science & Chemistry Labs */}
          <div className="lg:col-span-7 bg-[#0b2545] text-white rounded-3xl overflow-hidden shadow-md flex flex-col justify-between group">
            <div className="relative h-72 sm:h-96 overflow-hidden">
              <img
                src={CAMPUS_FACILITIES[0].image}
                alt={CAMPUS_FACILITIES[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545] via-[#0b2545]/40 to-transparent"></div>
              <span className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#007A6E] text-white uppercase tracking-wider shadow-sm">
                {CAMPUS_FACILITIES[0].badge}
              </span>
            </div>

            <div className="p-8 sm:p-10 space-y-6">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {CAMPUS_FACILITIES[0].title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed sm:leading-loose">
                {CAMPUS_FACILITIES[0].description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10">
                {CAMPUS_FACILITIES[0].bullets?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-cyan-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Stacked Facilities */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Facility 2: Robotics & Coding */}
            <div className="bg-[#faf8ff] rounded-3xl border border-slate-200/90 p-8 flex flex-col justify-between flex-1 group hover:border-[#007A6E] transition-all">
              <div className="flex gap-5 items-start">
                <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-200 shadow-sm">
                  <img
                    src={CAMPUS_FACILITIES[1].image}
                    alt={CAMPUS_FACILITIES[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-200">
                    {CAMPUS_FACILITIES[1].badge}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#0b2545] pt-1">
                    {CAMPUS_FACILITIES[1].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {CAMPUS_FACILITIES[1].description}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-sm text-[#007A6E] font-semibold">
                <span>Arduino, Scratch &amp; Python Ready</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom 3 mini facilities row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {CAMPUS_FACILITIES.slice(2).map((fac) => (
                <div
                  key={fac.id}
                  className="bg-[#faf8ff] rounded-2xl border border-slate-200/90 p-4 sm:p-5 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-full h-24 rounded-xl overflow-hidden mb-3 bg-slate-200">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#0b2545] truncate">
                    {fac.title}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-500 block mt-1">
                    {fac.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
