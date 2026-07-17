"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ApproachSection() {
  const containerRef = useRef(null);

  // Parallax Scroll Tracking on the image container viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Vertical scroll transformation offset inside the cropped mask window
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section className="bg-white text-zinc-950 py-16 md:py-24 border-t border-zinc-100">
      {/* Top Column Layout */}
      <div className="w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading and CTA */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-zinc-900 text-2xl md:text-[34px] lg:text-[40px] font-normal leading-[1.25] tracking-tight mb-8">
              Our approach. From vision to reality.
            </h2>
          </div>
          <div className="mt-2">
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 text-zinc-950 font-medium text-sm tracking-wide pb-0.5 hover:opacity-85 transition-opacity"
            >
              <span className="relative">
                Contact us
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

        {/* Right Column: Description Paragraph */}
        <div className="lg:col-span-5">
          <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
            We oversee every aspect of your interior design project — from
            initial concept to final installation. Our team delivers tailored
            design solutions, guides you through each decision with clarity, and
            manages every detail's sourcing, purchasing, and installation. We
            collaborate closely with trusted industry partners — contractors,
            millworkers, wallpaper installers, carpet specialists, workrooms,
            and art consultants — to ensure your space is beautifully and
            seamlessly brought to life.
          </p>
        </div>
      </div>

      {/* Bottom Full-width Image Wrapper with fixed scroll parallax effect */}
      <div
        ref={containerRef}
        className="w-[95%] mx-auto h-[50vh] md:h-[70vh] overflow-hidden bg-zinc-100 relative mt-10"
      >
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[124%] -top-[12%] transform-gpu"
        >
          <Image
            src="https://images.unsplash.com/photo-1518517611416-da57df49b8d3?q=100&w=2092&auto=format&fit=crop"
            alt="Architect drawing blueprints on designer workbench"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
