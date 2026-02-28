import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Bhupendra_verma from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Resume from "./Pages/Resume";

// Admin imports
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminHome from "./admin/pages/AdminHome";
import AdminAbout from "./admin/pages/AdminAbout";
import AdminProjects from "./admin/pages/AdminProjects";
import AdminServices from "./admin/pages/AdminServices";
import AdminMessages from "./admin/pages/AdminMessages";
import AdminLogs from "./admin/pages/AdminLogs";
import AdminContent from "./admin/pages/AdminContent";

import AdminGuard from "./admin/components/AdminGuard";
import AdminLayout from "./admin/layout/AdminLayout";

import "./index.css";

function AppRoutesWithLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Bhupendra_verma />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          {/* ✅ Admin dashboard = /#/admin */}
          <Route index element={<AdminDashboard />} />

          {/* ✅ Admin pages */}
          <Route path="home" element={<AdminHome />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="logs" element={<AdminLogs />} />
          <Route path="content" element={<AdminContent />} />
        </Route>

        {/* Optional: Not found */}
        {/* <Route path="*" element={<div className="p-6 text-white">Page not found</div>} /> */}
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutesWithLayout />
    </Router>
  );
}
