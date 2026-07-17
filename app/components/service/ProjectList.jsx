"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "../../lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectList() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small delay to ensure all DOM elements and images are mounted
      setTimeout(() => {
        const cards = containerRef.current?.querySelectorAll(".service-project-card");

        if (cards && cards.length > 0) {
          cards.forEach((card) => {
            const overlay = card.querySelector(".reveal-overlay");
            const image = card.querySelector(".reveal-image img");
            const revealImageContainer = card.querySelector(".reveal-image");

            if (overlay && image) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              });

              // Slide overlay down to reveal the image frame
              tl.to(overlay, {
                yPercent: 101,
                duration: 1.4,
                ease: "power3.inOut",
              }).fromTo(
                image,
                { scale: 1.15 },
                { scale: 1, duration: 1.6, ease: "power2.out" },
                "-=1.2"
              );

              // Smooth scroll-driven parallax translation on the image container
              if (revealImageContainer) {
                gsap.fromTo(revealImageContainer, 
                  { yPercent: -8 },
                  {
                    yPercent: 8,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: true
                    }
                  }
                );
              }
            }
          });
        }
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white">
      {servicesData.map((service, serviceIdx) => (
        <section
          key={service.id}
          className={`text-zinc-950 py-16 md:py-24 border-b border-zinc-100 last:border-b-0 ${
            serviceIdx === 0 ? "pt-24 md:pt-32" : ""
          }`}
        >
          <div className="w-[95%] mx-auto">
            {/* Category Header Info Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
              {/* Left: Title & CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-zinc-900 text-3xl md:text-[40px] font-normal leading-[1.2] tracking-tight mb-8">
                    {service.title}
                  </h2>
                </div>
                <div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative inline-flex items-center gap-2 text-zinc-950 font-medium text-sm tracking-wide pb-0.5 hover:opacity-85 transition-opacity"
                  >
                    <span className="relative">
                      Learn more
                      <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-black transition-transform duration-300 ease-out origin-left group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                    <svg
                      width="16"
                      height="16"
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

              {/* Right: Detailed Paragraphs */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
                {service.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>

            {/* long image */}
            {service.image && (
              <div className="service-project-card relative aspect-video md:aspect-[21/9] w-full overflow-hidden bg-zinc-100 mt-10">
                {/* White reveal overlay */}
                <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />

                {/* Core Image container (taller for parallax translation buffer) */}
                <div className="reveal-image w-full h-[116%] absolute -top-[8%] left-0 right-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    loading="lazy"
                    className="object-cover object-center"
                    sizes="95vw"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
