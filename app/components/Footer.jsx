"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative bg-white text-zinc-950 pt-10 pb-5 border-t border-zinc-100 overflow-hidden"
    >
      <div className="w-[95%] mx-auto flex flex-col">
        {/* Upper Footer: Gridded Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-20">
          
          {/* Brand Info (Col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative w-48 h-12">
              <Image 
                src="/avenor-bl-logo.webp" 
                className="object-contain" 
                fill 
                sizes="192px"
                alt="Avenore logo"
              />
            </div>
            <p className="text-zinc-500 text-sm font-light max-w-sm leading-relaxed">
              Crafting premium site-specific modern residences and structures that frame the natural landscape.
            </p>
          </div>

          {/* Navigation Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-zinc-400 uppercase block">
              Navigation
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Our Projects", href: "/projects" },
                { label: "Contact Us", href: "/contact" }
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-zinc-500 hover:text-zinc-950 text-xs tracking-wider font-light transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Details (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-zinc-400 uppercase block">
              Contact
            </span>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@avenore.com"
                className="text-zinc-500 hover:text-zinc-950 text-xs tracking-wider font-light transition-colors w-fit border-b border-zinc-200 pb-0.5"
              >
                hello@avenore.com
              </a>
              <span className="text-zinc-500 text-xs tracking-wider font-light">
                +1 (202) 555-0199
              </span>
              <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-xs">
                1200 Constitution Ave. NW
                <br />
                Washington, D.C. 20001
              </p>
            </div>
          </div>

          {/* Journal Subscription & Socials (Col span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-zinc-400 uppercase block">
                Journal
              </span>
              <p className="text-zinc-500 text-xs font-light leading-relaxed">
                Subscribe to receive seasonal design and architectural insights.
              </p>
              <div className="flex items-center border-b border-zinc-200 pb-2 w-full max-w-xs">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent border-none outline-none text-xs w-full text-zinc-950 placeholder-zinc-400 font-light"
                />
                <button 
                  className="text-zinc-500 hover:text-zinc-950 transition-colors pl-2"
                  aria-label="Subscribe"
                >
                  →
                </button>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex gap-4 pt-2">
              {[
                {
                  label: "Instagram",
                  href: "#",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  )
                },
                {
                  label: "LinkedIn",
                  href: "#",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  )
                },
                {
                  label: "Facebook",
                  href: "#",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  )
                },
                {
                  label: "Twitter / X",
                  href: "#",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  )
                }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="text-zinc-400 hover:text-zinc-950 transition-colors"
                  aria-label={social.label}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row (Copyrights & Go to Top) */}
        <div className="border-t border-zinc-100 pt-4  flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-zinc-500 text-xs font-light tracking-wide text-center sm:text-left">
            <span>© {year} Avenore Studio. All rights reserved.</span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span>
              Powered by{" "}
              <a
                href="https://straylinesstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-950 transition-colors font-medium"
              >
                Stray Lines Studio
              </a>
            </span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Use"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-zinc-500 hover:text-zinc-950 text-xs font-light tracking-wide transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>

            {/* Go to Top Action */}
            <button
              onClick={handleScrollToTop}
              className="group flex items-center justify-center w-10 h-10 border border-zinc-200 hover:border-zinc-950 transition-colors duration-300 rounded-full"
              aria-label="Scroll to top"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-zinc-400 group-hover:text-zinc-950 transform group-hover:-translate-y-0.5 transition-all duration-300"
              >
                <path
                  d="M6 10V2M6 2L2 6M6 2L10 6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
