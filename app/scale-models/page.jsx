import React, { Suspense } from "react";
import ScaleModelList from "../components/scalemodel/ScaleModelList";
import { client, urlFor } from "../lib/sanity";
import LoadingScreen from "../components/common/LoadingScreen";

export const metadata = {
  title: "Architectural Scale Models & Maquettes | Avenore Architecture",
  description: "Explore Avenore Architecture's collection of precision physical scale models, urban planning maquettes, and 3D architectural prototypes.",
  alternates: {
    canonical: "https://avenore.com/scale-models",
  },
  openGraph: {
    title: "Architectural Scale Models & Maquettes | Avenore Architecture",
    description: "Explore Avenore Architecture's collection of precision physical scale models, urban planning maquettes, and 3D architectural prototypes.",
    url: "https://avenore.com/scale-models",
    type: "website",
  }
};

export default async function ScaleModelsPage() {
  let sanityScaleModels = [];
  try {
    const query = `*[_type == "scaleModel"]|order(orderRank asc) {
      _id,
      title,
      "slug": slug.current,
      type,
      image,
      scale,
      aspectClass
    }`;
    const data = await client.fetch(query, {}, { next: { revalidate: 10 } });
    if (data && data.length > 0) {
      sanityScaleModels = data.map((item, idx) => ({
        id: item._id || idx.toString(),
        slug: item.slug || `scale-model-${idx}`,
        title: item.title || "",
        type: item.type || "Scale Model",
        image: item.image ? urlFor(item.image).url() : "",
        scale: item.scale || "",
        aspectClass: item.aspectClass || "aspect-[3/4]"
      }));
    }
  } catch (err) {
    console.error("Error fetching scale models on server:", err);
  }

  return (
    <Suspense
      fallback={
        <main className="bg-white text-zinc-950 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24 animate-pulse">
          <div className="w-[95%] mx-auto">
            {/* Header Title Section Skeleton */}
            <div className="max-w-3xl mb-10">
              <div className="h-12 w-64 bg-zinc-200 rounded mb-8" />
              <div className="h-4 w-full bg-zinc-100 rounded mb-2" />
              <div className="h-4 w-5/6 bg-zinc-100 rounded" />
            </div>
            <LoadingScreen variant="scale-model-list" />
          </div>
        </main>
      }
    >
      <ScaleModelList initialScaleModels={sanityScaleModels} />
    </Suspense>
  );
}
