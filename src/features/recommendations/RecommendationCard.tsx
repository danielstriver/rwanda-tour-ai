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
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.950");
  const bodyColor = useColorModeValue("gray.600", "whiteAlpha.720");
  const priceColor = useColorModeValue("brand.700", "brand.300");
  const chipBg = useColorModeValue("rgba(7,11,16,0.68)", "rgba(7,11,16,0.82)");
  const chipBorderColor = useColorModeValue("rgba(255,255,255,0.14)", "rgba(255,255,255,0.12)");
  const chipTextColor = "whiteAlpha.940";

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
              borderColor={chipBorderColor}
              backdropFilter="blur(10px)"
              color={chipTextColor}
              boxShadow="0 10px 30px rgba(0, 0, 0, 0.18)"
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
