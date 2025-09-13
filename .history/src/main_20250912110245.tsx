import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css'
import LandingPage from './pages/LandingPage';
import ForYouPage from './pages/ForYou';
import CallbackPage from './pages/CallbackPage';
import ProjectsPage from './pages/Projects';
import ProjectDetailPage from './pages/ProjectDetails';
import Reac from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/for-you" element={<ForYouPage />} />
        <Route path="/callback" element={<CallbackPage />} /> {/* Supabase sẽ redirect về đây */}
        <Route path="/projects" element={<ProjectsPage/>} />
        <Route path="/projects/:id" element={<ProjectDetailPage/>} />
        {/* Thêm các route khác sau này */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
