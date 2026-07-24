import { useEffect } from "react";
import FeatureSection from "../components/landing/FeatureSection";
import AboutSection from "../components/landing/AboutSection";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import FAQSection from "../components/landing/FAQSection";

function LandingPage() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <>
      <FeatureSection />
      <AboutSection />
      <WhyChooseUs />
      <FAQSection />
    </>
  );
}

export default LandingPage;