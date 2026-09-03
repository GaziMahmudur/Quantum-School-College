import { AcademicProgram, CircularNotice, SchoolEvent, Testimonial, StudentRecord, AttendanceRecord, FeeMilestone } from '../types';

export const PRINCIPAL_INFO = {
  name: 'Prof. Dr. Tariqur Rahman',
  title: 'Principal & Head of Institution',
  credentials: 'Ph.D. in Education Policy • BISE Advisor',
  trustReg: 'Trust Reg: QSC-DHK-2008',
  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  quoteHeadline: '“We help every student discover their potential and enjoy learning.”',
  quoteBody: `Dear students and respected parents, welcome to Quantum School & College. We believe that every child is naturally curious, creative, and capable of greatness. School should never be about stressful memorization—it should be an exciting journey where you make friends, ask questions, build projects in science labs, and learn how to be kind and honest.

Our campus in Uttara, Dhaka is built with bright classrooms, green playgrounds, and loving teachers who treat every student with respect. Whether you dream of becoming a scientist, doctor, software engineer, or entrepreneur, we are here to cheer you on every single step of the way!`
};

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: 'junior',
    badge: 'Class 5 to 8',
    title: 'Junior School Section',
    description: 'Building strong English and Math foundations with hands-on science experiments, fun reading clubs, and early computer coding.',
    features: [
      'Bilingual Spoken English & Creative Writing',
      'Junior Science & Lego Robotics Club',
      'Art, Music, Moral Values & Cleanliness'
    ],
    linkText: 'See Class 5–8 Syllabus',
    iconName: 'Smile',
    curriculum: {
      duration: '4 Academic Years (Age 10-14)',
      shift: 'Morning Shift (8:00 AM – 1:30 PM)',
      subjects: ['English 1st & 2nd Paper', 'Bangla Literature & Grammar', 'General Mathematics', 'General Science & Environment', 'Information & Communication Tech (ICT)', 'Bangladesh & Global Studies', 'Moral & Religious Studies'],
      labPracticals: ['Introductory Robotics & Scratch 3.0', 'Junior Chemistry & Botanical Observation', 'Speed Mental Math Lab'],
      coCurricular: ['Scouts & Girl Guides', 'Spelling Bee & Debate', 'Junior Cricket & Football Squad']
    }
  },
  {
    id: 'secondary',
    badge: 'Class 9 & 10 (SSC)',
    title: 'Secondary School Section',
    description: 'Focused preparation for the SSC Board Exam with special support in Science, Business Studies, and Humanities.',
    features: [
      'Science, Business & Humanities Streams',
      'Regular Lab Practicals & Extra Care Classes',
      'Math Olympiad & School Debate Club'
    ],
    linkText: 'See SSC Subject Details',
    iconName: 'FlaskConical',
    curriculum: {
      duration: '2 Academic Years (SSC Board Syllabus)',
      shift: 'Day Shift (8:00 AM – 2:30 PM)',
      subjects: ['Higher Mathematics & General Math', 'Physics & Chemistry', 'Biology & Higher Agriculture', 'Accounting & Business Entrepreneurship', 'Finance & Banking', 'English & Bangla Core'],
      labPracticals: ['Hands-on Physics Optics & Mechanics', 'Acid-Base Titration & Salt Analysis', 'Biological Specimen Dissection & Microscopy'],
      coCurricular: ['Inter-School Debate Championship', 'National Math Olympiad Squad', 'Annual Science Project Fair']
    }
  },
  {
    id: 'college',
    badge: 'Class 11 & 12 (HSC)',
    title: 'College Section (HSC)',
    description: 'Premier college education with specialized guidance for BUET engineering, medical college admissions, and university entrance.',
    features: [
      'Pre-Engineering & Pre-Medical Coaching',
      'Modern Physics, Chemistry & Biology Labs',
      'University Guidance & Career Mentorship'
    ],
    linkText: 'See College Prospectus',
    iconName: 'GraduationCap',
    curriculum: {
      duration: '2 Academic Years (HSC National Curriculum)',
      shift: 'Morning College Shift (7:45 AM – 1:45 PM)',
      subjects: ['Physics 1st & 2nd', 'Chemistry 1st & 2nd', 'Higher Mathematics 1st & 2nd', 'Biology 1st & 2nd', 'ICT Digital Systems', 'Accounting & Business Management'],
      labPracticals: ['Vector Physics & Electrical Circuit Workbench', 'Organic Chemistry Synthesis & Titration', 'Genetics & Human Physiology Practicals'],
      coCurricular: ['BUET Model Admission Tests', 'DMC Pre-Medical Intensive Mentorship', 'IELTS & SAT Global Scholar Club']
    }
  }
];

