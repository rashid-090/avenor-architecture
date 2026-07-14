"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, DraftingCompass, Armchair } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesList = [
  {
    title: "Houses",
    img: "./service/houses.svg",
    description:
      "To create beautiful, healthy buildings to empower families, uplift communities, and improve our living world.",
  },
  {
    title: "Renovation",
       img: "./service/renovation.svg",
    description:
      "Avenore strives toward a socially just and equitable world where buildings positively contribute to the environment.",
  },
  {
    title: "Interior Design",
       img: "./service/interior.svg",
    description:
      "We honor the profound and nuanced ways humans and the environment interact with, use, and are shaped by our work.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const textRevealRef = useRef(null);
  const cardsRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split header text into lines for smooth reveal
      const paragraphs = textRevealRef.current?.querySelectorAll("p, h2");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRevealRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Smooth slide animation for the "More about us" link
      if (linkRef.current) {
        gsap.fromTo(
          linkRef.current,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRevealRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Smooth fade/slide animation for services cards
      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white text-zinc-950 py-16 md:py-20"
    >
      {/* WHO WE ARE Section */}
      <div className=" w-[95%] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
        <div ref={textRevealRef} className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-6">
            WHO WE ARE
          </p>
          <h2 className="text-zinc-900 text-2xl md:text-[34px] lg:text-[38px] font-normal leading-[1.3] tracking-tight">
            Avenore Architects is an award-winning modern architecture firm based in New York. We specialize in contemporary design through our signature Natural Modern approach.
          </h2>
        </div>
        <div ref={linkRef} className="flex-shrink-0 md:mb-2">
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 text-zinc-950 font-medium text-sm tracking-wide border-b border-black pb-0.5 hover:opacity-85 transition-opacity"
          >
            More about us
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="translate-x-0 group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* OUR SERVICES Section */}
      <div className=" w-[95%] mx-auto mt-16 md:mt-24">
        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-8">
          OUR SERVICES
        </p>

        {/* 3-Column Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {servicesList.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="service-card group bg-white border border-zinc-200/80 p-8 md:p-10 flex flex-col justify-start transition-all duration-300 hover:border-zinc-400 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
              >
                {/* Lucide React Icon with thin stroke width */}
                <div className="mb-6 text-zinc-900 group-hover:scale-105 transition-transform duration-300">
                 <img className="object-contain" src={service.img} alt="" />
                </div>

                {/* Thin divider line matching the reference image */}
                <div className="border-t border-zinc-200/80 w-full my-6" />

                {/* Title */}
                <h3 className="text-zinc-900 text-xl md:text-2xl font-normal tracking-tight mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-600 text-sm md:text-[15px] font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
