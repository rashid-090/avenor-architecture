"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function LoadingScreen() {
  // Initialize to true by default so server renders it instantly
  const [shouldRender, setShouldRender] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const loaderLogoRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("hasLoaded");
      if (hasLoaded === "true") {
        // Skip loader completely
        setShouldRender(false);
        setIsFinished(true);
        // Ensure header logo target is immediately visible
        const target = document.querySelector(".header-logo-target");
        if (target) {
          target.style.opacity = "1";
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!shouldRender || isFinished) return;

    // Small delay to ensure header element is rendered and has coordinates
    const timer = setTimeout(() => {
      const loaderLogo = loaderLogoRef.current;
      const targetLogo = document.querySelector(".header-logo-target");

      if (loaderLogo && targetLogo) {
        // Reset any initial target opacity styles
        targetLogo.style.opacity = "0";

        const loaderRect = loaderLogo.getBoundingClientRect();
        const targetRect = targetLogo.getBoundingClientRect();

        // Calculate differences relative to center points for uniform scale and pan
        const scale = targetRect.width / loaderRect.width;
        
        const loaderCenterX = loaderRect.left + loaderRect.width / 2;
        const loaderCenterY = loaderRect.top + loaderRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        const deltaX = targetCenterX - loaderCenterX;
        const deltaY = targetCenterY - loaderCenterY;

        const tl = gsap.timeline({
          onComplete: () => {
            sessionStorage.setItem("hasLoaded", "true");
            setIsFinished(true);
          },
        });

        // 1. Animate loading progress bar
        tl.to(".loading-bar-element", {
          scaleX: 1,
          duration: 1.6,
          ease: "power2.out",
        })
        // 2. Fade out progress line
        .to(".loading-bar-container", {
          opacity: 0,
          duration: 0.3,
        })
        // 3. FLIP transition loader logo to header position
        // and fade loader background simultaneously
        .to(loaderLogo, {
          x: deltaX,
          y: deltaY,
          scale: scale,
          duration: 1.1,
          ease: "power3.inOut",
        }, "+=0.1")
        .to(".loading-screen-overlay", {
          opacity: 0,
          duration: 0.9,
          ease: "power3.inOut",
        }, "-=1.1")
        // 4. Crossfade loader logo to white header logo
        .to(targetLogo, {
          opacity: 1,
          duration: 0.3,
        }, "-=0.3")
        .to(loaderLogo, {
          opacity: 0,
          duration: 0.3,
        }, "-=0.3");

      } else {
        // Fallback animation if target logo container is not rendered
        const tl = gsap.timeline({
          onComplete: () => {
            sessionStorage.setItem("hasLoaded", "true");
            setIsFinished(true);
          },
        });

        tl.to(".loading-bar-element", {
          scaleX: 1,
          duration: 1.6,
          ease: "power2.out",
        })
        .to(".loading-screen-overlay", {
          opacity: 0,
          duration: 0.6,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [shouldRender, isFinished]);

  if (isFinished || !shouldRender) return null;

  return (
    <div
      id="site-loader"
      suppressHydrationWarning
      className="loading-screen-overlay fixed inset-0 z-[9999] bg-white flex flex-col justify-center items-center select-none"
    >
      {/* Inline script to bypass visual flash if session already loaded */}
      <div
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{
          __html: `
            <script>
              if (sessionStorage.getItem("hasLoaded") === "true") {
                var loader = document.getElementById("site-loader");
                if (loader) loader.style.display = "none";
              }
            </script>
          `,
        }}
      />

      {/* Centered Logo Container */}
      <div 
        ref={loaderLogoRef} 
        className="relative w-58 h-16 transform-gpu"
      >
        <Image
          src="/avenor-bl-logo.webp"
          alt="Avenore Logo"
          fill
          priority
          sizes="232px"
          className="object-contain"
        />
      </div>

      {/* Modern thin loading progress line */}
      <div className="loading-bar-container w-58 h-[1px] bg-zinc-100 relative overflow-hidden">
        <div className="loading-bar-element absolute inset-0 bg-[#EF3925] origin-left scale-x-0" />
      </div>
    </div>
  );
}
