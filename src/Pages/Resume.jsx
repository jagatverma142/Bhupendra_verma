import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Download, Briefcase, GraduationCap, Award, 
  Code2, Terminal, Cpu, CheckCircle2, Star, User 
} from 'lucide-react';
import '../CSS/Resume.css';

// --- DATA ---
const experienceData = [
  {
    role: "Web Developer",
    company: "Freelance / Agency",
    period: "2024 - Present",
    desc: "Leading full-stack development projects for clients.",
    tasks: [
      "Architected scalable MERN stack applications for 5+ clients.",
      "Reduced page load times by 40% using React.js optimization techniques.",
      "Mentored junior developers and conducted code reviews."
    ]
  },
  {
    role: "Frontend Developer",
    company: "Tech Startup",
    period: "2022 - 2023",
    desc: "Focused on building responsive and interactive UI components.",
    tasks: [
      "Translated Figma designs into pixel-perfect React components.",
      "Implemented Dark Mode and multi-language support (i18n).",
      "Collaborated with backend teams to integrate RESTful APIs."
    ]
  },
  {
    role: "Junior Web Designer",
    company: "Creative Studio",
    period: "2021 - 2022",
    desc: "Started journey with UI Design and basic frontend coding.",
    tasks: [
      "Designed wireframes and prototypes using Adobe XD.",
      "Maintained legacy WordPress sites for small business clients.",
      "Assisted in debugging CSS and layout issues."
    ]
  }
];

const educationData = [
  {
    degree: "Bachelor of Computer Applications",
    school: "University of Technology",
    year: "2020 - 2023",
    desc: "Specialized in Software Engineering and Data Structures."
  },
  {
    degree: "Full Stack Certification",
    school: "Udemy / Coursera",
    year: "2025",
    desc: "Completed intensive bootcamp on React.js development."
  }
];

const skills = {
  technical: ["React.js", "Next.js", "Python", "Tailwind CSS", "Django", "Framer Motion", "Git", "Figma", "REST APIs", "SEO Basics", "Responsive Design", "WordPress"],
  soft: ["Problem Solving", "Team Leadership", "Client Communication", "Agile Methodology", "Time Management", "Adaptability", "Creativity", "Critical Thinking", "Collaboration", "Attention to Detail"]
};

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }
};

// --- MAIN COMPONENT ---
const Resume = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="home-container">
      
      {/* Dynamic Hero */}
      <section className="resume-hero">
        <div className="resume-bg-orb"></div>
        <div className="resume-grid-bg"></div>
        
        <motion.div 
          className="resume-header-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="pill-label"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            CAREER TRAJECTORY
          </motion.span>
          
          <h1 className="main-title">
            Professional<br />
            <span className="stroke-text glow-text">Resume</span>
          </h1>
          
          <motion.a 
            href="/path-to-your-cv.pdf" 
            download="Bhupendra_Verma_Resume.pdf"
            className="download-btn-dynamic"
            whileHover={{ scale: 1.05, paddingLeft: "40px", paddingRight: "40px" }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} /> Download CV
          </motion.a>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="section resume-section" ref={ref}>
        <div className="resume-grid-layout">
          
          {/* LEFT: Experience (Timeline) */}
          <div className="resume-left">
            <motion.div 
              className="section-header-mobile"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="column-title"><Briefcase size={24} className="title-icon" /> Work Experience</h2>
            </motion.div>

            <div className="timeline-container">
              {/* The Moving Line */}
              <motion.div style={{ scaleY }} className="timeline-line-track" />

              {experienceData.map((exp, i) => (
                <motion.div 
                  key={i} 
                  className="timeline-item-dynamic"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="timeline-dot-wrapper">
                     <motion.div 
                       className="timeline-dot-dynamic" 
                       whileHover={{ scale: 1.4, borderColor: "#a3ff12" }}
                     />
                  </div>
                  
                  <motion.div 
                    className="timeline-card-content"
                    whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="card-header-row">
                        <span className="resume-date">{exp.period}</span>
                        <div className="mobile-role">
                            <h3>{exp.role}</h3>
                            <h4>{exp.company}</h4>
                        </div>
                    </div>
                    
                    {/* Desktop Role View (Hidden on Mobile) */}
                    <div className="desktop-role">
                        <h3>{exp.role}</h3>
                        <h4>{exp.company}</h4>
                    </div>

                    <p className="resume-desc">{exp.desc}</p>
                    <ul className="task-list">
                      {exp.tasks.map((task, k) => (
                        <li key={k}><CheckCircle2 size={16} className="bullet-icon"/> {task}</li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Education & Skills */}
          <div className="resume-right">
            
            {/* Education */}
            <motion.div 
              className="resume-block"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              <h2 className="column-title">
                <GraduationCap size={24} className="title-icon" /> Education
              </h2>
              {educationData.map((edu, i) => (
                <motion.div 
                  key={i} 
                  className="edu-card-dynamic"
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                >
                   <div className="edu-header">
                     <h3>{edu.degree}</h3>
                     <span className="edu-year">{edu.year}</span>
                   </div>
                   <h4>{edu.school}</h4>
                   <p>{edu.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills Container */}
            <div className="sticky-skills">
                {/* Tech Skills */}
                <div className="resume-block">
                <h2 className="column-title"><Cpu size={24} className="title-icon" /> Technical Skills</h2>
                <motion.div className="skill-tags-cloud" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {skills.technical.map((skill, i) => (
                    <motion.span 
                        key={i} className="resume-tag" variants={scaleIn}
                        whileHover={{ scale: 1.1, backgroundColor: "#00f0ff", color: "#000" }}
                    >
                        {skill}
                    </motion.span>
                    ))}
                </motion.div>
                </div>

                {/* Soft Skills */}
                <div className="resume-block">
                <h2 className="column-title"><User size={24} className="title-icon" /> Soft Skills</h2>
                <motion.div className="skill-tags-cloud" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {skills.soft.map((skill, i) => (
                    <motion.span 
                        key={i} className="resume-tag outline" variants={scaleIn}
                        whileHover={{ scale: 1.1, borderColor: "#a3ff12", color: "#a3ff12" }}
                    >
                        {skill}
                    </motion.span>
                    ))}
                </motion.div>
                </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="footer-cta minimal-footer">
        <p>Looking for the full story?</p>
        <a href="/projects" className="github-link-btn">View Portfolio Work</a>
      </footer>
    </div>
  );
};

export default Resume;