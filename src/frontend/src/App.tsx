import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ===== TYPEWRITER HOOK =====
function useTypewriter(texts: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < current.length) {
            setDisplayed(current.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          if (charIndex > 0) {
            setDisplayed(current.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setDeleting(false);
            setTextIndex((i) => (i + 1) % texts.length);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, speed, pause]);

  return displayed;
}

// ===== INTERSECTION OBSERVER HOOK =====
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ===== PROFILE PICTURE COMPONENT =====
function ProfileAvatar({
  size = 200,
  className = "",
}: { size?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: Math.round(size * 1.3),
        borderRadius: "50%",
        overflow: "hidden",
        border: "10px solid #FFD700",
        animation:
          "vipFade 2s ease-in-out forwards, vipPulse 3s ease-in-out infinite",
        flexShrink: 0,
      }}
    >
      <img
        src="/assets/uploads/1773062821656-1.jpg"
        alt="Afzal Mughal"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
          display: "block",
          animation: "profileEnter 2s ease-in-out forwards",
        }}
      />
    </div>
  );
}

// ===== FIX 2 — SECTION TITLE with uppercase tracking + ✦ glyph =====
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-display flex items-baseline gap-0">
        <span className="section-title-glyph">✶</span>
        <span className="section-title-text">{children}</span>
      </h2>
      <div className="section-line" />
    </div>
  );
}

// ===== NAVBAR =====
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="navbar"
      style={{
        boxShadow: scrolled
          ? "0 4px 30px rgba(255,215,0,0.08), 0 2px 8px rgba(0,0,0,0.5)"
          : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNav("#hero")}
          className="font-display font-bold text-xl gold-text"
          style={{
            letterSpacing: "0.12em",
            background: "none",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
          data-ocid="nav.link"
        >
          👑 AM
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(l.href);
              }}
              className="text-xs font-semibold transition-colors duration-200"
              style={{
                color: "rgba(210,220,240,0.75)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#FFD700";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color =
                  "rgba(210,220,240,0.75)";
              }}
              data-ocid="nav.link"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{ background: "#FFD700" }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(5,5,20,0.97)",
              borderTop: "1px solid rgba(255,215,0,0.18)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(l.href);
                  }}
                  className="transition-colors py-1 text-xs font-semibold uppercase"
                  style={{
                    color: "rgba(210,220,240,0.85)",
                    letterSpacing: "0.1em",
                  }}
                  data-ocid="nav.link"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ===== HERO =====
function Hero() {
  const subtitle = useTypewriter(
    ["Frontend Developer", "HTML | CSS", "Creative Coder"],
    90,
    1600,
  );

  return (
    <section
      id="hero"
      className="hero-bg min-h-screen flex flex-col items-center justify-center relative"
      data-ocid="hero.section"
    >
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-stars" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-display tracking-widest uppercase mb-6"
          style={{ color: "rgba(255,215,0,0.7)", letterSpacing: "0.25em" }}
        >
          ✨ Welcome to my portfolio ✨
        </motion.p>

        {/* FIX 3 — Avatar wrapped in spotlight halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.05,
            type: "spring",
            stiffness: 110,
          }}
          className="flex justify-center mb-8"
        >
          {/* The .avatar-spotlight wrapper renders the radial bloom via ::before */}
          <div className="avatar-spotlight">
            <ProfileAvatar size={200} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl mb-4"
          style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          <span className="rainbow-text">Afzal Mughal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-xs tracking-widest uppercase mb-5"
          style={{ color: "rgba(255,215,0,0.45)", letterSpacing: "0.2em" }}
        >
          👑  VIP Developer Portfolio  👑
        </motion.p>

        {/* Gold separator line between name and typewriter */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          style={{
            width: 120,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)",
            margin: "0 auto 20px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl mb-12 h-10 flex items-center justify-center gap-3"
          style={{ fontWeight: 600 }}
        >
          <span
            style={{
              borderRight: "3px solid #FFD700",
              paddingRight: 8,
              color: "#e2e8f0",
            }}
          >
            {subtitle}
          </span>
          <span className="typewriter-cursor" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          {/* Primary CTA — gold solid */}
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              color: "#0a0a1a",
              border: "none",
              borderRadius: 30,
              padding: "14px 36px",
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(255,215,0,0.45)",
              transition: "all 0.3s ease",
              letterSpacing: "0.06em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 40px rgba(255,215,0,0.65)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 24px rgba(255,215,0,0.45)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
            }}
            data-ocid="hero.primary_button"
          >
            ✨ Explore My Work
          </button>

          {/* FIX 3 — Secondary CTA upgraded: glass bg + thicker border */}
          <a
            href="https://wa.me/923278172478"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "rgba(255,215,0,0.07)",
              color: "#FFD700",
              border: "2px solid rgba(255,215,0,0.65)",
              borderRadius: 30,
              padding: "14px 36px",
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              transition: "all 0.3s ease",
              letterSpacing: "0.06em",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,215,0,0.14)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,215,0,0.9)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 24px rgba(255,215,0,0.25)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,215,0,0.07)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,215,0,0.65)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
            }}
            data-ocid="hero.secondary_button"
          >
            💬 Let’s Chat
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="scroll-indicator" />
        </motion.div>
      </div>
    </section>
  );
}

