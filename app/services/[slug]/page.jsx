import React from "react";
import { notFound } from "next/navigation";
import { servicesData } from "../../lib/data";
import InnerServiceProjects from "./InnerServiceProjects";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} — Services & Expertise | Avenor Architects`,
    description: service.paragraphs?.[0] || `Avenor Architects offers premium ${service.title} services, executing high-spec architectural and design plans.`,
    alternates: {
      canonical: `https://avenorarchitects.com/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} — Services & Expertise | Avenor Architects`,
      description: service.paragraphs?.[0] || `Avenor Architects offers premium ${service.title} services, executing high-spec architectural and design plans.`,
      url: `https://avenorarchitects.com/services/${slug}`,
      type: "website",
      images: [
        {
          url: service.image,
          alt: service.title,
        },
      ],
    },
  };
}

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
