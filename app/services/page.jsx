import React from "react";
import Intro from "../components/service/Intro";
import ProjectList from "../components/service/ProjectList";

export const metadata = {
  title: "Architectural & Interior Design Services | Avenor Architects",
  description: "Explore our range of building and construction services, premium interior design, and residential or commercial architecture custom plans.",
  alternates: {
    canonical: "https://avenorarchitects.com/services",
  },
  openGraph: {
    title: "Architectural & Interior Design Services | Avenor Architects",
    description: "Explore our range of building and construction services, premium interior design, and residential or commercial architecture custom plans.",
    url: "https://avenorarchitects.com/services",
    type: "website",
  }
};

const page = () => {
  return (
    <div>
      <Intro />
      <ProjectList />
    </div>
  );
};

export default page;
