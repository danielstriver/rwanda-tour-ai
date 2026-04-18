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
import { usePreferences } from "./PreferenceContext";
import { BUDGET_OPTIONS, DURATION_OPTIONS, EXPERIENCE_OPTIONS } from "../../utils/constants";
import type { BudgetTier, ExperienceType, TripDuration } from "../../types/recommendation";
import { PreferenceSelector } from "./PreferenceSelector";
import { useLanguage } from "../../hooks/useLanguage";

export function PreferenceSection() {
  const { preferences, updatePreference } = usePreferences();
  const { t } = useLanguage();
  const titleColor = "appHeading";
  const subtitleColor = "appMuted";
  const captionColor = "appMuted";
  const activeChipBg = useColorModeValue("brand.50", "rgba(54,175,99,0.18)");
  const passiveChipBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const chipTextColor = "appText";
  const activeChipColor = useColorModeValue("brand.700", "brand.200");

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
              <Heading size="lg" mb={2} color={titleColor}>
                {t("pref.title")}
              </Heading>
              <Text color={subtitleColor}>
                {t("hero.body")}
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <PreferenceSelector<ExperienceType>
                label={t("pref.style")}
                value={preferences.experience}
                options={EXPERIENCE_OPTIONS}
                onChange={(value) => updatePreference("experience", value)}
                translateOption={(opt) => t(`pref.option.${opt}`)}
              />
              <PreferenceSelector<BudgetTier>
                label={t("pref.budget")}
                value={preferences.budget}
                options={BUDGET_OPTIONS}
                onChange={(value) => updatePreference("budget", value)}
                translateOption={(opt) => t(`pref.option.${opt}`)}
              />
              <PreferenceSelector<TripDuration>
                label={t("pref.duration")}
                value={preferences.duration}
                options={DURATION_OPTIONS}
                onChange={(value) => updatePreference("duration", value)}
                translateOption={(opt) => t(`pref.option.${opt}`)}
              />
            </SimpleGrid>

            <Wrap spacing={3}>
              <WrapItem>
                <Text fontSize="sm" color={captionColor}>
                  {t("pref.current")}
                </Text>
              </WrapItem>
              <WrapItem>
                <Text px={3} py={1.5} rounded="full" bg={activeChipBg} color={activeChipColor} fontSize="sm">
                  {t(`pref.option.${preferences.experience}`)}
                </Text>
              </WrapItem>
              <WrapItem>
                <Text px={3} py={1.5} rounded="full" bg={passiveChipBg} color={chipTextColor} fontSize="sm">
                  {t(`pref.option.${preferences.budget}`)}
                </Text>
              </WrapItem>
              <WrapItem>
                <Text px={3} py={1.5} rounded="full" bg={passiveChipBg} color={chipTextColor} fontSize="sm">
                  {t(`pref.option.${preferences.duration}`)}
                </Text>
              </WrapItem>
            </Wrap>
          </Stack>
        </SectionShell>
      </MotionBox>
    </Container>
  );
}
