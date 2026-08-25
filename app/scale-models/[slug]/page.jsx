import React from "react";
import { notFound } from "next/navigation";
import { scaleModels } from "../../lib/data";
import { client, urlFor } from "../../lib/sanity";
import InnerScaleModelShowcase from "./InnerScaleModelShowcase";

function blocksToParagraphs(blocks) {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map(child => child.text || '').join('');
    })
    .filter(Boolean);
}

async function getScaleModel(slug) {
  try {
    const query = `*[_type == "scaleModel" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      type,
      image,
      scale,
      location,
      year,
      size,
      materials,
      architect,
      headline,
      paragraphs,
      gallery,
      aspectClass
    }`;
    const data = await client.fetch(query, { slug }, { next: { revalidate: 10 } });
    if (data) {
      return {
        id: data._id,
        slug: data.slug || "",
        title: data.title || "",
        type: data.type || "Scale Model",
        image: data.image ? urlFor(data.image).url() : "",
        scale: data.scale || "",
        location: data.location || "",
        year: data.year || "",
        size: data.size || "",
        materials: data.materials || "",
        architect: data.architect || "",
        headline: data.headline || "",
        paragraphs: blocksToParagraphs(data.paragraphs),
        gallery: (data.gallery || []).map((img) => urlFor(img).url()),
        aspectClass: data.aspectClass || "aspect-[3/4]"
      };
    }
  } catch (err) {
    console.error("Error fetching scale model from Sanity:", err);
  }

  // Fallback to static data
  return scaleModels.find((m) => m.slug === slug);
}

async function getRelatedScaleModels(currentSlug) {
  try {
    const query = `*[_type == "scaleModel" && slug.current != $currentSlug]|order(orderRank asc)[0...4] {
      _id,
      title,
      "slug": slug.current,
      type,
      image,
      scale,
      aspectClass
    }`;
    const data = await client.fetch(query, { currentSlug }, { next: { revalidate: 10 } });
    if (data && data.length > 0) {
      return data.map((item, idx) => ({
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
    console.error("Error fetching related scale models:", err);
  }
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const model = await getScaleModel(slug);
  if (!model) return {};

  return {
    title: `${model.title} (${model.scale || "Scale Model"}) | Avenor Architects`,
    description: model.headline || `Explore details, physical craftsmanship, scale metrics, and creative processes of ${model.title}, an architectural scale model by Avenor Architects.`,
    alternates: {
      canonical: `https://avenorarchitects.com/scale-models/${slug}`,
    },
    openGraph: {
      title: `${model.title} (${model.scale || "Scale Model"}) | Avenor Architects`,
      description: model.headline || `Explore details, physical craftsmanship, scale metrics, and creative processes of ${model.title}, an architectural scale model by Avenor Architects.`,
      url: `https://avenorarchitects.com/scale-models/${slug}`,
      type: "article",
      images: model.image
        ? [
            {
              url: model.image,
              alt: model.title,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(`*[_type == "scaleModel"].slug.current`);
    if (slugs && slugs.length > 0) {
      return slugs.map((slug) => ({ slug }));
    }
  } catch (err) {
    console.error("Error generating static params for scale models from Sanity:", err);
  }

  return scaleModels.map((m) => ({
    slug: m.slug,
  }));
}

export default async function ScaleModelDetailPage({ params }) {
  const { slug } = await params;
  const scaleModel = await getScaleModel(slug);

  if (!scaleModel) {
    notFound();
  }

  const related = await getRelatedScaleModels(slug);

  return (
    <main className="bg-white text-zinc-950 min-h-screen">
      <InnerScaleModelShowcase scaleModel={scaleModel} related={related} />
    </main>
  );
}
