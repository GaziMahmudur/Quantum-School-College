import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Calendar,
  CreditCard,
  FileSpreadsheet,
  Award,
  CheckCircle,
  Download,
  Printer,
  Clock,
  LogOut,
  AlertCircle,
  ShieldCheck,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { DEMO_STUDENT, DEMO_ATTENDANCE, DEMO_FEE_TIMELINE } from '../data/schoolData';
import { Language } from '../types';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<'attendance' | 'grades' | 'fees' | 'idcard'>('attendance');
  const [studentIdInput, setStudentIdInput] = useState('STU-2024-1104');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayFee = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 3000);
  };

  const gradeTable = [
    { code: 'PHY-101', subject: 'Physics 1st Paper', marks: 94, grade: 'A+', gpa: 5.0 },
    { code: 'CHEM-101', subject: 'Chemistry 1st Paper', marks: 91, grade: 'A+', gpa: 5.0 },
    { code: 'MATH-101', subject: 'Higher Mathematics', marks: 98, grade: 'A+', gpa: 5.0 },
    { code: 'BIO-101', subject: 'Biology 1st Paper', marks: 89, grade: 'A', gpa: 4.0 },
    { code: 'ENG-101', subject: 'English 1st & 2nd', marks: 88, grade: 'A', gpa: 4.0 },
    { code: 'ICT-101', subject: 'ICT Digital Systems', marks: 96, grade: 'A+', gpa: 5.0 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0b2545] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00a896] text-white flex items-center justify-center font-bold text-base shadow-xs">
              Q
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white leading-tight">
                Quantum School &amp; College Student ERP Portal
              </h3>
              <p className="text-[11px] text-cyan-300">
                Official Academic Records, Attendance &amp; Fee Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {!isLoggedIn ? (
          /* Login Screen */
          <div className="p-8 max-w-md mx-auto my-auto text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto shadow-xs">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xl text-[#0b2545]">
                Student &amp; Parent Login
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Enter your Quantum Student ID and secure PIN/password to access records.
              </p>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student ID Number
                </label>
                <input
                  type="text"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074]"
                  placeholder="e.g. STU-2024-1104"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password / PIN
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#134074]"
                />
              </div>

              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full py-2.5 px-4 bg-[#00a896] hover:bg-[#008c7d] text-white font-semibold text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Sign In to Portal
              </button>

              <button
                onClick={() => {
                  setStudentIdInput('STU-2024-1104');
                  setIsLoggedIn(true);
                }}
                className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-[#0b2545] font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                Quick Demo: Login as Sameeha Zarrin (HSC Science)
              </button>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Student Profile Ribbon */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={DEMO_STUDENT.avatarUrl}
                  alt={DEMO_STUDENT.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow-xs shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#0b2545]">
                      {DEMO_STUDENT.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {DEMO_STUDENT.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    <strong>ID:</strong> {DEMO_STUDENT.id} • <strong>Roll:</strong> {DEMO_STUDENT.roll} • {DEMO_STUDENT.grade}
                  </div>
                  <div className="text-xs text-[#00a896] font-medium">
                    {DEMO_STUDENT.section}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white px-3.5 py-2 rounded-lg border border-slate-200 text-right shadow-2xs">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Cumulative GPA
                  </div>
                  <div className="font-display font-extrabold text-lg text-emerald-700 leading-tight">
                    {DEMO_STUDENT.gpa.toFixed(2)} / 5.00
                  </div>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveTab('attendance')}
                className={`py-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'attendance'
                    ? 'border-[#00a896] text-[#00a896]'
                    : 'border-transparent text-slate-600 hover:text-[#0b2545]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Attendance Log (96.4%)</span>
              </button>

              <button
                onClick={() => setActiveTab('grades')}
                className={`py-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'grades'
                    ? 'border-[#00a896] text-[#00a896]'
                    : 'border-transparent text-slate-600 hover:text-[#0b2545]'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Term Exam Marksheet</span>
              </button>

              <button
                onClick={() => setActiveTab('fees')}
                className={`py-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'fees'
                    ? 'border-[#00a896] text-[#00a896]'
                    : 'border-transparent text-slate-600 hover:text-[#0b2545]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Tuition &amp; Fee Status</span>
              </button>

              <button
                onClick={() => setActiveTab('idcard')}
                className={`py-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'idcard'
                    ? 'border-[#00a896] text-[#00a896]'
                    : 'border-transparent text-slate-600 hover:text-[#0b2545]'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Digital ID Card</span>
              </button>
            </div>

            {/* Tab 1: Attendance Log */}
            {activeTab === 'attendance' && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase">Present Days</span>
                    <div className="font-display font-extrabold text-2xl text-emerald-700 mt-0.5">82 Days</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-bold text-amber-800 uppercase">Late Arrivals</span>
                    <div className="font-display font-extrabold text-2xl text-amber-700 mt-0.5">2 Days</div>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-bold text-rose-800 uppercase">Absent Days</span>
                    <div className="font-display font-extrabold text-2xl text-rose-700 mt-0.5">1 Day</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-bold text-blue-800 uppercase">Attendance %</span>
                    <div className="font-display font-extrabold text-2xl text-blue-700 mt-0.5">96.4%</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-display font-bold text-sm text-[#0b2545] mb-3">
                    Recent RFID Biometric Gate Logs
                  </h5>
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">Day</th>
                          <th className="p-3">Gate In Status</th>
                          <th className="p-3">Period 1</th>
                          <th className="p-3">Period 2</th>
                          <th className="p-3">Period 3</th>
                          <th className="p-3">Period 4</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {DEMO_ATTENDANCE.map((rec, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70">
                            <td className="p-3 font-semibold text-slate-800">{rec.date}</td>
                            <td className="p-3 text-slate-500">{rec.day}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full font-semibold uppercase text-[10px] ${
                                  rec.status === 'present'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : rec.status === 'late'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {rec.status}
                              </span>
                            </td>
                            <td className="p-3 text-emerald-700">✓ Present</td>
                            <td className="p-3 text-emerald-700">✓ Present</td>
                            <td className="p-3 text-emerald-700">✓ Present</td>
                            <td className="p-3 text-emerald-700">✓ Present</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Exam Marksheet */}
            {activeTab === 'grades' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#faf8ff] p-4 rounded-xl border border-slate-200">
                  <div>
                    <h5 className="font-display font-bold text-sm text-[#0b2545]">
                      HSC Term 2 Terminal Examination 2025
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Class 11 Science • Result Published on Oct 20, 2025
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 shadow-2xs hover:bg-slate-50"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download Marksheet (PDF)</span>
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                      <tr>
                        <th className="p-3">Course Code</th>
                        <th className="p-3">Subject Name</th>
                        <th className="p-3 text-center">Marks (100)</th>
                        <th className="p-3 text-center">Letter Grade</th>
                        <th className="p-3 text-center">Grade Point</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {gradeTable.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="p-3 font-mono text-slate-500">{sub.code}</td>
                          <td className="p-3 font-semibold text-slate-800">{sub.subject}</td>
                          <td className="p-3 text-center font-bold text-slate-800">{sub.marks}</td>
                          <td className="p-3 text-center font-bold text-emerald-700">{sub.grade}</td>
                          <td className="p-3 text-center font-mono font-semibold text-slate-700">{sub.gpa.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                      <tr>
                        <td colSpan={2} className="p-3 text-[#0b2545]">Final Term Result: GPA-5.00 (Outstanding)</td>
                        <td className="p-3 text-center text-[#0b2545]">Total: 556</td>
                        <td className="p-3 text-center text-emerald-700">A+</td>
                        <td className="p-3 text-center text-emerald-700">5.00</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Fees & Invoicing */}
            {activeTab === 'fees' && (
              <div className="p-6 space-y-6">
                {paymentSuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Payment processed successfully! Payment receipt has been sent to parent email.</span>
                  </div>
                )}

                <div className="space-y-4">
                  <h5 className="font-display font-bold text-sm text-[#0b2545]">
                    Fee Timeline &amp; Payment Status
                  </h5>

                  <div className="space-y-3">
                    {DEMO_FEE_TIMELINE.map((fee) => (
                      <div
                        key={fee.id}
                        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          fee.status === 'paid'
                            ? 'bg-slate-50 border-slate-200'
                            : fee.status === 'current'
                            ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-400/20'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-sm text-[#0b2545]">
                              {fee.title}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                fee.status === 'paid'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : fee.status === 'current'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {fee.status}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {fee.dueDate} • Invoice: {fee.invoiceNo}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block font-medium">Amount</span>
                            <span className="font-display font-extrabold text-base text-[#0b2545]">
                              ৳ {fee.amount.toLocaleString()}
                            </span>
                          </div>

                          {fee.status === 'paid' ? (
                            <button
                              onClick={() => window.print()}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                            >
                              Receipt (PDF)
                            </button>
                          ) : fee.status === 'current' ? (
                            <button
                              onClick={handlePayFee}
                              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#00a896] hover:bg-[#008c7d] shadow-xs cursor-pointer"
                            >
                              Pay Now (bKash/Card)
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Scheduled</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Digital ID Card */}
            {activeTab === 'idcard' && (
              <div className="p-6 flex flex-col items-center justify-center space-y-6">
                <div className="w-full max-w-sm bg-gradient-to-br from-[#0b2545] to-[#134074] text-white rounded-2xl p-6 shadow-xl border border-white/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"></div>

                  {/* ID Header */}
                  <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
                    <div>
                      <div className="font-display font-extrabold text-sm tracking-wide text-white">
                        QUANTUM SCHOOL &amp; COLLEGE
                      </div>
                      <div className="text-[10px] font-semibold text-cyan-300 uppercase">
                        Sector 4, Uttara, Dhaka • EIIN 138492
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded bg-[#00a896] text-white flex items-center justify-center font-bold text-xs">
                      QSC
                    </div>
                  </div>

                  {/* ID Details */}
                  <div className="flex items-center gap-4">
                    <img
                      src={DEMO_STUDENT.avatarUrl}
                      alt={DEMO_STUDENT.name}
                      className="w-20 h-24 rounded-lg object-cover border-2 border-white/40 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 text-xs">
                      <div className="font-display font-bold text-base text-white">
                        {DEMO_STUDENT.name}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-300 font-semibold">ID:</span> {DEMO_STUDENT.id}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-300 font-semibold">Roll:</span> {DEMO_STUDENT.roll}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-300 font-semibold">Class:</span> 11 (Science)
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-300 font-semibold">Valid Till:</span> Dec 2026
                      </div>
                    </div>
                  </div>

                  {/* Barcode strip */}
                  <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
                    <div className="font-mono tracking-widest text-xs">||| |||| | ||||| || |||</div>
                    <span className="text-[10px] text-cyan-300 font-bold">STUDENT PASS</span>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#134074] shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-cyan-300" />
                  <span>Print Official Plastic ID Card</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
