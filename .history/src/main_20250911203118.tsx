import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css'
import LandingPage from './pages/LandingPage';
import Dashboard from "./pages/Dashboard";
import CallbackPage from './pages/CallbackPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/callback" element={<CallbackPage />} /> {/* Supabase sẽ redirect về đây */}
        <Route path="/projects" element
        {/* Thêm các route khác sau này */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
