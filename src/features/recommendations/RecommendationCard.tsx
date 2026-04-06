import {
  Box,
  Button,
  Heading,
  Icon,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowRight, MapPin } from "lucide-react";

import { MotionBox } from "../../components/MotionBox";
import { SectionShell } from "../../components/SectionShell";
import type { Recommendation } from "../../types/recommendation";
import { ExperienceImageCarousel } from "./ExperienceImageCarousel";

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
  onViewExperience: (recommendationId: string) => void;
}

export function RecommendationCard({
  recommendation,
  index,
  onViewExperience,
}: RecommendationCardProps) {
  const titleColor = useColorModeValue("gray.900", "white");
  const bodyColor = useColorModeValue("gray.600", "whiteAlpha.760");
  const priceColor = useColorModeValue("brand.700", "brand.300");
  const chipBg = useColorModeValue("whiteAlpha.800", "blackAlpha.400");

  return (
    <MotionBox
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <SectionShell overflow="hidden" h="100%">
        <Box position="relative" minH="260px">
          <ExperienceImageCarousel images={recommendation.imagePaths} alt={recommendation.title} />

          <Box position="absolute" left={5} top={5}>
            <HStack
              spacing={2}
              px={3}
              py={2}
              rounded="full"
              bg={chipBg}
              borderWidth="1px"
              borderColor="whiteAlpha.300"
              backdropFilter="blur(10px)"
              color="white"
            >
              <Icon as={recommendation.icon} boxSize={4} />
              <Text fontSize="sm" fontWeight="semibold">
                {recommendation.bestFor}
              </Text>
            </HStack>
          </Box>
        </Box>

        <Stack spacing={4} p={6}>
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Heading size="md" color={titleColor}>
                {recommendation.title}
              </Heading>
              <HStack spacing={2} color={bodyColor}>
                <MapPin size={15} />
                <Text fontSize="sm">{recommendation.shortLocation}</Text>
              </HStack>
            </Stack>
            <Text color={bodyColor}>{recommendation.description}</Text>
          </Stack>
          <Text fontWeight="semibold" color={priceColor}>
            {recommendation.priceRange}
          </Text>
          <Button
            alignSelf="flex-start"
            colorScheme="green"
            variant="outline"
            rightIcon={<ArrowRight size={16} />}
            onClick={() => onViewExperience(recommendation.id)}
          >
            View Experience
          </Button>
        </Stack>
      </SectionShell>
    </MotionBox>
  );
}
