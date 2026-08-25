import React from 'react';
import About from "../components/about/About";
import Values from "../components/about/Values";
import Approch from "../components/about/Approch";
import Team from "../components/about/Team";
import Scrollservicelist from "../components/about/Scrollservicelist";

export const metadata = {
  title: "About Our Architectural Design Studio | Avenor Architects",
  description: "Learn about Avenor Architects's philosophy, timeless design values, sustainable architectural approach, and meet our team of expert designers.",
  alternates: {
    canonical: "https://avenorarchitects.com/about",
  },
  openGraph: {
    title: "About Our Architectural Design Studio | Avenor Architects",
    description: "Learn about Avenor Architects's philosophy, timeless design values, sustainable architectural approach, and meet our team of expert designers.",
    url: "https://avenorarchitects.com/about",
    type: "website",
  }
};

const page = () => {
  return (
    <div>
      <About />
      <Values />
      <Scrollservicelist/>
      {/* <Approch /> */}
      {/* <Team /> */}
    </div>
  );
}

export default page;