"use client";

import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-white border-t border-zinc-100"
    >
      <div className="w-[95%] mx-auto">
      

        {/* Info Grid (Address, Navigation, Contact Info) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-t border-zinc-100 pt-16">
          {/* Col 1: About */}
          <div>
           <div className="relative w-56 h-14">
                      <Image src='/avenor-bl-logo.webp' className="object-contain" fill alt="logo"/>
            </div>
            <p className="text-zinc-500 text-sm font-light  max-w-xs mt-3">
              Crafting premium site-specific modern residences and structures that frame the natural landscape.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-zinc-400 uppercase block mb-4">
              Navigation
            </span>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Home", href: "#" },
                { label: "About Us", href: "#about" },
                { label: "Our Portfolio", href: "#portfolio" },
                { label: "Our Services", href: "#services" },
                { label: "Contact Us", href: "#contact" }
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-zinc-500 hover:text-zinc-950 text-xs tracking-wide transition-colors font-light"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-zinc-400 uppercase block mb-4">
              Contact
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:hello@avenore.com"
                className="text-zinc-500 hover:text-zinc-950 text-xs tracking-wide transition-colors font-light"
              >
                hello@avenore.com
              </a>
              <span className="text-zinc-500 text-xs tracking-wide font-light">
                +1 (202) 555-0199
              </span>
              <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-xs">
              1200 Constitution Ave. NW
              <br />
              Washington, D.C. 20001
            </p>
            </div>
          </div>

          {/* Col 4: Social Media */}
          <div>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-zinc-400 uppercase block mb-4">
              Social Media
            </span>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-950 transition-colors p-2 bg-zinc-50 hover:bg-zinc-100 rounded-full border border-zinc-200/50 flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-950 transition-colors p-2 bg-zinc-50 hover:bg-zinc-100 rounded-full border border-zinc-200/50 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-950 transition-colors p-2 bg-zinc-50 hover:bg-zinc-100 rounded-full border border-zinc-200/50 flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-950 transition-colors p-2 bg-zinc-50 hover:bg-zinc-100 rounded-full border border-zinc-200/50 flex items-center justify-center"
                aria-label="Twitter / X"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-zinc-200 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-400 text-xs font-light">
            © {year} Avenore Architecture. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-zinc-400 hover:text-zinc-950 text-xs font-light transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
