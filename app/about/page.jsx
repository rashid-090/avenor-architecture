import React from 'react';
import About from "../components/about/About";
import Values from "../components/about/Values";
import Approch from "../components/about/Approch";
import Team from "../components/about/Team";

export const metadata = {
  title: "About Our Architectural Design Studio | Avenore Architecture",
  description: "Learn about Avenore Architecture's philosophy, timeless design values, sustainable architectural approach, and meet our team of expert designers.",
  alternates: {
    canonical: "https://avenore.com/about",
  },
  openGraph: {
    title: "About Our Architectural Design Studio | Avenore Architecture",
    description: "Learn about Avenore Architecture's philosophy, timeless design values, sustainable architectural approach, and meet our team of expert designers.",
    url: "https://avenore.com/about",
    type: "website",
  }
};

const page = () => {
  return (
    <div>
      <About />
      <Values />
      <Approch />
      <Team />
    </div>
  );
}

export default page;