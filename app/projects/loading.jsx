import React from "react";
import LoadingScreen from "../components/common/LoadingScreen";

export default function ProjectsLoading() {
  return (
    <section className="bg-white text-zinc-950 min-h-screen pb-16 md:py-24">
      <div className="w-[95%] mx-auto">
        {/* Header Title Section Skeleton */}
        <div className="max-w-3xl mb-10 animate-pulse">
          <div className="h-12 w-48 bg-zinc-200 rounded mb-8" />
          <div className="h-4 w-full bg-zinc-100 rounded mb-2" />
          <div className="h-4 w-5/6 bg-zinc-100 rounded" />
        </div>
        <LoadingScreen variant="project-list" />
      </div>
    </section>
  );
}
