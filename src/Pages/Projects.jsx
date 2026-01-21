import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Zap, FolderOpen } from 'lucide-react';
import '../CSS/Project.css';

// --- 1. ENHANCED DATA WITH JAGAT-EDUCATION ADDED ---
const projectsData = [





  // --- MERN / REACT PROJECTS ---
  {
    id: 1, // New Project ID
    title: "Jagat-Education",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop", // Education/Classroom Vibe
    desc: "Dynamic educational website featuring a responsive Hero section, course listings, and interactive UI components.",
    tech: ["React", "Vite", "Responsive UI", "CSS", "MongoDB" ],
    links: { live: "https://jagatverma142.github.io/Jagateducation/", repo: "#" }
  },
  {
    id: 2,
    title: "Jagat-Med Health Portal",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    desc: "Responsive medical website with dynamic routing and service listings deployed on GitHub Pages.",
    tech: ["React", "Vite", "Tailwind", "Gh-Pages", "Responsive Design","MongoDB"],
    links: { live: "https://jagatverma142.github.io/jagat_med_web/", repo: "#" }
  },
  {
    id: 3,
    title: "Online Course LMS",
    category: "MERN Stack",
    status: "Beta",
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
    desc: "Educational portal with restricted content, student progress tracking, and certification.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 4,
    title: "Personal Portfolio",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    desc: "High-performance personal portfolio showcasing skills, projects, and contact info.",
    tech: ["React", "Vite", "Framer Motion", "SEO"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 5,
    title: "Artist Portfolio",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    desc: "Visually-driven site featuring custom galleries and SEO-optimized content for artists.",
    tech: ["React", "CSS Grid", "Lazy Load"],
    links: { live: "#", repo: "#" }
  },
  // --- DJANGO PROJECTS ---
  {
    id: 6,
    title: "College Management System",
    category: "Django",
    status: "Live",
    img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/70adb7fe-aecc-5003-8393-e25f3f8ef6fd/2cb3812c-99df-5a39-a07f-1bcae2817edb.jpg",
    desc: "Comprehensive platform to manage student/faculty records and department schedules.",
    tech: ["Django", "MySQL", "Python", "HTML/CSS"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 7,
    title: "Hospital Patient Manager",
    category: "Django",
    status: "Live",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    desc: "Secure web app for patient records and appointments with Role-Based Access Control.",
    tech: ["Django", "RBAC", "Bootstrap", "SQLite"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 8,
    title: "Insurance Claim Portal",
    category: "Django",
    status: "Done",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
    desc: "Secure portal for users to submit claims and agents to track statuses with high data integrity.",
    tech: ["Django", "Python", "Secure Auth"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 9,
    title: "Food Ordering Site",
    category: "Django",
    status: "Beta",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    desc: "Dynamic e-commerce site featuring a real-time shopping cart and menu management APIs.",
    tech: ["Django", "REST API", "JavaScript", "AJAX"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 10,
    title: "Inventory Management",
    category: "Django",
    status: "Done",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    desc: "Automated system to track stock levels, generate reports, and manage supplier data.",
    tech: ["Django", "MySQL", "Chart.js"],
    links: { live: "#", repo: "#" }
  },

  

  // --- ADVANCED WORDPRESS PROJECTS ---
  {
    id: 11,
    title: "Headless E-Commerce",
    category: "WordPress",
    status: "Live",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop",
    desc: "Decoupled architecture using WordPress as CMS and Next.js for a lightning-fast frontend.",
    tech: ["Next.js", "WPGraphQL", "WooCommerce", "Tailwind"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 12,
    title: "Custom Real Estate Portal",
    category: "WordPress",
    status: "Done",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    desc: "Advanced property listing site with custom post types, advanced filtering, and map integration.",
    tech: ["Custom Theme", "ACF Pro", "Google Maps API", "PHP"],
    links: { live: "#", repo: "#" }
  },
  {
    id: 13,
    title: "Event Booking Plugin",
    category: "WordPress",
    status: "Plugin",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    desc: "Developed a custom booking plugin from scratch with AJAX validation and admin dashboard analytics.",
    tech: ["PHP", "Plugin Dev", "AJAX", "MySQL"],
    links: { live: "#", repo: "#" }
  }
];

const categories = ["All", "Django", "MERN Stack", "WordPress"];

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
          <h1 className="main-title">My Recent<br /> <span className="stroke-text">Projects</span></h1>
          <p>A showcase of Full-Stack, MERN & Advanced WordPress development.</p>
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
           <div className="filter-header"><Filter size={16} /> Filter Stack:</div>
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
          layout 
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
                  <img src={project.img} alt={project.title} loading="lazy" />
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
      
    </div>
  );
};

export default Projects;