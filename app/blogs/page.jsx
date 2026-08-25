import React, { Suspense } from "react";
import BlogsList from "../components/blog/BlogsList";
import { client, urlFor } from "../lib/sanity";
import LoadingScreen from "../components/common/LoadingScreen";

export const metadata = {
  title: "Architectural Insights, Material Research & Design | Avenor",
  description: "Read thoughts on modern architectural geometry, material science, sustainability, and green design from the architects at Avenor Architects.",
  alternates: {
    canonical: "https://avenorarchitects.com/blogs",
  },
  openGraph: {
    title: "Architectural Insights, Material Research & Design | Avenor",
    description: "Read thoughts on modern architectural geometry, material science, sustainability, and green design from the architects at Avenor Architects.",
    url: "https://avenorarchitects.com/blogs",
    type: "website",
  }
};

function blocksToParagraphs(blocks) {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map(child => child.text || '').join('');
    })
    .filter(Boolean);
}

export default async function BlogsPage() {
  let sanityBlogs = [];
  try {
    const query = `*[_type == "blog"]|order(orderRank asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      author,
      image,
      excerpt,
      headline,
      paragraphs,
      _createdAt
    }`;
    const data = await client.fetch(query, {}, { next: { revalidate: 10 } });
    if (data && data.length > 0) {
      sanityBlogs = data.map((item, idx) => {
        const textParagraphs = blocksToParagraphs(item.paragraphs);
        const wordCount = textParagraphs.join(" ").split(/\s+/).length;
        const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
        const date = new Date(item._createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return {
          id: item._id || idx.toString(),
          slug: item.slug || `blog-${idx}`,
          title: item.title || "",
          category: item.category || "Media",
          author: item.author || "Avenor Architects",
          image: item.image ? urlFor(item.image).url() : "",
          excerpt: item.excerpt || "",
          headline: item.headline || "",
          paragraphs: textParagraphs,
          readTime,
          date,
        };
      });
    }
  } catch (err) {
    console.error("Error fetching blogs on server:", err);
  }

  return (
    <Suspense
      fallback={
        <main className="bg-white text-zinc-950 min-h-screen pt-20 md:pt-28 pb-16 md:pb-24 animate-pulse">
          <div className="w-[95%] mx-auto">
            {/* Header Title Section Skeleton */}
            <div className="max-w-3xl mb-10">
              <div className="h-12 w-64 bg-zinc-200 rounded mb-6" />
              <div className="h-4 w-full bg-zinc-100 rounded mb-2" />
              <div className="h-4 w-5/6 bg-zinc-100 rounded" />
            </div>
            <LoadingScreen variant="blog-list" />
          </div>
        </main>
      }
    >
      <BlogsList initialBlogs={sanityBlogs} />
    </Suspense>
  );
}
