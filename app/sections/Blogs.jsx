"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { blogsData } from "../lib/data";

// Import Swiper styles
import "swiper/css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogsSection({ initialBlogs = [] }) {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [blogsList, setBlogsList] = useState(
    initialBlogs && initialBlogs.length > 0 ? initialBlogs.slice(0, 6) : blogsData.slice(0, 6)
  );

  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogsList(initialBlogs.slice(0, 6));
    }
  }, [initialBlogs]);

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small timeout to allow Swiper slide clones to mount correctly
      setTimeout(() => {
        const cards = containerRef.current?.querySelectorAll(".blog-card-container");
        
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
                duration: 1.3,
                ease: "power3.inOut",
              });

              if (image) {
                tl.fromTo(image,
                  { scale: 1.15 },
                  { scale: 1, duration: 1.5, ease: "power2.out" },
                  "-=1.2"
                );
              }
            }
          });
        }
      }, 150);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="media"
      className="bg-white text-zinc-950 py-16 md:py-24 border-t border-zinc-100"
    >
      {/* Header */}
      <div className="w-[95%] mx-auto flex flex-row items-end justify-between mb-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-4">
            MEDIA
          </p>
          <h2 className="text-zinc-900 text-2xl md:text-[34px] lg:text-[38px] font-normal tracking-tight leading-none">
            Media and press releases
          </h2>
        </div>
        <div>
          <Link
            href="/blogs"
            className="group relative flex items-center gap-1.5 text-zinc-950 font-medium text-xs md:text-sm tracking-wide  pb-0.5 hover:opacity-85 transition-opacity"
          >
            Read all
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
                            <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-black transition-transform duration-300 ease-out origin-left group-hover:scale-x-100 group-hover:origin-left"></span>

          </Link>
        </div>
      </div>

      {/* Swiper Slider Wrapper */}
      <div className="w-[95%] mx-auto">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          slidesPerView={1.15}
          loop={true}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="blogs-swiper"
        >
          {blogsList.map((b, idx) => (
            <SwiperSlide key={b.id || idx}>
              <Link
                href={`/blogs/${b.slug}`}
                className="flex flex-col group cursor-pointer w-full"
              >
                {/* Image container with hidden vertical reveal overlay */}
                <div className="blog-card-container relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 mb-5">
                  {/* White overlay block that slides down */}
                  <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />

                  {/* Core Image */}
                  <div className="reveal-image w-full h-full relative">
                    <Image
                      src={b.image || "/blog_1.png"}
                      alt={b.title}
                      fill
                      loading="lazy"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 95vw, 30vw"
                    />
                  </div>
                </div>

                {/* Post Information */}
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-2 block">
                    {b.category}
                  </span>
                  <h3 className="text-zinc-900 text-lg md:text-[20px] font-normal leading-snug tracking-tight group-hover:text-zinc-700 transition-colors">
                    {b.title}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Clickable Pagination dots tracking active Swiper index */}
      <div className="w-full flex justify-center items-center gap-2 mt-12 z-20 relative">
        {blogsList.slice(0, Math.min(3, blogsList.length)).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer outline-none border-none p-0 ${
              idx === activeSlide % 3 ? "bg-zinc-800 scale-125 w-3" : "w-1.5 bg-zinc-200 hover:bg-zinc-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
