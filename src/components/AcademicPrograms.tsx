import React, { useState } from 'react';
import { Smile, FlaskConical, GraduationCap, CheckCircle, ArrowRight, X, BookOpen, Clock, Award } from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../data/schoolData';
import { AcademicProgram, Language } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface AcademicProgramsProps {
  language: Language;
  onApplyForClass: (className: string) => void;
}

export const AcademicPrograms: React.FC<AcademicProgramsProps> = ({ language, onApplyForClass }) => {
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgram | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-orange-600" />;
      case 'Smile':
        return <Smile className="w-4 h-4 text-blue-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-4 h-4 text-teal-600" />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <section id="academics" className="py-24 sm:py-32 lg:py-36 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#007A6E] uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
                {language === 'en' ? 'What We Teach' : 'আমাদের পাঠ্যক্রম'}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0b2545] tracking-tight mt-4">
                {language === 'en' ? 'Our Classes & Academic Programs' : 'শ্রেণী ও শিক্ষামূলক বিভাগসমূহ'}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed sm:leading-loose">
              {language === 'en'
                ? 'From Play to Class 12, our teachers guide every student patiently so they can learn concepts with joy and score high marks in board exams.'
                : 'প্লে-গ্রুপ থেকে ১২শ শ্রেণী পর্যন্ত অভিজ্ঞ শিক্ষকগণ শিক্ষার্থীদের আনন্দ ও যত্নসহকারে পাঠদান করেন যেন তারা বোর্ড পরীক্ষায় অনন্য ফলাফল অর্জন করতে পারে।'}
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Column Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
          {ACADEMIC_PROGRAMS.map((program, idx) => (
            <ScrollReveal direction="up" delay={200 + idx * 100} key={program.id}>
              <div
                className="bg-[#faf8ff] rounded-2xl border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 group h-full"
              >
                <div>
                  {/* Badge and Icon */}
                  <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                    {program.badge}
                  </span>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    {getIcon(program.iconName)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0b2545] tracking-tight mb-4">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed sm:leading-loose mb-8 font-normal">
                  {program.description}
                </p>

                {/* Key Features List */}
                <div className="space-y-3.5 mb-8 pt-6 border-t border-slate-200/80">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-[#007A6E] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#007A6E] hover:text-[#008c7d] transition-colors group-hover:translate-x-1 cursor-pointer"
                >
                  <span>{program.linkText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform" />
                </button>

                <button
                  onClick={() => onApplyForClass(program.id === 'primary' ? 'Play & Nursery' : program.id === 'junior' ? 'Class 6' : program.id === 'secondary' ? 'Class 9 (SSC)' : 'Class 11 (HSC College)')}
                  className="text-xs font-semibold text-[#0b2545] hover:bg-slate-200/70 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Apply Now' : 'আবেদন'}
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#0b2545] text-white flex items-center justify-between rounded-t-xl sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10 text-cyan-300">
                  {getIcon(selectedProgram.iconName)}
                </div>
                <div>
                  <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                    {selectedProgram.badge}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {selectedProgram.title} Syllabus &amp; Overview
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Meta details strip */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-cyan-700 shrink-0" />
                  <div>
                    <span className="text-slate-600 block font-medium">Shift &amp; Timings:</span>
                    <strong className="text-slate-800">{selectedProgram.curriculum.shift}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <BookOpen className="w-4 h-4 text-teal-700 shrink-0" />
                  <div>
                    <span className="text-slate-600 block font-medium">Duration:</span>
                    <strong className="text-slate-800">{selectedProgram.curriculum.duration}</strong>
                  </div>
                </div>
              </div>

              {/* Core Subjects */}
              <div>
                <h4 className="font-display font-semibold text-sm text-[#0b2545] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#007A6E]" />
                  <span>Curriculum &amp; Board Subjects</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProgram.curriculum.subjects.map((sub, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-[#faf8ff] border border-slate-200 text-slate-700 font-medium">
                      • {sub}
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Labs */}
              <div>
                <h4 className="font-display font-semibold text-sm text-[#0b2545] mb-2 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-[#007A6E]" />
                  <span>Laboratory Practicals &amp; Experiments</span>
                </h4>
                <div className="space-y-1.5 text-xs">
                  {selectedProgram.curriculum.labPracticals.map((lab, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 bg-emerald-50/60 p-2 rounded border border-emerald-100">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{lab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Co-curricular */}
              <div>
                <h4 className="font-display font-semibold text-sm text-[#0b2545] mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#007A6E]" />
                  <span>Clubs &amp; Olympiad Training</span>
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedProgram.curriculum.coCurricular.map((club, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium border border-slate-200">
                      {club}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-xl flex items-center justify-between">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const targetClass = selectedProgram.id === 'primary' ? 'Play & Nursery' : selectedProgram.id === 'junior' ? 'Class 6' : selectedProgram.id === 'secondary' ? 'Class 9 (SSC)' : 'Class 11 (HSC College)';
                  setSelectedProgram(null);
                  onApplyForClass(targetClass);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#007A6E] hover:bg-[#008c7d] rounded-lg shadow-xs"
              >
                Apply for {selectedProgram.badge}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
