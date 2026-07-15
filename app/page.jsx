import Header from "./components/Header";
import HeroBannerSlider from "./components/home/HeroBannerSlider";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import AboutSection from "./sections/AboutSection";
import Process from "./components/home/Process";
import PortfolioSection from "./sections/PortfolioSection";
import CounterSection from "./components/home/CounterSection";
import Showcase from "./components/home/Showcase";
import Blogs from "./sections/Blogs";
import Getintouch from "./components/Getintouch";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Fixed Header */}
      <Header />

      {/* Hero Banner with Full-screen Slider */}
      <HeroBannerSlider />

      {/* About & Services (following exact design reference) */}
      <AboutSection />
 
      {/* Counter Section */}
      <CounterSection />


      {/* Portfolio */}
      <PortfolioSection />

   
    {/* showcase */}
      <Showcase/>

     {/* Process Section */}
      <Process />

      {/* Media & Press Blogs Section */}
      <Blogs />

      {/* Get in Touch CTA Banner */}
      <Getintouch />

      {/* Footer / Contact */}
      <Footer />
    </SmoothScrollProvider>
  );
}
