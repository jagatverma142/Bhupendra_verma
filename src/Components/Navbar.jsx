import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const location = useLocation();
  const { scrollY } = useScroll();

  // Smart Navbar: Hide on scroll down, Show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Background blur applying logic
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    
    // Hide/Show logic
    if (latest > previous && latest > 250 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Navigation Items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Framer Motion Variants for Mobile Menu
  const mobileMenuVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { 
      height: "100vh", 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.1 } 
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05, staggerDirection: -1 } 
    }
  };

  const mobileLinkVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { y: 20, opacity: 0 }
  };

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled 
          ? 'bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg shadow-green-900/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between">
        
        {/* Animated Branding / Logo */}
        <NavLink to="/" className="flex items-center gap-3 z-50 group">
          <motion.div 
            whileHover={{ rotateY: 180, scale: 1.1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-green-500 flex items-center justify-center text-green-500 font-bold text-xl relative overflow-hidden transition-colors"
          >
            <div className="absolute inset-0 bg-green-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">B</span>
          </motion.div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-white font-bold text-lg leading-tight tracking-wide">
              Bhupendra Verma
            </span>
            <motion.span 
              initial={false}
              animate={{ color: scrolled ? '#22c55e' : '#71717a' }}
              className="text-[10px] font-bold tracking-[2px] uppercase mt-0.5"
            >
              {scrolled ? 'Portfolio 2026' : 'Web Developer'}
            </motion.span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-2 py-1.5 rounded-full">
          <ul className="flex items-center gap-1 relative">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} className="relative z-10">
                  <NavLink 
                    to={item.path} 
                    className={`block px-5 py-2 text-sm font-medium transition-colors duration-300 relative z-20 ${
                      isActive ? 'text-green-500' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </NavLink>
                  {/* Fluid Sliding Pill for Active State */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-green-500/10 border border-green-500/20 rounded-full z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block pl-6">
          <NavLink to="/resume">
             <motion.button 
               whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(34,197,94,0.3)" }}
               whileTap={{ scale: 0.95 }}
               className="rounded-full bg-green-500 text-black px-7 py-2.5 text-sm font-bold transition-all hover:bg-green-400"
             >
               Resume
             </motion.button>
          </NavLink>
        </div>

        {/* Mobile Animated Hamburger Icon */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50 gap-[5px] relative" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <motion.span 
            animate={menuOpen ? { rotate: 45, y: 7, backgroundColor: "#22c55e" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[2px] rounded-full origin-center" 
          />
          <motion.span 
            animate={menuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, backgroundColor: "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[2px] rounded-full" 
          />
          <motion.span 
            animate={menuOpen ? { rotate: -45, y: -7, backgroundColor: "#22c55e" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[2px] rounded-full origin-center" 
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-0 left-0 w-full bg-[#050505]/95 backdrop-blur-2xl border-b border-white/5 flex flex-col items-center justify-center pt-20 pb-10 gap-6 md:hidden overflow-hidden origin-top"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.name} variants={mobileLinkVariants}>
                  <NavLink
                    to={item.path}
                    className={`text-3xl font-bold tracking-wide transition-colors relative flex items-center justify-center ${
                      isActive ? 'text-green-500' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span 
                        layoutId="mobile-dot"
                        className="absolute -left-6 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" 
                      />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
            
            <motion.div variants={mobileLinkVariants} className="mt-10 w-[80%] max-w-[300px]">
              <NavLink to="/resume" className="block w-full">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-full bg-green-500 text-black px-8 py-4 text-lg font-bold shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                >
                  View Resume
                </motion.button>
              </NavLink>
            </motion.div>

            {/* Decorative Mobile Elements */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }} 
              className="absolute bottom-10 text-zinc-600 text-xs tracking-widest font-bold uppercase"
            >
              Bhupendra Verma © 2026
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;