import HeroBannerSlider from "./components/home/HeroBannerSlider";
import AboutSection from "./sections/AboutSection";
import Process from "./components/home/Process";
import ProjectSection from "./sections/ProjectSection";
import CounterSection from "./components/home/CounterSection";
import Showcase from "./components/home/Showcase";
import Blogs from "./sections/Blogs";
import Getintouch from "./components/Getintouch";
import LoadingScreen from "./components/LoadingScreen";
import { client, urlFor } from "./lib/sanity";

export const metadata = {
  title: "Avenor Architects | Beyond Architecture. Creating Experiences.",
  description: "Avenor Architects is an award-winning architecture and interior design studio crafting timeless, sustainable private residences and premium commercial layouts globally.",
  alternates: {
    canonical: "https://avenorarchitects.com",
  },
  openGraph: {
    title: "Avenor Architects | Beyond Architecture. Creating Experiences.",
    description: "Avenor Architects is an award-winning architecture and interior design studio crafting timeless, sustainable private residences and premium commercial layouts globally.",
    url: "https://avenorarchitects.com",
    type: "website",
  }
};

export default async function Home() {
  let sanityProjects = [];
  let sanityScaleModels = [];
  let sanityBlogs = [];

  try {
    const [projectsData, scaleModelsData, blogsData] = await Promise.all([
      client.fetch(`*[_type == "project"]|order(orderRank asc)[0...6] {
        _id,
        title,
        "slug": slug.current,
        location,
        cardThumbImage,
        mainImage
      }`, {}, { next: { revalidate: 10 } }),
      client.fetch(`*[_type == "scaleModel"]|order(orderRank asc)[0...6] {
        _id,
        title,
        "slug": slug.current,
        cardImage,
        image
      }`, {}, { next: { revalidate: 10 } }),
      client.fetch(`*[_type == "blog"]|order(date desc)[0...6] {
        _id,
        title,
        "slug": slug.current,
        category,
        image
      }`, {}, { next: { revalidate: 10 } })
    ]);

    if (projectsData && projectsData.length > 0) {
      sanityProjects = projectsData.map((item, idx) => ({
        id: item._id || idx.toString(),
        slug: item.slug || "",
        title: item.title || "",
        location: item.location || "",
        image: (item.cardThumbImage && item.cardThumbImage.asset)
          ? urlFor(item.cardThumbImage).url()
          : (item.mainImage && item.mainImage.asset)
          ? urlFor(item.mainImage).url()
          : "/portfolio_holis.png"
      }));
    }

    if (scaleModelsData && scaleModelsData.length > 0) {
      sanityScaleModels = scaleModelsData.map((item, idx) => {
        const mainImgUrl = (item.image && item.image.asset)
          ? urlFor(item.image).url()
          : (item.cardImage && item.cardImage.asset)
          ? urlFor(item.cardImage).url()
          : "/scale_model_1.png";
        const cardImgUrl = (item.cardImage && item.cardImage.asset)
          ? urlFor(item.cardImage).url()
          : mainImgUrl;
        return {
          id: item._id || idx.toString(),
          slug: item.slug || "",
          title: item.title || "",
          mainImage: mainImgUrl,
          cardImage: cardImgUrl,
          image: mainImgUrl,
          src: mainImgUrl
        };
      });
    }

    if (blogsData && blogsData.length > 0) {
      sanityBlogs = blogsData.map((item, idx) => ({
        id: item._id || idx.toString(),
        slug: item.slug || "",
        title: item.title || "",
        category: item.category || "Insight",
        image: (item.image && item.image.asset) ? urlFor(item.image).url() : "/blog_1.png"
      }));
    }
  } catch (err) {
    console.error("Error loading home page content from Sanity:", err);
  }

  return (
    <>
      {/* Session-cached Loading Screen */}
      <LoadingScreen />

      {/* Hero Banner with Full-screen Slider */}
      <HeroBannerSlider />

      {/* About & Services (following exact design reference) */}
      <AboutSection />

      {/* Counter Section */}
      <CounterSection />

      {/* Portfolio */}
      <ProjectSection initialProjects={sanityProjects} />

      {/* showcase */}
      <Showcase initialScaleModels={sanityScaleModels} />

      {/* Process Section */}
      <Process />

      {/* Media & Press Blogs Section */}
      {/* <Blogs initialBlogs={sanityBlogs} /> */}

    
    </>
  );
}
