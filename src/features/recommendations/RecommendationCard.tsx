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
import { useLanguage } from "../../hooks/useLanguage";

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
  const { t } = useLanguage();
  const titleColor = "appHeading";
  const bodyColor = "appMuted";
  const priceColor = useColorModeValue("brand.600", "brand.300");
  const chipBg = useColorModeValue("rgba(11, 18, 24, 0.88)", "rgba(0, 0, 0, 0.92)");
  const chipBorderColor = useColorModeValue("rgba(255, 255, 255, 0.12)", "brand.800");
  const chipTextColor = useColorModeValue("whiteAlpha.900", "brand.100");

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
              px={4}
              py={2.5}
              rounded="full"
              bg={chipBg}
              borderWidth="1px"
              borderColor={chipBorderColor}
              backdropFilter="blur(14px)"
              color={chipTextColor}
              boxShadow="0 12px 30px rgba(0, 0, 0, 0.24)"
            >
              <Icon as={recommendation.icon} boxSize={4} color="brand.400" />
              <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="0.04em">
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
                <Text fontSize="sm" fontWeight="medium">{recommendation.shortLocation}</Text>
              </HStack>
            </Stack>
            <Text color={bodyColor} lineHeight="tall">{recommendation.description}</Text>
          </Stack>
          <Text fontSize="lg" fontWeight="bold" color={priceColor}>
            {recommendation.priceRange}
          </Text>
          <Button
            alignSelf="flex-start"
            colorScheme="green"
            variant="outline"
            rightIcon={<ArrowRight size={16} />}
            onClick={() => onViewExperience(recommendation.id)}
            _hover={{
              bg: "brand.500",
              color: "white",
              borderColor: "brand.500",
            }}
          >
            {t("rec.view_details")}
          </Button>
        </Stack>
      </SectionShell>
    </MotionBox>
  );
}
