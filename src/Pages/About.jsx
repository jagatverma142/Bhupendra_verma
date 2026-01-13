import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, useScroll, useMotionValue } from 'framer-motion';
import { 
  ArrowRight, Cpu, Zap, Code, 
  Globe, Smartphone, Layout, Server, Rocket, Github, Linkedin, Award 
} from 'lucide-react';
import '../CSS/About.css';

const About = () => {
  const containerRef = useRef(null);

  // 1. Optimized Cursor Logic (No Re-renders)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springCursorX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springCursorY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.5 });

  // 2. 3D Tilt Values
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  // 3. Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityImg = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const skills = [
    { name: "Frontend", level: "95%", icon: <Layout size={24} />, color: "#6366f1" },
    { name: "Backend", level: "88%", icon: <Server size={24} />, color: "#a855f7" },
    { name: "DevOps", level: "80%", icon: <Globe size={24} />, color: "#3b82f6" },
    { name: "AI/ML", level: "75%", icon: <Cpu size={24} />, color: "#ec4899" },
  ];

  return (
    <div className="about-page" ref={containerRef}>
      {/* Optimized Glow Cursor */}
      <motion.div 
        className="cursor-follower"
        style={{ x: springCursorX, y: springCursorY }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div style={{ y: textY }} className="hero-bg-text">CREATIVE</motion.div>
        
        <div className="container grid-main">
          <motion.div 
            className="content-side"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="status-indicator">
              <span className="dot"></span> Open for Innovation
            </div>
            <h1 className="hero-title">
              Architecting <span className="glow-text">Next-Gen</span> <br /> 
              Digital Interfaces.
            </h1>
            <p className="hero-description">
              Main ek Full-Stack Architect hoon jo performance aur aesthetics ko combine karta hai. 
              Mera goal complex structures ko simple aur user-friendly banana hai.
            </p>
            
            <div className="action-row">
              <button className="btn-main">Start Project <Rocket size={18} /></button>
              <div className="social-links">
                <Github className="social-icon" size={24} />
                <Linkedin className="social-icon" size={24} />
              </div>
            </div>
          </motion.div>

          <div className="visual-side">
            <motion.div 
              className="tilt-wrapper"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => { x.set(0); y.set(0); }}
              style={{ rotateX, rotateY, opacity: opacityImg, perspective: 1000 }}
            >
              <div className="main-image-container">
                <div className="glass-border"></div>
                <img 
                   src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800" 
                   alt="Profile" 
                   style={{ transform: "translateZ(50px)" }}
                />
                
                <motion.div className="chip top-left" animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <Code size={14} /> Clean Code
                </motion.div>
                <motion.div className="chip bottom-right" animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <Zap size={14} /> Fast Load
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <h2 className="section-heading">My Expertise</h2>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <motion.div 
                key={i}
                className="skill-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                <h3>{skill.name}</h3>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill" 
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    style={{ background: skill.color }}
                  />
                </div>
                <span className="percentage">{skill.level}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Experience */}
      <section className="exp-section">
        <div className="container">
          <div className="bento-experience">
            <div className="bento-box large">
              <h2>Career Milestones</h2>
              <div className="milestone">
                <span className="year">2026</span>
                <div>
                  <h4>Lead Tech Architect</h4>
                  <p>Building AI-driven analytics dashboards.</p>
                </div>
              </div>
              <div className="milestone">
                <span className="year">2024</span>
                <div>
                  <h4>Senior Full Stack</h4>
                  <p>Scaled an e-commerce platform to 1M+ users.</p>
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} className="bento-box small">
              <Award size={40} className="icon-glow" />
              <h3>Awwwards x2</h3>
              <p>Site of the Day Winner</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bento-box small color-bg">
              <h3>Let's Collaborate</h3>
              <ArrowRight size={30} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;