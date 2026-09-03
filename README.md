# 🎓 Quantum School & College — Official Website

A modern, fully responsive institutional website for **Quantum School & College**, Uttara, Dhaka. Built with React 19, TypeScript, Vite 6, and TailwindCSS 4 — featuring an animated hero section, a full Student ERP Portal, admission wizard, bilingual support, and much more.

---

## 🌐 Live Preview

> Run locally at **[http://localhost:3000](http://localhost:3000)**
> (See [Getting Started](#-getting-started) below)

---

## ✨ Features

### 🏫 Public Website

| Section                 | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| **Hero**                | Animated particle effects, floating orbs, live metric counters           |
| **Navbar**              | Sticky top bar with bilingual toggle (EN / বাংলা), exam routine download |
| **Principal's Message** | Photo, quote, and institutional message                                  |
| **Academic Programs**   | Junior School, SSC, HSC — with syllabus details in expandable modals     |
| **Notices & Events**    | Live circulars board with PDF links and upcoming event calendar          |
| **Campus Facilities**   | Photo gallery of labs, library, sports ground, and transport             |
| **Faculty**             | Teacher profiles with credentials                                        |
| **Achievements**        | Results, awards, and olympiad performance highlights                     |
| **Testimonials**        | Student and parent reviews                                               |
| **Footer**              | Contact info, social links, EIIN, quick nav                              |

### 🎓 Student ERP Portal

- **Secure Login** — validates Student ID format (`STU-YYYY-XXXX`) and password (min 6 chars)
- **Any valid-format credentials are accepted** (template mode — no backend required)
- **My Profile** — personal details, guardian contacts, GPA card, class rank, recent activity feed
- **Attendance Log** — RFID gate biometric records with period-wise breakdown and summary stats
- **Exam Marksheet** — HSC term results with grades, GPA, downloadable PDF
- **Fee Status** — fee timeline with online Pay Now (bKash/Card) and receipt download
- **Digital ID Card** — printable student ID with barcode strip

### 🌍 Bilingual Support

Full **English / বাংলা** language toggle across all navigation and key sections.

### 📋 Admission Wizard

Multi-step online admission form for Class 5–12 with stream/group selection, guardian details, and document upload simulation.

---

## 🗂️ Project Structure

```
Quantum-School-College/
├── public/
│   └── assets/               # Static assets (images, PDFs)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Sticky header, language toggle, portal button
│   │   ├── Hero.tsx                  # Animated hero with particle effects
│   │   ├── PrincipalMessage.tsx      # Principal bio and message
│   │   ├── AcademicPrograms.tsx      # Program cards with syllabus modals
│   │   ├── NoticesAndEvents.tsx      # Circulars board + event calendar
│   │   ├── CampusFacilities.tsx      # Facility photo gallery
│   │   ├── Achievements.tsx          # Results and award highlights
│   │   ├── Testimonials.tsx          # Parent and student reviews
│   │   ├── AdmissionWizard.tsx       # Multi-step admission form modal
│   │   ├── StudentPortalModal.tsx    # Full student ERP portal (login + dashboard)
│   │   ├── CampusTourModal.tsx       # Virtual campus tour modal
│   │   ├── DocumentModal.tsx         # Exam routine / document viewer modal
│   │   └── Footer.tsx                # Site footer
│   ├── data/
│   │   └── schoolData.ts             # All demo data (student, attendance, fees, etc.)
│   ├── types.ts                      # Shared TypeScript interfaces
│   ├── App.tsx                       # Root component — page layout and modal state
│   ├── main.tsx                      # React entry point
│   └── index.css                     # Global styles + TailwindCSS config
├── index.html                        # HTML entry point
├── vite.config.ts                    # Vite build config
├── tsconfig.json                     # TypeScript config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/GaziMahmudur/Quantum-School-College.git
cd Quantum-School-College

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🔑 Student Portal Login

The portal accepts **any credentials** that match the rules below — no backend or database required.

| Field      | Rule                    | Example         |
| ---------- | ----------------------- | --------------- |
| Student ID | Format: `STU-YYYY-XXXX` | `STU-2024-1104` |
| Password   | Minimum 6 characters    | `mypassword`    |

> **Quick Demo:** Click the **"⚡ Quick Demo Login"** button to auto-fill and log in as the demo student _Sameeha Zarrin_.

---

## 🛠️ Tech Stack

| Technology                                                       | Version | Purpose                 |
| ---------------------------------------------------------------- | ------- | ----------------------- |
| [React](https://react.dev/)                                      | 19      | UI framework            |
| [TypeScript](https://www.typescriptlang.org/)                    | 5.8     | Type safety             |
| [Vite](https://vitejs.dev/)                                      | 6       | Build tool & dev server |
| [TailwindCSS](https://tailwindcss.com/)                          | 4       | Utility CSS             |
| [Lucide React](https://lucide.dev/)                              | 0.546   | Icon library            |
| [Motion](https://motion.dev/)                                    | 12      | Animations              |
| [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | 1.9     | Celebratory effects     |

---

## 📜 Available Scripts

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start dev server at `http://localhost:3000` |
| `npm run build`   | Build production bundle to `dist/`          |
| `npm run preview` | Preview production build locally            |
| `npm run lint`    | TypeScript type-check (no emit)             |

---

## 📌 Notes

- This is a **template/demo** website. All student data, fees, grades, and attendance records are fictional demo data defined in `src/data/schoolData.ts`.
- No backend or API is required. The Student Portal runs entirely client-side.
- To customize for a real institution, replace the data in `schoolData.ts` and the school info constants in the components.

---

## 📄 License

This project is open-source and available for educational and institutional use.

---

> Built with ❤️ for **Quantum School & College**, Uttara, Dhaka.
