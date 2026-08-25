import React from "react";
import PortfolioList from "../components/project/PortfolioList";
import { client, urlFor } from "../lib/sanity";

export const metadata = {
  title: "Featured Architecture & Design Portfolio | Avenor Architects",
  description: "Explore Avenor Architects's portfolio of private luxury residences, high-end commercial spaces, and premium interior design projects.",
  alternates: {
    canonical: "https://avenorarchitects.com/projects",
  },
  openGraph: {
    title: "Featured Architecture & Design Portfolio | Avenor Architects",
    description: "Explore Avenor Architects's portfolio of private luxury residences, high-end commercial spaces, and premium interior design projects.",
    url: "https://avenorarchitects.com/projects",
    type: "website",
  }
};

export default async function ProjectsPage() {
  let sanityProjects = [];
  try {
    const query = `*[_type == "project"]|order(orderRank asc) {
      _id,
      title,
      "slug": slug.current,
      "type": projectType,
      cardThumbImage,
      mainImage,
      aspectClass
    }`;
    const data = await client.fetch(query, {}, { next: { revalidate: 10 } });
    if (data && data.length > 0) {
      sanityProjects = data.map((item, idx) => ({
        id: item._id || idx.toString(),
        slug: item.slug || `project-${idx}`,
        title: item.title || "",
        type: item.type || "Project",
        image: item.cardThumbImage
          ? urlFor(item.cardThumbImage).url()
          : item.mainImage
          ? urlFor(item.mainImage).url()
          : "",
        aspectClass: item.aspectClass || "aspect-[3/4]",
      }));
    }
  } catch (err) {
    console.error("Error fetching projects on server:", err);
  }

  return (
    <main className="bg-white text-zinc-950 min-h-screen pt-20 md:pt-24">
      <PortfolioList initialProjects={sanityProjects} />
    </main>
  );
}