"use client";

import React, { useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { scaleModels } from "../../lib/data";
import Link from "next/link";
import LoadingScreen from "../common/LoadingScreen";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ScaleModelListContent({ initialScaleModels = [] }) {
  const containerRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPageString = searchParams.get("page") || "1";
  const currentPage = parseInt(currentPageString, 10) || 1;
  const itemsPerPage = 8;

  const [modelsList, setModelsList] = React.useState(
    initialScaleModels.length > 0 ? initialScaleModels : scaleModels
  );

  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    if (initialScaleModels && initialScaleModels.length > 0) {
      setModelsList(initialScaleModels);
    }
  }, [initialScaleModels]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      setTimeout(() => {
        const cards = containerRef.current?.querySelectorAll(".scale-model-card");

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
        ScrollTrigger.refresh();
      }, 150);
    }, containerRef);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        if (window.lenis && typeof window.lenis.scrollTo === "function") {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
          document.documentElement.scrollTo(0, 0);
          document.body.scrollTo(0, 0);
        }
      }
    }, 50);

    return () => ctx.revert();
  }, [currentPage, modelsList]);

  const totalPages = Math.ceil(modelsList.length / itemsPerPage);
  const currentModels = modelsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (typeof window !== "undefined") {
      if (window.lenis && typeof window.lenis.scrollTo === "function") {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.documentElement.scrollTo({ top: 0, behavior: "instant" });
        document.body.scrollTo({ top: 0, behavior: "instant" });
      }
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - 1);
    let endPage = startPage + 2;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - 2);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const renderCard = (item, idx) => {
    const isAboveFold = currentPage === 1 && idx < 4;

    return (
      <Link
        key={item.id}
        href={`/scale-models/${item.slug}`}
        className="scale-model-card flex flex-col group cursor-pointer w-full"
      >
        {/* Image box with overflow hidden */}
        <div className={`relative ${item.aspectClass} w-full overflow-hidden bg-zinc-100 mb-4`}>
          {/* White overlay block that slides down */}
          <div className="reveal-overlay absolute inset-0 bg-white z-20 pointer-events-none" />

          {/* Badge for scale & type */}
          {(item.scale || item.type) && (
            <span className="absolute top-4 left-4 z-10 bg-black/10 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 pointer-events-none">
              {item.scale ? `${item.scale} • ${item.type}` : item.type}
            </span>
          )}

          {/* Core Image with hover zoom */}
          <div className="reveal-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105 z-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              loading={isAboveFold ? "eager" : "lazy"}
              priority={isAboveFold}
              {...(isAboveFold ? { fetchPriority: "high" } : {})}
              className="object-cover object-center"
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 23vw"
            />
          </div>
        </div>

        {/* Scale Model Title and Arrow */}
        <div className="flex items-center justify-between w-full">
          <h3 className="text-zinc-900 text-[15px] md:text-xl font-semibold leading-snug tracking-tight group-hover:text-zinc-700 transition-colors">
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
    );
  };

  return (
    <section ref={containerRef} className="bg-white text-zinc-950 pt-20 pb-16 md:py-24">
      <div className="w-[95%] mx-auto">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-zinc-900 text-4xl md:text-[50px] font-normal leading-tight tracking-tight mb-8">
            Scale models
          </h1>
          <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
            Explore Avenore Studio's collection of precision physical scale models, urban planning maquettes, and 3D architectural prototypes. We translate complex spatial concepts into tactile, hand-crafted miniature representations.
          </p>
        </div>

        {/* 4-Column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 items-start">
          {isPending
            ? [...Array(itemsPerPage)].map((_, idx) => {
                const aspectClass = idx % 3 === 0 ? "aspect-[3/4]" : idx % 3 === 1 ? "aspect-square" : "aspect-[4/3]";
                return (
                  <div key={idx} className="flex flex-col w-full animate-pulse">
                    <div className={`relative ${aspectClass} w-full bg-zinc-200 mb-4`} />
                    <div className="h-5 w-3/4 bg-zinc-100 rounded" />
                  </div>
                );
              })
            : currentModels.map((item, idx) => renderCard(item, idx))
          }
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-20 border-t border-zinc-100 pt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-10 w-10 border border-zinc-300 flex items-center justify-center text-zinc-950 hover:bg-zinc-50 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer text-sm font-semibold"
              aria-label="Previous Page"
            >
              «
            </button>

            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-10 w-10 border flex items-center justify-center text-sm transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-zinc-800 text-white border-zinc-800 font-semibold"
                    : "bg-white text-zinc-950 border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-10 w-10 border border-zinc-300 flex items-center justify-center text-zinc-950 hover:bg-zinc-50 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer text-sm font-semibold"
              aria-label="Next Page"
            >
              »
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ScaleModelList({ initialScaleModels = [] }) {
  return (
    <Suspense
      fallback={
        <section className="bg-white text-zinc-950 min-h-screen pb-16 md:py-24 animate-pulse">
          <div className="w-[95%] mx-auto">
            {/* Header Title Section Skeleton */}
            <div className="max-w-3xl mb-10">
              <div className="h-12 w-64 bg-zinc-200 rounded mb-8" />
              <div className="h-4 w-full bg-zinc-100 rounded mb-2" />
              <div className="h-4 w-5/6 bg-zinc-100 rounded" />
            </div>
            <LoadingScreen variant="scale-model-list" />
          </div>
        </section>
      }
    >
      <ScaleModelListContent initialScaleModels={initialScaleModels} />
    </Suspense>
  );
}
