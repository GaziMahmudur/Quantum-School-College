import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileCheck,
  Download,
  Printer,
  Sparkles,
  School,
  User,
  Phone,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdmissionFormData, Language } from '../types';

interface AdmissionWizardProps {
  language: Language;
  preSelectedClass?: string;
  onOpenDocumentModal: (docType: string) => void;
}

export const AdmissionWizard: React.FC<AdmissionWizardProps> = ({
  language,
  preSelectedClass,
  onOpenDocumentModal,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AdmissionFormData>({
    selectedClass: preSelectedClass || 'Class 11 (HSC College)',
    selectedGroup: 'Science',
    medium: 'English',
    studentName: 'Zubair Al Mahfuz',
    gender: 'Male',
    dob: '2008-04-12',
    guardianName: 'Engr. Mahfuzur Rahman',
    guardianPhone: '+880 1712-345678',
    guardianEmail: 'mahfuz.engr@gmail.com',
    address: 'House 24, Road 7, Sector 4, Uttara, Dhaka-1230',
    prevSchool: 'Uttara High School & College',
    prevGpa: '5.00',
    birthCertUploaded: true,
    photoUploaded: true,
  });

  const [generatedAppId, setGeneratedAppId] = useState<string>('QSC-2025-84920');

  const classesList = [
    'Play & Nursery',
    'Kindergarten (KG)',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9 (SSC)',
    'Class 10 (Transfer)',
    'Class 11 (HSC College)',
    'Class 12 (HSC College)',
  ];

  const stepsHeader = [
    { num: '01', title: 'Choose Class', desc: 'Pick from Play, Nursery, up to Class 12.' },
    { num: '02', title: 'Choose Group', desc: 'Science, Business, or Humanities (Class 9-12).' },
    { num: '03', title: 'Fill Details', desc: 'Student name, birth date, and guardian phone.' },
    { num: '04', title: 'Upload Files', desc: 'Student photo and birth certificate copy.' },
    { num: '05', title: 'Review Form', desc: 'Check summary card before final send.' },
    { num: '06', title: 'Get App ID', desc: 'Instant confirmation SMS & PDF download.' },
  ];

  const handleNextStep = () => {
    if (currentStep === 5) {
      // Generate ID and fire confetti
      const randomId = `QSC-2025-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedAppId(randomId);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const progressPercentage = Math.round((currentStep / 6) * 100);

  return (
    <section id="admissions" className="py-24 sm:py-32 lg:py-36 bg-[#faf8ff] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-xs font-bold tracking-wider text-[#00a896] uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/60">
            {language === 'en' ? 'Admissions Open (2025–26)' : 'ভর্তি চলছে (২০২৫-২৬)'}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0b2545] tracking-tight mt-4">
            {language === 'en'
              ? 'How to Apply for Admission (Step–by–Step)'
              : 'ভর্তির জন্য অনলাইনে আবেদন করার সহজ ধাপসমূহ'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed sm:leading-loose">
            {language === 'en'
              ? 'Applying to Quantum School & College is quick and effortless. Parents and students can complete this 6-step online form in less than 5 minutes!'
              : 'কোয়ান্টাম স্কুল অ্যান্ড কলেজে আবেদন প্রক্রিয়া অত্যন্ত সহজ। ঘরে বসেই ৫ মিনিটে সম্পন্ন করুন এই ৬-ধাপের আবেদন ফরম!'}
          </p>
        </div>

        {/* 6-Step Roadmap Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mb-14">
          {stepsHeader.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;

            return (
              <div
                key={step.num}
                onClick={() => {
                  if (stepNum <= currentStep || currentStep === 6) {
                    setCurrentStep(stepNum);
                  }
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-white border-[#00a896] shadow-sm ring-2 ring-[#00a896]/20'
                    : isCompleted
                    ? 'bg-white/80 border-slate-300 text-slate-700'
                    : 'bg-white/50 border-slate-200/70 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-display font-extrabold text-lg sm:text-xl ${
                      isCurrent
                        ? 'text-[#00a896]'
                        : isCompleted
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.num}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#0b2545] leading-snug">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal mt-1.5 line-clamp-2">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Application Card Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
          {/* Top Wizard Status Bar */}
          <div className="px-8 py-5 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0b2545] uppercase tracking-wider">
                Step {currentStep} of 6:
              </span>
              <span className="text-xs font-semibold text-slate-700">
                {stepsHeader[currentStep - 1].title}
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3 w-full sm:w-56">
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#00a896] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-semibold text-slate-600 shrink-0">
                {progressPercentage}%
              </span>
            </div>
          </div>

          {/* Form Content Body */}
          <div className="p-8 sm:p-12 lg:p-14">
            {/* STEP 1: Choose Class */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#0b2545]">
                    Which class are you applying for?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Select the student's entry level for Academic Session 2025–26:
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                  {classesList.map((cls) => {
                    const isSelected = formData.selectedClass === cls;
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, selectedClass: cls })
                        }
                        className={`py-3.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50/50 border-[#00a896] text-[#006359] ring-2 ring-[#00a896]/30 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {cls}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#00a896] hover:bg-[#008c7d] shadow-sm transition-all cursor-pointer"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Choose Group & Medium */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#0b2545]">
                    Select Study Stream &amp; Language Medium
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    For {formData.selectedClass}, please specify your academic division:
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Academic Stream / Group
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Science', 'Business Studies', 'Humanities'].map(
                        (group) => (
                          <div
                            key={group}
                            onClick={() =>
                              setFormData({ ...formData, selectedGroup: group })
                            }
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              formData.selectedGroup === group
                                ? 'border-[#00a896] bg-teal-50/50 ring-2 ring-[#00a896]/20'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="font-bold text-sm text-[#0b2545]">
                              {group}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {group === 'Science'
                                ? 'Physics, Chemistry, Higher Math, Biology'
                                : group === 'Business Studies'
                                ? 'Accounting, Finance, Management'
                                : 'Economics, Civics, Sociology'}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Instruction Medium
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['English', 'Bangla'] as const).map((med) => (
                        <div
                          key={med}
                          onClick={() => setFormData({ ...formData, medium: med })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            formData.medium === med
                              ? 'border-[#00a896] bg-teal-50/50 ring-2 ring-[#00a896]/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-bold text-sm text-[#0b2545]">
                            {med} {med === 'English' ? 'Version' : 'Medium'}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {med === 'English'
                              ? 'NCTB Curriculum translated into English'
                              : 'Standard NCTB National Curriculum'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#00a896] hover:bg-[#008c7d]"
                  >
                    <span>Continue to Step 3</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Fill Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#0b2545]">
                    Student &amp; Guardian Information
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Accurate contact details ensure prompt SMS notification and test admit cards:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({ ...formData, studentName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074] focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter full name"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074] focus:ring-2 focus:ring-blue-100"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Guardian / Father's Name *
                    </label>
                    <input
                      type="text"
                      value={formData.guardianName}
                      onChange={(e) =>
                        setFormData({ ...formData, guardianName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Guardian Mobile Number (SMS Alerts) *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.guardianPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guardianPhone: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074]"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Previous School / College Attended
                    </label>
                    <input
                      type="text"
                      value={formData.prevSchool}
                      onChange={(e) =>
                        setFormData({ ...formData, prevSchool: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Previous Exam GPA (JSC / SSC)
                    </label>
                    <input
                      type="text"
                      value={formData.prevGpa}
                      onChange={(e) =>
                        setFormData({ ...formData, prevGpa: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Residential Present Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#00a896] hover:bg-[#008c7d]"
                  >
                    <span>Continue to Step 4</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Upload Files */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#0b2545]">
                    Upload Necessary Documents
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Attach clear scanned copies or photos (JPG, PNG, PDF up to 5MB):
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Document 1: Student Photo */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-[#00a896] transition-colors bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-teal-50 text-[#00a896] flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-sm text-[#0b2545]">
                      Passport Size Photo *
                    </div>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      Formal student portrait with light background.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, photoUploaded: true })
                      }
                      className="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-white border border-slate-200 text-[#00a896] shadow-2xs hover:bg-teal-50"
                    >
                      {formData.photoUploaded ? '✓ photo_zubair.jpg (Uploaded)' : 'Select Photo'}
                    </button>
                  </div>

                  {/* Document 2: Birth Certificate / SSC Transcript */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-[#00a896] transition-colors bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-sm text-[#0b2545]">
                      Birth Certificate / Transcript *
                    </div>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      Official government birth certificate or board marksheet.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, birthCertUploaded: true })
                      }
                      className="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-white border border-slate-200 text-blue-700 shadow-2xs hover:bg-blue-50"
                    >
                      {formData.birthCertUploaded ? '✓ birth_certificate.pdf (Uploaded)' : 'Select Document'}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#00a896] hover:bg-[#008c7d]"
                  >
                    <span>Continue to Step 5 (Review)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Review Form */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#0b2545]">
                    Review Your Application Summary
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Please verify all information before final submission:
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-200">
                    <div>
                      <span className="text-slate-400 block">Class Applied:</span>
                      <strong className="text-sm text-[#0b2545]">
                        {formData.selectedClass}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Stream &amp; Medium:</span>
                      <strong className="text-sm text-[#0b2545]">
                        {formData.selectedGroup} ({formData.medium})
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Previous School:</span>
                      <strong className="text-sm text-[#0b2545]">
                        {formData.prevSchool}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Previous GPA:</span>
                      <strong className="text-sm text-emerald-700">
                        {formData.prevGpa} (GPA-5.00)
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-slate-400 block">Student Name:</span>
                      <span className="font-semibold text-slate-800">
                        {formData.studentName}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Guardian Contact:</span>
                      <span className="font-semibold text-slate-800">
                        {formData.guardianPhone}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Birth Date:</span>
                      <span className="font-semibold text-slate-800">
                        {formData.dob}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 block">Present Address:</span>
                    <span className="font-medium text-slate-700">
                      {formData.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    By submitting, you certify that the provided information is true. No application fee is charged at this step.
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer"
                  >
                    <span>Submit Final Application</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Confirmation & Get App ID */}
            {currentStep === 6 && (
              <div className="text-center space-y-6 py-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    Application Submitted Successfully!
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-[#0b2545] mt-2">
                    Welcome to Quantum School &amp; College
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
                    An SMS confirmation has been dispatched to {formData.guardianPhone}. Please preserve your official Application ID:
                  </p>
                </div>

                {/* Big ID Badge Box */}
                <div className="max-w-md mx-auto bg-[#faf8ff] p-5 rounded-xl border-2 border-dashed border-[#00a896] text-center">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#00a896]">
                    Official Application Tracking ID
                  </div>
                  <div className="font-mono font-extrabold text-3xl text-[#0b2545] tracking-wider my-1">
                    {generatedAppId}
                  </div>
                  <div className="text-xs text-slate-500">
                    Session 2025–26 • {formData.selectedClass} ({formData.selectedGroup})
                  </div>
                </div>

                {/* Download & Print Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenDocumentModal('admit_slip')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#0b2545] hover:bg-[#134074] shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-cyan-300" />
                    <span>Download Application Slip (PDF)</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    <span>Print Slip</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
