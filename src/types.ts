export type Language = 'en' | 'bn';

export interface AcademicProgram {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  linkText: string;
  iconName: string;
  curriculum: {
    duration: string;
    shift: string;
    subjects: string[];
    labPracticals: string[];
    coCurricular: string[];
  };
}

export interface CircularNotice {
  id: string;
  date: string;
  month: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  section: 'all' | 'school' | 'college';
  pdfUrl: string;
  fileSize: string;
}

export interface SchoolEvent {
  id: string;
  tag: string;
  title: string;
  description: string;
  time: string;
  dateStr: string;
  location: string;
  section: 'all' | 'school' | 'college';
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarInitials: string;
  avatarBg: string;
}

export interface AdmissionFormData {
  selectedClass: string;
  selectedGroup: string;
  medium: 'English' | 'Bangla' | '';
  studentName: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  dob: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  prevSchool: string;
  prevGpa: string;
  birthCertUploaded: boolean;
  photoUploaded: boolean;
}

export interface StudentRecord {
  id: string;
  name: string;
  roll: string;
  grade: string;
  section: string;
  gpa: number;
  avatarUrl: string;
  guardianName: string;
  contact: string;
  status: 'Enrolled' | 'Probation' | 'Verified';
  dues: number;
}

export interface AttendanceRecord {
  date: string;
  day: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  period1: 'present' | 'absent' | 'late';
  period2: 'present' | 'absent' | 'late';
  period3: 'present' | 'absent' | 'late';
  period4: 'present' | 'absent' | 'late';
}

export interface FeeMilestone {
  id: string;
  title: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'current' | 'upcoming';
  invoiceNo: string;
}
