import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Zap, Layout, Smartphone, Search, 
  ArrowRight, ChevronDown, ChevronUp, Clock, Shield 
} from 'lucide-react';
import '../CSS/Services.css';

// --- 1. DYNAMIC DATA ---
const servicesData = [
  {
    icon: <Layout size={32} />,
    title: "Custom Web Design",
    desc: "I craft unique, brand-centric designs that captivate your audience. No templates, just pure creativity tailored to your goals.",
    features: ["UI/UX Prototyping", "Figma Design Files", "Interactive Mockups", "Design Systems"]
  },
  {
    icon: <Smartphone size={32} />,
    title: "Full-Stack Development",
    desc: "Turning designs into pixel-perfect, high-performance code using modern technologies like React, Next.js, and Node.",
    features: ["Responsive Development", "API Integration", "CMS Setup (Sanity/Strapi)", "Fast Loading Speeds"]
  },
  {
    icon: <Search size={32} />,
    title: "SEO & Performance",
    desc: "A beautiful website is useless if no one finds it. I optimize your site to rank higher and load instantly.",
    features: ["Technical SEO", "Core Web Vitals", "Accessibility (WCAG)", "Google Analytics"]
  }
];

const pricingData = {
  project: [
    {
      plan: "Landing Page",
      price: "$499",
      period: "/ one-time",
      desc: "Perfect for marketing campaigns.",
      features: ["1 Page Design", "Mobile Responsive", "Contact Form", "3 Days Delivery"],
      highlight: false
    },
    {
      plan: "Business Site",
      price: "$1,299",
      period: "/ one-time",
      desc: "Best for small businesses.",
      features: ["5 Pages Website", "CMS Integration", "SEO Basics", "Animation Effects", "2 Weeks Delivery"],
      highlight: true
    },
    {
      plan: "Custom App",
      price: "$2,999+",
      period: "/ start",
      desc: "Full-scale custom solution.",
      features: ["Web Application", "Database & Auth", "Advanced SEO", "Priority Support", "1 Month+ Delivery"],
      highlight: false
    }
  ],
  retainer: [
    {
      plan: "Maintenance",
      price: "$99",
      period: "/ month",
      desc: "Keep your site secure.",
      features: ["Weekly Backups", "Plugin Updates", "Security Checks", "Uptime Monitoring"],
      highlight: false
    },
    {
      plan: "Growth",
      price: "$499",
      period: "/ month",
      desc: "Content & SEO improvements.",
      features: ["2 Blog Posts", "Monthly SEO Audit", "Performance Tweaks", "1 Hour Support"],
      highlight: true
    },
    {
      plan: "Dedicated",
      price: "$1,499",
      period: "/ month",
      desc: "I am your dev team.",
      features: ["Unlimited Minor Edits", "Priority Development", "Strategy Calls", "24/7 Monitoring"],
      highlight: false
    }
  ]
};

const faqData = [
  { q: "How long does a project take?", a: "It depends on the scope. A simple landing page takes 3-5 days, while a full website takes 2-4 weeks." },
  { q: "Do you offer maintenance?", a: "Yes! You can switch the pricing toggle above to see my monthly maintenance packages." },
  { q: "What do I need to provide?", a: "I'll need your logo, brand colors, images, and text content. If you don't have them, I can help create them." },
  { q: "Do you work with WordPress?", a: "I specialize in React/Next.js for better performance, but I can work with Headless WordPress if needed." }
];

// --- 2. ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- 3. SUB-COMPONENTS ---

const ServicesHero = () => (
  <section className="services-hero">
    <div className="hero-glow"></div>
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span className="pill-label">WHAT I DO</span>
      <h1 className="main-title">High-Impact<br /><span className="stroke-text">Solutions</span></h1>
      <p className="hero-desc">I help ambitious businesses scale through design and technology.</p>
    </motion.div>
  </section>
);