// ===== ABOUT =====
function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="px-4 py-6"
      ref={ref}
      data-ocid="about.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto dark-glass-card p-8"
      >
        <SectionTitle>About Me</SectionTitle>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="avatar-spotlight">
              <ProfileAvatar size={160} />
            </div>
          </div>
          <div>
            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: "#cbd5e1" }}
            >
              Hello! My name is{" "}
              <strong style={{ color: "#FFD700" }}>Afzal Mughal</strong>. I am
              an IT student and I create simple websites.
            </p>
            <p className="mb-3" style={{ color: "#94a3b8" }}>
              <strong style={{ color: "#e2e8f0" }}>Location:</strong> Umerkot,
              Sindh, Pakistan
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Curious", "Dedicated", "Tech-Enthusiast", "Fast Learner"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,215,0,0.08)",
                      border: "1px solid rgba(255,215,0,0.35)",
                      color: "#FFD700",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ===== EDUCATION =====
function Education() {
  const { ref, inView } = useInView();
  return (
    <section
      id="education"
      className="px-4 py-6"
      ref={ref}
      data-ocid="education.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto dark-glass-card p-8"
      >
        <SectionTitle>Education</SectionTitle>
        <div className="flex items-start gap-4">
          <div
            className="text-3xl w-14 h-14 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              background: "rgba(255,215,0,0.08)",
              border: "1px solid rgba(255,215,0,0.25)",
            }}
          >
            🎓
          </div>
          <div>
            <p className="font-bold text-lg gold-text">
              BS Information Technology (3rd Year)
            </p>
            <p style={{ color: "#94a3b8" }}>
              Sindh Agriculture University Umerkot Campus
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ===== SKILLS =====
const SKILLS = [
  { label: "HTML", percent: 90 },
  { label: "CSS", percent: 80 },
  { label: "Website Design", percent: 75 },
];

