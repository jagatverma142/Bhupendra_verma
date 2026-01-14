import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Ensure Navbar.jsx file exists here
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import './index.css';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Resume from './Pages/Resume';
function App() {
  return (
    <Router>
      {/* Navbar ko Routes ke bahar rakha hai taaki wo har page par dikhe */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Resume" element={<Resume />} />


        {/* Add other routes here like /projects, /contact */}
      </Routes>
    </Router>
  );
}

export default App;