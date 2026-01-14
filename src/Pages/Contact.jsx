import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, MapPin, Phone, Send, CheckCircle, Copy, 
  Linkedin, Instagram, Twitter, ArrowRight, Loader2, Sparkles 
} from 'lucide-react';
import '../CSS/Contact.css';

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
};

const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

// --- SUB-COMPONENTS ---

const ContactInfo = () => {
  const [copied, setCopied] = useState(false);
  const email = "Bhupendra8171121943@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div 
      className="contact-info-panel"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.span variants={fadeUp} className="pill-label">GET IN TOUCH</motion.span>
      <motion.h2 variants={fadeUp} className="info-title">Let's build something<br/>legendary.</motion.h2>
      <motion.p variants={fadeUp} className="info-desc">
        Whether you have a project in mind, a question, or just want to say hi, I'm always open to discussing new ideas.
      </motion.p>

      <motion.div variants={fadeUp} className="contact-methods">
        {/* Email Box */}
        <motion.div className="method-box" onClick={handleCopy} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <div className="icon-circle"><Mail size={20} /></div>
          <div className="method-text">
            <span className="label">Mail me at</span>
            <span className="value email-value">{email}</span>
          </div>
          <div className="copy-icon-wrapper">
             <AnimatePresence mode='wait'>
                {copied ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <CheckCircle size={20} color="#a3ff12" />
                    </motion.div>
                ) : (
                    <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                         <Copy size={18} />
                    </motion.div>
                )}
             </AnimatePresence>
          </div>
          {copied && <motion.span initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="copied-tooltip">Copied!</motion.span>}
        </motion.div>

        {/* Location Box */}
        <motion.div className="method-box" whileHover={{ x: 5 }}>
          <div className="icon-circle"><MapPin size={20} /></div>
          <div className="method-text">
            <span className="label">Based in</span>
            <span className="value">India (Available Worldwide)</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp} className="social-connect">
        <h3>Connect with me</h3>
        <div className="social-grid">
           {[{icon: Linkedin, text: "LinkedIn"}, {icon: Instagram, text: "Instagram"}, {icon: Twitter, text: "Twitter"}].map((item, i) => (
             <motion.a 
               key={i} href="#" className="social-btn"
               whileHover={{ scale: 1.05, backgroundColor: 'rgba(163, 255, 18, 0.1)', borderColor: '#a3ff12', color: '#a3ff12' }}
               whileTap={{ scale: 0.95 }}
             >
               <item.icon size={18} /> {item.text}
             </motion.a>
           ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
    }, 2000);
  };

  const handleChange = (e) => setFormState({...formState, [e.target.name]: e.target.value});

  return (
    <motion.div 
      className="contact-form-panel-wrapper"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <div className="contact-form-panel">
      <AnimatePresence mode='wait'>
        {isSent ? (
          <motion.div 
            key="success"
            className="success-message"
            variants={scaleIn} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div 
                className="success-icon"
                initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
                <Sparkles size={60} />
            </motion.div>
            <h3>Message Sent Successfully!</h3>
            <p>Thanks for reaching out, {formState.name}. I'll get back to you shortly.</p>
            <motion.button className="reset-btn" onClick={() => setIsSent(false)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={handleSubmit}
            key="form"
            variants={staggerContainer} initial="hidden" animate="visible" exit={{ opacity: 0, y: -20 }}
          >
            {['name', 'email', 'message'].map((field, i) => (
                <motion.div className="form-group" variants={fadeUp} key={field}>
                    <label htmlFor={field}>{field === 'message' ? 'Tell me about your project' : `What's your ${field}?`}</label>
                    {field === 'message' ? (
                        <textarea name={field} id={field} placeholder="I need a website for..." rows="5" value={formState[field]} onChange={handleChange} required />
                    ) : (
                        <input type={field === 'email' ? 'email' : 'text'} name={field} id={field} placeholder={field === 'name' ? 'John Doe' : 'john@example.com'} value={formState[field]} onChange={handleChange} required />
                    )}
                </motion.div>
            ))}

            <motion.div variants={fadeUp}>
                <motion.button 
                  type="submit" className="submit-btn" disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(163, 255, 18, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? <><Loader2 className="spin" size={20} /> Sending...</> : <>Send Message <ArrowRight size={20} /></>}
                </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

const Contact = () => {
  return (
    <div className="home-container">
      <section className="contact-section">
         <div className="bg-glow-orb-animated"></div>
         <div className="contact-wrapper">
            <ContactInfo />
            <ContactForm />
         </div>
      </section>
      
      <footer className="footer-cta minimal-footer">
        <p>© 2026 Bhupendra Verma. Crafted with React & Motion.</p>
      </footer>
    </div>
  );
};

export default Contact;