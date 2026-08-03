"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax } from "swiper/modules";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";

const projects = [
  {
    id: 1,
    title: "Balsa & Timber Maquette",
    src: "https://images.pexels.com/photos/7883882/pexels-photo-7883882.jpeg",
  },
  {
    id: 2,
    title: "Concrete Residential Layout",
    src: "https://images.pexels.com/photos/35630638/pexels-photo-35630638.jpeg",
  },
  {
    id: 3,
    title: "Laser-Cut Parametric Pavilion",
    src: "https://images.pexels.com/photos/35630641/pexels-photo-35630641.jpeg",
  },
  {
    id: 4,
    title: "Acrylic Futuristic Tower",
    src: "https://images.pexels.com/photos/7883875/pexels-photo-7883875.jpeg",
  },
];

export default function ProjectShowcase({ initialScaleModels = [] }) {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [modelsList, setModelsList] = useState(
    initialScaleModels && initialScaleModels.length > 0 ? initialScaleModels.slice(0, 6) : projects
  );

  React.useEffect(() => {
    if (initialScaleModels && initialScaleModels.length > 0) {
      setModelsList(initialScaleModels.slice(0, 6));
    }
  }, [initialScaleModels]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map main page scroll progress to vertical translation (e.g. -12% to 12%)
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section ref={containerRef} className="bg-black text-white py-16 md:py-24 antialiased selection:bg-white selection:text-black">
      {/* Section Header */}
      <div className="w-[95%] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-4">
            MAQUETTES
          </p>
          <h2 className="text-white text-3xl md:text-[38px] font-normal tracking-tight">
            Scale Models Showcase
          </h2>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase">
            Precision Crafted Physical Architecture
          </p>
        </div>
      </div>

      {/* Swiper Slider Wrapper with Parallax & Autoplay */}
      <div className="w-[95%] mx-auto relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Parallax]}
          parallax={true}
          speed={1400}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="showcase-swiper h-[60vh] sm:h-[80vh] w-full"
        >
          {modelsList.map((project, index) => {
            const slideContent = (
              <div className="relative w-full h-full">
                {/* Image with Swiper Parallax (horizontal) & Framer Motion (vertical) attributes */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  data-swiper-parallax="30%"
                >
                  <motion.div
                    style={{ y }}
                    className="relative w-full h-[124%] -top-[12%]"
                  >
                    <Image
                      src={project.src || project.image || "/scale_model_1.png"}
                      alt={project.title}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-cover brightness-[0.8] contrast-[1.02]"
                      sizes="95vw"
                    />
                  </motion.div>
                </div>

                {/* Gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

                {/* HUD Content Overlay with Parallax effects */}
                <div 
                  className="absolute inset-x-0 bottom-0 p-8 sm:p-16 flex justify-between items-end z-20 pointer-events-none"
                  data-swiper-parallax="-150"
                  data-swiper-parallax-opacity="0"
                >
                  <div>
                    <span className="text-xs font-mono text-zinc-400 tracking-widest block mb-2">
                      COLLECTION / 0{index + 1}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-light tracking-wide text-zinc-100">
                      {project.title}
                    </h2>
                  </div>
                  {project.slug && (
                    <div className="hidden sm:block text-right pointer-events-auto">
                      <span className="text-xs tracking-[0.25em] text-zinc-400 border-b border-zinc-800 pb-2 hover:text-white transition-colors cursor-pointer">
                        DISCOVER SPACE
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <SwiperSlide key={project.id || index} className="relative w-full h-full overflow-hidden bg-zinc-950">
                {project.slug ? (
                  <Link href={`/scale-models/${project.slug}`} className="block w-full h-full">
                    {slideContent}
                  </Link>
                ) : (
                  slideContent
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Clickable Pagination dots tracking active Swiper index */}
      <div className="w-full flex justify-center items-center gap-2 mt-12 z-20 relative">
        {modelsList.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer outline-none border-none p-0 ${
              idx === activeSlide ? "bg-white w-3 scale-110" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}