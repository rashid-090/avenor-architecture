"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScanSearch } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { scaleModels } from "../../lib/data";

import "swiper/css";
import "swiper/css/pagination";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InnerScaleModelShowcase({ scaleModel, related = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      setTimeout(() => {
        const cards = containerRef.current?.querySelectorAll(".service-project-card");

        if (cards && cards.length > 0) {
          cards.forEach((card) => {
            const overlay = card.querySelector(".reveal-overlay");
            const image = card.querySelector(".reveal-image img");

            if (overlay) {
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
          });
        }
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, [scaleModel]);

  const displayGallery = scaleModel.gallery && scaleModel.gallery.length > 0 ? scaleModel.gallery : [];

  const relatedModels = related && related.length > 0
    ? related
    : scaleModels.filter((m) => m.slug !== scaleModel.slug).slice(0, 4);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? displayGallery.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === displayGallery.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, displayGallery.length]);

  return (
    <div ref={containerRef} className="w-[95%] mx-auto pb-16 md:pb-24">
      {/* Top Header Label & Title */}
      <div className="pt-24 md:pt-32 mb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-3">
          {scaleModel.scale} • {scaleModel.type?.toUpperCase()}
        </span>
        <h1 className="text-zinc-900 text-4xl md:text-[50px] lg:text-[55px] font-normal leading-none tracking-tight">
          {scaleModel.title}
        </h1>
      </div>

      {/* Hero Image Card */}
      <div className="service-project-card relative aspect-video md:aspect-[21/9] w-full overflow-hidden bg-zinc-100 mb-16">
        <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
        <div className="reveal-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={scaleModel.image}
            alt={scaleModel.title}
            fill
            priority
            loading="eager"
            fetchPriority="high"
            className="object-cover object-center"
            sizes="95vw"
          />
        </div>
      </div>

      {/* Details Metadata Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-zinc-100 pb-16 mb-24 text-sm font-light">
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Scale Ratio</span>
          <span className="text-zinc-950 font-normal text-base">{scaleModel.scale}</span>
        </div>
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Materials</span>
          <span className="text-zinc-950 font-normal text-base">{scaleModel.materials}</span>
        </div>
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Location</span>
          <span className="text-zinc-950 font-normal text-base">{scaleModel.location}</span>
        </div>
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Year</span>
          <span className="text-zinc-950 font-normal text-base">{scaleModel.year}</span>
        </div>
        <div>
          <span className="text-zinc-400 block mb-2 font-normal text-xs uppercase tracking-wider">Model Maker</span>
          <span className="text-zinc-950 font-normal text-base">{scaleModel.architect}</span>
        </div>
      </div>

      {/* Split Text Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-24">
        {/* Left Column: Giant headline */}
        <div className="lg:col-span-5">
          <h2 className="text-zinc-900 text-2xl md:text-[32px] font-normal leading-[1.3] tracking-tight">
            {scaleModel.headline}
          </h2>
        </div>

        {/* Right Column: Paragraph runs */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
          {scaleModel.paragraphs?.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <div className="mt-4 pt-6 border-t border-zinc-100">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-2">MODEL DIMENSIONS</span>
            <span className="text-zinc-950 font-normal text-base">{scaleModel.size || "1.0m x 0.8m"}</span>
          </div>
        </div>
      </div>

      {/* Swiper Carousel Scale Model Gallery */}
      {displayGallery.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block">
              MODEL GALLERY
            </span>
            <span className="text-xs text-zinc-400 font-light">
              {displayGallery.length} Photographs
            </span>
          </div>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="gallery-swiper !overflow-visible"
          >
            {displayGallery.map((imgUrl, idx) => (
              <SwiperSlide key={idx}>
                <div
                  onClick={() => openLightbox(idx)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 group cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`${scaleModel.title} detail photo ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute text-white inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ScanSearch />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors p-2 text-2xl"
            aria-label="Close Lightbox"
          >
            ✕
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 z-50 text-white/70 text-xs tracking-widest font-mono">
            {lightboxIndex + 1} / {displayGallery.length}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/10 text-xl"
            aria-label="Previous Image"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/10 text-xl"
            aria-label="Next Image"
          >
            ›
          </button>

          {/* Image Wrapper */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayGallery[lightboxIndex]}
              alt={`${scaleModel.title} gallery photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain select-none shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Related Scale Models Area */}
      {relatedModels.length > 0 && (
        <div className="border-t border-zinc-100 pt-16">
          <div className="flex items-center justify-between mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block">
              RELATED SCALE MODELS
            </span>
            <Link
              href="/scale-models"
              className="group relative inline-flex items-center gap-2 text-zinc-950 font-medium text-sm tracking-wide pb-0.5 hover:opacity-85 transition-opacity"
            >
              <span className="relative">
                View all models
                <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-black transition-transform duration-300 ease-out origin-left group-hover:scale-x-100 group-hover:origin-left"></span>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedModels.map((item) => (
              <Link
                key={item.id}
                href={`/scale-models/${item.slug}`}
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
