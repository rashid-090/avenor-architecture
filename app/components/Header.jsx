"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Scale Models", href: "/scale-models" },
  { label: "Services", href: "/services" },
  // { label: "Blogs", href: "/blogs" },
];

export default function Header() {
  const pathname = usePathname();

  // Helper to accurately determine if current page is Home across SSR, Vercel preview, and hydration
  const checkIsHome = (path) => {
    if (!path) return true; // Default safely to true (Home) during SSR / static generation of root page
    const cleanPath = path.split("?")[0].split("#")[0].replace(/\/$/, "");
    return cleanPath === "" || cleanPath === "/";
  };

  const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");
  const isHome = checkIsHome(currentPath);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const ctaRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("hasLoaded");
      if (hasLoaded === "true") {
        setLogoOpacity(1);
      }
    }
  }, []);
  
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
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out", 
          delay: 0.5 
        }
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

    // Background state
    setScrolled(currentScrollY > 60);

    // Hide header when scrolling down
    if (
      currentScrollY > lastScrollY.current &&
      currentScrollY > 120
    ) {
      if (isVisible.current) {
        gsap.to(headerRef.current, {
          y: "-100%",
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });

        isVisible.current = false;
        setMobileOpen(false);
      }
    }

    // Show header when scrolling up
    else if (currentScrollY < lastScrollY.current) {
      if (!isVisible.current) {
        gsap.to(headerRef.current, {
          y: "0%",
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });

        isVisible.current = true;
      }
    }

    lastScrollY.current = currentScrollY;
  };

  // IMPORTANT: Set correct state immediately on page load
  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isHome
          ? scrolled ? "bg-black/60 backdrop-blur-xl" : "bg-transparent"
          : scrolled ? "bg-white/90 backdrop-blur-xl" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 md:py-5">
        {/* Logo */}
        <div 
          ref={logoRef} 
          className="flex items-center gap-2 cursor-pointer header-logo-target"
          style={{ opacity: isHome ? logoOpacity : 1 }}
        >
          <Link href="/" className="relative block w-40 h-16 md:w-52 md:h-14">
            <Image
              src={isHome ? "/avenor-wht-logo.webp" : "/avenor-bl-logo.webp"}
              className="object-contain"
              fill
              priority
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 160px, 208px"
              alt="logo"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`nav-link text-sm tracking-wide transition-colors duration-200 font-medium ${
                isHome
                  ? "text-white/80 hover:text-white"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          ref={ctaRef}
          href="/contact"
          className={`hidden md:flex items-center px-5 py-2.5 border text-sm font-medium tracking-wide transition-all duration-300 ${
            isHome
              ? "border-white text-white hover:bg-white hover:text-black"
              : "border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
          }`}
        >
          Contact us
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px transition-all duration-300 ${
              isHome ? "bg-white" : "bg-zinc-900"
            } ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`}
          />
          <span
            className={`block w-4 h-px transition-all duration-300 ${
              isHome ? "bg-white" : "bg-zinc-900"
            } ${mobileOpen ? "opacity-0 w-0" : ""}`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${
              isHome ? "bg-white" : "bg-zinc-900"
            } ${mobileOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${
          isHome
            ? "bg-black/90 backdrop-blur-xl border-t border-white/10"
            : "bg-white/95 backdrop-blur-xl border-t border-zinc-100"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-base tracking-wide transition-colors font-light ${
                isHome
                  ? "text-white/70 hover:text-white"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className={`mt-2 w-full text-center items-center px-5 py-2.5 border text-sm font-medium tracking-wide ${
              isHome
                ? "border-white text-white"
                : "border-zinc-900 text-zinc-900"
            }`}
          >
            Contact us
          </Link>
        </nav>
      </div>
    </header>
  );
}