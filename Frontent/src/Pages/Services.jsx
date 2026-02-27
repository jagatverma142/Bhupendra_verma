import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  CheckCircle,
  Zap,
  Layout,
  Smartphone,
  Search,
  ArrowRight,
  ChevronDown,
  Clock,
  Shield,
  Layers,
  Mail,
  Sparkles,
  Settings,
  Server,
  PenTool,
  Globe,
  ExternalLink,
} from "lucide-react";

// -------------------- 1) DATA --------------------
const servicesData = [
  {
    icon: <Layout size={28} />,
    title: "Custom Web Design",
    desc: "Brand-centric design that matches your goals—no generic templates.",
    features: ["UI/UX Prototyping", "Design Systems", "Interactive Mockups", "Conversion-ready sections"],
  },
  {
    icon: <Smartphone size={28} />,
    title: "Frontend / Full-Stack Development",
    desc: "Pixel-perfect UI with clean structure and scalable components.",
    features: ["Responsive Development", "API Integration", "CMS Setup (Sanity/Strapi)", "Fast Loading Speeds"],
  },
  {
    icon: <Search size={28} />,
    title: "SEO & Performance",
    desc: "Better rankings + faster loading with solid technical setup.",
    features: ["Technical SEO", "Core Web Vitals", "Accessibility Basics", "Analytics Setup"],
  },
];

const portfolioPreviewData = [
  {
    title: "Jagat-Education",
    desc: "Responsive educational landing + course sections.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    live: "https://jagatverma142.github.io/Jagateducation/",
    tag: "MERN",
  },
  {
    title: "Jagat-Med Health Portal",
    desc: "Clean medical UI with modern layout and deployment.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    live: "https://jagatverma142.github.io/jagat_med_web/",
    tag: "MERN",
  },
  {
    title: "Point To Taxi",
    desc: "Client website with practical business sections.",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop",
    live: "http://pointtotaxi.in/",
    tag: "Client",
  },
];

const pricingData = {
  project: [
    {
      plan: "Landing Page",
      price: "$499",
      period: "/ one-time",
      desc: "Perfect for marketing campaigns.",
      features: ["1 Page Design", "Mobile Responsive", "Contact Form", "3–5 Days Delivery"],
      highlight: false,
    },
    {
      plan: "Business Site",
      price: "$1,299",
      period: "/ one-time",
      desc: "Best for small businesses.",
      features: ["Up to 5 Pages", "CMS Integration", "SEO Basics", "Animations", "2 Weeks Delivery"],
      highlight: true,
    },
    {
      plan: "Custom App",
      price: "$2,999+",
      period: "/ start",
      desc: "Full-scale custom solution.",
      features: ["Web App", "Database & Auth", "Advanced SEO", "Priority Support", "1 Month+ Delivery"],
      highlight: false,
    },
  ],
  retainer: [
    {
      plan: "Maintenance",
      price: "$99",
      period: "/ month",
      desc: "Keep your site secure.",
      features: ["Weekly Backups", "Updates", "Security Checks", "Uptime Monitoring"],
      highlight: false,
    },
    {
      plan: "Growth",
      price: "$499",
      period: "/ month",
      desc: "Content & SEO improvements.",
      features: ["Content Updates", "Monthly SEO Audit", "Performance Tweaks", "1 Hour Support"],
      highlight: true,
    },
    {
      plan: "Dedicated",
      price: "$1,499",
      period: "/ month",
      desc: "I am your dev team.",
      features: ["Unlimited Minor Edits", "Priority Dev", "Strategy Calls", "Monitoring"],
      highlight: false,
    },
  ],
};

const faqData = [
  { q: "How long does a project take?", a: "Scope par depend karta hai: landing page 3–5 days, full website 2–4 weeks." },
  { q: "Do you offer maintenance?", a: "Haan. Monthly Retainer mode select karke plans dekh sakte ho." },
  { q: "What do I need to provide?", a: "Logo/brand colors, images, content. Agar nahi hai, main help kar sakta hoon." },
  { q: "Do you work with WordPress?", a: "Main React/Next.js prefer karta hoon, but headless WordPress possible hai." },
];

// -------------------- 2) ANIMATION + UTILS --------------------
const sectionWrap = "w-full max-w-[1200px] mx-auto px-5";
const sectionPad = "py-20 md:py-24";

const containerV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUpV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const SectionHeading = ({ kicker, title, subtitle, align = "left" }) => (
  <motion.div variants={fadeUpV} className={align === "center" ? "text-center mb-14 md:mb-16" : "mb-14 md:mb-16"}>
    <div className={`inline-flex items-center gap-2 mb-3 ${align === "center" ? "justify-center" : ""}`}>
      <Sparkles size={16} className="text-green-500" />
      <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-[4px] text-green-500">{kicker}</span>
    </div>
    <h2 className="text-[2.2rem] md:text-[3rem] font-bold leading-tight text-white">{title}</h2>
    {subtitle && (
      <p
        className={`mt-4 text-zinc-400 font-light text-[1.05rem] ${
          align === "center" ? "max-w-[720px] mx-auto" : "max-w-[720px]"
        }`}
      >
        {subtitle}
      </p>
    )}
  </motion.div>
);

