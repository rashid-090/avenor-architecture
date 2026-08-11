import React from 'react'
import Image from 'next/image'

const servicesList = [
  {
    title: "Architecture",
    img: "/service/Architecture.svg",
    description:
      "We create functional and inspiring architectural designs that blend creativity, sustainability, and timeless aesthetics.",
  },
  {
    title: "Interior Design",
    img: "/service/Interior-Design.svg",
    description:
      "Thoughtfully designed interiors that balance comfort, style, and functionality to reflect your lifestyle and vision.",
  },
  {
    title: "Landscape Design",
    img: "/service/Landscape.svg",
    description:
      "Beautiful outdoor spaces designed to complement architecture while enhancing nature, usability, and everyday living.",
  },
  {
    title: "Site Supervision",
    img: "/service/Site-Supervision.svg",
    description:
      "Professional site supervision to ensure every detail is executed with quality, accuracy, and adherence to design.",
  },
  {
    title: "Project Management",
    img: "/service/Project-Management.svg",
    description:
      "End-to-end project coordination that keeps construction on schedule, within budget, and aligned with your goals.",
  },
  {
    title: "Technical Drawing",
    img: "/service/Technical-Drawing.svg",
    description:
      "Detailed architectural drawings that provide precise guidance for smooth construction and seamless project execution.",
  },
  {
    title: "Scale Model",
    img: "/service/Scale-Model.svg",
    description:
      "Realistic architectural scale models that help visualize the design, proportions, and spatial relationships before construction.",
  },
  {
    title: "Interior Fit-Out",
    img: "/service/Interior-Fit-Out.svg",
    description:
      "Complete interior fit-out solutions that transform empty spaces into refined, functional, and ready-to-use environments.",
  },
];

const Scrollservicelist = () => {
  return (
    <section className="bg-zinc-50 text-zinc-950 py-20 border-t border-zinc-100 min-h-screen">
      <div className="w-[90%]  mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-3">
            WHAT WE DO
          </span>
          <h2 className="text-zinc-900 text-3xl md:text-5xl font-light tracking-tight">
            Our Services
          </h2>
        </div>

        {/* Scrollable Sticky Cards Container */}
        <div className="max-w-3xl space-y-12">
          {servicesList.map((service, index) => {
            const cardTop = 100 + index * 24; // Cascading sticky stack offset
            return (
              <div
                key={index}
                className="sticky  p-8 md:p-12 transition-all duration-300 border border-zinc-200/80 bg-white hover:shadow-lg"
                style={{ top: `${cardTop}px` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Left Column: Title & Description */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-zinc-900 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed max-w-md">
                      {service.description}
                    </p>
                  </div>

                  {/* Right Column: Image / Icon */}
                  <div className="flex justify-start md:justify-end items-center">
                    <div className="relative flex items-center gap-3">
                      <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                        <Image
                          src={service.img}
                          alt={service.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  )
}

export default Scrollservicelist