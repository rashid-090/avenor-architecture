"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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

            if (overlay && image) {
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
              }).fromTo(
                image,
                { scale: 1.15 },
                { scale: 1, duration: 1.6, ease: "power2.out" },
                "-=1.2"
              );
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
                src="/inner_service_banner.png"
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

      {/* Part 2: The Process (Sticky Left Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
        {/* Left Column — Sticky Process Image (reduced size) */}
        <div className="lg:sticky lg:top-24 h-fit service-project-card">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 ">
            <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
            <div className="reveal-image w-full h-full relative">
              <Image
                src="/inner_service_process.png"
                alt="Process blueprint plans"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 95vw, 30vw"
              />
            </div>
          </div>
        </div>

        {/* Right Column — Scrolling Process text */}
        <div className="">
          <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-4">
            THE PROCESS
          </span>
          <h2 className="text-zinc-900 text-2xl md:text-[34px] lg:text-[38px] font-normal leading-[1.3] tracking-tight mb-12">
            Delivering excellence from concept to completion
          </h2>

          <div className="space-y-12 max-w-2xl">
            {/* Step 1 */}
            <div>
              <h3 className="text-zinc-955 font-medium text-lg xl:text-xl mb-3 flex items-center gap-4">
                <span className="text-xs font-light text-zinc-400">01</span> Initial consultation & planning
              </h3>
              <div className="w-full h-[1px] bg-zinc-100 my-4" />
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                We begin by understanding your goals, budget, and timeline. Our team assesses the site, reviews requirements, and works with you to develop a clear, detailed project plan that aligns with your vision.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-zinc-955 font-medium text-lg xl:text-xl mb-3 flex items-center gap-4">
                <span className="text-xs font-light text-zinc-400">02</span> Design & permitting
              </h3>
              <div className="w-full h-[1px] bg-zinc-100 my-4" />
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                Collaborating with architects and engineers, we finalize design plans and ensure all necessary permits and approvals are secured. This stage lays the foundation for a smooth build by addressing technical and regulatory requirements early on.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-zinc-955 font-medium text-lg xl:text-xl mb-3 flex items-center gap-4">
                <span className="text-xs font-light text-zinc-400">03</span> Procurement & scheduling
              </h3>
              <div className="w-full h-[1px] bg-zinc-100 my-4" />
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                We carefully select quality materials and skilled subcontractors, creating a detailed project schedule. By managing resources effectively, we prepare to execute the construction phase efficiently and without delay.
              </p>
            </div>

            {/* Step 4 */}
            <div>
              <h3 className="text-zinc-955 font-medium text-lg xl:text-xl mb-3 flex items-center gap-4">
                <span className="text-xs font-light text-zinc-400">04</span> Construction & quality control
              </h3>
              <div className="w-full h-[1px] bg-zinc-100 my-4" />
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                Our experienced team oversees every aspect of the build, maintaining rigorous quality standards and safety protocols. Regular site inspections and progress updates keep the project on track, within budget, and aligned with your expectations.
              </p>
            </div>

            {/* Step 5 */}
            <div>
              <h3 className="text-zinc-955 font-medium text-lg xl:text-xl mb-3 flex items-center gap-4">
                <span className="text-xs font-light text-zinc-400">05</span> Final inspection & handover
              </h3>
              <div className="w-full h-[1px] bg-zinc-100 my-4" />
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                Upon completion, we conduct thorough inspections to ensure every detail meets our high standards and your satisfaction. We then hand over the finished space, along with all necessary documentation and a commitment to support you after project completion.
              </p>
            </div>
          </div>

          {/* Book Consultation Button */}
          <Link
            href="/#contact"
            className="inline-block mt-12 px-8 py-3.5 border border-zinc-900 text-zinc-950 font-normal text-xs uppercase tracking-widest hover:bg-zinc-950 hover:text-white transition-colors duration-300"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>

      {/* Part 3: Commitment to Excellence */}
      <div className="mb-24 py-16 border-t border-b border-zinc-100">
        <h2 className="text-zinc-900 text-3xl md:text-[40px] font-normal leading-tight tracking-tight mb-16">
          Our commitment to excellence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Col 1 */}
          <div>
            <h3 className="text-zinc-950 font-medium text-lg xl:text-xl mb-4">
              Superior Craftsmanship
            </h3>
            <p className="text-zinc-500  font-light leading-relaxed mb-6">
              We partner with only the most skilled artisans and tradespeople near our offices and from around the world.
            </p>
            <ul className="space-y-3 text-zinc-500 text-sm font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Over 1,000 businesses supported
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Commitment to sustainability
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Handmade furniture & human creations
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-zinc-950 font-medium text-lg xl:text-xl mb-4">
              High-Quality Furnishings
            </h3>
            <p className="text-zinc-500  font-light leading-relaxed mb-6">
              We source from exclusive design galleries, top private brands and global suppliers.
            </p>
            <ul className="space-y-3 text-zinc-500 text-sm font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Global sourcing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Investment in quality
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Discerning focus
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-zinc-950 font-medium text-lg xl:text-xl mb-4">
              Investment Value
            </h3>
            <p className="text-zinc-500 font-light leading-relaxed mb-6">
              Our designs are strategically tailored to maximize your property's appeal in the luxury market.
            </p>
            <ul className="space-y-3 text-zinc-500 text-sm font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Timeless elegance & lasting value
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Prioritize value creation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Strategic design approach
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Part 4: Balance Services Grid */}
      <div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-10">
          RELATED SERVICES
        </span>

        {/* Desktop View: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {balanceServices.map((s) => (
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
