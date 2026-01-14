import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../CSS/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Dynamic Navigation Items - Centralized Configuration
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  // Logic: Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logic: Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        
        {/* Branding with Logo Pulse */}
        <div className="nav-logo">
          <div className="logo-box">
            <span className="logo-char">B</span>
            <div className="logo-glow"></div>
          </div>
          <div className="logo-text">
            <h1>Bhupendra Verma</h1>
            <p>{scrolled ? 'Portfolio 2026' : 'Web Developer'}</p>
          </div>
        </div>

        {/* Dynamic Navigation Menu */}
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <li key={item.name} style={{ '--i': index }}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => isActive ? 'link active' : 'link'}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-cta" style={{ '--i': navItems.length }}>
            <button className="contact-btn">Resume</button>
          </div>
        </div>

        {/* Animated Hamburger Icon */}
        <div 
          className={`hamburger ${menuOpen ? 'toggle' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;