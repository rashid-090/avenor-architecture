import React from "react";
import LoadingScreen from "../components/common/LoadingScreen";

export default function ScaleModelsLoading() {
  return (
    <main className="bg-white text-zinc-950 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
      <div className="w-[95%] mx-auto">
        {/* Header Title Section Skeleton */}
        <div className="max-w-3xl mb-10 animate-pulse">
          <div className="h-12 w-64 bg-zinc-200 rounded mb-8" />
          <div className="h-4 w-full bg-zinc-100 rounded mb-2" />
          <div className="h-4 w-5/6 bg-zinc-100 rounded" />
        </div>
        <LoadingScreen variant="scale-model-list" />
      </div>
    </main>
  );
}
