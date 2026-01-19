import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Palette, Layers, MousePointer2, ExternalLink, Linkedin, Instagram, Twitter, ArrowRight } from 'lucide-react';
import '../CSS/Home.css';
import profileImg from '../Assets/profile.webp';

// --- 1. DATA SECTION ---
const featuresData = [
  { icon: <Palette size={28} />, title: "Tailored Design", desc: "Unique brand identities that tell your specific story." },
  { icon: <MousePointer2 size={28} />, title: "User-Centric", desc: "Obsessed with intuitive UX/UI journeys." },
  { icon: <Code size={28} />, title: "Modern Tech", desc: "Fast, scalable solutions using React & Node." }
];

const projectsData = [
  { 
    id: 1, 
    title: "ONLINE COURSES", 
    year: "2023", 
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    title: "EVENT BOOKING", 
    year: "2023", 
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    title: "LIFESTYLE MAGAZINE", 
    year: "2023", 
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    title: "PORTFOLIO", 
    year: "2023", 
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" 
  }
];

const servicesData = [
  { icon: <Layers size={32} />, title: "Web Design", desc: "Visually stunning layouts.", list: ["Figma", "UI/UX", "Mobile First"] },
  { icon: <Code size={32} />, title: "Development", desc: "Clean, efficient code.", list: ["React", "Next.js", "SEO Optimized"] },
  { icon: <Palette size={32} />, title: "Branding", desc: "Stand out in the market.", list: ["Logo Design", "Color Theory", "Identity"] }
];

// --- 2. SUB-COMPONENTS ---

const HeroSection = () => (
  <section className="hero-section">
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="availability-badge">
      <span className="green-dot animate-pulse"></span> AVAILABLE FOR WORK
    </motion.div>
    <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="main-title">
      BHUPENDRA<br />VERMA
    </motion.h1>
    <div className="hero-content">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hero-subtext">
        Blending artistry with cutting-edge technology to deliver websites that drive results.
      </motion.p>
      <div className="btn-wrapper">
        <Link to="/contact">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cta-button">
            Schedule a consultation
          </motion.button>
        </Link>
        <Link to="/projects">
          <motion.button whileHover={{ scale: 1.05 }} className="outline-btn">
            View Work
          </motion.button>
        </Link>
      </div>
    </div>
  </section>
);

const WhyWorkSection = () => (
  <section className="section why-work">
    <div className="section-header">
      <span className="pill-label">WHY CHOOSE ME</span>
      <h2>Why Work with Me</h2>
    </div>
    <div className="cards-grid">
      {featuresData.map((f, i) => (
        <motion.div key={i} className="card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }}>
          <div className="icon-box">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const ProjectsSection = () => (
  <section className="section selected-work">
    <div className="section-header-row">
      <div>
        <span className="pill-label">SELECTED WORK</span>
        <h2>Elevating Brands</h2>
      </div>
    </div>
    <div className="projects-grid">
      {projectsData.map((p) => (
        <motion.div key={p.id} className="project-card" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="project-image-wrapper">
            <img src={p.img} alt={p.title} />
            <div className="overlay">
              <Link to="/projects"><ExternalLink color="#fff" size={40} /></Link>
            </div>
          </div>
          <div className="project-info">
            <span className="project-title">{p.title}</span>
            <span>{p.year}</span>
          </div>
        </motion.div>
      ))}
    </div>
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <Link to="/projects">
        <button className="outline-btn">View All Projects <ArrowRight size={16} style={{display:'inline', marginLeft:'8px'}} /></button>
      </Link>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="section services">
    <div className="section-header">
      <span className="pill-label">SERVICES</span>
      <h2>What I Offer</h2>
    </div>
    <div className="services-grid">
      {servicesData.map((s, i) => (
        <motion.div key={i} className={`service-card ${i === 0 ? 'green-card' : 'dark-card'}`} whileHover={{ y: -5 }} viewport={{ once: true }}>
          <div className="service-icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p style={{marginBottom: '20px'}}>{s.desc}</p>
          <ul className="service-list">
            {s.list.map((item, k) => <li key={k}>{item}</li>)}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

const AboutSection = () => (
  <section className="section about">
    <div className="about-container">
      <div className="about-image">
         <img src={profileImg} alt="Bhupendra Verma" />
      </div>
      <div className="about-content">
         <span className="pill-label">ABOUT ME</span>
         <h2>Discover My Journey</h2>
         <p style={{ margin: '20px 0', color: '#a1a1a1', lineHeight: '1.6' }}>
           Hello! I'm <span className="highlight-text">Bhupendra Verma</span>, a passionate Web Designer & Developer. I specialize in building digital experiences that are not only visually stunning but also highly functional and performant.
         </p>
         <div className="social-links" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <a href="#" className="link"><Linkedin size={24} /></a>
            <a href="#" className="link"><Instagram size={24} /></a>
            <a href="#" className="link"><Twitter size={24} /></a>
         </div>
      </div>
    </div>
  </section>
);

// --- ADDED MISSING FOOTER COMPONENT ---
const FooterSection = () => (
  <footer className="footer-cta">
    <p className="pill-label">CONTACT</p>
    <h2 className="footer-heading">Let's work together</h2>
    <a href="mailto:hello@bhupendra.com" className="email-link">hello@bhupendra.com</a>
    
    <div className="footer-nav">
      <Link to="/" className="link">Home</Link>
      <Link to="/projects" className="link">Work</Link>
      <Link to="/about" className="link">About</Link>
      <Link to="/contact" className="link">Contact</Link>
    </div>
    
    <div style={{ marginTop: '60px', color: '#555', fontSize: '12px' }}>
      © {new Date().getFullYear()} Bhupendra Verma. All rights reserved.
    </div>
  </footer>
);

// --- MAIN EXPORT ---
const Home = () => (
  <>
    <HeroSection />
    <WhyWorkSection />
    <ProjectsSection />
    <ServicesSection />
    <AboutSection />
    <FooterSection />
  </>
);

export default Home;