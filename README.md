# Mini Job Board

A web application for posting, searching, and managing job listings with advanced filtering, user authentication, and a responsive dashboard. This project is submitted as part of the assessment for Konexi.

---

## 🚀 Live Demo

> [https://mini-job-board-murex.vercel.app/](https://mini-job-board-murex.vercel.app/)
>
> **Demo Login:**
> Use the following credentials to log in as a demo user and explore all features (posting jobs, dashboard, etc.):
>
> - Email: user@mail.com
> - Password: 123456

---

## 🏗️ Architecture Overview

- **Frontend:** Next.js 14 (App Router, SSR/SSG, API routes)
- **Backend** Supabase (Postgres, Auth)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS

### Folder Structure

```
/mini-job-board
├── src/
│   ├── app/               # Routing and pages (Next.js App Router)
│   │   ├── layout.tsx     # Root layout and metadata
│   │   ├── page.tsx       # Home page
│   │   └── ...            # Other route files (dashboard, job detail, etc.)
│   ├── components/        # Reusable UI components (NavBar, JobCard, JobList, AuthForm, etc.)
│   ├── context/           # React Contexts for global state (JobContext, AuthContext)
│   ├── entities/          # TypeScript types/entities (JobPost, Country, JobType)
│   ├── services/          # Supabase API abstraction (AuthService, JobService)
│   ├── supabase/          # Supabase client config and types
│   └── utils/             # Utility components (RenderIf, etc.)
└── public/                # Static assets (images, icons, etc.)
```

---

## 🛠️ Local Environment Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NyomanAdiwinanda/mini-job-board
   cd mini-job-board
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure .env:**

   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Approach & Features

- **SSR/SSG:** All components and data fetching are compatible with Next.js SSR/SSG.
- **Job CRUD:** Create, read, update, and delete job posts (with dashboard for job owners).
- **Advanced Filtering:** Real-time filtering by search, country, city, and job type.
- **Reusable Components:** JobCard, JobList, JobForm, AuthForm, RenderIf, JobTime, etc.
- **State Management:** Context-based, modular, and easy to extend.
- **Form Validation:** Robust validation and user feedback in AuthForm and JobForm.
- **UI/UX:** Consistent, modern, and responsive design with Tailwind CSS.
- **Service Layer:** All Supabase calls are abstracted in `services/` for maintainability.

---

## 🛠️ What I Would Add With More Time

For the features if given more time, I would add new features such as:

- **User Profiles:** Let users create and edit their own professional profiles, including skills, experience, and a profile picture.
- **Job Applications:** Allow users to apply for jobs directly through the platform and track their application status.
- **Messaging:** Enable direct messaging between job seekers and employers for faster communication.
- **Company Pages:** Let companies create dedicated pages to showcase their brand, open positions, and culture.
- **Recommendations & Endorsements:** Allow users to endorse each other's skills and write recommendations.
- **Saved Jobs & Job Alerts:** Let users save interesting jobs and set up alerts for new postings matching their interests.
- **Social Feed:** Add a feed for users to share updates, achievements, or industry news, similar to LinkedIn.
- **Advanced Search:** Provide more granular search and filtering (e.g., by salary range, remote/hybrid, experience level).
- **Analytics Dashboard:** Give employers insights into job post views, applications, and candidate demographics.
- **Mobile App:** Build a companion mobile app for on-the-go access.

For the project codebase if I had more time, I would:

- **Add End-to-End and Integration Tests:** Use tools to automatically check that all features work as expected, reducing bugs and making updates safer.
- **Add Unit Testing:** Write small, focused tests for individual functions and components to catch issues early and ensure each part works correctly on its own.
- **Refine Error Handling:** Make sure the app always shows clear, helpful messages if something goes wrong.
- **Implement Error Monitoring:** Set up systems to catch and alert on errors in real time, so issues can be fixed quickly.
- **Optimize Performance:** Make the app load faster and run smoother, even with lots of users or data.
- **Automate CI/CD:** Automate testing and deployment, so new features and fixes can go live faster and more reliably.
- **Expand Documentation:** Write more guides and diagrams to help new team members and contributors understand and work on the project easily.

---
