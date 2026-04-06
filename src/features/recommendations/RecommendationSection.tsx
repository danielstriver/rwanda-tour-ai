import { Box, Container, Heading, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { SectionShell } from "../../components/SectionShell";
import { SAMPLE_RECOMMENDATIONS } from "../../utils/constants";
import type { Recommendation } from "../../types/recommendation";
import { ExperienceDetailPanel } from "./ExperienceDetailPanel";
import { RecommendationCard } from "./RecommendationCard";

interface RecommendationSectionProps {
  onReady?: (actions: { scrollToRecommendations: () => void }) => void;
}

export function RecommendationSection({ onReady }: RecommendationSectionProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation>(
    SAMPLE_RECOMMENDATIONS[0],
  );
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.950");
  const subtitleColor = useColorModeValue("gray.600", "whiteAlpha.720");

  useEffect(() => {
    onReady?.({
      scrollToRecommendations: () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    });
  }, [onReady]);

  const handleViewExperience = (recommendationId: string) => {
    const recommendation = SAMPLE_RECOMMENDATIONS.find((item) => item.id === recommendationId);

    if (!recommendation) {
      return;
    }

    setSelectedRecommendation(recommendation);

    window.requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleBackToExperiences = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Container ref={sectionRef} id="experiences" maxW="7xl" pb={{ base: 8, md: 10 }}>
        <SectionShell px={{ base: 5, md: 8 }} py={{ base: 6, md: 8 }} mb={8}>
          <Stack spacing={6}>
            <Heading size="lg" color={titleColor}>
              Sample Experiences
            </Heading>
            <Text color={subtitleColor} maxW="2xl">
              Each card now previews real destination imagery and opens a richer experience view
              inline, keeping the MVP fast while making the section feel product-ready.
            </Text>
          </Stack>
        </SectionShell>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
          {SAMPLE_RECOMMENDATIONS.map((recommendation, index) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              index={index}
              onViewExperience={handleViewExperience}
            />
          ))}
        </SimpleGrid>
      </Container>

      <Box ref={detailsRef}>
        <ExperienceDetailPanel
          recommendation={selectedRecommendation}
          onBackToExperiences={handleBackToExperiences}
        />
      </Box>
    </>
  );
}
