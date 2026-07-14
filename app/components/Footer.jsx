"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-black border-t border-white/10 "
    >
      <div className="w-[95%] mx-auto ">
        {/* CTA block */}
        <div className="py-16 md:py-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-20">
          <div>
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase font-light mb-4">
              Get In Touch
            </p>
            <h2 className="text-white text-[clamp(2rem,5vw,4rem)] font-light leading-tight tracking-tight">
              Let&apos;s build something
              <br />
              extraordinary together.
            </h2>
          </div>
          <a
            href="mailto:hello@avenore.com"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white text-white text-sm tracking-widest uppercase font-light hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
          >
            Start a Project
          </a>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
          
            <span className="text-white text-sm font-medium tracking-wide">
              Avenore Architecture
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            {["About", "Portfolio", "Services", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-white/40 hover:text-white/70 text-xs tracking-[0.15em] uppercase font-medium transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>

          <p className="text-white/60 text-xs font-light">
            © {year} Avenore Architecture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
