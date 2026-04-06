import { Box, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { PreferenceSection } from "../features/preferences/PreferenceSection";
import { RecommendationSection } from "../features/recommendations/RecommendationSection";

export function RwandaTourPage() {
  const [scrollToRecommendations, setScrollToRecommendations] = useState<() => void>(() => () => {});
  const background = useColorModeValue(
    "radial-gradient(circle at top left, rgba(54,175,99,0.12), rgba(54,175,99,0) 28%), linear-gradient(135deg, #f5f8f3 0%, #edf5ef 42%, #ffffff 100%)",
    "radial-gradient(circle at top left, rgba(54,175,99,0.16), rgba(54,175,99,0) 28%), radial-gradient(circle at 82% 12%, rgba(56,161,105,0.12), rgba(56,161,105,0) 24%), linear-gradient(180deg, #04090d 0%, #091118 42%, #0d1822 100%)",
  );

  return (
    <Box
      minH="100vh"
      bgImage={background}
      transition="background 0.3s ease"
    >
      <Navbar />
      <HeroSection onStartExploring={scrollToRecommendations} />
      <PreferenceSection />
      <RecommendationSection
        onReady={({ scrollToRecommendations: nextScrollToRecommendations }) => {
          setScrollToRecommendations(() => nextScrollToRecommendations);
        }}
      />
      <Footer />
    </Box>
  );
}
