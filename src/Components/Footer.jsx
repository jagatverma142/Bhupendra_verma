import React, { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Instagram, ArrowUp, Heart, Copy, Check 
} from 'lucide-react';
import '../CSS/Footer.css';

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Bhupendra8171121943@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const socialLinks = [
    { icon: <Github size={20} />, url: "https://github.com/yourusername" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/yourusername" },
    { icon: <Twitter size={20} />, url: "https://twitter.com/yourusername" },
    { icon: <Instagram size={20} />, url: "https://instagram.com/yourusername" }
  ];

  return (
    <footer className="footer-section">
      {/* Dynamic Background Mesh */}
      <div className="footer-glow-container">
        <motion.div 
          className="footer-glow"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div 
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand & CTA */}
          <motion.div className="footer-brand" variants={itemVariants}>
            <span className="pill-label">READY TO START?</span>
            <h2 className="footer-heading">
              Let's Create <br />
              Something <span className="stroke-text">Iconic</span>.
            </h2>
            
            <div className="email-wrapper">
              <a href="mailto:Bhupendra8171121943@gmail.com" className="footer-email">
                Bhupendra8171121943@gmail.com
              </a>
              <motion.button 
                className="copy-btn"
                onClick={handleCopyEmail}
                whileTap={{ scale: 0.9 }}
                title="Copy Email"
              >
                <AnimatePresence mode='wait'>
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={18} color="#a3ff12" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div className="footer-nav-wrapper" variants={itemVariants}>
            <div className="footer-group">
              <h3>Menu</h3>
              <div className="link-column">
                {['Home', 'About', 'Projects', 'Services', 'Resume'].map((item) => (
                  <Link to={`/${item.toLowerCase()}`} key={item} className="footer-link">
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="footer-group">
              <h3>Connect</h3>
              <div className="social-icons-row">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="social-icon-box"
                    whileHover={{ y: -5, backgroundColor: '#a3ff12', color: '#000' }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div className="footer-divider" variants={itemVariants}></motion.div>

        {/* Bottom Section */}
        <motion.div className="footer-bottom" variants={itemVariants}>
          <p className="copyright">
            © {new Date().getFullYear()} Bhupendra Verma. 
            <span className="made-with">
              Made with <Heart size={14} className="heart-icon" /> in India.
            </span>
          </p>
          
          <motion.button 
            className="scroll-top-btn" 
            onClick={scrollToTop}
            whileHover={{ y: -3, boxShadow: "0px 0px 15px rgba(163, 255, 18, 0.4)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;