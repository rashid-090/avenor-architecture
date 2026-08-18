"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    target: 7,
    suffix: "+",
    label: "Core Services",
  },
  {
    target: 8,
    suffix: "+",
    label: "Approach Principles",
  },
  {
    target: 6,
    suffix: "+",
    label: "Workflow Stages",
  },
  {
    target: 5,
    suffix: "+",
    label: "Signature Projects",
  },
];

export default function CounterSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = containerRef.current?.querySelectorAll(".counter-number");
      
      if (counters && counters.length > 0) {
        counters.forEach((counter) => {
          const targetVal = parseInt(counter.getAttribute("data-target"), 10);
          const suffix = counter.getAttribute("data-suffix") || "";
          
          const obj = { val: 0 };
          
          gsap.to(obj, {
            val: targetVal,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 92%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              if (counter) {
                counter.innerText = Math.floor(obj.val) + suffix;
              }
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white text-zinc-950 py-16 border-y border-zinc-100">
      <div 
        ref={containerRef}
        className="w-[95%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12 place-items-center"
      >
        {stats.map((s, idx) => (
          <div key={idx} className="flex flex-col justify-center items-center text-center">
            {/* The animated number */}
            <span
              className="counter-number text-zinc-900 text-4xl md:text-[54px] font-normal leading-none mb-3 tabular-nums select-none"
              data-target={s.target}
              data-suffix={s.suffix}
            >
              0{s.suffix}
            </span>
            {/* Label text */}
            <span className="text-[10px] md:text-[13px] text-zinc-500 font-light tracking-wide max-w-[200px] leading-relaxed select-none">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
