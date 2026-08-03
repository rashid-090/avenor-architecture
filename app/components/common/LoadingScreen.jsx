import React from "react";

export default function LoadingScreen({ variant = "screen" }) {
  if (variant === "project-list" || variant === "scale-model-list") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 items-start animate-pulse">
        {[...Array(8)].map((_, idx) => {
          const aspectClass = idx % 3 === 0 ? "aspect-[3/4]" : idx % 3 === 1 ? "aspect-square" : "aspect-[4/3]";
          return (
            <div key={idx} className="flex flex-col w-full">
              <div className={`relative ${aspectClass} w-full bg-zinc-200 mb-4`} />
              <div className="h-5 w-3/4 bg-zinc-100 rounded" />
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "project-detail" || variant === "scale-model-detail") {
    return (
      <div className="w-[95%] mx-auto pb-16 md:pb-24 pt-24 md:pt-32 animate-pulse">
        {/* Back Link */}
        <div className="h-4 w-32 bg-zinc-100 rounded mb-8" />

        {/* Title */}
        <div className="max-w-4xl mb-10">
          <div className="h-4 w-24 bg-zinc-150 rounded mb-4" />
          <div className="h-12 w-3/4 bg-zinc-200 rounded" />
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video md:aspect-[21/9] w-full bg-zinc-200 mb-16" />

        {/* Specs Table */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-zinc-100 pb-16 mb-24">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-zinc-100 rounded" />
              <div className="h-5 w-24 bg-zinc-200 rounded" />
            </div>
          ))}
        </div>

        {/* Editorial Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5">
            <div className="h-6 w-full bg-zinc-200 rounded mb-3" />
            <div className="h-6 w-[90%] bg-zinc-200 rounded" />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="h-4 w-full bg-zinc-100 rounded" />
            <div className="h-4 w-full bg-zinc-100 rounded" />
            <div className="h-4 w-[85%] bg-zinc-100 rounded" />
          </div>
        </div>

        {/* Gallery Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[3/4] md:aspect-[1/1] w-full bg-zinc-200" />
          <div className="relative aspect-[3/4] md:aspect-[1/1] w-full bg-zinc-200" />
          <div className="relative aspect-[3/4] md:aspect-[1/1] w-full bg-zinc-200" />
        </div>
      </div>
    );
  }

  if (variant === "blog-list") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 animate-pulse">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex flex-col w-full">
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
        ))}
      </div>
    );
  }

  if (variant === "blog-detail") {
    return (
      <div className="w-[95%] mx-auto pb-16 md:pb-24 pt-24 md:pt-32 animate-pulse">
        {/* Back Link */}
        <div className="h-4 w-32 bg-zinc-100 rounded mb-8" />

        {/* Title */}
        <div className="max-w-4xl mb-10">
          <div className="h-3 w-36 bg-zinc-100 rounded mb-4" />
          <div className="h-12 w-4/5 bg-zinc-200 rounded" />
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video md:aspect-[21/9] w-full bg-zinc-200 mb-16" />

        {/* Context Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="h-4 w-20 bg-zinc-100 rounded" />
            <div className="h-5 w-32 bg-zinc-200 rounded" />
          </div>
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="h-6 w-5/6 bg-zinc-200 rounded mb-4" />
            <div className="h-4 w-full bg-zinc-100 rounded" />
            <div className="h-4 w-full bg-zinc-100 rounded" />
            <div className="h-4 w-[90%] bg-zinc-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Full Screen Minimalist Text / Spinner Screen Fallback (Default)
  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col items-center justify-center font-light text-sm animate-pulse">
      <div className="relative w-10 h-10 border-2 border-zinc-200 border-t-zinc-950 rounded-full animate-spin mb-4" />
      <span className="tracking-[0.15em] uppercase text-[10px] text-zinc-400 font-semibold">
        Avenore Architecture
      </span>
    </div>
  );
}
