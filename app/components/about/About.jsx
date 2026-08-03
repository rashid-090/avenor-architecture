"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Image reveal: white overlay slides down to reveal ---
      const overlay = sectionRef.current?.querySelector(".about-reveal-overlay");
      const image = sectionRef.current?.querySelector(".about-reveal-image img");

      if (overlay) {
        // Reset overlay to avoid GSAP positioning issues
        gsap.set(overlay, { yPercent: 0 });
        if (image) {
          gsap.set(image, { scale: 1.15 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".about-image-wrapper"),
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.to(overlay, {
          yPercent: 101,
          duration: 1.4,
          ease: "power3.inOut",
        });

        if (image) {
          tl.fromTo(
            image,
            { scale: 1.15 },
            { scale: 1, duration: 1.6, ease: "power2.out" },
            "-=1.2"
          );
        }
      }

      // --- Text fade-in ---
      const heading = sectionRef.current?.querySelector(".about-heading");
      const body = sectionRef.current?.querySelector(".about-body");

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (body) {
        gsap.fromTo(
          body,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: body,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-zinc-950 py-16 md:py-24"
    >
      <div className="w-[95%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h2 className="about-heading text-zinc-900 text-2xl md:text-[34px] lg:text-[40px] font-normal leading-[1.25] tracking-tight mb-8">
              Elevating architecture with lasting quality and modern vision
            </h2>
            <p className="about-body text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed max-w-lg">
              Avenore was founded out of a shared desire to create spaces that
              feel as good as they look — honest, balanced, and deeply personal.
              With a foundation in architecture and product design, the studio
              connects people to their environments through refined, purposeful
              design.
            </p>
          </div>

          {/* Right — Image with scroll reveal */}
          <div className="order-1 lg:order-2">
            <div className="about-image-wrapper relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
              {/* White overlay that slides down on scroll */}
              <div className="about-reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />

              {/* Core image */}
              <div className="about-reveal-image w-full h-full relative">
                <Image
                  src="/abt1.webp"
                  alt="Architect reviewing blueprints at studio"
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 95vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}