"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogsData } from "../../lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogsList({ initialBlogs = [] }) {
  const containerRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPageString = searchParams.get("page") || "1";
  const currentPage = parseInt(currentPageString, 10) || 1;
  const itemsPerPage = 4;

  const [blogsList, setBlogsList] = React.useState(
    initialBlogs.length > 0 ? initialBlogs : blogsData
  );

  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogsList(initialBlogs);
    }
  }, [initialBlogs]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small timeout to allow Next/Image assets to mount
      setTimeout(() => {
        const cards = containerRef.current?.querySelectorAll(".blog-card");

        if (cards && cards.length > 0) {
          cards.forEach((card) => {
            const overlay = card.querySelector(".reveal-overlay");
            const image = card.querySelector(".reveal-image img");

            if (overlay) {
              // Reset overlays to avoid GSAP positioning clashes on page change
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
        ScrollTrigger.refresh();
      }, 150);

      // Extra backup refresh once page load stabilizes
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800);
    }, containerRef);

    // Scroll to the very top of the page immediately upon page state changes
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
  }, [currentPage, blogsList]);

  const totalPages = Math.ceil(blogsList.length / itemsPerPage);
  const currentBlogs = blogsList.slice(
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

  return (
    <main
      ref={containerRef}
      className="bg-white text-zinc-950 min-h-screen pt-20 md:pt-28 pb-16 md:pb-24"
    >
      <div className="w-[95%] mx-auto">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-zinc-900 text-4xl md:text-[50px] font-normal leading-tight tracking-tight mb-6">
            Insights & media
          </h1>
          <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
            Thoughts on architectural design, material research, and sustainable
            development from the team at Avenor Architects.
          </p>
        </div>

        {/* 2-Column Responsive Layout for Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {isPending
            ? [...Array(itemsPerPage)].map((_, idx) => (
                <div key={idx} className="flex flex-col w-full animate-pulse">
                  <div className="relative aspect-[16/10] w-full bg-zinc-200 mb-6" />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4 mb-1">
                      <div className="h-3 w-16 bg-zinc-100 rounded" />
                      <div className="h-3 w-12 bg-zinc-100 rounded" />
                    </div>
                    <div className="h-6 w-full bg-zinc-200 rounded mb-2" />
                    <div className="h-6 w-[80%] bg-zinc-200 rounded" />
                  </div>
                </div>
              ))
            : currentBlogs.map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug}`}
                  className="blog-card flex flex-col group cursor-pointer w-full"
                >
                  {/* Image box with overflow hidden */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 mb-6">
                    {/* White overlay block that slides down */}
                    <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />

                    {/* Core Image with hover zoom */}
                    <div className="reveal-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        loading={currentPage === 1 && idx < 2 ? "eager" : "lazy"}
                        priority={currentPage === 1 && idx < 2}
                        {...(currentPage === 1 && idx < 2 ? { fetchPriority: "high" } : {})}
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 95vw, 45vw"
                      />
                    </div>
                  </div>

                  {/* Blog Info */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-3">
                      <span>{item.category}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-200" />
                      <span>{item.readTime}</span>
                    </div>

                    <h3 className="text-zinc-900 text-[20px] md:text-2xl font-normal line-clamp-1 leading-snug tracking-tight group-hover:text-zinc-700 transition-colors mb-3">
                      {item.title}
                    </h3>

                    <p className="text-zinc-500 line-clamp-2 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>

                    <div className="mt-4 relative flex items-center gap-1.5 text-zinc-950 font-semibold text-xs tracking-wide group pb-0.5 self-start hover:opacity-85 transition-opacity">
                      Read article
                      <svg
                        width="12"
                        height="12"
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
                    </div>
                  </div>
                </Link>
              ))}
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
    </main>
  );
}
