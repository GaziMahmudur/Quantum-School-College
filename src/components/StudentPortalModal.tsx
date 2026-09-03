import React, { useState } from "react";
import {
  X,
  UserCheck,
  Calendar,
  CreditCard,
  Award,
  CheckCircle,
  Download,
  Printer,
  LogOut,
  QrCode,
  Eye,
  EyeOff,
  AlertCircle,
  User,
  Phone,
  MapPin,
  BookOpen,
  TrendingUp,
  Star,
  ShieldCheck,
  Clock,
  Bell,
} from "lucide-react";
import {
  DEMO_STUDENT,
  DEMO_ATTENDANCE,
  DEMO_FEE_TIMELINE,
} from "../data/schoolData";
import { Language } from "../types";

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type TabType = "profile" | "attendance" | "grades" | "fees" | "idcard";

// Validation rules
const STUDENT_ID_REGEX = /^STU-\d{4}-\d{3,6}$/i;
const MIN_PASSWORD_LENGTH = 6;

function validateLogin(id: string, password: string): string | null {
  if (!id.trim()) return "Please enter your Student ID.";
  if (!STUDENT_ID_REGEX.test(id.trim()))
    return "Student ID must be in format STU-YYYY-XXXX (e.g. STU-2024-1104).";
  if (password.length < MIN_PASSWORD_LENGTH)
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  return null;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [studentIdInput, setStudentIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = () => {
    const error = validateLogin(studentIdInput, passwordInput);
    if (error) {
      setLoginError(error);
      return;
    }
    setLoginError(null);
    setIsLoggingIn(true);
    // Simulate a brief async login
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
      setActiveTab("profile");
    }, 900);
  };

  const handleDemoLogin = () => {
    setStudentIdInput("STU-2024-1104");
    setPasswordInput("demo1234");
    setLoginError(null);
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
      setActiveTab("profile");
    }, 700);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentIdInput("");
    setPasswordInput("");
    setLoginError(null);
    setActiveTab("profile");
    setPaymentSuccess(false);
  };

  const handlePayFee = () => {
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 4000);
  };

  const gradeTable = [
    {
      code: "PHY-101",
      subject: "Physics 1st Paper",
      marks: 94,
      grade: "A+",
      gpa: 5.0,
    },
    {
      code: "CHEM-101",
      subject: "Chemistry 1st Paper",
      marks: 91,
      grade: "A+",
      gpa: 5.0,
    },
    {
      code: "MATH-101",
      subject: "Higher Mathematics",
      marks: 98,
      grade: "A+",
      gpa: 5.0,
    },
    {
      code: "BIO-101",
      subject: "Biology 1st Paper",
      marks: 89,
      grade: "A",
      gpa: 4.0,
    },
    {
      code: "ENG-101",
      subject: "English 1st & 2nd",
      marks: 88,
      grade: "A",
      gpa: 4.0,
    },
    {
      code: "ICT-101",
      subject: "ICT Digital Systems",
      marks: 96,
      grade: "A+",
      gpa: 5.0,
    },
  ];

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "My Profile", icon: <User className="w-4 h-4" /> },
    {
      id: "attendance",
      label: "Attendance (96.4%)",
      icon: <Calendar className="w-4 h-4" />,
    },
    { id: "grades", label: "Marksheet", icon: <Award className="w-4 h-4" /> },
    {
      id: "fees",
      label: "Fee Status",
      icon: <CreditCard className="w-4 h-4" />,
    },
    { id: "idcard", label: "Digital ID", icon: <QrCode className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden"
        style={{ animation: "modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* ── Header ── */}
        <div className="px-6 py-4 bg-[#0b2545] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00a896] text-white flex items-center justify-center font-bold text-base shadow">
              Q
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                Quantum School &amp; College — Student ERP Portal
              </h3>
              <p className="text-[11px] text-cyan-300">
                Secure Academic Records, Attendance &amp; Fee Management
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

        {/* ── LOGIN SCREEN ── */}
        {!isLoggedIn ? (
          <div className="flex-1 overflow-y-auto flex items-center justify-center p-6">
            <div className="w-full max-w-md space-y-6">
              {/* Icon + title */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0b2545] to-[#134074] text-white flex items-center justify-center mx-auto shadow-lg">
                  <ShieldCheck className="w-8 h-8 text-cyan-300" />
                </div>
                <h4 className="font-bold text-xl text-[#0b2545]">
                  Student &amp; Parent Login
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your <strong>Student ID</strong> (format:{" "}
                  <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">
                    STU-YYYY-XXXX
                  </code>
                  ) and a password of <strong>at least 6 characters</strong> to
                  access your portal.
                </p>
              </div>

              {/* Credentials info box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-1.5 text-xs text-blue-800">
                <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                  <Bell className="w-3.5 h-3.5" /> Demo Credentials (any
                  student)
                </div>
                <div>
                  <span className="font-semibold">Student ID:</span>{" "}
                  STU-YYYY-XXXX{" "}
                  <span className="text-blue-500">(e.g. STU-2024-1104)</span>
                </div>
                <div>
                  <span className="font-semibold">Password:</span> Any 6+
                  character password
                </div>
                <div className="text-blue-500 italic">
                  This is a template — any valid-format credentials are
                  accepted.
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Student ID Number
                  </label>
                  <input
                    id="portal-student-id"
                    type="text"
                    value={studentIdInput}
                    onChange={(e) => {
                      setStudentIdInput(e.target.value);
                      setLoginError(null);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]/40 focus:border-[#00a896] transition-all"
                    placeholder="e.g. STU-2024-1104"
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password / PIN
                  </label>
                  <div className="relative">
                    <input
                      id="portal-password"
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setLoginError(null);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]/40 focus:border-[#00a896] transition-all"
                      placeholder="Minimum 6 characters"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {loginError && (
                  <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  id="portal-sign-in-btn"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 bg-[#00a896] hover:bg-[#008c7d] disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Sign In to Portal
                    </>
                  )}
                </button>

                <button
                  id="portal-demo-btn"
                  onClick={handleDemoLogin}
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#0b2545] font-medium text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-60"
                >
                  ⚡ Quick Demo Login — Sameeha Zarrin (HSC Science)
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400">
                🔒 Secured by Quantum ERP &bull; All data is encrypted &bull;
                Session expires in 30 min
              </p>
            </div>
          </div>
        ) : (
          /* ── LOGGED-IN DASHBOARD ── */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Student Profile Ribbon */}
            <div className="bg-gradient-to-r from-[#0b2545] to-[#134074] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-4">
                <img
                  src={DEMO_STUDENT.avatarUrl}
                  alt={DEMO_STUDENT.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white/30 shadow shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-extrabold text-lg sm:text-xl text-white leading-tight">
                      {DEMO_STUDENT.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                      ✓ {DEMO_STUDENT.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    <strong className="text-cyan-300">ID:</strong>{" "}
                    {DEMO_STUDENT.id} &nbsp;•&nbsp;
                    <strong className="text-cyan-300">Roll:</strong>{" "}
                    {DEMO_STUDENT.roll} &nbsp;•&nbsp;
                    {DEMO_STUDENT.grade}
                  </div>
                  <div className="text-xs text-cyan-300 font-medium mt-0.5">
                    {DEMO_STUDENT.section}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                    Cumulative GPA
                  </div>
                  <div className="font-extrabold text-2xl text-white leading-tight">
                    {DEMO_STUDENT.gpa.toFixed(2)}{" "}
                    <span className="text-sm font-medium text-slate-300">
                      / 5.00
                    </span>
                  </div>
                </div>
                <button
                  id="portal-logout-btn"
                  onClick={handleLogout}
                  className="p-2.5 text-slate-300 hover:text-rose-400 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 gap-1 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-semibold shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors px-1 ${
                    activeTab === tab.id
                      ? "border-[#00a896] text-[#00a896]"
                      : "border-transparent text-slate-600 hover:text-[#0b2545]"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* ── TAB: PROFILE ── */}
            {activeTab === "profile" && (
              <div className="p-5 sm:p-6 space-y-6">
                {/* Quick stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Current GPA",
                      value: "5.00",
                      sub: "Outstanding",
                      color: "emerald",
                      icon: <Star className="w-5 h-5" />,
                    },
                    {
                      label: "Attendance",
                      value: "96.4%",
                      sub: "82 of 85 days",
                      color: "blue",
                      icon: <Calendar className="w-5 h-5" />,
                    },
                    {
                      label: "Fee Status",
                      value: "Dues: ৳0",
                      sub: "2 terms paid",
                      color: "teal",
                      icon: <CreditCard className="w-5 h-5" />,
                    },
                    {
                      label: "Class Rank",
                      value: "#4",
                      sub: "out of 120",
                      color: "amber",
                      icon: <TrendingUp className="w-5 h-5" />,
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className={`bg-${card.color}-50 border border-${card.color}-200 rounded-xl p-3.5`}
                    >
                      <div className={`text-${card.color}-600 mb-1`}>
                        {card.icon}
                      </div>
                      <div
                        className={`text-[11px] font-bold text-${card.color}-800 uppercase tracking-wide`}
                      >
                        {card.label}
                      </div>
                      <div
                        className={`font-extrabold text-lg text-${card.color}-700 leading-tight`}
                      >
                        {card.value}
                      </div>
                      <div className={`text-[10px] text-${card.color}-600`}>
                        {card.sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                    <h5 className="font-bold text-sm text-[#0b2545] flex items-center gap-2">
                      <User className="w-4 h-4 text-[#00a896]" /> Personal
                      Information
                    </h5>
                    <div className="space-y-2.5 text-xs">
                      {[
                        { label: "Full Name", value: DEMO_STUDENT.name },
                        { label: "Student ID", value: DEMO_STUDENT.id },
                        { label: "Roll Number", value: DEMO_STUDENT.roll },
                        { label: "Class & Group", value: DEMO_STUDENT.grade },
                        {
                          label: "Section / Wing",
                          value: DEMO_STUDENT.section,
                        },
                        { label: "Academic Year", value: "2025 – 2026" },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between">
                          <span className="font-semibold text-slate-500">
                            {row.label}
                          </span>
                          <span className="text-slate-800 font-medium text-right">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                    <h5 className="font-bold text-sm text-[#0b2545] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#00a896]" /> Guardian
                      &amp; Contact
                    </h5>
                    <div className="space-y-2.5 text-xs">
                      {[
                        {
                          label: "Guardian Name",
                          value: DEMO_STUDENT.guardianName,
                        },
                        {
                          label: "Contact Number",
                          value: DEMO_STUDENT.contact,
                        },
                        {
                          label: "Emergency Contact",
                          value: "+880 1919-334455",
                        },
                        { label: "Relation", value: "Father" },
                        {
                          label: "Address",
                          value: "House 14, Road 7, Uttara, Dhaka",
                        },
                        {
                          label: "Email (Parent)",
                          value: "mahmudul.amin@gmail.com",
                        },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex justify-between gap-3"
                        >
                          <span className="font-semibold text-slate-500 shrink-0">
                            {row.label}
                          </span>
                          <span className="text-slate-800 font-medium text-right">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <h5 className="font-bold text-sm text-[#0b2545] flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-[#00a896]" /> Recent Portal
                    Activity
                  </h5>
                  <div className="space-y-2.5">
                    {[
                      {
                        time: "Today, 9:15 AM",
                        action: "Attended Physics Period 1 — Gate scan ✓",
                        dot: "bg-emerald-500",
                      },
                      {
                        time: "Yesterday",
                        action: "Term 3 fee invoice generated (INV-2025-1845)",
                        dot: "bg-amber-500",
                      },
                      {
                        time: "Oct 20, 2025",
                        action: "HSC Term 2 Marksheet published — GPA 5.00",
                        dot: "bg-blue-500",
                      },
                      {
                        time: "Sep 12, 2025",
                        action: "Term 2 tuition fee paid via bKash",
                        dot: "bg-emerald-500",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full mt-1 shrink-0 ${item.dot}`}
                        />
                        <div>
                          <div className="text-slate-800 font-medium">
                            {item.action}
                          </div>
                          <div className="text-slate-400">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: ATTENDANCE ── */}
            {activeTab === "attendance" && (
              <div className="p-5 sm:p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Present Days",
                      value: "82 Days",
                      color: "emerald",
                    },
                    { label: "Late Arrivals", value: "2 Days", color: "amber" },
                    { label: "Absent Days", value: "1 Day", color: "rose" },
                    { label: "Attendance %", value: "96.4%", color: "blue" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`bg-${s.color}-50 border border-${s.color}-200 rounded-xl p-3 text-center`}
                    >
                      <span
                        className={`text-[11px] font-bold text-${s.color}-800 uppercase`}
                      >
                        {s.label}
                      </span>
                      <div
                        className={`font-extrabold text-2xl text-${s.color}-700 mt-0.5`}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="font-bold text-sm text-[#0b2545] mb-3">
                    Recent RFID Biometric Gate Logs
                  </h5>
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">Day</th>
                          <th className="p-3">Gate Status</th>
                          <th className="p-3">Period 1</th>
                          <th className="p-3">Period 2</th>
                          <th className="p-3">Period 3</th>
                          <th className="p-3">Period 4</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {DEMO_ATTENDANCE.map((rec, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70">
                            <td className="p-3 font-semibold text-slate-800">
                              {rec.date}
                            </td>
                            <td className="p-3 text-slate-500">{rec.day}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full font-semibold uppercase text-[10px] ${
                                  rec.status === "present"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : rec.status === "late"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-blue-100 text-blue-800"
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

            {/* ── TAB: GRADES ── */}
            {activeTab === "grades" && (
              <div className="p-5 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#faf8ff] p-4 rounded-xl border border-slate-200">
                  <div>
                    <h5 className="font-bold text-sm text-[#0b2545]">
                      HSC Term 2 Terminal Examination 2025
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Class 11 Science • Result Published on Oct 20, 2025
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 shadow hover:bg-slate-50"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    Download Marksheet (PDF)
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
                          <td className="p-3 font-mono text-slate-500">
                            {sub.code}
                          </td>
                          <td className="p-3 font-semibold text-slate-800">
                            {sub.subject}
                          </td>
                          <td className="p-3 text-center font-bold text-slate-800">
                            {sub.marks}
                          </td>
                          <td className="p-3 text-center font-bold text-emerald-700">
                            {sub.grade}
                          </td>
                          <td className="p-3 text-center font-mono font-semibold text-slate-700">
                            {sub.gpa.toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                      <tr>
                        <td colSpan={2} className="p-3 text-[#0b2545]">
                          Final Term Result: GPA-5.00 (Outstanding)
                        </td>
                        <td className="p-3 text-center text-[#0b2545]">556</td>
                        <td className="p-3 text-center text-emerald-700">A+</td>
                        <td className="p-3 text-center text-emerald-700">
                          5.00
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* ── TAB: FEES ── */}
            {activeTab === "fees" && (
              <div className="p-5 sm:p-6 space-y-6">
                {paymentSuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Payment processed successfully! Receipt sent to parent
                    email.
                  </div>
                )}
                <div className="space-y-4">
                  <h5 className="font-bold text-sm text-[#0b2545]">
                    Fee Timeline &amp; Payment Status
                  </h5>
                  <div className="space-y-3">
                    {DEMO_FEE_TIMELINE.map((fee) => (
                      <div
                        key={fee.id}
                        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          fee.status === "paid"
                            ? "bg-slate-50 border-slate-200"
                            : fee.status === "current"
                              ? "bg-amber-50/60 border-amber-300 ring-2 ring-amber-400/20"
                              : "bg-white border-slate-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#0b2545]">
                              {fee.title}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                fee.status === "paid"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : fee.status === "current"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-slate-100 text-slate-600"
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
                            <span className="text-[10px] text-slate-400 block font-medium">
                              Amount
                            </span>
                            <span className="font-extrabold text-base text-[#0b2545]">
                              ৳ {fee.amount.toLocaleString()}
                            </span>
                          </div>
                          {fee.status === "paid" ? (
                            <button
                              onClick={() => window.print()}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                            >
                              Receipt (PDF)
                            </button>
                          ) : fee.status === "current" ? (
                            <button
                              onClick={handlePayFee}
                              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#00a896] hover:bg-[#008c7d] shadow cursor-pointer"
                            >
                              Pay Now (bKash/Card)
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              Scheduled
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: DIGITAL ID ── */}
            {activeTab === "idcard" && (
              <div className="p-5 sm:p-6 flex flex-col items-center justify-center space-y-6">
                <div className="w-full max-w-sm bg-gradient-to-br from-[#0b2545] to-[#134074] text-white rounded-2xl p-6 shadow-xl border border-white/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
                    <div>
                      <div className="font-extrabold text-sm tracking-wide text-white">
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
                  <div className="flex items-center gap-4">
                    <img
                      src={DEMO_STUDENT.avatarUrl}
                      alt={DEMO_STUDENT.name}
                      className="w-20 h-24 rounded-lg object-cover border-2 border-white/40 shadow"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-base text-white">
                        {DEMO_STUDENT.name}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-300 font-semibold">ID:</span>{" "}
                        {DEMO_STUDENT.id}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-300 font-semibold">
                          Roll:
                        </span>{" "}
                        {DEMO_STUDENT.roll}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-300 font-semibold">
                          Class:
                        </span>{" "}
                        11 (Science)
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-300 font-semibold">
                          Valid Till:
                        </span>{" "}
                        Dec 2026
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
                    <div className="font-mono tracking-widest text-xs">
                      ||| |||| | ||||| || |||
                    </div>
                    <span className="text-[10px] text-cyan-300 font-bold">
                      STUDENT PASS
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#134074] shadow cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-cyan-300" />
                  Print Official Plastic ID Card
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.93) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};
