"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const teamMembers = [
  {
    id: 1,
    name: "Mikaele Mora",
    role: "Founder",
    image: "/team_1.png",
  },
  {
    id: 2,
    name: "Isabela Core",
    role: "Interior designer",
    image: "/team_2.png",
  },
  {
    id: 3,
    name: "Lucas Rossi",
    role: "Architect",
    image: "/team_3.png",
  },
  {
    id: 4,
    name: "Sophia Vane",
    role: "Project Manager",
    image: "/team_4.png",
  },
  {
    id: 5,
    name: "Mikaele Mora",
    role: "Founder",
    image: "/team_1.png",
  },
  {
    id: 6,
    name: "Isabela Core",
    role: "Interior designer",
    image: "/team_2.png",
  },
];

export default function TeamSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small timeout to allow Swiper slides to render and clone properly
      setTimeout(() => {
        const cards = containerRef.current?.querySelectorAll(".team-card-container");
        
        if (cards && cards.length > 0) {
          cards.forEach((card) => {
            const overlay = card.querySelector(".reveal-overlay");
            const image = card.querySelector(".reveal-image img");

            if (overlay && image) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              });

              tl.to(overlay, {
                yPercent: 101, // slide down to reveal top-to-bottom
                duration: 1.3,
                ease: "power3.inOut",
              })
              .fromTo(image,
                { scale: 1.15 },
                { scale: 1, duration: 1.5, ease: "power2.out" },
                "-=1.2"
              );
            }
          });
        }
      }, 150);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white text-zinc-950 py-16 md:py-24 border-t border-zinc-100"
    >
      {/* Grid container spanning the entire layout */}
      <div className="w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Team Members (Grid on desktop, Swiper on mobile) */}
        <div className="lg:col-span-7 order-2 lg:order-1 w-full">
          
          {/* Mobile View: Swiper Carousel */}
          <div className="block sm:hidden w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1.15}
              loop={true}
              grabCursor={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="team-swiper"
            >
              {teamMembers.map((t) => (
                <SwiperSlide key={`mobile-${t.id}`}>
                  <div className="team-card-container flex flex-col group cursor-pointer w-full">
                    {/* Image Box */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 mb-4">
                      {/* White reveal overlay */}
                      <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
                      {/* Core Image */}
                      <div className="reveal-image w-full h-full relative">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          loading="lazy"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="90vw"
                        />
                      </div>
                    </div>
                    {/* Member Details */}
                    <p className="text-zinc-900 text-xs font-light tracking-wide">
                      {t.name} <span className="text-zinc-400">/</span> <span className="text-zinc-500 font-light">{t.role}</span>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop/Tablet View: Static 3-Column Grid */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-5">
            {teamMembers.map((t) => (
              <div key={`desktop-${t.id}`} className="team-card-container flex flex-col group cursor-pointer w-full">
                {/* Image Box */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 mb-4">
                  {/* White reveal overlay */}
                  <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
                  {/* Core Image */}
                  <div className="reveal-image w-full h-full relative">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      loading="lazy"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="30vw"
                    />
                  </div>
                </div>
                {/* Member Details */}
                <p className="text-zinc-900 text-xs font-light tracking-wide">
                  {t.name} <span className="text-zinc-400">/</span> <span className="text-zinc-500 font-light">{t.role}</span>
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Sticky Text Content */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 order-1 lg:order-2 h-fit">
          <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-4">
            THE TEAM
          </span>
          <h2 className="text-zinc-900 text-2xl md:text-[34px] lg:text-[38px] font-normal leading-[1.3] tracking-tight mb-8">
            Meet the team behind the designs
          </h2>
          <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
            Our team blends creativity, expertise, and precision to craft
            interiors that feel as good as they look. With diverse backgrounds in
            design, architecture, and project management, we bring a
            collaborative spirit and a shared passion for thoughtful, elevated
            living. Every project is a partnership — and every detail, a
            reflection of our commitment to excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
