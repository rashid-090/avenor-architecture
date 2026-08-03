"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogsData } from "../../lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InnerBlogShowcase({ post, related = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small timeout to allow Next/Image assets to mount
      setTimeout(() => {
        const elements = containerRef.current?.querySelectorAll(".blog-fade-in");
        if (elements && elements.length > 0) {
          elements.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }

        const imageOverlay = containerRef.current?.querySelector(".reveal-overlay");
        const image = containerRef.current?.querySelector(".reveal-image img");
        if (imageOverlay) {
          // Reset overlays to avoid GSAP positioning clashes on state updates
          gsap.set(imageOverlay, { yPercent: 0 });
          if (image) {
            gsap.set(image, { scale: 1.15 });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: imageOverlay,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
          tl.to(imageOverlay, {
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
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, [post]);

  const relatedStories = related && related.length > 0
    ? related
    : blogsData.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <div ref={containerRef} className="w-[95%] mx-auto pb-16 md:pb-24">
      {/* Back to list */}
      <div className="pt-24 md:pt-32 mb-6">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-2 text-zinc-500 font-medium text-xs md:text-sm hover:text-zinc-950 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="translate-x-0 group-hover:-translate-x-0.5 transition-transform"
          >
            <path
              d="M13 8H3M3 8L7 12M3 8L7 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to insights
        </Link>
      </div>

      {/* Header Info */}
      <div className="mb-10 max-w-4xl">
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-4">
          <span>{post.category}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-200" />
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-zinc-900 text-3xl md:text-[45px] lg:text-[50px] font-normal leading-tight tracking-tight">
          {post.title}
        </h1>
      </div>

      {/* Hero Image Card */}
      <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden bg-zinc-100 mb-16">
        <div className="reveal-overlay absolute inset-0 bg-white z-10 pointer-events-none" />
        <div className="reveal-image w-full h-full relative">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            loading="eager"
            fetchPriority="high"
            className="object-cover object-center"
            sizes="95vw"
          />
        </div>
      </div>

      {/* Article Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* Left Column: Author and details info */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-zinc-100 pb-8 lg:pb-0 lg:pr-12 text-sm font-light flex flex-col gap-6">
          <div>
            <span className="text-zinc-400 block mb-1 font-normal text-xs uppercase tracking-wider">Written By</span>
            <span className="text-zinc-950 font-normal text-base">{post.author}</span>
          </div>
          <div>
            <span className="text-zinc-400 block mb-1 font-normal text-xs uppercase tracking-wider">Published</span>
            <span className="text-zinc-950 font-normal text-base">{post.date}</span>
          </div>
       
        </div>

        {/* Right Column: Narrative content, headline, blockquotes */}
        <div className="lg:col-span-8 flex flex-col gap-8 text-zinc-500 text-sm md:text-[16px] font-light leading-relaxed">
          {/* Main Headline */}
          <h2 className="text-zinc-900 text-xl md:text-2xl font-normal leading-[1.3] tracking-tight mb-2">
            {post.headline}
          </h2>

          {/* First paragraphs */}
          {post.paragraphs?.slice(0, 2).map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}

          {/* Pullquote */}
          {post.quote && (
            <div className="blog-fade-in my-6 border-l-2 border-black pl-6 py-2">
              <p className="text-zinc-950 italic text-lg md:text-xl font-normal leading-relaxed mb-3">
                "{post.quote}"
              </p>
              {post.quoteAuthor && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
                  — {post.quoteAuthor}
                </span>
              )}
            </div>
          )}

          {/* Remaining paragraphs */}
          {post.paragraphs?.slice(2).map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>

      {/* Related Reading Area */}
      {relatedStories.length > 0 && (
        <div className="border-t border-zinc-100 pt-16">
          <div className="flex items-center justify-between mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block">
              Related stories
            </span>
            <Link
              href="/blogs"
              className="group relative inline-flex items-center gap-2 text-zinc-950 font-medium text-sm tracking-wide pb-0.5 hover:opacity-85 transition-opacity"
            >
              <span className="relative">
                All articles
                <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-black transition-transform duration-300 ease-out origin-left group-hover:scale-x-100 group-hover:origin-left"></span>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedStories.map((item) => (
              <Link
                key={item.id}
                href={`/blogs/${item.slug}`}
                className="blog-fade-in flex flex-col group cursor-pointer w-full"
              >
                {/* Image box */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 mb-4">
                  <div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      loading="lazy"
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 95vw, 45vw"
                    />
                  </div>
                </div>

                {/* Info block */}
                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-2">
                    <span>{item.category}</span>
                    <span className="h-1 w-1 rounded-full bg-zinc-200" />
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="text-zinc-900 text-lg leading-snug  group-hover:text-zinc-700 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
