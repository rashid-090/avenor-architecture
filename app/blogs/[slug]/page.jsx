import React from "react";
import { notFound } from "next/navigation";
import { blogsData } from "../../lib/data";
import { client, urlFor } from "../../lib/sanity";
import InnerBlogShowcase from "./InnerBlogShowcase";

function blocksToParagraphs(blocks) {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map(child => child.text || '').join('');
    })
    .filter(Boolean);
}

async function getPost(slug) {
  // Try fetching from Sanity first
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
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
    const data = await client.fetch(query, { slug }, { next: { revalidate: 10 } });
    if (data) {
      const textParagraphs = blocksToParagraphs(data.paragraphs);
      const wordCount = textParagraphs.join(" ").split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
      const date = new Date(data._createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      return {
        id: data._id,
        slug: data.slug || "",
        title: data.title || "",
        category: data.category || "Media",
        author: data.author || "Avenor Architects",
        image: data.image ? urlFor(data.image).url() : "",
        excerpt: data.excerpt || "",
        headline: data.headline || "",
        paragraphs: textParagraphs,
        readTime,
        date,
      };
    }
  } catch (err) {
    console.error("Error fetching blog post from Sanity:", err);
  }

  // Fallback to static data
  return blogsData.find((b) => b.slug === slug);
}

async function getRelatedPosts(currentSlug) {
  try {
    const query = `*[_type == "blog" && slug.current != $currentSlug]|order(orderRank asc)[0...3] {
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
    const data = await client.fetch(query, { currentSlug }, { next: { revalidate: 10 } });
    if (data && data.length > 0) {
      return data.map((item, idx) => {
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
    console.error("Error fetching related posts:", err);
  }
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Insights & Media | Avenor Architects`,
    description: post.excerpt || `Read our perspective and expert analysis on ${post.title}.`,
    alternates: {
      canonical: `https://avenorarchitects.com/blogs/${slug}`,
    },
    openGraph: {
      title: `${post.title} — Insights & Media | Avenor Architects`,
      description: post.excerpt || `Read our perspective and expert analysis on ${post.title}.`,
      url: `https://avenorarchitects.com/blogs/${slug}`,
      type: "article",
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.title,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(`*[_type == "blog"].slug.current`);
    if (slugs && slugs.length > 0) {
      return slugs.map((slug) => ({ slug }));
    }
  } catch (err) {
    console.error("Error generating static params for blogs from Sanity:", err);
  }

  return blogsData.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(slug);

  return (
    <main className="bg-white text-zinc-950 min-h-screen">
      <InnerBlogShowcase post={post} related={related} />
    </main>
  );
}
