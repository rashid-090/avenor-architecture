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
          src="/getintouch.webp"
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
        <div className="w-full flex flex-col md:flex-row items-center gap-5 md:w-auto">
<div className="flex gap-6 text-white">
                      <a
                        href="https://www.facebook.com/people/Avenor-Architects/61591632058501/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-main transition-colors"
                        aria-label="Facebook"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      </a>
            
                      <a
                        href="https://www.instagram.com/avenor.architects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-main transition-colors"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
            
                      <a
                        href="https://in.pinterest.com/avenorarchitects/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-main transition-colors"
                        aria-label="Pinterest"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.342-.091.382-.294 1.199-.334 1.363-.053.218-.176.265-.406.157-1.518-.707-2.467-2.928-2.467-4.713 0-3.837 2.788-7.362 8.039-7.362 4.22 0 7.498 3.008 7.498 7.027 0 4.193-2.643 7.568-6.312 7.568-1.233 0-2.393-.641-2.79-1.395l-.76 2.898c-.276 1.054-1.025 2.376-1.525 3.189 1.125.347 2.316.535 3.552.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                        </svg>
                      </a>
            
                    
                    </div>
      
          <Link
            href="/contact"
            className="w-full md:w-auto inline-flex justify-center items-center bg-white text-zinc-950 px-8 py-4 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-zinc-100 shadow-lg"
          >
            <span className="">
  BOOK A CONSULTATION
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
