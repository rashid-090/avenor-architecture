"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowUp, Camera, Share2, Pin } from "lucide-react";

export default function Footer() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsApp(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const year = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
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
                { label: "Scale Modals", href: "/scale-models" },
                { label: "Blogs", href: "/blogs" },
                { label: "Contact Us", href: "/contact" }
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-zinc-500 hover:text-main text-sm tracking-wider font-light transition-colors w-fit"
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
              target="_blank"
                href="mailto:info@avenorarchitects.com"
                className="text-zinc-500 hover:text-main text-sm tracking-wider font-light transition-colors w-fit  pb-0.5"
              >
                info@avenorarchitects.com
              </a>
              <a 
               href='tel:0506911786'
               target="_blank"
              className="text-zinc-500 hover:text-main text-sm tracking-wider font-light transition-colors w-fit  pb-0.5">
                +971 50 6911786
              </a>
              <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs">
                Dubai - United Arab Emirates
              </p>
            </div>
          </div>

          {/* Journal Subscription & Socials (Col span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-zinc-400 uppercase block">
                Social Media
              </span>
             
            </div>

            {/* Social Links Row */}
            <div className="flex gap-6 text-zinc-500">
                      <a
                        href="https://www.facebook.com/people/Avenor-Architects/61591632058501/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-main transition-colors"
                        aria-label="Facebook"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      </a>
            
                      <a
                        href="https://www.instagram.com/avenor.architects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-main transition-colors"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
            
                      <a
                        href="https://in.pinterest.com/avenorarchitects/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-main transition-colors"
                        aria-label="Pinterest"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.342-.091.382-.294 1.199-.334 1.363-.053.218-.176.265-.406.157-1.518-.707-2.467-2.928-2.467-4.713 0-3.837 2.788-7.362 8.039-7.362 4.22 0 7.498 3.008 7.498 7.027 0 4.193-2.643 7.568-6.312 7.568-1.233 0-2.393-.641-2.79-1.395l-.76 2.898c-.276 1.054-1.025 2.376-1.525 3.189 1.125.347 2.316.535 3.552.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                        </svg>
                      </a>
            
                      <a
                        href="mailto:info@avenorarchitects.com"
                        className="hover:text-main transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="w-5 h-5" strokeWidth={1.5} />
                      </a>
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
              <ArrowUp
                size={12}
                strokeWidth={1.5}
                className="text-zinc-400 group-hover:text-zinc-950 transform group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
    {/* Floating WhatsApp Action */}
    {showWhatsApp && (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes whatsapp-shake {
            0%, 90%, 100% { transform: scale(1) rotate(0deg); }
            92% { transform: scale(1.15) rotate(-10deg); }
            94% { transform: scale(1.15) rotate(10deg); }
            96% { transform: scale(1.15) rotate(-10deg); }
            98% { transform: scale(1.15) rotate(10deg); }
          }
          .whatsapp-float-btn {
            animation: whatsapp-shake 6s infinite;
          }
          .whatsapp-float-btn:hover {
            animation: none;
          }
        `}} />
        <a
          href="https://wa.me/971506911786"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn fixed bottom-20 right-5 md:right-10 z-[9999] flex items-center justify-start w-14 h-14 bg-white text-zinc-950 border border-zinc-200/80 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.15)] hover:w-44 transition-all duration-300 ease-in-out group overflow-hidden pl-[15px]"
          aria-label="Chat on WhatsApp"
        >
          <div className="flex items-center gap-3 whitespace-nowrap">
            <img
              src="/whatsapp-icon.svg"
              width="24"
              height="24"
              className="w-6 h-6 flex-shrink-0 object-contain"
              alt=""
            />
            <span className="text-zinc-950 font-urbanist font-normal text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out tracking-normal pr-4 select-none">
              Chat with us
            </span>
          </div>
        </a>
      </>
    )}
  </>
);
}
