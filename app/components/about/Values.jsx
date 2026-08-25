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
    title: "CLIENT ENGAGEMENT",
    description:
      "We begin by listening to your vision, understanding your needs, and defining clear goals for the journey ahead.",
    icon: "/Timeless.svg",
  },
  {
    id: 2,
    title: "DESIGN DEVELOPMENT",
    description:
      "We explore ideas and transform them into thoughtful, refined architectural solutions shaped around your vision.",
    icon: "/Modern.svg",
  },
  {
    id: 3,
    title: "CONSTRUCTION DOCUMENTATION",
    description:
      "We develop detailed drawings and technical documentation to ensure every aspect of the design is ready for execution.",
    icon: "/approach.svg",
  },
  {
    id: 4,
    title: "TENDER & PROCUREMENT",
    description:
      "We assist in selecting the right contractors, materials, and suppliers while maintaining quality and project value.",
    icon: "/craftsmanship.svg",
  },
  {
    id: 5,
    title: "CONSTRUCTION ADMINISTRATION",
    description:
      "We stay involved throughout construction, helping ensure the design is executed with accuracy and attention to detail.",
    icon: "/Timeless.svg",
  },
  {
    id: 6,
    title: "PROJECT COMPLETION",
    description:
      "We review the final outcome, refine the last details, and bring the project to a successful completion.",
    icon: "/Modern.svg",
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
              src="/abt_value.webp"
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
              OUR WORKFLOW
            </span>
            <h2 className="text-zinc-900 text-2xl md:text-[34px] lg:text-[38px] font-normal leading-[1.3] tracking-tight max-w-xl">
             Thoughtfully planned, precisely delivered. Excellence in every step.
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
                    className="w-20 h-auto object-contain"
                    src={value.icon}
                    alt={value.title}
                    width={100}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>

                {/* Divider line under icon */}
                <div className="w-full h-[1px] bg-zinc-100 mb-6" />

                {/* Text Block */}
                <div className="max-w-xl">
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