function Skills() {
  const { ref, inView } = useInView();

  return (
    <section
      id="skills"
      className="px-4 py-6"
      ref={ref}
      data-ocid="skills.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto dark-glass-card p-8"
      >
        <SectionTitle>My Skills</SectionTitle>

        <div className="space-y-5">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              data-ocid={`skills.item.${i + 1}`}
            >
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span style={{ color: "#e2e8f0" }}>{skill.label}</span>
                <span className="gold-text">{skill.percent}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill"
                  style={{ width: inView ? `${skill.percent}%` : "0%" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tea Making Fun Item */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 p-4 rounded-xl text-center"
          style={{
            background: "rgba(255,215,0,0.05)",
            border: "1px dashed rgba(255,215,0,0.25)",
          }}
        >
          <p className="font-bold text-lg gold-text">☕ Tea Making Skill</p>
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            Coding + Tea = Productivity ⚡
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ===== PROJECTS =====
const PROJECTS = [
  {
    icon: "🌐",
    title: "Portfolio Website",
    desc: "A personal developer portfolio to showcase skills, education, and projects.",
    btnClass: "pill-btn pill-btn-blue",
  },
  {
    icon: "🍽",
    title: "Restaurant Website",
    desc: "I created a demo restaurant website for Al Jannat Hotel Umerkot.",
    btnClass: "pill-btn pill-btn-red",
  },
  {
    icon: "📊",
    title: "Student Record Table",
    desc: "I created a student record table design for WhatsApp sharing.",
    btnClass: "pill-btn pill-btn-green",
  },
];

function Projects() {
  const { ref, inView } = useInView();

  return (
    <section
      id="projects"
      className="px-4 py-6"
      ref={ref}
      data-ocid="projects.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto dark-glass-card p-8"
      >
        <SectionTitle>Projects</SectionTitle>

        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              data-ocid={`projects.item.${i + 1}`}
            >
              <button
                type="button"
                className={project.btnClass}
                style={{ cursor: "default" }}
                data-ocid={`projects.button.${i + 1}`}
              >
                {project.icon} {project.title}
              </button>
              <p
                className="text-sm mt-1 text-center"
                style={{ color: "#94a3b8" }}
              >
                {project.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ===== OBJECTIVE =====
function Objective() {
  const { ref, inView } = useInView();
  return (
    <section
      id="objective"
      className="px-4 py-6"
      ref={ref}
      data-ocid="objective.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto dark-glass-card p-8"
      >
        <SectionTitle>Objective</SectionTitle>
        <p className="text-lg leading-relaxed" style={{ color: "#cbd5e1" }}>
          I am looking for opportunities to work as a junior web developer and
          improve my programming skills.
        </p>
      </motion.div>
    </section>
  );
}

// ===== CONTACT =====
function Contact() {
  const { ref, inView } = useInView();

  return (
    <section
      id="contact"
      className="px-4 py-6"
      ref={ref}
      data-ocid="contact.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto dark-glass-card p-8"
      >
        <SectionTitle>Contact Me</SectionTitle>

        <div className="flex flex-col items-center gap-3">
          <a
            href="tel:+923278172478"
            className="pill-btn pill-btn-blue"
            data-ocid="contact.primary_button"
          >
            📞 Call Now
          </a>
          <a
            href="mailto:afzalmughal72478@gmail.com"
            className="pill-btn pill-btn-red"
            data-ocid="contact.secondary_button"
          >
            ✉️ Send Email
          </a>
          <a
            href="https://wa.me/923278172478?text=Hello%20Afzal%20Mughal"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-green"
            data-ocid="contact.whatsapp_button"
          >
            💬 WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ===== QR CODE =====
function QRCode() {
  const { ref, inView } = useInView();

  return (
    <section
      id="qrcode"
      className="px-4 py-6"
      ref={ref}
      data-ocid="qrcode.section"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-sm mx-auto dark-glass-card p-8 text-center"
      >
        <h2 className="text-2xl font-display font-bold mb-6 gold-text">
          Scan to WhatsApp
        </h2>
        <div className="qr-frame mx-auto mb-4" style={{ width: "fit-content" }}>
          <img
            src="/assets/generated/whatsapp-qr.dim_300x300.png"
            alt="WhatsApp QR Code for Afzal Mughal"
            className="w-48 h-48 block"
            data-ocid="qrcode.card"
          />
        </div>
        <p className="font-bold gold-text">Scan to WhatsApp</p>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          +92 327 8172478
        </p>
        <a
          href="https://wa.me/923278172478"
          target="_blank"
          rel="noopener noreferrer"
          className="neon-btn inline-block mt-4 text-sm"
          data-ocid="qrcode.primary_button"
        >
          Or Click to Open
        </a>
      </motion.div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);
  return (
    <footer
      className="py-10 px-6 text-center"
      style={{
        background: "rgba(4,4,16,0.97)",
        borderTop: "1px solid rgba(255,215,0,0.12)",
        marginTop: 20,
      }}
    >
      {/* Gold ornamental divider */}
      <div
        style={{
          width: 80,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)",
          margin: "0 auto 16px",
        }}
      />
      <p className="text-sm mb-1 gold-text font-semibold tracking-widest uppercase">
        © {year} Afzal Mughal
      </p>
      <p
        className="text-xs tracking-wide"
        style={{ color: "rgba(255,215,0,0.35)", letterSpacing: "0.08em" }}
      >
        Web Developer
      </p>
      <p className="text-xs mt-3" style={{ color: "#334155" }}>
        Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,215,0,0.5)" }}
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ===== APP =====
export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* Fixed Floating Buttons */}
      <a
        href="https://wa.me/923278172478?text=Hello%20Afzal%20Mughal"
        className="fixed-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
        />
      </a>
      <a
        href="https://www.tiktok.com/@afzalmughal2323"
        className="fixed-tiktok"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3046/3046128.png"
          alt="TikTok"
        />
      </a>

      <main style={{ paddingTop: 64 }}>
        <Hero />
        <div className="py-4">
          <About />
          <Education />
          <Skills />
          <Projects />
          <Objective />
          <Contact />
          <QRCode />
        </div>
      </main>
      <Footer />
    </div>
  );
}
