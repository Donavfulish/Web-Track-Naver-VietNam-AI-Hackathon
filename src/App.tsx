// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ForYouPage from "./pages/ForYou";
import CallbackPage from "./pages/CallbackPage";
import ProjectsPage from "./pages/Projects";
import ProjectDetailPage from "./pages/ProjectDetails";

export default function App() {
  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/for-you" element={<ForYouPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
    </Routes>
  );
}
