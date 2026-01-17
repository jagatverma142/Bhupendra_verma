import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, Terminal, Cpu, Globe, ArrowRight, User, 
  FileText, Coffee, Camera, Gamepad2, Search, Zap, CheckCircle 
} from 'lucide-react';
import '../CSS/About.css';
import aboutImage from '../assets/about.jpeg'

// --- 1. ENHANCED DATA ---

const skillsData = [
  { category: "Frontend Power", items: ["React.js", "Next.js 14", "Tailwind CSS", "Framer Motion", "Redux Toolkit", "Three.js (Basics)"] },
  { category: "Backend & DB", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase Auth", "Supabase"] },
  { category: "Design Tools", items: ["Figma Pro", "Adobe XD", "Photoshop", "Illustrator", "Prototyping"] },
  { category: "DevOps & Tools", items: ["Git/GitHub", "Docker", "AWS (EC2)", "Vercel CI/CD", "Postman"] }
];

const experienceData = [
  { year: "2024 - Present", role: "Senior Web Developer", company: "Freelance / Agency", desc: "Leading web projects, managing client expectations, and building scalable full-stack applications using MERN stack." },
  { year: "2022 - 2023", role: "Frontend Developer", company: "Tech Startup", desc: "Developed responsive UI components, implemented dark mode systems, and optimized website Core Web Vitals score by 40%." },
  { year: "2021 - 2022", role: "Junior Web Designer", company: "Creative Studio", desc: "Designed wireframes, logos, and converted Figma designs into pixel-perfect HTML/CSS layouts." }
];

const processData = [
  { icon: <Search size={24} />, title: "Discovery", desc: "Understanding the problem, user research, and setting clear goals." },
  { icon: <Zap size={24} />, title: "Strategy", desc: "Planning the architecture, tech stack selection, and timeline." },
  { icon: <Code size={24} />, title: "Development", desc: "Clean coding with a focus on performance and scalability." },
  { icon: <CheckCircle size={24} />, title: "Launch", desc: "Testing, deployment, and post-launch optimization." }
];

const hobbiesData = [
  { icon: <Camera size={20} />, text: "Photography" },
  { icon: <Gamepad2 size={20} />, text: "Gaming" },
  { icon: <Coffee size={20} />, text: "Coffee Enthusiast" },
  { icon: <Globe size={20} />, text: "Traveling" }
];

// --- 2. ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- 3. SUB-COMPONENTS ---

const AboutHero = () => (
  <section className="about-hero-section">
    <div className="about-bg-glow"></div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.8 }}
      className="about-header"
    >
      <span className="pill-label">WHO I AM</span>
      <h1 className="main-title small-title">More Than Just<br />Pixels & Code.</h1>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
        style={{ color: '#888', marginTop: '10px' }}
      >
        I build digital products that look good and work even better.
      </motion.p>
    </motion.div>
  </section>
);

const BioSection = () => (
  <section className="section bio-section">
    <div className="about-container reversed">
      <motion.div 
        className="about-content"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
      >
        <h2>My Story</h2>
        <p className="bio-text">
          I am <span className="highlight-text">Bhupendra Verma</span>, a designer and developer driven by a passion for creating digital experiences that matter.
        </p>
        <p className="bio-text">
          My journey started 5 years ago. Since then, I've been obsessed with the intersection of <span className="highlight-text">logical coding</span> and <span className="highlight-text">creative design</span>. I don't just build websites; I build solutions that help businesses grow.
        </p>
        
        {/* Hobbies / Personal Side */}
        <div className="hobbies-wrapper">
           <p className="hobbies-label">BEYOND THE CODE:</p>
           <div className="hobbies-grid">
              {hobbiesData.map((h, i) => (
                <div key={i} className="hobby-pill">{h.icon} <span>{h.text}</span></div>
              ))}
           </div>
        </div>

        <div className="stats-grid">
           <div className="stat-box"><h3>05+</h3><p>Years</p></div>
           <div className="stat-box"><h3>50+</h3><p>Projects</p></div>
           <div className="stat-box"><h3>100%</h3><p>Commitment</p></div>
        </div>
      </motion.div>
      
      <motion.div 
        className="about-image"
        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      >
         <img src={aboutImage} alt="Bhupendra" className="glow-img" />
      </motion.div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="section process-section">
      <motion.div 
        className="section-header center-header"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
      >
        <span className="pill-label">WORKFLOW</span>
        <h2>How I Work</h2>
      </motion.div>

      <motion.div 
        className="process-grid"
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        {processData.map((step, i) => (
          <motion.div key={i} className="process-card" variants={fadeInUp} whileHover={{ y: -10 }}>
            <div className="process-icon">{step.icon}</div>
            <h3>0{i+1}. {step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
  </section>
);

const SkillsSection = () => (
  <section className="section skills-section">
    <div className="section-header">
      <span className="pill-label">MY ARSENAL</span>
      <h2>Tech Stack & Skills</h2>
    </div>
    <div className="skills-grid">
      {skillsData.map((skillGroup, index) => (
        <motion.div 
          key={index} 
          className="skill-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ borderColor: '#a3ff12', boxShadow: '0 0 15px rgba(163, 255, 18, 0.1)' }}
        >
          <h3>{skillGroup.category}</h3>
          <div className="skill-tags">
            {skillGroup.items.map((item, i) => (
              <span key={i} className="skill-tag">{item}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const TimelineSection = () => (
  <section className="section timeline-section">
    <div className="section-header-row">
       <div>
         <span className="pill-label">MY PATH</span>
         <h2>Experience</h2>
       </div>
       <motion.button 
         className="resume-btn"
         whileHover={{ scale: 1.05, backgroundColor: '#a3ff12', color: '#000' }}
         whileTap={{ scale: 0.95 }}
       >
         <FileText size={18} /> Download Resume
       </motion.button>
    </div>

    <div className="timeline">
      {experienceData.map((exp, index) => (
        <motion.div 
          key={index} 
          className="timeline-item"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <span className="timeline-year">{exp.year}</span>
            <h3>{exp.role}</h3>
            <h4>{exp.company}</h4>
            <p>{exp.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const CTABanner = () => (
  <motion.section 
    className="cta-banner"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
  >
    <div className="cta-content">
       <h2>Ready to build something amazing?</h2>
       <p>Let's collaborate and bring your vision to life.</p>
       <Link to="/contact">
         <motion.button className="cta-button" whileHover={{ scale: 1.05 }}>Let's Talk Project</motion.button>
       </Link>
    </div>
  </motion.section>
);

// --- 4. MAIN COMPONENT ---

const About = () => {
  return (
    <div className="home-container">
      {/* Note: Navbar `Home.jsx` ya Router se aayega */}
      
      <AboutHero />
      <BioSection />
      <ProcessSection /> {/* NEW SECTION */}
      <SkillsSection />
      <TimelineSection />
      <CTABanner />
      
      
    </div>
  );
};

export default About;