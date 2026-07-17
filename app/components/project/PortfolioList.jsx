"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioProjects } from "../../lib/data";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioList() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small timeout to allow Next/Image assets to mount
      setTimeout(() => {
        const cards = containerRef.current?.querySelectorAll(".portfolio-card");

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
                duration: 1.4,
                ease: "power3.inOut",
              }).fromTo(
                image,
                { scale: 1.15 },
                { scale: 1, duration: 1.6, ease: "power2.out" },
                "-=1.2"
              );
            }
          });
        }
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split projects into 4 columns for a balanced masonry look on desktop
  const col1 = portfolioProjects.filter((_, idx) => idx % 4 === 0);
  const col2 = portfolioProjects.filter((_, idx) => idx % 4 === 1);
  const col3 = portfolioProjects.filter((_, idx) => idx % 4 === 2);
  const col4 = portfolioProjects.filter((_, idx) => idx % 4 === 3);

  // Helper render function for columns
  const renderCard = (item) => (
    <Link
      key={item.id}
      href={`/projects/${item.slug}`}
      className="portfolio-card flex flex-col group cursor-pointer w-full mb-6"
    >
      {/* Image box with overflow hidden */}
      <div className={`relative ${item.aspectClass} w-full overflow-hidden bg-zinc-100 mb-4`}>
        {/* White overlay block that slides down */}
        <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />

        {/* Core Image with hover zoom */}
        <div className="reveal-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={item.image}
            alt={item.title}
            fill
            loading="lazy"
            className="object-cover object-center"
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 23vw"
          />
        </div>
      </div>

      {/* Project Title and Arrow */}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-zinc-900 text-[15px] md:text-xl font-semibold leading-snug tracking-tight group-hover:text-zinc-700 transition-colors">
          {item.title}
        </h3>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-zinc-950 transform opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        >
          <path
            d="M4 2H12V10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );

  return (
    <section ref={containerRef} className="bg-white text-zinc-950 py-16 md:py-24">
      <div className="w-[95%] mx-auto">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-zinc-900 text-4xl md:text-[50px] font-normal leading-tight tracking-tight mb-8">
            Our portfolio
          </h1>
          <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
            At Avenore Studio, we approach each project with a thoughtful blend of 
            environmental psychology, art, architecture, and cultural insight — 
            all grounded in meticulous project management.
          </p>
        </div>

        {/* 4-Column Balanced Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {/* Column 1 */}
          <div className="flex flex-col">
            {col1.map((item) => renderCard(item))}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col">
            {col2.map((item) => renderCard(item))}
          </div>
          {/* Column 3 */}
          <div className="flex flex-col">
            {col3.map((item) => renderCard(item))}
          </div>
          {/* Column 4 */}
          <div className="flex flex-col">
            {col4.map((item) => renderCard(item))}
          </div>
        </div>
      </div>
    </section>
  );
}
