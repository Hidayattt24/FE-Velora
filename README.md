<div align="center">
  <img src="public/landing/logononame.svg" alt="Velora Logo" width="120" height="120">
  
  # 🌸 Velora
  
  **Platform Terlengkap untuk Dokumentasi, Kesehatan, Dukungan, & Perhatian Ibu Hamil**
  
  [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fe-velora.vercel.app)
  [![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  
  [🚀 Live Demo](https://velora-lake.vercel.app/) • [📱 Mobile Preview](https://velora-lake.vercel.app/) • [📖 Documentation](#dokumentasi)
</div>

---

## 💝 Tentang Velora

**Velora** adalah platform digital komprehensif yang dirancang khusus untuk mendampingi perjalanan kehamilan ibu hamil di Indonesia. Dengan kombinasi teknologi modern dan pendekatan yang berpusat pada pengguna, Velora menyediakan solusi terintegrasi untuk dokumentasi, monitoring kesehatan, dan dukungan emosional selama masa kehamilan.

### 🎯 Visi & Misi

**Visi:** Menjadi sahabat digital terpercaya untuk setiap ibu hamil dalam menjalani perjalanan kehamilan yang lebih bermakna.

**Misi:** 
- 📸 Menyediakan platform dokumentasi visual perjalanan kehamilan
- 🏥 Memberikan tools monitoring kesehatan yang mudah dan akurat
- 📚 Menyajikan konten edukatif berbasis riset medis terpercaya
- 🤖 Menghadirkan sistem prediksi risiko kesehatan dengan AI
- 💚 Membangun komunitas dukungan untuk kesehatan mental ibu hamil

---

## ✨ Fitur Unggulan

<table>
<tr>
<td width="50%">

### 📸 **Galeri Kehamilan**
- Upload foto & video ke cloud storage
- Organisasi berdasarkan trimester & minggu
- Sharing dengan keluarga & dokter
- Backup otomatis & sinkronisasi

### 📅 **Timeline Interaktif**
- Tracking perkembangan minggu ke minggu
- Milestone kehamilan visual
- Jadwal pemeriksaan & reminder
- Progress tracking komprehensif

### 🏥 **Diagnosa AI (84.21% Akurasi)**
- Prediksi risiko kesehatan realtime
- Input data vital signs
- Laporan PDF downloadable
- Rekomendasi tindak lanjut medis

</td>
<td width="50%">

### 📖 **Jurnal Digital**
- Koleksi 50+ artikel medis terpercaya
- Kategorisasi berdasarkan trimester
- Bookmark & reading tracker
- Tips dari ahli kebidanan

### 👤 **Manajemen Profil**
- Upload foto profil ke Supabase Storage
- Edit informasi personal & medis
- Keamanan data tingkat enterprise
- Dashboard overview lengkap

### 🔒 **Keamanan & Privacy**
- Enkripsi end-to-end
- Compliance GDPR
- Backup multi-region
- Authentication berlapis

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### **Frontend**
```bash
Framework     : Next.js 14 (App Router)
Language      : TypeScript
Styling       : Tailwind CSS + Custom Components
UI Library    : Aceternity UI, Tabler Icons
Animation     : Framer Motion
State Mgmt    : React Context API
Authentication: Custom JWT + Context
```

### **Backend**
```bash
Runtime       : Node.js + Express.js
Database      : Supabase (PostgreSQL)
Storage       : Supabase Storage
AI/ML         : Python ML Model (84.21% accuracy)
File Upload   : Multer + Sharp (image processing)
Deployment    : Vercel (Serverless)
```

### **Infrastructure**
```bash
Frontend Host : Vercel
Backend Host  : Vercel (Serverless Functions)
Database      : Supabase Cloud
Storage       : Supabase Storage
CDN           : Vercel Edge Network
Monitoring    : Vercel Analytics
```

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18.0.0+
npm 9.0.0+
Git
```

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/Hidayattt24/fe-velora.git
cd fe-velora
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure Environment Variables**
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api-velora.vercel.app

# Supabase Configuration (untuk development)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Run Development Server**
```bash
npm run dev
```

6. **Open Application**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
fe-velora/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── 📂 auth/              # Authentication pages
│   │   │   ├── login/            # Login page
│   │   │   └── register/         # Registration page
│   │   ├── 📂 main/              # Protected main application
│   │   │   ├── diagnosa/         # AI Diagnosis module
│   │   │   ├── gallery/          # Photo gallery & upload
│   │   │   ├── journal/          # Articles & reading
│   │   │   ├── profile/          # User profile management
│   │   │   └── timeline/         # Pregnancy timeline
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Landing page
│   ├── 📂 components/            # Reusable components
│   │   ├── 📂 auth/              # Auth-related components
│   │   ├── 📂 sections/          # Landing page sections
│   │   ├── 📂 ui/                # UI components
│   │   ├── MainNav.tsx           # Main navigation
│   │   ├── Navbar.tsx            # Landing navbar
│   │   └── SplashScreen.tsx      # Loading screen
│   └── 📂 lib/                   # Utilities & configurations
│       ├── 📂 api/               # API service functions
│       ├── 📂 contexts/          # React contexts
│       ├── 📂 data/              # Static data & constants
│       ├── 📂 hooks/             # Custom React hooks
│       └── utils.ts              # Utility functions
├── 📂 public/                    # Static assets
│   ├── 📂 landing/               # Landing page assets
│   ├── 📂 main/                  # Application assets
│   └── favicon.ico
├── 📄 next.config.ts             # Next.js configuration
├── 📄 tailwind.config.ts         # Tailwind CSS config
├── 📄 package.json               # Dependencies
└── 📄 README.md                  # Documentation
```

---

## 🎨 Design System

### **Color Palette**
```css
Primary Pink    : #D291BC    /* Brand primary */
Light Pink      : #FFE3EC    /* Backgrounds & accents */
Text Primary    : #1F2937    /* Main text */
Text Secondary  : #6B7280    /* Supporting text */
Success Green   : #10B981    /* Success states */
Warning Yellow  : #F59E0B    /* Warning states */
Error Red       : #EF4444    /* Error states */
```

### **Typography**
```css
Font Family     : Inter (System font stack)
Headings        : 600-700 weight
Body Text       : 400-500 weight
Code/Mono       : JetBrains Mono
```

### **Responsive Breakpoints**
```css
Mobile          : 0px - 640px
Tablet          : 641px - 1024px
Desktop         : 1025px - 1280px
Large Desktop   : 1281px+
```

---

## 🔧 Development Guide

### **Struktur Komponen**
```typescript
// Example: Komponen dengan TypeScript
interface ComponentProps {
  title: string;
  isLoading?: boolean;
  onSubmit: (data: FormData) => void;
}

export function Component({ title, isLoading = false, onSubmit }: ComponentProps) {
  // Component logic
}
```

### **API Integration**
```typescript
// Example: Service function
export const apiService = {
  async getData(id: string): Promise<ApiResponse<Data>> {
    const response = await fetch(`${API_BASE_URL}/data/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  }
};
```

### **State Management**
```typescript
// Example: Context usage
const { user, updateUser, isAuthenticated } = useAuth();
```

---

## 📱 Screenshots

<details>
<summary>🖼️ Klik untuk melihat screenshots</summary>

### Landing Page
![Landing Page](docs/screenshots/landing.png)

### Authentication
![Login](docs/screenshots/login.png) ![Register](docs/screenshots/register.png)

### Main Application
![Gallery](docs/screenshots/gallery.png) ![Timeline](docs/screenshots/timeline.png)
![Diagnosis](docs/screenshots/diagnosis.png) ![Journal](docs/screenshots/journal.png)

</details>

---

## 🚀 Deployment

### **Vercel Deployment (Recommended)**

1. **Connect Repository**
```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel --prod
```

2. **Environment Variables**
Set di Vercel Dashboard:
```env
NEXT_PUBLIC_API_URL=https://api-velora.vercel.app
```

3. **Build Settings**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### **Manual Deployment**
```bash
# Build production
npm run build

# Start production server
npm start
```

---

## 🧪 Testing

### **Run Tests**
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### **Performance Testing**
```bash
# Lighthouse audit
npm run audit

# Bundle analysis
npm run analyze
```

---

## 📊 Performance Metrics

### **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s ⚡
- **FID (First Input Delay)**: < 100ms ⚡
- **CLS (Cumulative Layout Shift)**: < 0.1 ⚡

### **Bundle Size**
- **First Load JS**: 102 kB (Excellent)
- **Page Components**: ~50-80 kB average
- **Images**: WebP/AVIF optimized

### **Lighthouse Score**
- **Performance**: 95+ 🟢
- **Accessibility**: 100 🟢
- **Best Practices**: 100 🟢
- **SEO**: 100 🟢

---

## 🤝 Contributing

Kami menyambut kontribusi dari komunitas! Ikuti langkah berikut:

### **Getting Started**
1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### **Coding Standards**
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Conventional Commits
- ✅ Component documentation
- ✅ Test coverage > 80%

### **Pull Request Guidelines**
- Deskripsi lengkap perubahan
- Screenshots untuk UI changes
- Test results
- Performance impact assessment

---

## 👥 Tim Pengembang

<table>
<tr>
<td align="center">
<img src="https://github.com/Hidayattt24.png" width="100px;" alt="Hidayat Nur Hakim"/><br />
<sub><b>Hidayat Nur Hakim</b></sub><br />
<a href="https://github.com/Hidayattt24" title="GitHub">@Hidayattt24</a><br />
<small>UI/UX Designer, Frontend Developer, Backend Developer</small>
</td>
<td align="center">
<img src="https://github.com/tiaraagustinn.png" width="100px;" alt="Tiara Agustin"/><br />
<sub><b>Tiara Agustin</b></sub><br />
<a href="https://github.com/tiaraagustinn" title="GitHub">@tiaraagustinn</a><br />
<small>Creative Copywriter, Content Strategist, Proposal Writer</small>
</td>
</tr>
</table>

### **Kontribusi Tim**

**🎨 Hidayat Nur Hakim** - Tech Lead & Full-Stack Developer
- 🎨 UI/UX Design & Prototyping
- ⚛️ Frontend Development (Next.js + TypeScript)
- 🔧 Backend Development (Node.js + Express)
- 🗄️ Database Design & API Architecture
- 🚀 DevOps & Deployment Strategy

**✍️ Tiara Agustin** - Content Strategist & Creative Lead
- ✨ Creative Copywriting & Brand Voice
- 💡 Product Ideation & User Research
- 📝 Content Strategy & Article Writing
- 📋 Business Proposal & Documentation
- 🎯 User Experience Content Design

---

## 📝 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 Velora Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Support & Contact

### **Support Channels**
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Hidayattt24/fe-velora/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Hidayattt24/fe-velora/discussions)
- 📧 **Email**: support@velora.app
- 💬 **Discord**: [Velora Community](https://discord.gg/velora)

### **Business Inquiries**
- 📧 **Email**: business@velora.app
- 📱 **WhatsApp**: +62 812-3456-7890
- 🌐 **Website**: [velora.app](https://velora.app)

---

## 🙏 Acknowledgments

### **Open Source Dependencies**
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tabler Icons](https://tabler-icons.io/) - Beautiful icons
- [Supabase](https://supabase.com/) - Backend as a Service

### **Design Inspiration**
- [Dribbble](https://dribbble.com/) - Design inspiration
- [Figma Community](https://www.figma.com/community) - UI components
- [Material Design](https://material.io/) - Design principles

### **Medical Content Sources**
- Ikatan Bidan Indonesia (IBI)
- Perkumpulan Obstetri dan Ginekologi Indonesia (POGI)
- World Health Organization (WHO)
- American College of Obstetricians and Gynecologists (ACOG)

---

<div align="center">
  
  **Dibuat dengan 💝 untuk ibu hamil Indonesia**
  
  [⭐ Star Repository](https://github.com/Hidayattt24/fe-velora) • [🐛 Report Bug](https://github.com/Hidayattt24/fe-velora/issues) • [💡 Request Feature](https://github.com/Hidayattt24/fe-velora/discussions)
  
  © 2025 Velora Team. All rights reserved.
  
</div>