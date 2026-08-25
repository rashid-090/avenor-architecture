import React from "react";
import { notFound } from "next/navigation";
import { portfolioProjects } from "../../lib/data";
import { client, urlFor } from "../../lib/sanity";
import InnerProjectShowcase from "./InnerProjectShowcase";

async function getProject(slug) {
  // Try fetching from Sanity first
  try {
    const query = `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "type": projectType,
      cardThumbImage,
      mainImage,
      location,
      year,
      size,
      architect,
      client,
      editorialHeadline,
      editorialParagraphs,
      projectGallery,
      aspectClass
    }`;
    const data = await client.fetch(query, { slug }, { next: { revalidate: 10 } });
    if (data) {
      return {
        id: data._id,
        title: data.title || "",
        slug: data.slug || "",
        type: data.type || "Project",
        image: data.mainImage ? urlFor(data.mainImage).url() : (data.cardThumbImage ? urlFor(data.cardThumbImage).url() : ""),
        headline: data.editorialHeadline || "",
        paragraphs: data.editorialParagraphs || [],
        gallery: (data.projectGallery || []).map((img) => urlFor(img).url()),
        aspectClass: data.aspectClass || "aspect-[3/4]",
        location: data.location || "",
        year: data.year || "",
        size: data.size || "",
        architect: data.architect || "",
        client: data.client || "",
      };
    }
  } catch (err) {
    console.error("Error fetching project from Sanity:", err);
  }

  // Fallback to static data
  return portfolioProjects.find((p) => p.slug === slug);
}

async function getRelatedProjects(currentSlug) {
  try {
    const query = `*[_type == "project" && slug.current != $currentSlug]|order(orderRank asc)[0...4] {
      _id,
      title,
      "slug": slug.current,
      "type": projectType,
      cardThumbImage,
      mainImage,
      location,
      year
    }`;
    const data = await client.fetch(query, { currentSlug }, { next: { revalidate: 10 } });
    if (data && data.length > 0) {
      return data.map((item, idx) => ({
        id: item._id || idx.toString(),
        slug: item.slug || `project-${idx}`,
        title: item.title || "",
        type: item.type || "Project",
        image: (item.cardThumbImage && item.cardThumbImage.asset)
          ? urlFor(item.cardThumbImage).url()
          : (item.mainImage && item.mainImage.asset)
          ? urlFor(item.mainImage).url()
          : "",
        location: item.location || "",
        year: item.year || ""
      }));
    }
  } catch (err) {
    console.error("Error fetching related projects from Sanity:", err);
  }
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Featured Project | Avenor Architects`,
    description: project.headline || `Explore details, design blueprints, photos, and creative processes of ${project.title}, a premier design by Avenor Architects.`,
    alternates: {
      canonical: `https://avenorarchitects.com/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} — Featured Project | Avenor Architects`,
      description: project.headline || `Explore details, design blueprints, photos, and creative processes of ${project.title}, a premier design by Avenor Architects.`,
      url: `https://avenorarchitects.com/projects/${slug}`,
      type: "article",
      images: project.image
        ? [
            {
              url: project.image,
              alt: project.title,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(`*[_type == "project"].slug.current`);
    if (slugs && slugs.length > 0) {
      return slugs.map((slug) => ({ slug }));
    }
  } catch (err) {
    console.error("Error generating static params from Sanity:", err);
  }

  return portfolioProjects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(slug);

  return (
    <main className="bg-white text-zinc-950 min-h-screen">
      <InnerProjectShowcase project={project} related={related} />
    </main>
  );
}
