import { useEffect } from "react";
import FeatureSection from "../components/landing/FeatureSection";
import AboutSection from "../components/landing/AboutSection";
import WhyChooseUs from "../components/landing/WhyChooseUs";

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
    </>
  );
}

export default LandingPage;