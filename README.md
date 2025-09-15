[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)
# To-Do App – Preliminary Assignment Submission
⚠️ Please complete **all sections marked with the ✍️ icon** — these are required for your submission.

👀 Please Check ASSIGNMENT.md file in this repository for assignment requirements.

## 🚀 Project Setup & Usage
**How to install and run your project:**  
✍️  
```bash
# Clone the repository
git clone https://github.com/NAVER-Vietnam-AI-Hackathon/web-track-naver-vietnam-ai-hackathon-Donavfulish.git

# Navigate into the project folder
cd web-track-naver-vietnam-ai-hackathon-Donavfulish

# Install dependencies
npm install

# Start the development server
npm run dev

```
## 🔗 Deployed Web URL or APK file
✍️ https://web-track-naver-viet-nam-ai-hackath-ten.vercel.app/


## 🎥 Demo Video
**Demo video link (≤ 2 minutes):**  
📌 **Video Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.  
- “Unlisted” videos can only be viewed by users who have the link.  
- The video will not appear in search results or on your channel.  
- Share the link in your README so mentors can access it.  

✍️ https://youtu.be/0LyGdxFMNpo


## 💻 Project Introduction

### a. Overview

Our project is called WePlan. The name emphasizes collaboration, organization, and productivity. The idea behind WePlan is that planning should not just be an individual activity but also something that helps teams and groups stay on track together. The app helps users organize projects, manage deadlines, and monitor progress efficiently in one place.

### b. Key Features & Function Manual

1. **Authentication with Supabase Auth**: Secure signup/login with automatic session handling.  
2. **Profile Management**: User information (email, display name) is automatically stored in the `profiles` table.  
3. **Full CRUD operations**: Users can Create, Read, Update, and Delete both projects and tasks.  
4. **Project Management**: Create, edit, delete, and monitor projects with deadlines and descriptions.  
5. **Task Management**: Each project supports multiple tasks that can be edited, marked as completed, or assigned a priority.  
6. **Persistent Storage**: All user, project, and task data is stored in Supabase (PostgreSQL), ensuring data persistence across sessions.  
7. **Multiple Views of Data**:  
   - Project overview (Project status, Number of completed, pending task, Final Deadline, Progress of completion)  
   - Task details within each project in three different view (List, Calendar, Analytic Chart)
   - Dashboard with list of recent projects, coming deadlines, chart section about completion rate, task status ratio and line chart of remaining deadline 
8. **Time & Date Handling**: Support for `deadline`, `created_at`, `completed_date`, and reminders for upcoming deadlines.  
9. **Scalable Data Handling**: The app can handle 20+ or even hundreds projects or tasks smoothly without affecting performance or UI. This is achieved by: 
    - State management with Zustand: Centralized and reactive state allows efficient updates without unnecessary re-renders.
    - Lazy loading: Data for projects or tasks is loaded only when needed (e.g., when navigating to a specific project), reducing initial load time.
    - Caching: Frequently accessed data is cached in the state to avoid redundant API calls.
    - Optimized navigation: Using React Router’s dynamic routing ensures that only relevant components render, improving responsiveness.
10. **Auto Logout**: Sessions expire automatically after 12 hours to enhance security.  
11. **Toast Notifications**: Real-time feedback for login/logout status, successful operations, and error handling.  

### c. Unique Features (What’s special about this app?) 

- Built-in **auto logout** mechanism that safeguards long-running sessions.  
- Integration of **Supabase Realtime** (if enabled) for instant data synchronization across devices.  
- Clean and modern UI built with React + Tailwind CSS for an intuitive user experience.  
- Strong database schema with foreign key constraints ensuring data integrity and consistency.
- Visual dashboards and charts to track progress.
- Deadline reminders and alerts for upcoming tasks. 

### d. Technology Stack and Implementation Methods

- **Frontend**: React, Vite, TypeScript, Tailwind CSS  
- **Backend & Authentication**: Supabase (PostgreSQL, Auth, Storage)  
- **State Management**: Zustand for lightweight and efficient user/session management  
- **UI Components**: ShadCN/UI and React-Toastify for modern and responsive UI  
- **Deployment**: Vercel for continuous deployment and hosting  

### e. Service Architecture & Database structure (when used)

- **Architecture**:  
  - Client (React) ↔ Supabase SDK ↔ Database (Postgres)  
- **Database Schema (main tables)**:  
  - `profiles (id uuid PK, email text unique, name text)`  
  - `projects (id uuid PK, user_id uuid FK → profiles.id, name text, description text, final_deadline date, created_at timestamp, img_src text, status enum(Completed, Miss, On Progress), num_pending int4, num_done int4, num_to_do int4, num_miss int4, progress numeric)`  
  - `tasks (id uuid PK, project_id uuid FK → projects.id, user_id → projects.user_id, title text, description text, deadline date, status task_status, created_at timestamptz, priority enum(Done, Pending, Todo, Miss), completed_date date )` 

## 🧠 Reflection

### a. If you had more time, what would you expand?

- Enable project sharing and role-based access control for collaboration like Github.  
- Enable notifications through mail, facebook.
- Improve mobile responsiveness and build a cross-platform mobile app with React Native.  


### b. If you integrate AI APIs more for your app, what would you do?

- Use AI to automatically classify or tag tasks based on their content.  
- Build an AI-powered assistant to suggest optimized daily or weekly schedules.  
- Analyze workload and recommend smarter time allocation strategies.  
- Generate automated weekly/monthly project summary reports using natural language generation.  



## ✅ Checklist
- [✅] Code runs without errors  
- [✅] All required features implemented (add/edit/delete/complete tasks)  
- [✅] All ✍️ sections are filled  
