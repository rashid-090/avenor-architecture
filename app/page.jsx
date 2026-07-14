import Header from "./components/Header";
import HeroBannerSlider from "./components/HeroBannerSlider";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import AboutSection from "./sections/AboutSection";
import PortfolioSection from "./sections/PortfolioSection";
import CounterSection from "./components/CounterSection";
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

      {/* Portfolio */}
      <PortfolioSection />

      {/* Counter Section */}
      <CounterSection />

      {/* Footer / Contact */}
      <Footer />
    </SmoothScrollProvider>
  );
}
