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

// 🔹 Admin imports
import AdminLogin from "./admin/pages/AdminLogin";
import AdminProjects from "./admin/pages/AdminProjects";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminMessages from "./admin/pages/AdminMessages";
import AdminLogs from "./admin/pages/AdminLogs";
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
        {/* Portfolio routes */}
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
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="logs" element={<AdminLogs />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutesWithLayout />
    </Router>
  );
}

export default App;