export const CIRCULAR_NOTICES: CircularNotice[] = [
  {
    id: 'n-1',
    date: '24',
    month: 'OCT',
    badge: 'COLLEGE HSC',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    title: 'HSC Model Test Exam Schedule & Admit Card Notice',
    description: 'Please collect admit cards from the academic room by Nov 2. All college section students must clear remaining dues before issuance.',
    section: 'college',
    pdfUrl: '#',
    fileSize: '1.2 MB PDF'
  },
  {
    id: 'n-2',
    date: '21',
    month: 'OCT',
    badge: 'ADMISSIONS 2025',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'Class 5 to 9 Admission Applications Now Open',
    description: 'Online registration form and fee submission rules for new students. Early birds receive waiver on registration fee.',
    section: 'school',
    pdfUrl: '#',
    fileSize: '840 KB PDF'
  },
  {
    id: 'n-3',
    date: '18',
    month: 'OCT',
    badge: 'SCIENCE CLUB',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    title: 'National Math & Science Olympiad Workshop',
    description: 'Free training sessions on Saturdays for Class 6 to 12 scholars. Mentors from BUET and Dhaka University will conduct problem-solving clinics.',
    section: 'all',
    pdfUrl: '#',
    fileSize: '650 KB PDF'
  },
  {
    id: 'n-4',
    date: '14',
    month: 'OCT',
    badge: 'TRANSPORT',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    title: 'Updated School Bus Routes and Parent Tracking App',
    description: 'Check new pickup stops and get real-time GPS alerts on phone. Route 7 and Route 11 have updated morning boarding times.',
    section: 'all',
    pdfUrl: '#',
    fileSize: '1.8 MB PDF'
  }
];

export const SCHOOL_EVENTS: SchoolEvent[] = [
  {
    id: 'e-1',
    tag: 'SCIENCE FAIR',
    title: 'Annual Robotics & Science Exhibition 2025',
    description: '180+ cool science inventions built by our students will be displayed in the auditorium! Open for all parents and invited guests.',
    time: '09:00 AM – 04:30 PM',
    dateStr: 'Nov 15, 2025',
    location: 'Main Campus Auditorium',
    section: 'all'
  },
  {
    id: 'e-2',
    tag: 'PARENTS MEETING',
    title: 'Term 3 Parent–Teacher Meeting (PTM)',
    description: 'A warm discussion between parents and subject teachers to celebrate student growth, review report cards, and plan future progress.',
    time: '10:00 AM – 02:00 PM',
    dateStr: 'Nov 28, 2025',
    location: 'School & College Wings',
    section: 'all'
  },
  {
    id: 'e-3',
    tag: 'SPORTS GALA',
    title: 'Annual Inter–House Sports & Athletics Meet',
    description: 'Exciting races, football match, cricket finals, and tug-of-war on the main playground! Chief Guest: National Athlete Shamim Hossain.',
    time: '08:30 AM Onwards',
    dateStr: 'Dec 12, 2025',
    location: 'Quantum Sports Turf',
    section: 'all'
  }
];

export const CAMPUS_FACILITIES = [
  {
    id: 'fac-1',
    title: 'Advanced Science & Chemistry Labs',
    badge: 'HANDS-ON LEARNING',
    description: 'Clean, modern laboratories with individual experiment desks, safe glassware, microscopes, and teacher supervision so students see science come to life.',
    bullets: [
      'Safe chemical fume ventilation',
      'Digital sensors & microscopes',
      'Practical exams practice'
    ],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    type: 'featured'
  },
  {
    id: 'fac-2',
    title: 'Computer & Robotics Lab',
    badge: 'FUTURE READY',
    description: 'High-speed fiber internet, scratch coding, Python basics, Lego robotics, and 3D printing for young innovators.',
    bullets: [
      'Dedicated high-spec core workstations',
      'Arduino & STEM robotics kits',
      'Cybersecurity & AI fundamentals'
    ],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    type: 'side'
  },
  {
    id: 'fac-3',
    title: '35,000+ Books Library',
    badge: 'RESOURCE HUB',
    description: 'Peaceful reading zones filled with storybooks, world encyclopedias, science journals, and quiet study desks.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fac-4',
    title: 'Football & Sports Ground',
    badge: 'ATHLETICS',
    description: 'Full green soccer field, basketball courts, and badminton nets with professional athletic physical coaches.',
    image: 'https://images.unsplash.com/photo-1529900245534-47fbf8204f6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fac-5',
    title: 'Safe AC Buses with GPS',
    badge: 'COMMUTE SAFETY',
    description: '32 air-conditioned buses covering all major Dhaka neighborhoods with live smartphone tracking for parents.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: '“The teachers in the college section are so caring! Whenever my daughter needed help with difficult physics math, her teachers stayed after class to explain it patiently.”',
    name: 'Dr. Mahmudul Amin',
    role: 'Father of HSC Science Student',
    avatarInitials: 'MA',
    avatarBg: 'bg-[#0b2545] text-white'
  },
  {
    id: 't-2',
    quote: '“I joined Quantum in Class 5. The robotics club and science exhibitions made learning so much fun! It prepared me to win national awards without feeling exam pressure.”',
    name: 'Sameeha Zarrin',
    role: 'Class 12 Student • Math Olympiad Winner',
    avatarInitials: 'SZ',
    avatarBg: 'bg-[#00a896] text-white'
  },
  {
    id: 't-3',
    quote: '“As working parents, the school bus live tracking app and safe gated campus give us total peace of mind. The values and discipline our boys learn here are invaluable.”',
    name: 'Mrs. Nazia Haque',
    role: 'Mother of Class 6 & Class 9 Students',
    avatarInitials: 'NH',
    avatarBg: 'bg-[#e5a93c] text-[#0b2545]'
  }
];

