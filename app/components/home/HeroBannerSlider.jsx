"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const slides = [
  {
    id: 0,
    image: "/hero/banner_alnoor.webp",
    tag: "Residential / Ajman, UAE",
    title: "Al Noor Villa",
    subtitle: "A contemporary UAE villa blending desert-inspired elegance, clean geometry, premium materials, and lush landscaping to create a luxurious yet welcoming family home.",
    link: "/projects",
    linkText: "View projects",
  },
  {
    id: 1,
    image: "/hero/banner_mosque.webp",
    tag: "Cultural / GCC Region",
    title: "GC Mosque",
    subtitle: "A contemporary congregational landmark inspired by Islamic geometry and desert landscapes, combining sculptural architecture, sustainable design strategies, and lush public spaces for worship, learning, and community.",
    link: "/projects",
    linkText: "View projects",
  },
  {
    id: 2,
    image: "/hero/banner_office.webp",
    tag: "Corporate / Dubai, UAE",
    title: "Stratex Office",
    subtitle: "A refined contemporary workplace designed around professionalism, collaboration, and comfort, combining warm architectural lighting, natural planting, premium materials, and flexible spaces for modern business.",
    link: "/projects",
    linkText: "View projects",
  },
  {
    id: 3,
    image: "/hero/banner_cafe.webp",
    tag: "Hospitality / Jumeirah, Dubai",
    title: "Elara Cafe",
    subtitle: "An intimate boutique café where Mediterranean influences, soft arches, natural textures, handcrafted details, and warm lighting create a calm and inviting space for a relaxed hospitality experience.",
    link: "/projects",
    linkText: "View projects",
  },
  {
    id: 4,
    image: "/hero/banner_royalyatch.webp",
    tag: "Hospitality / Dubai, UAE",
    title: "Royal Sama",
    subtitle: "A high-end floating restaurant and luxury hospitality destination, designed as a multi-level yacht offering fine dining, private celebrations, entertainment, and panoramic waterfront experiences.",
    link: "/projects",
    linkText: "View projects",
  },

];

// Split title chars into animated spans
function SplitTitle({ text, slideId }) {
  const words = text.split(" ");
  return (
    <span className="flex flex-wrap gap-x-[0.3em]">
      {words.map((word, wi) => (
        <span key={`${slideId}-${wi}`} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-80%", opacity: 0 }}
            transition={{
              duration: 0.85,
              delay: wi * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroBannerSlider() {
  const [current, setCurrent] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const progressRef = useRef(null);
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const linkRef = useRef(null);
  const subtitleRef = useRef(null);
  const dotsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Subtle vertical translation as page scrolls down
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const slide = slides[current];

  const goTo = useCallback(
    (idx) => {
      if (isAnimating || idx === current) return;
      setIsAnimating(true);
      setPrevSlide(current);
      setCurrent(idx);
      setTimeout(() => {
        setIsAnimating(false);
        setPrevSlide(null);
      }, 1000);
    },
    [current, isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  // Reset autoplay timer on manual dot click
  const handleDot = (idx) => {
    goTo(idx);
  };

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 5.5, ease: "none" }
    );
  }, [current]);

  // Tag/subtitle entrance on slide change
  useEffect(() => {
    const elements = [tagRef.current, subtitleRef.current, linkRef.current].filter(Boolean);
    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.6,
        }
      );
    }
  }, [current]);

  // Dots entrance
  useEffect(() => {
    gsap.fromTo(
      dotsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.4 }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black"
    >
      {/* Slide backgrounds with Ken Burns effect */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] slide-bg"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            loading="eager"
            fetchPriority="high"
            className="object-cover bg-no-repeat object-left md:object-center"
            sizes="100vw"
          />
          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {/* Top spacer (for header) */}
        <div className="h-24" />

        {/* Center/main content */}
        <div className="px-6 md:px-10 pb-0">
          {/* Tag line */}
          <p
            ref={tagRef}
            className="text-white/80 text-xs tracking-[0.2em] uppercase mb-4  pointer-events-none"
          >
            {slide.tag}
          </p>

          {/* Giant animated title */}
          <div className="mb-10">
            <h1 className="text-white font-medium text-[clamp(3rem,5vw,5rem)] leading-[0.9] tracking-tight">
              <AnimatePresence mode="wait">
                <SplitTitle key={current} text={slide.title} slideId={current} />
              </AnimatePresence>
            </h1>
          </div>

          {/* View Project link - bottom-right style */}
          <div className="flex">
            <motion.a
              ref={linkRef}
              href={slide.link}
              className="flex relative group items-center gap-2 text-white/80 hover:text-white text-sm tracking-wider pb-0.5 pointer-events-auto capitalize font-medium transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {slide.linkText}
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
                className="translate-x-0 group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M3 9H15M15 9L9 3M15 9L9 15"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
                              <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-white transition-transform duration-300 ease-out origin-left group-hover:scale-x-100 group-hover:origin-left"></span>

            </motion.a>
          </div>
        </div>

        {/* Bottom bar — subtitle + dots */}
        <div className="px-6 md:px-10 pb-8 flex items-end justify-between">
          <p
            ref={subtitleRef}
            className="text-white/80 text-sm md:text-lg tracking-wide max-w-xl"
          >
            {slide.subtitle}
          </p>

          {/* Slide indicators */}
          <div ref={dotsRef} className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`pointer-events-auto h-[7px] cursor-pointer rounded-full transition-all duration-500 ${
                  i === current
                    ? "bg-white w-4"
                    : "bg-white/30 hover:bg-white/60 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-white/60 origin-left"
          style={{ transformOrigin: "left center" }}
        />
      </div>

      {/* Side arrow navigation */}
      {/* <button
        onClick={() => handleDot((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/50 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 hidden md:flex"
        aria-label="Previous slide"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      <button
        onClick={() => handleDot((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/50 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 hidden md:flex"
        aria-label="Next slide"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button> */}
     
    </section>
  );
}
