import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  Copy,
  Linkedin,
  Instagram,
  Twitter,
  ArrowRight,
  Loader2,
  Sparkles,
  Clock,
  Shield,
  Layers,
  ExternalLink,
  ChevronDown
} from "lucide-react";

// API Fetch logic import
import { apiFetch } from "../lib/api"; // Path adjust kar lijiye apne hisaab se

// -------------------- CONFIG --------------------
const CONTACT = {
  name: "Bhupendra Verma",
  email: "Bhupendra8171121943@gmail.com",
  phone: "+91 8171121943",
  location: "Agra, India (Available Worldwide)",
  socials: {
    linkedin: "#", // Add your link
    instagram: "#",
    twitter: "#",
  },
};

const servicesList = [
  { label: "Web Design (UI/UX)", value: "web-design" },
  { label: "Frontend Development (React)", value: "frontend" },
  { label: "Full-Stack (MERN/Django)", value: "fullstack" },
  { label: "SEO / Performance", value: "seo" },
  { label: "Fix / Redesign", value: "fix-redesign" },
];

const budgetList = [
  { label: "Not sure yet", value: "na" },
  { label: "$200 – $500", value: "200-500" },
  { label: "$500 – $1500", value: "500-1500" },
  { label: "$1500 – $3000", value: "1500-3000" },
  { label: "$3000+", value: "3000+" },
];

const timelineList = [
  { label: "ASAP", value: "asap" },
  { label: "1–2 weeks", value: "1-2w" },
  { label: "2–4 weeks", value: "2-4w" },
  { label: "1–2 months", value: "1-2m" },
  { label: "Flexible", value: "flexible" },
];

// -------------------- MOTION UTILS --------------------
const sectionWrap = "w-full max-w-[1200px] mx-auto px-5";
const sectionPad = "py-20 md:py-24";

const containerV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUpV = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const scaleInV = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

// -------------------- HELPERS --------------------
const encodeMailto = ({ to, subject, body }) => {
  const s = encodeURIComponent(subject || "");
  const b = encodeURIComponent(body || "");
  return `mailto:${to}?subject=${s}&body=${b}`;
};

async function copyToClipboardSmart(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "-9999px";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok;
}

