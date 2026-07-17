import React from "react";
import { notFound } from "next/navigation";
import { portfolioProjects } from "../../lib/data";
import InnerProjectShowcase from "./InnerProjectShowcase";

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-white text-zinc-950 min-h-screen">
      <InnerProjectShowcase project={project} />
    </main>
  );
}
