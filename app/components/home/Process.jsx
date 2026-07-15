"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    title: "Listen & Collaborate",
    description:
      "The success of Avenore projects is rooted in strong relationships and true collaboration. Through our process, we learn how our clients live day to day and translate those insights into a tailored vision—designing spaces that reflect and support their lives.",
  },
  {
    title: "Envision & Design",
    description:
      "We translate ideas into architectural realities. By exploring form, material, and spatial flow, we craft design concepts that respond uniquely to the surrounding landscape and client aspirations.",
  },
  {
    title: "Partner & Build",
    description:
      "We partner with premier builders and craftsmen to realize our designs with precision. From construction oversight to final handover, we ensure every detail is executed to the highest standards.",
  },
];

export default function ProcessSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-white text-zinc-950 py-16 md:py-24 border-t border-zinc-100">
      <div className="w-[95%] mx-auto">
        {/* Section Header */}
        <div className="max-w-5xl mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-6">
            OUR PROCESS
          </p>
          <h2 className="text-zinc-900 text-2xl md:text-[34px] lg:text-[38px] font-normal leading-[1.3] tracking-tight">
            Our process starts with the first conversation and continues through move-in, guided by a deep understanding of client goals and site-specific opportunities
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Accordion List - Left */}
          <div className="lg:col-span-5 flex flex-col justify-end h-full">
            <div className="">
              {steps.map((step, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className=" border-b border-zinc-200">
                    {/* Header trigger button */}
                    <button
                      onClick={() => toggleIndex(idx)}
                      className="w-full flex justify-between items-center py-6 text-left outline-none"
                    >
                      <span className="text-zinc-900 text-lg md:text-[20px] font-normal tracking-tight">
                        {step.title}
                      </span>
                      <span className="text-zinc-400 text-xl font-light select-none w-6 text-right">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>

                    {/* Smooth height-animated description panel */}
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed pb-6 pr-4">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Learn More link */}
            {/* <div className="mt-8">
              <Link
                href="#"
                className="group inline-flex items-center gap-1.5 text-zinc-950 font-medium text-xs md:text-[18px] tracking-wide border-b border-black pb-0.5 hover:opacity-85 transition-opacity"
              >
                Learn more
                <svg
                  width="14"
                  height="14"
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
            </div> */}
          </div>

          {/* Perspective Wireframe Image - Right */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] md:aspect-[1.45/1] overflow-hidden select-none pointer-events-none"
            >
              <Image
                src="/building-outline.webp"
                alt="Architectural Wireframe Outline"
                fill
                className="object-contain md:object-right"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