// -------------------- UI ATOMS --------------------
const SectionHeading = ({ kicker, title, subtitle, align = "left" }) => (
  <motion.div variants={fadeUpV} className={align === "center" ? "text-center mb-16" : "mb-16"}>
    <div className={`inline-flex items-center gap-2 mb-4 ${align === "center" ? "justify-center" : ""}`}>
      <Sparkles size={16} className="text-green-500 animate-pulse" />
      <span className="text-[13px] font-bold uppercase tracking-[4px] text-green-500">{kicker}</span>
    </div>
    <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold leading-tight text-white mb-4">{title}</h2>
    {subtitle && (
      <p className={`text-zinc-400 font-light text-lg md:text-xl ${align === "center" ? "max-w-[760px] mx-auto" : "max-w-[760px]"}`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

const InfoRow = ({ icon, label, value, right }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 hover:border-white/20 hover:bg-white/[0.02] transition-colors group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-500 shrink-0 group-hover:bg-green-500/10 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase mb-1">{label}</div>
        <div className="text-zinc-200 font-medium break-all">{value}</div>
      </div>
    </div>
    <div className="w-full sm:w-auto flex justify-end">
      {right}
    </div>
  </div>
);

// -------------------- SECTIONS --------------------
const Hero = () => (
  <section className={`${sectionWrap} min-h-[75vh] flex flex-col justify-center items-center text-center relative overflow-hidden pt-[120px] pb-[60px]`}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[150px]" />
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[12px] font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        GET IN TOUCH
      </div>

      <h1 className="text-[3.5rem] md:text-[5.5rem] font-black leading-[1.05] tracking-tight text-white mb-6">
        Let’s build something <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">legendary.</span>
      </h1>

      <p className="text-zinc-400 font-light text-lg md:text-xl max-w-[700px] mx-auto mb-12">
        Share your idea (pages + features + timeline). I’ll reply with a clean plan and next steps.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-5 w-full">
        <a href="#form">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 rounded-full bg-green-500 text-black px-8 py-4 text-[16px] font-bold hover:bg-green-400 transition-colors shadow-lg">
            Send a message <ArrowRight size={18} />
          </motion.button>
        </a>
        <a href="#info">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-4 text-[16px] font-medium text-white hover:bg-white/10 transition-colors">
            Contact details <ExternalLink size={18} />
          </motion.button>
        </a>
      </div>
    </motion.div>
  </section>
);

const TrustStrip = () => {
  const items = [
    { icon: <Clock size={24} className="text-green-500" />, title: "Quick replies", desc: "Usually within 24–48 hours." },
    { icon: <Shield size={24} className="text-green-500" />, title: "Clear scope", desc: "Pages + features defined early." },
    { icon: <Layers size={24} className="text-green-500" />, title: "Clean delivery", desc: "Responsive UI & reusable logic." },
  ];

  return (
    <section className={`${sectionWrap} pb-16`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid gap-6 md:grid-cols-3">
        {items.map((x) => (
          <motion.div key={x.title} variants={fadeUpV} className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] hover:border-white/20 transition-colors group">
            <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center shrink-0 group-hover:bg-green-500/10 transition-colors">
              {x.icon}
            </div>
            <div>
              <div className="text-white font-bold text-lg mb-2">{x.title}</div>
              <div className="text-zinc-400 font-light text-sm">{x.desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ContactInfoPanel = () => {
  const [copied, setCopied] = useState(false);
  const [copyErr, setCopyErr] = useState(false);

  const onCopy = async () => {
    try {
      setCopyErr(false);
      const ok = await copyToClipboardSmart(CONTACT.email);
      if (!ok) setCopyErr(true);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyErr(true);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div variants={fadeUpV} className="h-full rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-12 flex flex-col justify-between">
      <div>
        <h3 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4">
          Contact <br /> Information
        </h3>
        <p className="text-zinc-400 font-light leading-relaxed mb-10 text-lg">
          Prefer reaching out directly? Use the details below. I’m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>

        <div className="grid gap-4">
          <InfoRow
            icon={<Mail size={20} />}
            label="Email"
            value={CONTACT.email}
            right={
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all"
                title="Copy email"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div key="check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                      <CheckCircle size={16} /> Copied
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                      <Copy size={16} /> Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            }
          />
          <InfoRow
            icon={<Phone size={20} />}
            label="Phone / WhatsApp"
            value={CONTACT.phone}
            right={
              <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all">
                  Call Now
                </span>
              </a>
            }
          />
          <InfoRow icon={<MapPin size={20} />} label="Location" value={CONTACT.location} />
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase mb-4">Connect on Social</div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(CONTACT.socials).map(([name, link]) => (
            <motion.a
              key={name}
              href={link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5, backgroundColor: "#22c55e", color: "#000" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-zinc-300 font-semibold transition-colors capitalize"
            >
              {name === 'linkedin' && <Linkedin size={18} />}
              {name === 'instagram' && <Instagram size={18} />}
              {name === 'twitter' && <Twitter size={18} />}
              {name}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ContactFormPanel = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: servicesList[0].value,
    budget: budgetList[0].value,
    timeline: timelineList[1].value,
    message: "",
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  // INTEGRATED LOGIC HERE
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSent(false); // Make sure success state is reset
    setSubmitError(""); // Clear previous errors

    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form)
      });

      setIsSent(true);
      // Optional: reset fields
      // setForm({ name: "", email: "", service: servicesList[0].value, budget: budgetList[0].value, timeline: timelineList[1].value, message: "", consent: true });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoAfter = useMemo(() => {
    const subject = `Project Inquiry: ${form.name || "New lead"}`;
    const body = `Hi Bhupendra,%0A%0AName: ${form.name}%0AEmail: ${form.email}%0AService: ${form.service}%0ABudget: ${form.budget}%0ATimeline: ${form.timeline}%0A%0AMessage:%0A${encodeURIComponent(form.message || "")}%0A%0AThanks`;
    return encodeMailto({ to: CONTACT.email, subject, body });
  }, [form]);

  return (
    <motion.div variants={fadeUpV} className="h-full rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-12 relative overflow-hidden">
       {/* Background accent for form */}
       <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.div key="success" variants={scaleInV} initial="hidden" animate="show" exit="hidden" className="h-full flex flex-col items-center justify-center text-center py-10 relative z-10">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-24 h-24 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-500 mb-8"
            >
              <CheckCircle size={40} />
            </motion.div>
            <h3 className="text-white font-black text-3xl md:text-4xl mb-4">Message Sent!</h3>
            <p className="text-zinc-400 text-lg mb-10 max-w-[400px]">
              Thank you, {form.name || "there"}. I've received your inquiry and will get back to you within 24 hours.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsSent(false)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Send another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} variants={containerV} initial="hidden" animate="show" className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-10">
              <h3 className="text-white font-black text-3xl md:text-4xl leading-tight">
                Project Details
              </h3>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300">
                <Shield size={14} className="text-green-500" /> Secure
              </div>
            </div>

            <div className="grid gap-6 flex-grow">
              <motion.div variants={fadeUpV} className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-zinc-300 text-sm font-semibold mb-2 block">Your name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-green-500/50 focus:bg-white/5 transition-all"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 text-sm font-semibold mb-2 block">Email address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="john@company.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-green-500/50 focus:bg-white/5 transition-all"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUpV} className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="text-zinc-300 text-sm font-semibold mb-2 block">Service needed</label>
                  <div className="relative">
                    <select
                      name="service"
                      value={form.service}
                      onChange={onChange}
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-zinc-200 outline-none focus:border-green-500/50 focus:bg-white/5 transition-all cursor-pointer"
                    >
                      {servicesList.map((x) => <option key={x.value} value={x.value} className="bg-[#0a0a0a]">{x.label}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-zinc-300 text-sm font-semibold mb-2 block">Est. Budget</label>
                  <div className="relative">
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={onChange}
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-zinc-200 outline-none focus:border-green-500/50 focus:bg-white/5 transition-all cursor-pointer"
                    >
                      {budgetList.map((x) => <option key={x.value} value={x.value} className="bg-[#0a0a0a]">{x.label}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-zinc-300 text-sm font-semibold mb-2 block">Timeline</label>
                  <div className="relative">
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={onChange}
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-zinc-200 outline-none focus:border-green-500/50 focus:bg-white/5 transition-all cursor-pointer"
                    >
                      {timelineList.map((x) => <option key={x.value} value={x.value} className="bg-[#0a0a0a]">{x.label}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUpV}>
                <label className="text-zinc-300 text-sm font-semibold mb-2 block">Project Details</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={5}
                  placeholder="Tell me about your goals, specific features needed, and any reference websites..."
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-green-500/50 focus:bg-white/5 transition-all resize-none"
                />
              </motion.div>
            </div>

            {/* Error Message UI */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={fadeUpV} className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={onChange}
                  className="mt-1 w-4 h-4 rounded border-white/20 text-green-500 focus:ring-green-500/50 bg-black/50 cursor-pointer"
                />
                <span className="text-zinc-400 font-light text-sm leading-relaxed max-w-[300px] group-hover:text-zinc-300 transition-colors">
                  I agree to be contacted regarding this inquiry.
                </span>
              </label>

              <motion.button
                type="submit"
                disabled={isSubmitting || !form.consent}
                whileHover={!isSubmitting && form.consent ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting && form.consent ? { scale: 0.95 } : {}}
                className={`inline-flex items-center justify-center gap-3 rounded-full px-10 py-4 text-[16px] font-bold transition-all ${
                  isSubmitting || !form.consent
                    ? "bg-white/5 text-white/30 border border-white/10 cursor-not-allowed"
                    : "bg-green-500 text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                }`}
              >
                {isSubmitting ? (
                  <><Loader2 size={20} className="animate-spin" /> Sending...</>
                ) : (
                  <>Send Request <Send size={18} /></>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: "How soon do you reply?", a: "Usually within 24–48 hours depending on my current timezone and availability." },
    { q: "What info should I send?", a: "To get the most accurate quote, please include required pages, features, reference websites, deadline, and your budget range." },
    { q: "Do you handle redesigns & fixes?", a: "Yes! Whether it's a complete UI overhaul or fixing specific performance bugs, I can help." },
    { q: "Can we start with a small scope?", a: "Absolutely. We can begin with a landing page or MVP, and scale up the features later as your business grows." },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="Q&A" title="Frequently asked questions" align="center" subtitle="Quick answers before we jump on a call." />

        <div className="grid gap-4 max-w-[900px] mx-auto">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                variants={fadeUpV}
                className={`rounded-2xl border transition-colors ${
                  isOpen ? "border-green-500/50 bg-white/5" : "border-white/10 bg-[#0a0a0a] hover:bg-white/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
                >
                  <span className={`font-semibold text-lg ${isOpen ? "text-white" : "text-zinc-300"}`}>{f.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} className={isOpen ? "text-green-500" : "text-zinc-500"} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 font-light leading-relaxed text-lg">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

// -------------------- MAIN PAGE --------------------
const Contact = () => {
  return (
    <MotionConfig transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-green-500/30 overflow-x-hidden">
        
        <Hero />
        <TrustStrip />

        {/* Contact Split Section */}
        <section className={`${sectionWrap} ${sectionPad}`} id="info">
          <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <div className="grid gap-8 lg:grid-cols-2 items-stretch">
              <ContactInfoPanel />
              <div id="form" className="h-full">
                <ContactFormPanel />
              </div>
            </div>
          </motion.div>
        </section>

        <FAQSection />
        
      </div>
    </MotionConfig>
  );
};

export default Contact;