const Pill = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300">
    {children}
  </span>
);

// -------------------- 3) SECTIONS --------------------
const ServicesHero = () => (
  <section className={`${sectionWrap} pt-[130px] pb-[40px] md:pb-[70px] text-center relative overflow-hidden`}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_55%)]" />
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[12px] font-bold tracking-widest uppercase mb-8">
        WHAT I DO
      </div>

      <h1 className="text-[3rem] md:text-[5rem] font-black leading-[1.05] tracking-tight text-white">
        High-Impact <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Services</span>
      </h1>

      <p className="mt-6 text-zinc-400 font-light text-lg md:text-xl max-w-[780px] mx-auto">
        I design and build modern websites & web apps that are fast, responsive, and easy to grow.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href="#contact">
          <button className="inline-flex items-center gap-2 rounded-full bg-green-500 text-black px-8 py-4 text-[15px] font-bold hover:bg-green-400 transition-colors">
            Get a Quote <ArrowRight size={18} />
          </button>
        </a>
        <a href="/projects">
          <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-4 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors">
            View Work <ExternalLink size={18} />
          </button>
        </a>
      </div>
    </motion.div>
  </section>
);

const QuickNav = () => {
  const items = [
    { id: "services", label: "Services" },
    { id: "highlights", label: "Highlights" },
    { id: "work", label: "Work" },
    { id: "industries", label: "Industries" },
    { id: "tooling", label: "Tech Stack" },
    { id: "process", label: "Process" },
    { id: "addons", label: "Add-ons" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className={`${sectionWrap} pb-10`}>
      <motion.div variants={containerV} initial="hidden" animate="show" className="flex flex-wrap gap-2 justify-center">
        {items.map((x) => (
          <motion.button
            key={x.id}
            variants={fadeUpV}
            onClick={() => go(x.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold border border-white/10 bg-[#0a0a0a] text-zinc-300 hover:bg-white/5 hover:border-white/20 transition-colors"
            type="button"
          >
            {x.label}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

const TrustBar = () => {
  const trustItems = [
    { icon: <Clock size={22} className="text-green-500" />, title: "Fast delivery", desc: "Clear timelines and quick iterations." },
    { icon: <Shield size={22} className="text-green-500" />, title: "Reliable builds", desc: "Clean structure and maintainable code." },
    { icon: <Layers size={22} className="text-green-500" />, title: "Scalable sections", desc: "Reusable components and consistent UI." },
  ];

  return (
    <section id="highlights" className={`${sectionWrap} pb-6`}>
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {trustItems.map((x) => (
          <motion.div
            key={x.title}
            variants={fadeUpV}
            className="flex items-start gap-4 p-7 rounded-3xl border border-white/10 bg-[#0a0a0a] hover:border-white/20 transition-colors"
          >
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shrink-0">{x.icon}</div>
            <div>
              <div className="text-white font-bold text-lg">{x.title}</div>
              <div className="text-zinc-400 font-light text-sm mt-1">{x.desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ServicesGrid = () => (
  <section id="services" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
      <SectionHeading
        kicker="SERVICES"
        title="Design. Build. Optimize."
        align="center"
        subtitle="From landing pages to full websites and app-like dashboards—delivered with clean UI and performance-first approach."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {servicesData.map((s) => (
          <motion.div
            key={s.title}
            variants={fadeUpV}
            className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-9 hover:border-green-500/35 transition-colors"
          >
            <div className="mb-7 p-4 bg-white/5 rounded-2xl w-fit text-green-500 border border-white/10">
              {s.icon}
            </div>

            <div className="text-white font-bold text-2xl">{s.title}</div>
            <p className="text-zinc-400 font-light mt-3 leading-relaxed">{s.desc}</p>

            <ul className="mt-7 pt-6 border-t border-white/10 space-y-3">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const PortfolioPreviewSection = () => (
  <section id="work" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
      <SectionHeading
        kicker="WORK"
        title="Selected work"
        align="center"
        subtitle="A few live examples—more projects are available on the Projects page."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {portfolioPreviewData.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUpV}
            className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden hover:border-white/20 transition-colors"
          >
            <div className="relative aspect-[16/10] bg-zinc-900 border-b border-white/10 overflow-hidden">
              <motion.img
                src={p.img}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.55 }}
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white border border-white/10">
                {p.tag}
              </div>
            </div>

            <div className="p-8">
              <div className="text-white font-bold text-xl">{p.title}</div>
              <p className="text-zinc-400 font-light mt-2 leading-relaxed text-sm">{p.desc}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-bold hover:bg-zinc-200 transition-colors"
                >
                  Open Live <ExternalLink size={16} />
                </a>

                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  View all <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const IndustriesSection = () => {
  const industries = [
    { icon: <Globe size={18} className="text-green-500" />, title: "Business", desc: "Services pages, lead forms, fast UI." },
    { icon: <Shield size={18} className="text-green-500" />, title: "Healthcare", desc: "Clinic/hospital sections, trust-first layout." },
    { icon: <Layers size={18} className="text-green-500" />, title: "Education", desc: "Course listings, landing pages, structure." },
    { icon: <Clock size={18} className="text-green-500" />, title: "Travel", desc: "Tour landing pages and enquiry flows." },
  ];

  return (
    <section id="industries" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading
          kicker="INDUSTRIES"
          title="Where this fits best"
          align="center"
          subtitle="Practical UI patterns that work across real client needs."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((x) => (
            <motion.div key={x.title} variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center mb-4">
                {x.icon}
              </div>
              <div className="text-white font-bold">{x.title}</div>
              <div className="text-zinc-400 font-light text-sm mt-2 leading-relaxed">{x.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const TechStackSection = () => {
  const stacks = [
    { icon: <PenTool size={18} className="text-green-500" />, title: "Design", chips: ["Figma", "Wireframes", "UI System"] },
    { icon: <Layout size={18} className="text-green-500" />, title: "Frontend", chips: ["React", "Vite", "Tailwind", "Framer Motion"] },
    { icon: <Server size={18} className="text-green-500" />, title: "Backend", chips: ["Django (projects)", "REST APIs", "Auth patterns"] },
    { icon: <Settings size={18} className="text-green-500" />, title: "Deployment", chips: ["GitHub Pages", "Hosting setup", "Basic SEO"] },
  ];

  return (
    <section id="tooling" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="TECH STACK" title="Tools I use" subtitle="Modern stack choices for speed, maintainability, and clean UI." />

        <div className="grid gap-6 md:grid-cols-2">
          {stacks.map((x) => (
            <motion.div key={x.title} variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center">
                  {x.icon}
                </div>
                <div className="text-white font-bold text-lg">{x.title}</div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {x.chips.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { n: "01", title: "Discovery", desc: "Requirements, pages, audience, and content checklist." },
    { n: "02", title: "Design", desc: "Wireframe + UI direction + responsive layout decisions." },
    { n: "03", title: "Build", desc: "Components, animations, integrations, and QA." },
    { n: "04", title: "Launch", desc: "Deploy + basic SEO + handoff and support." },
  ];

  return (
    <section id="process" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="PROCESS" title="How we work" align="center" subtitle="Simple steps, clear communication, clean delivery." />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <motion.div key={s.n} variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-green-500/35 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/5 text-green-400 font-black tracking-widest">
                {s.n}
              </div>
              <div className="text-white font-bold text-lg mt-5">{s.title}</div>
              <div className="text-zinc-400 font-light text-sm mt-2 leading-relaxed">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const AddOnsSection = () => {
  const addons = [
    { title: "Copy/Content help", desc: "Sections text suggestions + structure improvement." },
    { title: "Extra pages", desc: "Add pages anytime (pricing depends on scope)." },
    { title: "Speed optimization", desc: "Image optimization + layout cleanup patterns." },
    { title: "Basic blog setup", desc: "If CMS included, I can configure a simple blog flow." },
  ];

  return (
    <section id="addons" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="ADD-ONS" title="Optional upgrades" subtitle="Pick what you need, keep it simple." />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {addons.map((x) => (
            <motion.div key={x.title} variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 hover:bg-white/5 transition-colors">
              <div className="text-white font-bold">{x.title}</div>
              <div className="text-zinc-400 font-light text-sm mt-2 leading-relaxed">{x.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const PricingSection = ({ pricingMode, setPricingMode, activePricing }) => (
  <section id="pricing" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
      <SectionHeading kicker="INVESTMENT" title="Simple pricing" align="center" subtitle="Choose per-project or monthly retainer plans." />

      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center p-1.5 rounded-full bg-white/5 border border-white/10">
          <button
            onClick={() => setPricingMode("project")}
            className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors z-10 ${
              pricingMode === "project" ? "text-black" : "text-zinc-400 hover:text-white"
            }`}
            type="button"
          >
            {pricingMode === "project" && (
              <motion.div layoutId="pricing-toggle" className="absolute inset-0 bg-green-500 rounded-full -z-10" />
            )}
            Per Project
          </button>

          <button
            onClick={() => setPricingMode("retainer")}
            className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors z-10 ${
              pricingMode === "retainer" ? "text-black" : "text-zinc-400 hover:text-white"
            }`}
            type="button"
          >
            {pricingMode === "retainer" && (
              <motion.div layoutId="pricing-toggle" className="absolute inset-0 bg-green-500 rounded-full -z-10" />
            )}
            Monthly Retainer
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AnimatePresence mode="wait">
          {activePricing.map((p, i) => (
            <motion.div
              key={`${pricingMode}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.28, delay: i * 0.08 }}
              className={`rounded-[2.5rem] border p-10 bg-[#0a0a0a] transition-colors ${
                p.highlight ? "border-green-500/45 md:-mt-4 md:mb-4 relative overflow-hidden" : "border-white/10 hover:border-white/20"
              }`}
            >
              {p.highlight && (
                <div className="absolute top-0 right-0 bg-green-500 text-black text-[11px] font-extrabold tracking-widest uppercase px-6 py-2 rounded-bl-2xl rounded-tr-[2.5rem]">
                  Most Popular
                </div>
              )}

              <div className="text-white font-bold text-2xl">{p.plan}</div>
              <div className="text-zinc-400 font-light text-sm mt-2">{p.desc}</div>

              <div className="mt-6">
                <span className="text-[3rem] font-black text-white">{p.price}</span>
                <span className="text-zinc-500 font-medium ml-2">{p.period}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-zinc-300">
                    <Zap size={16} className="text-green-500 shrink-0" />
                    <span className="text-[15px]">{f}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="block mt-10">
                <button
                  type="button"
                  className={`w-full py-4 rounded-full font-bold text-sm transition-colors ${
                    p.highlight ? "bg-green-500 text-black hover:bg-green-400" : "border border-white/20 bg-transparent text-white hover:bg-white/10"
                  }`}
                >
                  Get Started
                </button>
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  </section>
);

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <motion.div
    variants={fadeUpV}
    className={`rounded-2xl border transition-colors ${
      isOpen ? "border-green-500/50 bg-white/5" : "border-white/10 bg-[#0a0a0a] hover:bg-white/5"
    }`}
  >
    <button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left">
      <span className={`font-semibold text-lg ${isOpen ? "text-white" : "text-zinc-300"}`}>{faq.q}</span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
        <ChevronDown size={20} className={isOpen ? "text-green-500" : "text-zinc-500"} />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 font-light leading-relaxed text-[15px]">
            {faq.a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQSection = ({ openFaq, setOpenFaq }) => (
  <section id="faq" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
      <SectionHeading kicker="Q&A" title="Frequently asked questions" align="center" subtitle="Quick answers before we start." />

      <div className="grid gap-4 max-w-[900px] mx-auto">
        {faqData.map((faq, i) => (
          <FAQItem key={i} faq={faq} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
        ))}
      </div>

      <div className="text-center mt-10">
        <a href="/contact" className="text-green-400 hover:text-green-300 inline-flex items-center gap-2 font-medium transition-colors">
          Can't find an answer? Ask me <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  </section>
);

const FinalCTA = () => (
  <section id="contact" className={`${sectionWrap} pb-24`}>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-[3rem] border border-white/10 bg-[#0a0a0a] p-12 md:p-20 text-center relative overflow-hidden hover:border-green-500/30 transition-colors"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-green-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <h3 className="text-[2.2rem] md:text-[3.4rem] font-black text-white leading-tight">Ready to scale your business?</h3>
        <p className="text-zinc-400 font-light text-lg mt-4 max-w-[720px] mx-auto">
          Share pages + features you need, and I’ll suggest the best UI + timeline.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/contact">
            <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-10 py-4 text-[15px] font-bold hover:bg-zinc-200 transition-colors">
              Book a Call <Mail size={18} />
            </button>
          </a>
          <a href="/projects">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-10 py-4 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors">
              View Work <ArrowRight size={18} />
            </button>
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

// -------------------- 4) MAIN COMPONENT --------------------
const Services = () => {
  const [pricingMode, setPricingMode] = useState("project");
  const [openFaq, setOpenFaq] = useState(0);

  const activePricing = useMemo(() => pricingData[pricingMode], [pricingMode]);

  return (
    <MotionConfig transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-green-500/30 overflow-x-hidden">
        <ServicesHero />
        <QuickNav />
        <TrustBar />
        <ServicesGrid />
        <PortfolioPreviewSection />
        <IndustriesSection />
        <TechStackSection />
        <ProcessSection />
        <AddOnsSection />
        <PricingSection pricingMode={pricingMode} setPricingMode={setPricingMode} activePricing={activePricing} />
        <FAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <FinalCTA />
      </div>
    </MotionConfig>
  );
};

export default Services;
