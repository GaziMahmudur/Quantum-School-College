import React from 'react';
import { X, Download, Printer, FileText, CheckCircle2, Calendar, Clock, MapPin } from 'lucide-react';
import { CircularNotice, Language } from '../types';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'routine' | 'prospectus' | 'admit_slip' | 'notice';
  noticeData?: CircularNotice | null;
  language: Language;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  documentType,
  noticeData,
  language,
}) => {
  if (!isOpen) return null;

  const routineItems = [
    { date: 'Nov 18, 2025', day: 'Tuesday', time: '10:00 AM – 01:00 PM', code: '174', subject: 'Physics 1st Paper', room: 'Auditorium Hall A' },
    { date: 'Nov 20, 2025', day: 'Thursday', time: '10:00 AM – 01:00 PM', code: '176', subject: 'Chemistry 1st Paper', room: 'Auditorium Hall A' },
    { date: 'Nov 23, 2025', day: 'Sunday', time: '10:00 AM – 01:00 PM', code: '265', subject: 'Higher Mathematics 1st Paper', room: 'Building 2, Level 3' },
    { date: 'Nov 25, 2025', day: 'Tuesday', time: '10:00 AM – 01:00 PM', code: '178', subject: 'Biology 1st Paper', room: 'Building 2, Level 3' },
    { date: 'Nov 27, 2025', day: 'Thursday', time: '10:00 AM – 01:00 PM', code: '107', subject: 'English 1st Paper', room: 'Main Wing Rooms 201-205' },
    { date: 'Nov 30, 2025', day: 'Sunday', time: '10:00 AM – 01:00 PM', code: '275', subject: 'Information & Communication Tech (ICT)', room: 'Computer Lab 1 & 2' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0b2545] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-cyan-300" />
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              {documentType === 'routine' && 'Official Board Model Test Examination Routine 2025'}
              {documentType === 'prospectus' && 'Quantum School & College Academic Prospectus 2025–26'}
              {documentType === 'admit_slip' && 'Official Online Admission Application Slip'}
              {documentType === 'notice' && (noticeData ? noticeData.title : 'Official Circular Notice')}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Document Paper View */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-100/70">
          <div className="bg-white p-6 sm:p-10 rounded-xl shadow-xs border border-slate-200 text-slate-800 space-y-6">
            {/* Institution Letterhead */}
            <div className="text-center border-b-2 border-slate-800 pb-5">
              <div className="text-[10px] font-bold tracking-widest text-[#00a896] uppercase">
                Government Approved • BISE Dhaka Board Reg: 138492
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0b2545] mt-1">
                QUANTUM SCHOOL &amp; COLLEGE
              </h2>
              <p className="text-xs text-slate-600">
                Plot 18, Road 7, Sector 4, Uttara, Dhaka-1230 • Phone: +880 2-8951010 • info@quantumschool.edu.bd
              </p>
            </div>

            {/* Document Specific Content */}
            {documentType === 'routine' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-500">Program:</span> <strong>Class 11 &amp; 12 HSC Model Test</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Session:</span> <strong>2025–2026</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Controller of Exams:</span> <strong>Dr. T. Rahman</strong>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#0b2545] text-white font-semibold">
                      <tr>
                        <th className="p-2.5">Date &amp; Day</th>
                        <th className="p-2.5">Code</th>
                        <th className="p-2.5">Subject</th>
                        <th className="p-2.5">Time</th>
                        <th className="p-2.5">Hall / Room</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {routineItems.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="p-2.5 font-semibold text-slate-800">{item.date} <span className="text-slate-500 font-normal">({item.day})</span></td>
                          <td className="p-2.5 font-mono text-slate-600">{item.code}</td>
                          <td className="p-2.5 font-medium text-[#0b2545]">{item.subject}</td>
                          <td className="p-2.5 text-slate-700">{item.time}</td>
                          <td className="p-2.5 text-slate-600">{item.room}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-[11px] text-slate-600 bg-amber-50 p-3 rounded border border-amber-200 space-y-1">
                  <strong>Examination Instructions:</strong>
                  <p>1. Examinees must enter exam hall 20 minutes prior to scheduled bell.</p>
                  <p>2. Electronic watches, cellphones and programmable calculators are strictly prohibited.</p>
                  <p>3. Original Admit Card &amp; Student ID Card must be placed on desk during all sessions.</p>
                </div>
              </div>
            )}

            {documentType === 'prospectus' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <h4 className="font-display font-bold text-base text-[#0b2545]">
                  Comprehensive Prospectus &amp; Academic Charter 2025–26
                </h4>
                <p>
                  Quantum School &amp; College provides high-standard education integrating the National Curriculum with modern STEM robotics, English fluency, and human character building.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-[#0b2545] block mb-1">Co-Curricular Clubs:</strong>
                    Robotics Society, Math Olympiad Forum, Debate Association, Scouts, Cricket Academy, Chess Club.
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-[#0b2545] block mb-1">Scholarships &amp; Waivers:</strong>
                    Merit scholarship for GPA-5 achievers, siblings 25% waiver, freedom fighter ward exemption.
                  </div>
                </div>
              </div>
            )}

            {documentType === 'admit_slip' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500">Tracking Code:</span> <strong className="text-base text-emerald-800 block font-mono">QSC-2025-84920</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500">Status:</span> <strong className="text-emerald-700 block">PROVISIONALLY REGISTERED</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block">Student:</span>
                    <strong>Zubair Al Mahfuz</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block">Class &amp; Stream:</span>
                    <strong>Class 11 (Science - English Version)</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block">Admission Assessment:</span>
                    <strong>Nov 22, 2025 at 09:30 AM</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block">Exam Room:</span>
                    <strong>Room 304 (Academic Building)</strong>
                  </div>
                </div>
              </div>
            )}

            {documentType === 'notice' && noticeData && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase ${noticeData.badgeColor}`}>
                    {noticeData.badge}
                  </span>
                  <span className="text-xs text-slate-500">Date of Release: {noticeData.date} {noticeData.month}, 2025</span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#0b2545]">
                  {noticeData.title}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {noticeData.description}
                </p>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                  This notification is authorized by the Academic Council of Quantum School &amp; College for immediate execution. Students, parents, and administrative staff are kindly requested to take note.
                </div>
              </div>
            )}

            {/* Signature stamp */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>
                <div className="font-bold text-[#0b2545]">Quantum Academic Council</div>
                <div className="text-[11px]">Uttara, Dhaka • Bangladesh</div>
              </div>
              <div className="text-right">
                <div className="font-serif italic text-base text-[#0b2545]">Dr. T. Rahman</div>
                <div className="text-[11px] font-medium text-slate-600">Principal &amp; Head of Institution</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Close Document
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print</span>
            </button>

            <button
              onClick={() => {
                alert('Document download initiated. PDF file generated.');
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-[#00a896] hover:bg-[#008c7d] shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
