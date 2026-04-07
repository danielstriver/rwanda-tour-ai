import { Box, Container, Heading, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { SectionShell } from "../../components/SectionShell";
import { SAMPLE_RECOMMENDATIONS } from "../../utils/constants";
import type { Recommendation } from "../../types/recommendation";
import { ExperienceDetailPanel } from "./ExperienceDetailPanel";
import { RecommendationCard } from "./RecommendationCard";
import { useLanguage } from "../../hooks/useLanguage";

interface RecommendationSectionProps {
  onReady?: (actions: { scrollToRecommendations: () => void }) => void;
}

export function RecommendationSection({ onReady }: RecommendationSectionProps) {
  const { t } = useLanguage();
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation>(
    SAMPLE_RECOMMENDATIONS[0],
  );
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const titleColor = "appHeading";
  const subtitleColor = "appMuted";

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
      <Container ref={sectionRef} id="recommendations" maxW="7xl" pb={{ base: 8, md: 10 }}>
        <SectionShell px={{ base: 5, md: 8 }} py={{ base: 6, md: 8 }} mb={8}>
          <Stack spacing={6}>
            <Heading size="lg" color={titleColor}>
              {t("rec.title")}
            </Heading>
            <Text color={subtitleColor} maxW="2xl">
              {t("ai.response.default")}
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
