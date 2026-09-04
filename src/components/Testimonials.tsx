import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/schoolData';
import { Language } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface TestimonialsProps {
  language: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-white border-b border-slate-200/80">
      <ScrollReveal direction="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-xs font-bold tracking-wider text-[#007A6E] uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/60">
            {language === 'en' ? 'Community Voices' : 'অভিভাবকদের মতামত'}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0b2545] tracking-tight mt-4">
            {language === 'en' ? 'What Parents & Students Say' : 'অভিভাবক ও শিক্ষার্থীদের অভিজ্ঞতা'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed sm:leading-loose">
            {language === 'en'
              ? 'Hear real stories from families who chose Quantum School & College for holistic education and care.'
              : 'জেনে নিন আমাদের সম্মানিত অভিভাবক ও প্রিয় শিক্ষার্থীদের আন্তরিক অনুভূতি।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#faf8ff] rounded-3xl border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:border-[#007A6E]/60 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-6 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed sm:leading-loose italic mb-8 font-normal">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs ${item.avatarBg}`}
                >
                  {item.avatarInitials}
                </div>
                <div>
                  <div className="font-display font-bold text-sm sm:text-base text-[#0b2545]">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};
