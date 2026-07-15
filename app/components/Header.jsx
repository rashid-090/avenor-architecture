"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
];

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const ctaRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const lastScrollY = useRef(0);
  const isVisible = useRef(true); // Track visibility state without triggering rerenders

  // Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
      
      const navLinksElements = navRef.current ? navRef.current.querySelectorAll("a") : null;
      if (navLinksElements && navLinksElements.length > 0) {
        gsap.fromTo(
          navLinksElements,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.6,
          }
        );
      }
      
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 1 }
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll detection for reverse scroll navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Scrolled threshold for background styling
      setScrolled(currentScrollY > 60);

      // 2. GSAP reverse-scroll hide/show logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        // Scrolling Down -> Hide Header
        if (isVisible.current) {
          gsap.to(headerRef.current, { y: "-100%", duration: 0.4, ease: "power2.out" });
          isVisible.current = false;
          setMobileOpen(false); // Close mobile menu if open while scrolling down
        }
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling Up -> Show Header
        if (!isVisible.current) {
          gsap.to(headerRef.current, { y: "0%", duration: 0.4, ease: "power2.out" });
          isVisible.current = true;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2 cursor-pointer">
          <div className="relative w-52 h-14">
            <Image src='/avenor-wh-logo.webp' className="object-contain" fill alt="logo"/>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav ref={navRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="nav-link text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="#contact"
          className="hidden md:flex items-center px-5 py-2.5 border border-white text-white text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300"
        >
          Contact us
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-4 h-px bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0 w-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-black/90 backdrop-blur-xl border-t border-white/10`}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white text-base tracking-wide transition-colors font-light"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex w-fit items-center px-5 py-2.5 border border-white text-white text-sm font-medium tracking-wide"
          >
            Contact us
          </a>
        </nav>
      </div>
    </header>
  );
}