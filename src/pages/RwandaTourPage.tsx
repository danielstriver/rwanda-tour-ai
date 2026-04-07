import { Box, useColorModeValue } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { PreferenceSection } from "../features/preferences/PreferenceSection";
import { RecommendationSection } from "../features/recommendations/RecommendationSection";
import { AIChatSection } from "../features/ai/AIChatSection";
import { HowItWorks } from "../components/HowItWorks";

export function RwandaTourPage() {
  const [isExploring, setIsExploring] = useState(false);
  const [isHowItWorks, setIsHowItWorks] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");
  const recommendationActionsRef = useRef<{ scrollToRecommendations: () => void } | null>(null);
  const background = useColorModeValue(
    "linear-gradient(135deg, #f5f8f3 0%, #edf5ef 42%, #ffffff 100%)",
    "linear-gradient(180deg, #0A1118 0%, #060B10 100%)",
  );

  const handleRecommendationsReady = useCallback(
    (actions: { scrollToRecommendations: () => void }) => {
      recommendationActionsRef.current = actions;
    },
    [],
  );

  const handleStartExploring = useCallback(() => {
    setIsExploring(true);
    setIsHowItWorks(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleHowItWorks = useCallback(() => {
    setIsHowItWorks(true);
    setIsExploring(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handlePlanExperience = useCallback((title: string) => {
    setInitialPrompt(`I want to plan an itinerary for ${title}`);
    setIsExploring(true);
    setIsHowItWorks(false);
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
      {!isExploring && !isHowItWorks && <Navbar />}
      <AnimatePresence mode="wait">
        {isHowItWorks ? (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <HowItWorks 
              onClose={() => setIsHowItWorks(false)} 
              onStartSearching={handleStartExploring}
            />
          </motion.div>
        ) : !isExploring ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <HeroSection 
              onStartExploring={handleStartExploring} 
              onHowItWorks={handleHowItWorks}
            />
            <PreferenceSection />
            <RecommendationSection onReady={handleRecommendationsReady} onPlanExperience={handlePlanExperience} />
          </motion.div>
        ) : (
          <motion.div
            key="exploring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Box minH="100vh" display="flex" flexDirection="column">
              <AIChatSection 
                onRecommendationReady={handleAIRecommendationReady} 
                onGoHome={() => {
                  setIsExploring(false);
                  setInitialPrompt("");
                }} 
                initialPrompt={initialPrompt}
              />
              <Box px={{ base: 4, md: 8 }} pb={12}>
                <RecommendationSection onReady={handleRecommendationsReady} onPlanExperience={handlePlanExperience} />
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      {!isExploring && !isHowItWorks && <Footer />}
    </Box>
  );
}
