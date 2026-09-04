import React, { useState } from 'react';
import { Quote, Users, ShieldCheck, X, Award, GraduationCap } from 'lucide-react';
import { PRINCIPAL_INFO, FACULTY_MEMBERS } from '../data/schoolData';
import { Language } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface PrincipalMessageProps {
  language: Language;
}

export const PrincipalMessage: React.FC<PrincipalMessageProps> = ({ language }) => {
  const [facultyModalOpen, setFacultyModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-36 bg-[#faf8ff] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-16 relative overflow-hidden">
          {/* Subtle background decorative badge */}
          <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
            <Quote className="w-80 h-80 text-[#0b2545]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Principal Photo & Identity */}
            <ScrollReveal direction="left" delay={100} className="lg:col-span-4 text-center">
              <div className="inline-block relative">
                <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border-4 border-white mx-auto relative bg-slate-100">
                  <img
                    src={PRINCIPAL_INFO.photo}
                    alt={PRINCIPAL_INFO.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Institutional verification chip */}
                <div className="mt-5 space-y-1.5">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0b2545] tracking-tight">
                    {PRINCIPAL_INFO.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#007A6E] tracking-wide">
                    {PRINCIPAL_INFO.title}
                  </div>
                  <div className="text-xs text-slate-700 font-normal">
                    {PRINCIPAL_INFO.credentials}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Message Content */}
            <ScrollReveal direction="right" delay={200} className="lg:col-span-8 space-y-6">
              {/* Header with Quote Icon */}
              <div className="flex items-center gap-2 text-[#007A6E]">
                <Quote className="w-5 h-5 fill-[#007A6E]/20" />
                <span className="text-xs font-bold tracking-wider uppercase text-[#007A6E]">
                  {language === 'en' ? "Principal's Welcome Note" : 'অধ্যক্ষের শুভেচ্ছা বাণী'}
                </span>
              </div>

              {/* Quote Headline */}
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0b2545] tracking-tight leading-snug">
                {language === 'en' ? PRINCIPAL_INFO.quoteHeadline : '“আমরা প্রতিটি শিক্ষার্থীর সুপ্ত সম্ভাবনা ও আনন্দের সাথে শেখার পথ উন্মোচন করি।”'}
              </h2>

              {/* Body Text */}
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed sm:leading-loose space-y-4 font-normal">
                {language === 'en' ? (
                  <>
                    <p>
                      Dear students and respected parents, welcome to Quantum School &amp; College. We believe that every child is naturally curious, creative, and capable of greatness. School should never be about stressful memorization—it should be an exciting journey where you make friends, ask questions, build projects in science labs, and learn how to be kind and honest.
                    </p>
                    <p>
                      Our campus in Uttara, Dhaka is built with bright classrooms, green playgrounds, and loving teachers who treat every student with respect. Whether you dream of becoming a scientist, doctor, software engineer, or entrepreneur, we are here to cheer you on every single step of the way!
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      প্রিয় শিক্ষার্থী ও সম্মানিত অভিভাবকবৃন্দ, কোয়ান্টাম স্কুল অ্যান্ড কলেজে আপনাদের সাদর আমন্ত্রণ। আমরা বিশ্বাস করি প্রতিটি শিশুই অপার সম্ভাবনাময় ও অনুসন্ধিৎসু। শিক্ষা কেবল মুখস্থ বিদ্যার বোঝা নয়—এটি বন্ধুদের সাথে আনন্দ ভাগাভাগি, প্রশ্ন করা, বিজ্ঞানের গবেষণাগারে কাজ শেখা এবং সৎ ও মানবিক মানুষ হওয়ার এক রোমাঞ্চকর যাত্রা।
                    </p>
                    <p>
                      উত্তরা সেক্টর ৪-এর সবুজ ও শান্ত পরিবেশে আমাদের রয়েছে সুপ্রশস্ত ক্লাসরুম, আধুনিক ল্যাবরেটরি ও স্নেহশীল শিক্ষকমণ্ডলী। আপনার সন্তানের স্বপ্নপূরণে আমরা নিবেদিতপ্রাণ।
                    </p>
                  </>
                )}
              </div>

              {/* Bottom Buttons & Trust Stamp */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  id="faculty"
                  onClick={() => setFacultyModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#0b2545] hover:bg-[#134074] shadow-sm transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-cyan-300" />
                  <span>{language === 'en' ? 'Meet Our Teachers' : 'শিক্ষকমণ্ডলীর সাথে পরিচিত হোন'}</span>
                </button>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#007A6E]" />
                  <span>{PRINCIPAL_INFO.trustReg}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Teachers / Faculty Modal */}
      {facultyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#0b2545] text-white flex items-center justify-between rounded-t-xl sticky top-0 z-10">
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  Meet Our Dedicated Faculty &amp; Academic Leaders
                </h3>
                <p className="text-xs text-slate-300">
                  Over 145+ caring, experienced subject teachers and board examiners.
                </p>
              </div>
              <button
                onClick={() => {
                  setFacultyModalOpen(false);
                  setSelectedTeacher(null);
                }}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {selectedTeacher ? (
                <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <button 
                    onClick={() => setSelectedTeacher(null)}
                    className="mb-6 text-sm font-semibold text-[#007A6E] hover:text-[#008c7d] flex items-center gap-1 cursor-pointer"
                  >
                    &larr; Back to Directory
                  </button>
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8 items-center sm:items-start text-center sm:text-left w-full">
                    <img
                      src={selectedTeacher.photo}
                      alt={selectedTeacher.name}
                      className="w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover shadow-md border-4 border-slate-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1 w-full">
                      <h3 className="font-display font-extrabold text-2xl text-[#0b2545] break-words">
                        {selectedTeacher.name}
                      </h3>
                      <div className="text-sm font-bold text-[#007A6E] mt-1 uppercase tracking-wide break-words">
                        {selectedTeacher.role}
                      </div>
                      <div className="mt-4 flex flex-col gap-2.5 text-sm text-slate-600">
                        <div className="flex items-start sm:items-center gap-2 justify-center sm:justify-start text-left">
                          <GraduationCap className="w-4 h-4 text-slate-600 shrink-0 mt-0.5 sm:mt-0" />
                          <span className="break-words">{selectedTeacher.degrees}</span>
                        </div>
                        <div className="flex items-start sm:items-center gap-2 justify-center sm:justify-start text-left">
                          <Award className="w-4 h-4 text-slate-600 shrink-0 mt-0.5 sm:mt-0" />
                          <span className="break-words">{selectedTeacher.years}</span>
                        </div>
                      </div>
                      <div className="mt-5 text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {selectedTeacher.bio}
                      </div>
                      <div className="mt-6">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                          Subjects Taught
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          {selectedTeacher.subjects?.map((sub: string, idx: number) => (
                            <span key={idx} className="px-3 py-1.5 bg-blue-50 text-[#134074] rounded-lg text-xs font-semibold border border-blue-100/50">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FACULTY_MEMBERS.map((faculty, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedTeacher(faculty)}
                      className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col min-[450px]:flex-row items-center min-[450px]:items-center gap-3 sm:gap-4 cursor-pointer group text-center min-[450px]:text-left"
                    >
                      <img
                        src={faculty.photo}
                        alt={faculty.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 shrink w-full">
                        <h4 className="font-display font-bold text-sm text-[#0b2545] group-hover:text-[#007A6E] transition-colors truncate whitespace-normal min-[450px]:whitespace-nowrap break-words">
                          {faculty.name}
                        </h4>
                        <div className="text-xs font-medium text-[#007A6E] mt-0.5 min-[450px]:truncate">
                          {faculty.role}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1 line-clamp-2 min-[450px]:line-clamp-1 border-t border-slate-100 pt-1">
                          {faculty.degrees}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  setFacultyModalOpen(false);
                  setSelectedTeacher(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0b2545] rounded-md hover:bg-[#134074]"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
