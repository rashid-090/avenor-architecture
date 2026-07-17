import React from "react";
import { notFound } from "next/navigation";
import { servicesData } from "../../lib/data";
import InnerServiceProjects from "./InnerServiceProjects";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceInnerPage({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-white text-zinc-950 min-h-screen">
      <InnerServiceProjects service={service} />
    </main>
  );
}
