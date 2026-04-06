import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { SAMPLE_RECOMMENDATIONS } from "../../utils/constants";
import { RecommendationCard } from "./RecommendationCard";

export function RecommendationSection() {
  return (
    <Container maxW="7xl" pb={{ base: 16, md: 24 }}>
      <Stack spacing={6} mb={8}>
        <Heading size="lg">Sample Experiences</Heading>
        <Text color="gray.500" maxW="2xl">
          Static mock recommendations for the first MVP. The recommendation engine will be
          layered in later without replacing the UI foundation.
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {SAMPLE_RECOMMENDATIONS.map((recommendation, index) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            index={index}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
