"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function GetInTouchSection() {
  const containerRef = useRef(null);

  // Track the scroll progress of the section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to vertical translation for the parallax effect (-15% to 15%)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[55vh] sm:h-[70vh] w-full overflow-hidden bg-zinc-950"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none"
      >
        <Image
          src="/getintouch_bg.png"
          alt="Architectural wood ceiling interior"
          fill
          className="object-cover brightness-[0.72] contrast-[1.03]"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Cinematic dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />

      {/* Content HUD Overlay */}
      <div className="absolute inset-0 z-20 w-[95%] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end pt-16 pb-12 md:pb-16 gap-8">
        {/* Left Side Info */}
        <div className="max-w-xl">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] text-white/60 block mb-3 uppercase">
            A UNIQUE VISION WITH UNLIMITED POSSIBILITIES
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight leading-none">
            Let&apos;s work together
          </h2>
        </div>

        {/* Right Side Button */}
        <div className="w-full md:w-auto">
          <Link
            href="#contact"
            className="w-full md:w-auto inline-flex justify-center items-center bg-white text-zinc-950 px-8 py-4 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-zinc-100 shadow-lg"
          >
            <span className="">
              Connect with us
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