const FAQItem = ({ faq, isOpen, toggle }) => (
  <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={toggle}>
    <div className="faq-question">
      <h3>{faq.q}</h3>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
        <ChevronDown size={20} color={isOpen ? "#a3ff12" : "#888"} />
      </motion.div>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="faq-answer"
        >
          <p>{faq.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- 4. MAIN COMPONENT ---

const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [pricingMode, setPricingMode] = useState('project'); // 'project' or 'retainer'

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
  const activePricing = pricingData[pricingMode];

  return (
    <div className="home-container">
      <ServicesHero />

      {/* Services Grid with Staggered Animation */}
      <section className="section services-details">
        <motion.div 
          className="services-grid-large"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {servicesData.map((service, i) => (
            <motion.div 
              key={i} 
              className="service-box"
              variants={itemVariants}
              whileHover={{ y: -10, borderColor: '#a3ff12' }}
            >
              <div className="service-icon-large">{service.icon}</div>
              <h2>{service.title}</h2>
              <p>{service.desc}</p>
              <ul className="feature-list">
                {service.features.map((f, k) => (
                  <li key={k}><CheckCircle size={16} className="check-icon" /> {f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Plans with Toggle */}
      <section className="section pricing-section">
        <div className="section-header center-header">
           <span className="pill-label">INVESTMENT</span>
           <h2>Simple Pricing</h2>
           
           {/* Custom Toggle Switch */}
           <div className="pricing-toggle-container">
             <span className={pricingMode === 'project' ? 'active-mode' : ''}>Per Project</span>
             <div 
               className={`toggle-switch ${pricingMode === 'retainer' ? 'toggled' : ''}`} 
               onClick={() => setPricingMode(prev => prev === 'project' ? 'retainer' : 'project')}
             >
               <motion.div className="toggle-circle" layout transition={{ type: "spring", stiffness: 700, damping: 30 }} />
             </div>
             <span className={pricingMode === 'retainer' ? 'active-mode' : ''}>Monthly Retainer</span>
           </div>
        </div>
        
        <div className="pricing-grid">
           <AnimatePresence mode='wait'>
             {activePricing.map((item, i) => (
               <motion.div 
                 key={`${pricingMode}-${i}`} // Key change triggers animation
                 className={`pricing-card ${item.highlight ? 'featured' : ''}`}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.3, delay: i * 0.1 }}
               >
                 {item.highlight && <div className="popular-badge">Most Popular</div>}
                 <h3>{item.plan}</h3>
                 <div className="price-row">
                    <span className="price">{item.price}</span>
                    <span className="period">{item.period}</span>
                 </div>
                 <p className="price-desc">{item.desc}</p>
                 <hr />
                 <ul>
                   {item.features.map((f, k) => (
                     <li key={k}><Zap size={14} /> {f}</li>
                   ))}
                 </ul>
                 <Link to="/contact">
                   <button className={`price-btn ${item.highlight ? 'glow-btn' : ''}`}>Get Started</button>
                 </Link>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
         <div className="faq-container">
            <div className="faq-header">
               <span className="pill-label">Q&A</span>
               <h2>Frequently Asked<br/>Questions</h2>
               <Link to="/contact" className="ask-link">Can't find answer? Ask me <ArrowRight size={16}/></Link>
            </div>
            <div className="faq-list">
               {faqData.map((faq, i) => (
                 <FAQItem key={i} faq={faq} isOpen={openFaq === i} toggle={() => toggleFaq(i)} />
               ))}
            </div>
         </div>
      </section>

      {/* Footer CTA */}
      <footer className="footer-cta minimal-footer">
         <h2>Ready to scale your business?</h2>
         <p>Let's build something extraordinary together.</p>
         <div className="cta-row">
            <Link to="/contact"><button className="cta-button">Book a Call</button></Link>
            <Link to="/projects"><button className="outline-btn">View Work</button></Link>
         </div>
      </footer>
    </div>
  );
};

export default Services;