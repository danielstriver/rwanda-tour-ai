import { Box, useColorModeValue } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { PreferenceSection } from "../features/preferences/PreferenceSection";
import { RecommendationSection } from "../features/recommendations/RecommendationSection";
import { AIChatSection } from "../features/ai/AIChatSection";

export function RwandaTourPage() {
  const [isExploring, setIsExploring] = useState(false);
  const recommendationActionsRef = useRef<{ scrollToRecommendations: () => void } | null>(null);
  const background = useColorModeValue(
    "radial-gradient(circle at top left, rgba(54,175,99,0.12), rgba(54,175,99,0) 28%), linear-gradient(135deg, #f5f8f3 0%, #edf5ef 42%, #ffffff 100%)",
    "radial-gradient(circle at top left, rgba(54,175,99,0.16), rgba(54,175,99,0) 28%), radial-gradient(circle at 82% 12%, rgba(56,161,105,0.12), rgba(56,161,105,0) 24%), linear-gradient(180deg, #04090d 0%, #091118 42%, #0d1822 100%)",
  );

  const handleRecommendationsReady = useCallback(
    (actions: { scrollToRecommendations: () => void }) => {
      recommendationActionsRef.current = actions;
    },
    [],
  );

  const handleStartExploring = useCallback(() => {
    setIsExploring(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAIRecommendationReady = useCallback(() => {
    recommendationActionsRef.current?.scrollToRecommendations();
  }, []);

  return (
    <Box
      minH="100vh"
      bgImage={background}
      transition="background 0.3s ease"
    >
      <Navbar />
      <AnimatePresence mode="wait">
        {!isExploring ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <HeroSection onStartExploring={handleStartExploring} />
            <PreferenceSection />
            <RecommendationSection onReady={handleRecommendationsReady} />
          </motion.div>
        ) : (
          <motion.div
            key="exploring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Box minH="calc(100vh - 80px)" display="flex" flexDirection="column" pt={8} pb={12}>
              <AIChatSection onRecommendationReady={handleAIRecommendationReady} />
              <RecommendationSection onReady={handleRecommendationsReady} />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </Box>
  );
}
