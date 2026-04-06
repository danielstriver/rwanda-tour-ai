import { Box } from "@chakra-ui/react";

import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { PreferenceSection } from "../features/preferences/PreferenceSection";
import { RecommendationSection } from "../features/recommendations/RecommendationSection";

export function RwandaTourPage() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, #f8faf7 0%, #eef7f1 35%, #ffffff 100%)"
    >
      <Navbar />
      <HeroSection />
      <PreferenceSection />
      <RecommendationSection />
      <Footer />
    </Box>
  );
}
