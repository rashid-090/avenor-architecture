"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from 'next/link';
// Import Swiper styles
import "swiper/css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fixed duplicate keys by assigning unique IDs (1-6)
const baseProjects = [
  {
    id: 1,
    title: "Holis Passive House",
    location: "WASHINGTON, D.C.",
    image: "/portfolio_holis.png",
  },
  {
    id: 2,
    title: "GG Art Gallery",
    location: "VANCOUVER, BRITISH COLUMBIA",
    image: "/portfolio_gg.png",
  },
  {
    id: 3,
    title: "Heise",
    location: "BODØ, NORWAY",
    image: "/portfolio_heise.png",
  },
  {
    id: 4,
    title: "Holis Passive House",
    location: "WASHINGTON, D.C.",
    image: "/portfolio_holis.png",
  },
  {
    id: 5,
    title: "GG Art Gallery",
    location: "VANCOUVER, BRITISH COLUMBIA",
    image: "/portfolio_gg.png",
  },
  {
    id: 6,
    title: "Heise",
    location: "BODØ, NORWAY",
    image: "/portfolio_heise.png",
  }
];

export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small timeout to allow Swiper slides to build and clone properly
      setTimeout(() => {
        const cards = sectionRef.current?.querySelectorAll(".project-card-container");
        
        if (cards && cards.length > 0) {
          cards.forEach((card) => {
            const overlay = card.querySelector(".reveal-overlay");
            const image = card.querySelector(".reveal-image");
            const info = card.querySelector(".project-info");

            if (overlay && image && info) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              });

              tl.to(overlay, {
                xPercent: 101,
                duration: 1.2,
                ease: "power3.inOut",
              })
              .fromTo(image, 
                { scale: 1.15 },
                { scale: 1, duration: 1.4, ease: "power2.out" },
                "-=1.1"
              )
              .fromTo(info,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.7"
              );
            }
          });
        }
      }, 100);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-white text-zinc-950 py-16 md:py-24"
    >
      {/* Header */}
      <div className="w-[95%] mx-auto flex flex-row items-end justify-between mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-4">
            PROJECT
          </p>
          <h2 className="text-zinc-900 text-3xl md:text-[38px] font-normal tracking-tight">
            Selected Work
          </h2>
        </div>
        <div>
          <Link
            href="#"
            className="group flex items-center gap-1.5 text-zinc-950 font-medium text-xs md:text-sm tracking-wide border-b border-black pb-0.5 hover:opacity-85 transition-opacity"
          >
            Full projects
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="translate-x-0 group-hover:translate-x-0.5 transition-transform"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Swiper Slider Wrapper with Autoplay & Swiping Enabled */}
      <div className="w-[95%] mx-auto">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          slidesPerView={1.15}
          loop={true}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="portfolio-swiper"
        >
          {baseProjects.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="project-card-container flex flex-col group cursor-pointer w-full">
                {/* Aspect wrapper with overflow hidden */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
                  {/* Wipe overlay block (starts fully covering the card) */}
                  <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
                  
                  {/* Project Image */}
                  <div className="reveal-image w-full h-full relative">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      priority={p.id === 1}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 80vw, 30vw"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="project-info mt-4">
                  <h3 className="text-zinc-900 text-lg md:text-[17px] font-medium tracking-tight mb-1">
                    {p.title}
                  </h3>
                  <p className="text-zinc-400 text-[10px] tracking-[0.2em] font-light uppercase">
                    {p.location}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Slider indicators tracking active Swiper slide index */}
      <div className="w-full flex justify-center items-center gap-2 mt-16 z-20 relative">
        {baseProjects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer outline-none border-none p-0 ${
              idx === activeSlide ? "bg-zinc-800 scale-125 w-3" : "w-1.5 bg-zinc-200 hover:bg-zinc-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
