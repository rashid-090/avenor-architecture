import HeroBannerSlider from "./components/home/HeroBannerSlider";
import AboutSection from "./sections/AboutSection";
import Process from "./components/home/Process";
import ProjectSection from "./sections/ProjectSection";
import CounterSection from "./components/home/CounterSection";
import Showcase from "./components/home/Showcase";
import Blogs from "./sections/Blogs";
import Getintouch from "./components/Getintouch";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
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
      <ProjectSection />

      {/* showcase */}
      <Showcase />

      {/* Process Section */}
      <Process />

      {/* Media & Press Blogs Section */}
      <Blogs />

      {/* Get in Touch CTA Banner */}
      <Getintouch />
    </>
  );
}
