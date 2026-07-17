"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioProjects } from "../../lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InnerProjectShowcase({ project }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small timeout to allow Next/Image assets to mount
      setTimeout(() => {
        const cards = containerRef.current?.querySelectorAll(".service-project-card");

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
  }, [project]);

  // Filter other projects to display as related
  const related = portfolioProjects.filter((p) => p.slug !== project.slug).slice(0, 4);

  return (
    <div ref={containerRef} className="w-[95%] mx-auto pb-16 md:pb-24">
      {/* Top Header Label & Title */}
      <div className="pt-24 md:pt-32 mb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-3">
          {project.type?.toUpperCase()}
        </span>
        <h1 className="text-zinc-900 text-4xl md:text-[50px] lg:text-[55px] font-normal leading-none tracking-tight">
          {project.title}
        </h1>
      </div>

      {/* Hero Image Card */}
      <div className="service-project-card relative aspect-video md:aspect-[21/9] w-full overflow-hidden bg-zinc-100 mb-16">
        <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
        <div className="reveal-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover object-center"
            sizes="95vw"
          />
        </div>
      </div>

      {/* Details Metadata Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-zinc-100 pb-16 mb-24 text-sm font-light">
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Type</span>
          <span className="text-zinc-950 font-normal text-base">{project.type}</span>
        </div>
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Location</span>
          <span className="text-zinc-950 font-normal text-base">{project.location}</span>
        </div>
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Year</span>
          <span className="text-zinc-950 font-normal text-base">{project.year}</span>
        </div>
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Size</span>
          <span className="text-zinc-950 font-normal text-base">{project.size}</span>
        </div>
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Architect</span>
          <span className="text-zinc-950 font-normal text-base">{project.architect}</span>
        </div>
      </div>

    

      {/* Split Text Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-24">
        {/* Left Column: Giant headline */}
        <div className="lg:col-span-5">
          <h2 className="text-zinc-900 text-2xl md:text-[32px] font-normal leading-[1.3] tracking-tight">
            {project.headline}
          </h2>
        </div>

        {/* Right Column: Paragraph runs */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
          {project.paragraphs?.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <div className="mt-4 pt-6 border-t border-zinc-100">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-2">CLIENT</span>
            <span className="text-zinc-950 font-normal text-base">Private client</span>
          </div>
        </div>
      </div>


      {/* Related Projects Area */}
      {related.length > 0 && (
        <div className="border-t border-zinc-100 pt-16">
          <div className="flex items-center justify-between mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block">
              RELATED PROJECTS
            </span>
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 text-zinc-950 font-medium text-sm tracking-wide pb-0.5 hover:opacity-85 transition-opacity"
            >
              <span className="relative">
                View all
                <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-black transition-transform duration-300 ease-out origin-left group-hover:scale-x-100 group-hover:origin-left"></span>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.slug}`}
                className="service-project-card flex flex-col group cursor-pointer w-full"
              >
                {/* Image box with reveal */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 mb-4">
                  <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
                  <div className="reveal-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      loading="lazy"
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 95vw, 22vw"
                    />
                  </div>
                </div>

                {/* Title and Corner Arrow */}
                <div className="flex items-center justify-between w-full mt-1">
                  <h3 className="text-zinc-900 text-base font-semibold leading-snug tracking-tight group-hover:text-zinc-700 transition-colors">
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
