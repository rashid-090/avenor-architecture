import React from 'react';
import About from "../components/about/About";
import Values from "../components/about/Values";
import Approch from "../components/about/Approch";
import Team from "../components/about/Team";

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