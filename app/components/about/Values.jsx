"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    id: 1,
    title: "Timeless quality",
    description:
      "We create enduring designs that outlast trends and remain relevant for years to come.",
    icon: "/Timeless.svg",
  },
  {
    id: 2,
    title: "Modern functionality",
    description:
      "Every space is thoughtfully designed to be both beautiful and perfectly livable.",
    icon: "/Modern.svg",
  },
  {
    id: 3,
    title: "Client-centered approach",
    description:
      "Your vision leads the way — we listen, adapt, and design with your lifestyle in mind.",
      icon: "/approach.svg",
  },
  {
    id: 4,
    title: "Conscious craftsmanship",
    description:
      "We value sustainability and partner with artisans who share our commitment to ethical design.",
    icon: "/craftsmanship.svg",
  },
];

export default function ValuesSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const overlay = containerRef.current?.querySelector(".about-values-overlay");
      const image = containerRef.current?.querySelector(".about-values-image img");

      if (overlay && image) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        tl.to(overlay, {
          yPercent: 101, // slide down to reveal top-to-bottom
          duration: 1.4,
          ease: "power3.inOut",
        }).fromTo(
          image,
          { scale: 1.15 },
          { scale: 1, duration: 1.6, ease: "power2.out" },
          "-=1.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white text-black py-16 md:py-24 border-t border-zinc-100"
    >
      {/* Grid container spanning the entire layout */}
      <div className="w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Side: Sticky Image Container with scroll reveal */}
        <div className="w-full lg:sticky lg:top-24 h-[60vh] lg:h-[85vh] overflow-hidden bg-zinc-100 relative">
          {/* White overlay block that slides down */}
          <div className="about-values-overlay absolute inset-0 bg-white z-10 pointer-events-none" />

          {/* Core Image */}
          <div className="about-values-image w-full h-full relative">
            <Image
              src="/about_values.png"
              alt="Minimalist architectural model on workshop table"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 95vw, 50vw"
            />
          </div>
        </div>

        {/* Right Side: Scrollable Content matching design layout */}
        <div className="flex flex-col justify-start pt-4">
          {/* Header section */}
          <div className="mb-16 lg:mb-20">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-4">
              OUR VALUES
            </span>
            <h2 className="text-zinc-900 text-2xl md:text-[34px] lg:text-[38px] font-normal leading-[1.3] tracking-tight max-w-xl">
              Driven by purpose, designed with passion. Integrity in every
              detail.
            </h2>
          </div>

          {/* List of features matching design layout */}
          <div className="flex flex-col gap-12 md:gap-16">
            {values.map((value) => (
              <div
                key={value.id}
                className="flex flex-col justify-start w-full"
              >
                {/* Minimalist Line/Outline Icon */}
                <div className="relative mb-4 text-zinc-950 flex items-center h-12">
                  <Image
                    className="w-20 object-contain"
                    src={value.icon}
                    alt={value.title}
                    width={100}
                    height={40}
                    style={{ height: "auto" }}
                  />
                </div>

                {/* Divider line under icon */}
                <div className="w-full h-[1px] bg-zinc-100 mb-6" />

                {/* Text Block */}
                <div className="max-w-md">
                  <h3 className="text-zinc-900 text-lg md:text-[20px] font-medium tracking-tight mb-3">
                    {value.title}
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
