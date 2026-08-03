"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, DraftingCompass, Armchair } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesList = [
  {
    title: "Architecture",
    img: "./service/Architecture.svg",
    description:
      "We create functional and inspiring architectural designs that blend creativity, sustainability, and timeless aesthetics.",
  },
  {
    title: "Interior Design",
    img: "./service/Interior-Design.svg",
    description:
      "Thoughtfully designed interiors that balance comfort, style, and functionality to reflect your lifestyle and vision.",
  },
  {
    title: "Landscape Design",
    img: "./service/Landscape.svg",
    description:
      "Beautiful outdoor spaces designed to complement architecture while enhancing nature, usability, and everyday living.",
  },
  {
    title: "Site Supervision",
    img: "./service/Site-Supervision.svg",
    description:
      "Professional site supervision to ensure every detail is executed with quality, accuracy, and adherence to design.",
  },
  {
    title: "Project Management",
    img: "./service/Project-Management.svg",
    description:
      "End-to-end project coordination that keeps construction on schedule, within budget, and aligned with your goals.",
  },
  {
    title: "Technical Drawing",
    img: "./service/Technical-Drawing.svg",
    description:
      "Detailed architectural drawings that provide precise guidance for smooth construction and seamless project execution.",
  },
  {
    title: "Scale Model",
    img: "./service/Scale-Model.svg",
    description:
      "Realistic architectural scale models that help visualize the design, proportions, and spatial relationships before construction.",
  },
  {
    title: "Interior Fit-Out",
    img: "./service/Interior-Fit-Out.svg",
    description:
      "Complete interior fit-out solutions that transform empty spaces into refined, functional, and ready-to-use environments.",
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
          },
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
          },
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
          },
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
            Avenore Architects is an award-winning modern architecture firm
            based in UAE. We specialize in contemporary design through our
            signature Natural Modern approach.
          </h2>
        </div>
        <div ref={linkRef} className="flex-shrink-0 md:mb-2">
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-2 text-zinc-950 font-medium text-sm tracking-wide pb-0.5 hover:opacity-85 transition-opacity"
          >
            {/* The Text Wrapper */}
            <span className="relative">
              More about us
              {/* Dynamic Running Underline Effect */}
              <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-black transition-transform duration-300 ease-out origin-left group-hover:scale-x-100 group-hover:origin-left"></span>
            </span>

            {/* Your Original SVG Icon */}
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
          </Link>
        </div>
      </div>

      {/* OUR SERVICES Section */}
      <div className=" w-[95%] mx-auto mt-16 md:mt-24">
        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-8">
          OUR SERVICES
        </p>

        {/* Carousel Slider */}
        <div ref={cardsRef} className="w-full">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            grabCursor={true}
            breakpoints={{
              1024: {
                slidesPerView: 3.1,
                spaceBetween: 32,
              },
            }}
            className="services-swiper !overflow-visible"
          >
            {servicesList.map((service, i) => {
              return (
                <SwiperSlide key={i} className="!h-auto flex">
                  <div
                    className="service-card group bg-white border border-zinc-200/80 p-8 md:p-10 flex flex-col justify-start w-full h-full transition-all duration-300 hover:border-zinc-400 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                  >
                    {/* Lucide React Icon with thin stroke width */}
                    <div className=" text-zinc-900 group-hover:scale-105 transition-transform duration-300">
                      <img
                        className="object-contain w-16"
                        src={service.img}
                        alt=""
                        loading="lazy"
                      />
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
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
