import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Layers, Zap, FolderOpen } from 'lucide-react';
import '../CSS/Project.css';

// --- 1. ENHANCED DATA ---
const projectsData = [
  {
    id: 1,
    title: "Neon E-Commerce",
    category: "Web Development",
    status: "Live",
    img: "https://placehold.co/600x400/111/a3ff12?text=E-Commerce",
    desc: "A full-stack shopping platform with real-time inventory, Stripe payments, and a dark-mode UI.",
    tech: ["Next.js", "Tailwind", "Stripe", "Supabase"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 2,
    title: "Fintech Dashboard",
    category: "UI/UX Design",
    status: "Concept",
    img: "https://placehold.co/600x400/222/a3ff12?text=Dashboard",
    desc: "A high-fidelity prototype for a banking app focusing on data visualization and user retention.",
    tech: ["Figma", "Chart.js", "React"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 3,
    title: "AI Image Generator",
    category: "Web App",
    status: "Beta",
    img: "https://placehold.co/600x400/000/fff?text=AI+Tool",
    desc: "An application allowing users to generate images from text prompts using OpenAI's DALL-E API.",
    tech: ["React", "Node.js", "OpenAI API", "MongoDB"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 4,
    title: "Luxury Hotel Booking",
    category: "Web Development",
    status: "Live",
    img: "https://placehold.co/600x400/333/a3ff12?text=Hotel+Site",
    desc: "A premium booking experience with virtual 3D tours and seamless reservation management.",
    tech: ["Vue.js", "GSAP", "Firebase"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 5,
    title: "Fitness Tracker App",
    category: "Mobile App",
    status: "Live",
    img: "https://placehold.co/600x400/111/fff?text=Mobile+App",
    desc: "Cross-platform mobile app for tracking workouts, diet, and progress with social features.",
    tech: ["React Native", "Expo", "GraphQL"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 6,
    title: "Corporate Rebranding",
    category: "Branding",
    status: "Done",
    img: "https://placehold.co/600x400/222/a3ff12?text=Brand+Identity",
    desc: "Complete visual identity overhaul including logo, typography, and design system.",
    tech: ["Illustrator", "Photoshop", "Brand Strategy"],
    links: { live: "#", repo: "#" }
  }
];

const categories = ["All", "Web Development", "UI/UX Design", "Web App", "Mobile App"];

// --- 2. ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

// --- 3. MAIN COMPONENT ---
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="bg-blur-orb"></div>
        <motion.div 
          className="hero-text-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="pill-label">PORTFOLIO</span>
          <h1 className="main-title">Selected<br /> <span className="stroke-text">Masterpieces</span></h1>
          <p>Explore a collection where code meets creativity.</p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="section projects-section">
        <motion.div 
          className="filter-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
           <div className="filter-header"><Filter size={16} /> Filter Projects:</div>
           <div className="filter-buttons">
             {categories.map((cat) => (
               <button 
                 key={cat} 
                 className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                 onClick={() => setActiveCategory(cat)}
               >
                 {cat}
               </button>
             ))}
           </div>
        </motion.div>

        {/* Dynamic Grid with Layout Animation */}
        <motion.div 
          className="projects-display-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout // This prop enables smooth shuffling
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className="project-display-card"
              >
                {/* Image Area */}
                <div className="card-image-box">
                  <img src={project.img} alt={project.title} />
                  <span className="status-badge">{project.status}</span>
                  <div className="card-actions">
                    <a href={project.links.repo} className="action-btn" title="View Code">
                      <Github size={20} />
                    </a>
                    <a href={project.links.live} className="action-btn" title="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="card-content">
                  <div className="card-top">
                    <span className="card-category"><FolderOpen size={12}/> {project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                  </div>
                  
                  <div className="card-bottom">
                    <div className="tech-stack">
                      {project.tech.map((t, i) => (
                        <span key={i} className="tech-badge">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
           <div className="no-results">
              <Zap size={40} />
              <p>No projects found in this category yet.</p>
           </div>
        )}
      </section>

      {/* Simple CTA Footer */}
      <footer className="footer-cta minimal-footer">
        <p>Want to see the code behind this portfolio?</p>
        <a href="https://github.com" className="github-link-btn">
           Check my GitHub <Github size={18} />
        </a>
      </footer>
    </div>
  );
};

export default Projects;