export const DEMO_STUDENT: StudentRecord = {
  id: 'STU-2024-1104',
  name: 'Sameeha Zarrin',
  roll: '104',
  grade: 'Class 11 (HSC College)',
  section: 'Science - Wing A (Sir Isaac Newton)',
  gpa: 5.0,
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  guardianName: 'Dr. Mahmudul Amin',
  contact: '+880 1711-889922',
  status: 'Verified',
  dues: 0
};

export const DEMO_ATTENDANCE: AttendanceRecord[] = [
  { date: 'Nov 03', day: 'Mon', status: 'present', period1: 'present', period2: 'present', period3: 'present', period4: 'present' },
  { date: 'Nov 04', day: 'Tue', status: 'present', period1: 'present', period2: 'present', period3: 'present', period4: 'present' },
  { date: 'Nov 05', day: 'Wed', status: 'late', period1: 'late', period2: 'present', period3: 'present', period4: 'present' },
  { date: 'Nov 06', day: 'Thu', status: 'present', period1: 'present', period2: 'present', period3: 'present', period4: 'present' },
  { date: 'Nov 09', day: 'Sun', status: 'present', period1: 'present', period2: 'present', period3: 'present', period4: 'present' },
  { date: 'Nov 10', day: 'Mon', status: 'present', period1: 'present', period2: 'present', period3: 'present', period4: 'present' },
  { date: 'Nov 11', day: 'Tue', status: 'excused', period1: 'present', period2: 'present', period3: 'present', period4: 'present' },
  { date: 'Nov 12', day: 'Wed', status: 'present', period1: 'present', period2: 'present', period3: 'present', period4: 'present' }
];

export const DEMO_FEE_TIMELINE: FeeMilestone[] = [
  {
    id: 'f-1',
    title: 'Term 1 Tuition & Lab Maintenance',
    dueDate: 'Paid on Jul 10, 2025',
    amount: 14500,
    status: 'paid',
    invoiceNo: 'INV-2025-0782'
  },
  {
    id: 'f-2',
    title: 'Term 2 Tuition & Sports Facility',
    dueDate: 'Paid on Sep 12, 2025',
    amount: 14500,
    status: 'paid',
    invoiceNo: 'INV-2025-1194'
  },
  {
    id: 'f-3',
    title: 'Term 3 Tuition & HSC Pre-Board Exam Fee',
    dueDate: 'Due by Nov 25, 2025',
    amount: 16200,
    status: 'current',
    invoiceNo: 'INV-2025-1845'
  },
  {
    id: 'f-4',
    title: 'Annual Session Re-Enrollment 2026',
    dueDate: 'Scheduled Jan 15, 2026',
    amount: 18000,
    status: 'upcoming',
    invoiceNo: 'INV-2026-0032'
  }
];

export const FACULTY_MEMBERS = [
  {
    name: 'Dr. Shahabuddin Ahmed',
    role: 'Vice Principal & Senior Physics Lecturer',
    degrees: 'M.Sc. (DU), Ph.D. (BUET)',
    years: '18 Years Experience',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Ms. Fahmida Sultana',
    role: 'Head of Mathematics & Olympiad Coach',
    degrees: 'B.Sc. & M.Sc. Applied Mathematics (DU)',
    years: '12 Years Experience',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Engr. Kazi Minhazur Rahman',
    role: 'Lead Robotics & ICT Instructor',
    degrees: 'B.Sc. in CSE (BUET), IEEE Member',
    years: '8 Years Experience',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Mrs. Rokeya Begum',
    role: 'Senior English Literature Faculty',
    degrees: 'M.A. in English (JNU), Cambridge CELTA Certified',
    years: '15 Years Experience',
    photo: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80'
  }
];
