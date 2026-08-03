"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Camera, Share2, Pin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "../../lib/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InnerServiceProjects({ service }) {
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

            if (overlay) {
              // Reset overlays to avoid GSAP positioning clashes on state updates
              gsap.set(overlay, { yPercent: 0 });
              if (image) {
                gsap.set(image, { scale: 1.15 });
              }

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
          });
        }
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, [service]);

  // Filter other services to display in the balance area
  const balanceServices = servicesData.filter((s) => s.slug !== service.slug);

  return (
    <div ref={containerRef} className="w-[95%] mx-auto pb-16 md:pb-24">
      {/* Part 1: Title & Banner Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
        {/* Left Column — Title & Paragraph */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <h1 className="text-zinc-900 text-4xl md:text-[50px] font-normal leading-[1.25] tracking-tight mb-8">
            {service.title}
          </h1>
          <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed max-w-lg mb-8">
            {service.paragraphs[0]}
          </p>
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-2 text-zinc-950 font-medium text-sm tracking-wide pb-0.5 w-fit hover:opacity-85 transition-opacity"
          >
            <span className="relative">
              ← Back to services
              <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-black transition-transform duration-300 ease-out origin-left group-hover:scale-x-100 group-hover:origin-left"></span>
            </span>
          </Link>
        </div>

        {/* Right Column — Tall Image with reveal */}
        <div className="order-1 lg:order-2 service-project-card">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 ">
            {/* White overlay */}
            <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
            {/* Core Image */}
            <div className="reveal-image w-full h-full relative">
              <Image
                src={service.image}
                alt={`${service.title} banner`}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 95vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Get In Touch Section */}
      <div className="my-24 py-24 px-6 bg-zinc-50 border border-zinc-100 rounded-sm flex flex-col items-center justify-center text-center">
        <h2 className="text-zinc-900 text-3xl md:text-[44px] lg:text-[50px] font-normal tracking-tight capitalize leading-[1.15] mb-12">
          Unlock the doors <br className="hidden md:relative" /> to exquisite living.
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-md mx-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 border border-zinc-900  text-zinc-950 font-normal text-xs uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all duration-300"
          >
            Book a Free Call
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 border border-zinc-900  text-white font-normal text-xs uppercase tracking-widest hover:bg-transparent hover:text-zinc-900 transition-all duration-300"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 text-black duration-200 hover:text-zinc-400">
          <a
            href="https://www.facebook.com/people/Avenor-Architects/61591632058501/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <span className="text-zinc-300">|</span>
          <a
            href="https://www.instagram.com/avenor.architects"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <span className="text-zinc-300">|</span>
          <a
            href="https://in.pinterest.com/avenorarchitects/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
            aria-label="Pinterest"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.342-.091.382-.294 1.199-.334 1.363-.053.218-.176.265-.406.157-1.518-.707-2.467-2.928-2.467-4.713 0-3.837 2.788-7.362 8.039-7.362 4.22 0 7.498 3.008 7.498 7.027 0 4.193-2.643 7.568-6.312 7.568-1.233 0-2.393-.641-2.79-1.395l-.76 2.898c-.276 1.054-1.025 2.376-1.525 3.189 1.125.347 2.316.535 3.552.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
            </svg>
          </a>
          <span className="text-zinc-300">|</span>
          <a
            href="mailto:info@avenorarchitects.com"
            className="hover:text-black transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4.5 h-4.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Part 4: Balance Services Grid */}
      <div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-10">
          RELATED SERVICES
        </span>

        {/* Desktop View: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {balanceServices.slice(0,3).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="service-project-card flex flex-col group cursor-pointer w-full"
            >
              {/* Image box with reveal */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 mb-4 ">
                <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
                <div className="reveal-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    loading="lazy"
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 95vw, 30vw"
                  />
                </div>
              </div>

              {/* Title and Corner Arrow */}
              <div className="flex items-center justify-between w-full mt-1">
                <h3 className="text-zinc-900 text-lg md:text-[20px] font-normal leading-snug tracking-tight group-hover:text-zinc-700 transition-colors">
                  {s.title}
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

        {/* Mobile View: Swiper Carousel */}
        <div className="block md:hidden w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.15}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="services-swiper"
          >
            {balanceServices.map((s) => (
              <SwiperSlide key={`mobile-${s.slug}`}>
                <Link
                  href={`/services/${s.slug}`}
                  className="service-project-card flex flex-col group cursor-pointer w-full"
                >
                  {/* Image box with reveal */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 mb-4 ">
                    <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
                    <div className="reveal-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        loading="lazy"
                        className="object-cover object-center"
                        sizes="90vw"
                      />
                    </div>
                  </div>

                  {/* Title and Corner Arrow */}
                  <div className="flex items-center justify-between w-full mt-1">
                    <h3 className="text-zinc-900 text-lg md:text-[20px] font-normal leading-snug tracking-tight group-hover:text-zinc-700 transition-colors">
                      {s.title}
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
