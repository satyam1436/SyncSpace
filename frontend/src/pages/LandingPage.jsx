import { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeatureSection from "../components/landing/FeatureSection";
import AboutSection from "../components/landing/AboutSection";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import FAQSection from "../components/landing/FAQSection";
import ContactSection from "../components/landing/ContactSection";
import Testimonials from "../components/landing/Testimonials";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

function LandingPage() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <WhyChooseUs />
      <FAQSection />
      <ContactSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
}

export default LandingPage;