import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Ensure Navbar.jsx file exists here
import Home from './Pages/Home';
import About from './Pages/About';

function App() {
  return (
    <Router>
      {/* Navbar ko Routes ke bahar rakha hai taaki wo har page par dikhe */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add other routes here like /projects, /contact */}
      </Routes>
    </Router>
  );
}

export default App;