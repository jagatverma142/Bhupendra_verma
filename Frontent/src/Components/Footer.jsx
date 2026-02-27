import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Instagram, ArrowUp, Heart, Copy, Check, MapPin, Clock, ArrowRight 
} from 'lucide-react';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();
  const footerRef = useRef(null);

  // Parallax effect for background glows
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  // Live Clock Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("Bhupendra8171121943@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  // Word animation for the main heading
  const titleText = "Let's Create Something Iconic.";
  const titleWords = titleText.split(" ");

  const socialLinks = [
    { icon: <Github size={20} />, url: "https://github.com/", name: "GitHub" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com/", name: "LinkedIn" },
    { icon: <Twitter size={20} />, url: "https://twitter.com/", name: "Twitter" },
    { icon: <Instagram size={20} />, url: "https://instagram.com/", name: "Instagram" }
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
  ];

  const legalLinks = [
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Resume', path: '/resume.pdf', isExternal: true }
  ];

  return (
    <footer ref={footerRef} className="relative bg-[#030303] pt-10 pb-10 overflow-hidden border-t border-white/[0.05]">
      
      {/* Dynamic Parallax Background Glows */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" 
      />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      {/* 1. Moving Marquee Banner */}
      <div className="w-full overflow-hidden border-y border-white/[0.05] py-4 mb-16 bg-white/[0.01] relative flex items-center">
        <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap gap-8 text-white/10 text-3xl md:text-5xl font-black uppercase tracking-widest"
        >
          {Array(8).fill("LET'S WORK TOGETHER • ").map((text, i) => (
            <span key={i} className="hover:text-green-500/30 transition-colors duration-300">{text}</span>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="w-full max-w-[1200px] mx-auto px-5 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & CTA */}
          <motion.div className="lg:col-span-6 flex flex-col items-start" variants={itemVariants}>
            
            {/* Availability Badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-8 backdrop-blur-md cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_#22c55e]" />
              </span>
              <span className="text-green-400 text-[11px] font-bold tracking-widest uppercase">Available for Freelance</span>
            </div>
            
            {/* Animated Title */}
            <h2 className="text-4xl md:text-[3.5rem] font-black text-white leading-[1.1] mb-8 flex flex-wrap gap-x-3 gap-y-2">
              {titleWords.map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, type: "spring", damping: 12 } }
                  }}
                  className={word === "Iconic." ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600" : ""}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            
            {/* Copy Email Box */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between w-full max-w-[420px] bg-white/[0.03] border border-white/10 rounded-full p-2 pl-6 backdrop-blur-sm transition-colors hover:border-green-500/30 group"
            >
              <a href="mailto:Bhupendra8171121943@gmail.com" className="text-zinc-300 font-medium text-sm md:text-base truncate mr-4 group-hover:text-white transition-colors">
                Bhupendra8171121943@gmail.com
              </a>
              <motion.button 
                onClick={handleCopyEmail}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] shrink-0 hover:bg-green-400 transition-colors"
                aria-label="Copy Email"
              >
                <AnimatePresence mode='wait'>
                  {copied ? (
                    <motion.div key="check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                      <Check size={20} strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                      <Copy size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div className="lg:col-span-2 lg:col-start-8" variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Explore
            </h3>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className={`text-sm font-medium flex items-center gap-2 group transition-colors duration-300 ${location.pathname === link.path ? 'text-green-500' : 'text-zinc-400'}`}
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-500" />
                    <span className="group-hover:text-white transition-colors">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Legal & Resources */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
            <ul className="flex flex-col gap-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  {link.isExternal ? (
                    <a 
                      href={link.path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-zinc-400 text-sm font-medium flex items-center gap-2 group transition-colors duration-300 hover:text-white"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-500" />
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="text-zinc-400 text-sm font-medium flex items-center gap-2 group transition-colors duration-300 hover:text-white"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-500" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Divider */}
        <motion.div 
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" 
          variants={itemVariants} 
        />

        {/* Bottom Section (Location, Socials, Copyright) */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-8" 
          variants={itemVariants}
        >
          
          {/* Live Location & Time */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-zinc-400 text-sm font-medium bg-white/[0.02] border border-white/5 rounded-full px-5 py-2.5">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-500" />
              <span>Agra, India</span>
            </div>
            <span className="hidden sm:block text-white/20">|</span>
            <div className="flex items-center gap-2 text-zinc-300 font-mono bg-black/50 px-3 py-1 rounded-full border border-white/10">
              <Clock size={14} className="text-green-400" />
              {currentTime || "Loading..."}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-zinc-400 transition-colors group overflow-hidden"
                aria-label={`Visit my ${social.name}`}
                whileHover={{ y: -4, borderColor: "rgba(34,197,94,0.5)" }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-green-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover:text-green-400 transition-colors">{social.icon}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Very Bottom: Copyright & Up Arrow */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-6">
          <p className="text-zinc-600 text-sm font-medium flex items-center gap-1.5">
            © {new Date().getFullYear()} Bhupendra Verma. Made with <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><Heart size={14} className="text-red-500 fill-red-500 mx-0.5" /></motion.span>
          </p>
          
          <motion.button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-zinc-500 hover:text-green-400 text-sm font-bold uppercase tracking-widest transition-colors"
            aria-label="Scroll to top"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            Back to Top
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-green-500/50 group-hover:bg-green-500/10 transition-colors">
               <ArrowUp size={16} />
            </div>
          </motion.button>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;