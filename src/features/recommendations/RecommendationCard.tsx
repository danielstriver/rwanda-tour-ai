import {
  Box,
  Button,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";

import { MotionBox } from "../../components/MotionBox";
import type { Recommendation } from "../../types/recommendation";

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

export function RecommendationCard({
  recommendation,
  index,
}: RecommendationCardProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <Box
        overflow="hidden"
        rounded="3xl"
        bg="white"
        borderWidth="1px"
        borderColor="blackAlpha.100"
        boxShadow="lg"
        h="100%"
      >
        <Box
          minH="220px"
          px={6}
          py={7}
          display="flex"
          alignItems="flex-end"
          backgroundImage={recommendation.accent}
        >
          <Box
            boxSize={14}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            rounded="2xl"
            bg="whiteAlpha.250"
            backdropFilter="blur(10px)"
            color="white"
          >
            <Icon as={recommendation.icon} boxSize={7} />
          </Box>
        </Box>

        <Stack spacing={4} p={6}>
          <Stack spacing={2}>
            <Heading size="md">{recommendation.title}</Heading>
            <Text color="gray.500">{recommendation.description}</Text>
          </Stack>
          <Text fontWeight="semibold" color="brand.700">
            {recommendation.priceRange}
          </Text>
          <Button alignSelf="flex-start" colorScheme="green" variant="outline">
            View Experience
          </Button>
        </Stack>
      </Box>
    </MotionBox>
  );
}
