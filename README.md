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

## 📚 Stack Overview

- **Frontend:** Next.js 14 (App Router, SSR/SSG, API routes)
- **Backend** Supabase (Postgres, Auth)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS

## 🏗️ Folder Structure

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

## 🧾 DB Schema Documentation

![Job Board ERD](https://github.com/user-attachments/assets/9bbe722d-f37d-4e71-ac35-afb2a07b5f68)

---

## 📦 Tables Description

### 📝 `job_posts`

Stores individual job listings.

| Column         | Type          | Description                                 |
| -------------- | ------------- | ------------------------------------------- |
| `id`           | `uuid`        | Primary key. Unique ID for the job post.    |
| `title`        | `text`        | Job title.                                  |
| `company_name` | `text`        | Name of the hiring company.                 |
| `description`  | `text`        | Detailed job description.                   |
| `location`     | `text`        | Location of the job.                        |
| `job_type_id`  | `uuid`        | FK → `job_types.id`, indicates job type.    |
| `created_at`   | `timestamptz` | Timestamp of job post creation.             |
| `updated_at`   | `timestamptz` | Timestamp of last update.                   |
| `user_id`      | `uuid`        | FK → `auth.users.id`, posted by which user. |
| `country_id`   | `uuid`        | FK → `countries.id`, country of the job.    |

---

### 🗂️ `job_types`

Defines types of jobs, e.g., Full-Time, Part-Time, Contract.

| Column       | Type          | Description                      |
| ------------ | ------------- | -------------------------------- |
| `id`         | `uuid`        | Primary key.                     |
| `type`       | `text`        | Type of job (e.g., "Full-Time"). |
| `created_at` | `timestamptz` | Timestamp of type creation.      |

---

### 🌍 `countries`

Stores country information.

| Column       | Type          | Description                      |
| ------------ | ------------- | -------------------------------- |
| `id`         | `uuid`        | Primary key.                     |
| `name`       | `bpchar`      | Name of the country.             |
| `iso`        | `bpchar`      | ISO 3166-1 alpha-2 country code. |
| `created_at` | `timestamptz` | Timestamp of entry creation.     |
| `sort_order` | `int4`        | Optional sort priority/order.    |

---

### 👤 `auth.users`

Handled by Supabase for authentication. Used as a foreign key in `job_posts.user_id`.

| Column | Type   | Description                |
| ------ | ------ | -------------------------- |
| `id`   | `uuid` | Primary key for each user. |

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

## Project Screenshots

#### 🖥️ Desktop View

![Homepage](https://github.com/user-attachments/assets/be2c876f-ce0e-48e0-bb3a-ebe986029834)

&nbsp;

![Job Detail](https://github.com/user-attachments/assets/fc8ba93a-7ce6-4f7e-8791-b154454c3032)

&nbsp;

![Post Job](https://github.com/user-attachments/assets/66797082-eee0-42a5-98cf-a1eb5a977ecc)

&nbsp;

![Edit Job](https://github.com/user-attachments/assets/3cf7023d-b2bf-4a6a-bb2a-fcbe065aae7b)

&nbsp;

#### 📱 Mobile View

<img src="https://github.com/user-attachments/assets/1772ce27-e88d-4881-9c73-e696dbe9c891" alt="Dashboard Mobile" width="300" />

&nbsp;

<img src="https://github.com/user-attachments/assets/707de785-4e55-4c4e-9b72-b766487e1fc9" alt="Mobile Home" width="300" />

&nbsp;

<img src="https://github.com/user-attachments/assets/b2b51e7c-7282-4d5f-b115-41936a45be22" alt="Mobile Job Detail" width="300" />

&nbsp;

<img src="https://github.com/user-attachments/assets/47f73e7f-f7ed-41e7-955b-085e4c718dfa" alt="Mobile Post Job" width="300" />
