import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Check, Clock3, MapPin, Sparkles } from "lucide-react";

import { MotionBox } from "../../components/MotionBox";
import { SectionShell } from "../../components/SectionShell";
import type { Recommendation } from "../../types/recommendation";
import { ExperienceImageCarousel } from "./ExperienceImageCarousel";

interface ExperienceDetailPanelProps {
  recommendation: Recommendation;
  onBackToExperiences: () => void;
}

export function ExperienceDetailPanel({
  recommendation,
  onBackToExperiences,
}: ExperienceDetailPanelProps) {
  const mutedText = useColorModeValue("gray.600", "whiteAlpha.740");
  const subtleText = useColorModeValue("gray.500", "whiteAlpha.620");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.950");
  const highlightBg = useColorModeValue("blackAlpha.50", "rgba(255,255,255,0.04)");
  const metaBg = useColorModeValue("rgba(255,255,255,0.74)", "rgba(255,255,255,0.05)");
  const metaBorderColor = useColorModeValue("rgba(15,23,42,0.08)", "rgba(255,255,255,0.08)");

  return (
    <Container id="experience-details" maxW="7xl" pb={{ base: 16, md: 24 }}>
      <MotionBox
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <SectionShell overflow="hidden" p={{ base: 4, md: 5 }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 8 }}>
            <Box overflow="hidden" rounded="28px" minH={{ base: "300px", md: "420px" }}>
              <ExperienceImageCarousel
                images={recommendation.imagePaths}
                alt={recommendation.title}
                minHeight="100%"
              />
            </Box>

            <Stack spacing={6} py={{ base: 2, md: 4 }}>
              <Stack spacing={3}>
                <HStack
                  spacing={2}
                  align="center"
                  color={useColorModeValue("brand.700", "brand.300")}
                  fontSize="sm"
                  textTransform="uppercase"
                  letterSpacing="0.14em"
                >
                  <Sparkles size={15} />
                  <Text>Selected experience</Text>
                </HStack>
                <Heading size="xl" color={titleColor}>
                  {recommendation.title}
                </Heading>
                <Text color={mutedText} fontSize="lg">
                  {recommendation.longDescription}
                </Text>
              </Stack>

              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3}>
                <Box rounded="2xl" p={4} bg={metaBg} borderWidth="1px" borderColor={metaBorderColor}>
                  <HStack spacing={2} color={subtleText} mb={1}>
                    <MapPin size={16} />
                    <Text fontSize="sm">Location</Text>
                  </HStack>
                  <Text fontWeight="semibold" color={titleColor}>
                    {recommendation.shortLocation}
                  </Text>
                </Box>
                <Box rounded="2xl" p={4} bg={metaBg} borderWidth="1px" borderColor={metaBorderColor}>
                  <HStack spacing={2} color={subtleText} mb={1}>
                    <Clock3 size={16} />
                    <Text fontSize="sm">Suggested stay</Text>
                  </HStack>
                  <Text fontWeight="semibold" color={titleColor}>
                    {recommendation.duration}
                  </Text>
                </Box>
                <Box rounded="2xl" p={4} bg={metaBg} borderWidth="1px" borderColor={metaBorderColor}>
                  <HStack spacing={2} color={subtleText} mb={1}>
                    <Icon as={recommendation.icon} boxSize={4} />
                    <Text fontSize="sm">Price range</Text>
                  </HStack>
                  <Text fontWeight="semibold" color={titleColor}>
                    {recommendation.priceRange}
                  </Text>
                </Box>
              </SimpleGrid>

              <Box rounded="3xl" p={{ base: 5, md: 6 }} bg={highlightBg}>
                <Text color={subtleText} textTransform="uppercase" letterSpacing="0.14em" fontSize="xs" mb={3}>
                  Best for
                </Text>
                <Text color={titleColor} fontWeight="semibold" fontSize="lg" mb={5}>
                  {recommendation.bestFor}
                </Text>

                <List spacing={3}>
                  {recommendation.highlights.map((highlight) => (
                    <ListItem key={highlight} color={mutedText}>
                      <ListIcon as={Check} color="brand.400" />
                      {highlight}
                    </ListItem>
                  ))}
                </List>
              </Box>

              <HStack spacing={3} flexWrap="wrap">
                <Button colorScheme="green" size="lg">
                  Plan This Experience
                </Button>
                <Button variant="ghost" size="lg" onClick={onBackToExperiences}>
                  Back to experiences
                </Button>
              </HStack>
            </Stack>
          </SimpleGrid>
        </SectionShell>
      </MotionBox>
    </Container>
  );
}
