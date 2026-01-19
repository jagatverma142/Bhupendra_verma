import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'; // Ensure Navbar.jsx file exists here
import Bhupendra_verma from './Pages/Bhupendra_verma';
import About from './Pages/About';
import Projects from './Pages/Projects';
import './index.css';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Resume from './Pages/Resume';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      {/* Navbar ko Routes ke bahar rakha hai taaki wo har page par dikhe */}
      <Navbar /> 
      
      <Routes>
        <Route path="/Bhupendra_verma/" element={<Bhupendra_verma />} />
        <Route path="/about" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Resume" element={<Resume />} />


        {/* Add other routes here like /projects, /contact */}
      </Routes>
      <Footer />


    </Router>
  );
}

export default App;