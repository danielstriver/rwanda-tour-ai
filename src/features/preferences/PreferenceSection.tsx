import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { MotionBox } from "../../components/MotionBox";
import { SectionShell } from "../../components/SectionShell";
import { usePreferenceState } from "../../hooks/usePreferenceState";
import { BUDGET_OPTIONS, DURATION_OPTIONS, EXPERIENCE_OPTIONS } from "../../utils/constants";
import type { BudgetTier, ExperienceType, TripDuration } from "../../types/recommendation";
import { PreferenceSelector } from "./PreferenceSelector";

export function PreferenceSection() {
  const { preferences, updatePreference } = usePreferenceState();
  const subtitleColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const captionColor = useColorModeValue("gray.500", "whiteAlpha.600");
  const activeChipBg = useColorModeValue("brand.50", "rgba(54,175,99,0.18)");
  const passiveChipBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const chipTextColor = useColorModeValue("gray.800", "whiteAlpha.880");

  return (
    <Container maxW="7xl" pb={{ base: 14, md: 20 }}>
      <MotionBox
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <SectionShell px={{ base: 6, md: 8 }} py={{ base: 7, md: 8 }}>
          <Stack spacing={6}>
            <Box>
              <Heading size="lg" mb={2}>
                Travel Preferences
              </Heading>
              <Text color={subtitleColor}>
                Fine-tune the experience before AI recommendations are introduced.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <PreferenceSelector<ExperienceType>
                label="Type of experience"
                value={preferences.experience}
                options={EXPERIENCE_OPTIONS}
                onChange={(value) => updatePreference("experience", value)}
              />
              <PreferenceSelector<BudgetTier>
                label="Budget"
                value={preferences.budget}
                options={BUDGET_OPTIONS}
                onChange={(value) => updatePreference("budget", value)}
              />
              <PreferenceSelector<TripDuration>
                label="Duration"
                value={preferences.duration}
                options={DURATION_OPTIONS}
                onChange={(value) => updatePreference("duration", value)}
              />
            </SimpleGrid>

            <Wrap spacing={3}>
              <WrapItem>
                <Text fontSize="sm" color={captionColor}>
                  Current selection:
                </Text>
              </WrapItem>
              <WrapItem>
                <Text px={3} py={1.5} rounded="full" bg={activeChipBg} color="brand.700" fontSize="sm">
                  {preferences.experience}
                </Text>
              </WrapItem>
              <WrapItem>
                <Text px={3} py={1.5} rounded="full" bg={passiveChipBg} color={chipTextColor} fontSize="sm">
                  {preferences.budget}
                </Text>
              </WrapItem>
              <WrapItem>
                <Text px={3} py={1.5} rounded="full" bg={passiveChipBg} color={chipTextColor} fontSize="sm">
                  {preferences.duration}
                </Text>
              </WrapItem>
            </Wrap>
          </Stack>
        </SectionShell>
      </MotionBox>
    </Container>
  );
}
