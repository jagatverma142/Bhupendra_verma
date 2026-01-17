import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Palette, Layers, MousePointer2, ExternalLink, Linkedin, Instagram, Twitter } from 'lucide-react';
import '../CSS/Home.css';

// --- 1. DATA SECTION ---
const featuresData = [
  { icon: <Palette size={28} />, title: "Tailored Design", desc: "Unique brand identities that tell your specific story." },
  { icon: <MousePointer2 size={28} />, title: "User-Centric", desc: "Obsessed with intuitive UX/UI journeys." },
  { icon: <Code size={28} />, title: "Modern Tech", desc: "Fast, scalable solutions using React & Node." }
];

const projectsData = [
  { id: 1, title: "ONLINE COURSES", year: "2023", img: "https://placehold.co/600x400/111/444?text=EdTech+App" },
  { id: 2, title: "EVENT BOOKING", year: "2023", img: "https://placehold.co/600x400/222/555?text=Event+App" },
  { id: 3, title: "LIFESTYLE MAGAZINE", year: "2023", img: "https://placehold.co/600x400/333/666?text=Magazine" },
  { id: 4, title: "PORTFOLIO", year: "2023", img: "https://placehold.co/600x400/444/777?text=Gallery" }
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
      <Link to="/contact">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cta-button">
          Schedule a consultation
        </motion.button>
      </Link>
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
        <motion.div key={i} className="card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} whileHover={{ y: -10 }}>
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
      <span className="pill-label">SELECTED WORK</span>
      <h2>Elevating Brands</h2>
    </div>
    <div className="projects-grid">
      {projectsData.map((p) => (
        <motion.div key={p.id} className="project-card" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} whileHover={{ scale: 1.02 }}>
          <div className="project-image-wrapper">
            <img src={p.img} alt={p.title} />
            <div className="overlay"><ExternalLink color="#fff" size={40} /></div>
          </div>
          <div className="project-info"><span>↳ {p.title}</span><span>{p.year}</span></div>
        </motion.div>
      ))}
    </div>
    <div className="center-btn">
      <Link to="/projects"><button className="outline-btn">↳ Browse all work</button></Link>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="section services">
    <div className="section-header"><span className="pill-label">SERVICES</span><h2>What I Offer</h2></div>
    <div className="services-grid">
      {servicesData.map((s, i) => (
        <motion.div key={i} className={`service-card ${i === 0 ? 'green-card' : 'dark-card'}`} whileHover={{ y: -5 }}>
          <div className="service-icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <ul className="service-list">{s.list.map((item, k) => <li key={k}>{item}</li>)}</ul>
        </motion.div>
      ))}
    </div>
  </section>
);

const AboutSection = () => (
  <section className="section about">
    <div className="about-container">
      <div className="about-image">
         <img src="https://placehold.co/400x500/a3ff12/000?text=BV" alt="Profile" />
      </div>
      <div className="about-content">
         <span className="pill-label">ABOUT ME</span>
         <h2>Discover My Journey</h2>
         <p>Hello! I'm <span className="highlight-text">Bhupendra Verma</span>, a passionate Web Designer & Developer.</p>
         <div className="social-links">
            <Linkedin size={20} className="social-icon" />
            <Instagram size={20} className="social-icon" />
            <Twitter size={20} className="social-icon" />
         </div>
      </div>
    </div>
  </section>
);

const FooterSection = () => (
  <footer className="footer-cta">
    <span className="pill-label">CONTACT</span>
    <motion.h2 whileHover={{ scale: 1.05 }} className="footer-heading">Let's Turn Ideas<br/>into Reality</motion.h2>
    <a href="mailto:Bhupendra8171121943@gmail.com" className="email-link">
      Bhupendra8171121943@gmail.com
    </a>
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
