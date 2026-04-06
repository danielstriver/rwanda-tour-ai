import { Button, Container, Heading, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

import { MotionBox } from "./MotionBox";
import { SectionShell } from "./SectionShell";

interface HeroSectionProps {
  onStartExploring: () => void;
}

export function HeroSection({ onStartExploring }: HeroSectionProps) {
  const eyebrowBg = useColorModeValue("rgba(255,255,255,0.72)", "rgba(255,255,255,0.08)");
  const eyebrowColor = useColorModeValue("brand.700", "brand.200");
  const headingColor = "appHeading";
  const subtitleColor = "appMuted";
  const bodyColor = "appText";

  return (
    <Container maxW="7xl" py={{ base: 16, md: 24 }}>
      <MotionBox
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionShell
          position="relative"
          overflow="hidden"
          px={{ base: 6, md: 10 }}
          py={{ base: 9, md: 12 }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: "-12%",
              right: "-4%",
              width: "clamp(220px, 28vw, 360px)",
              height: "clamp(220px, 28vw, 360px)",
              borderRadius: "999px",
              background: "radial-gradient(rgba(54,175,99,0.38), rgba(54,175,99,0) 68%)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <Stack spacing={6} maxW="4xl" position="relative" zIndex={1}>
            <HStack
              alignSelf="flex-start"
              px={4}
              py={2}
              rounded="full"
              spacing={2}
              fontSize="sm"
              fontWeight="semibold"
              bg={eyebrowBg}
              color={eyebrowColor}
              borderWidth="1px"
              borderColor="whiteAlpha.200"
            >
              <Sparkles size={16} />
              <Text>AI-powered travel inspiration for Rwanda</Text>
            </HStack>
            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              lineHeight={{ base: "1.05", md: "0.98" }}
              letterSpacing="-0.05em"
              color={headingColor}
            >
              Rwanda Tour AI
            </Heading>
            <Text fontSize={{ base: "lg", md: "2xl" }} color={subtitleColor} maxW="2xl">
              Discover Rwanda Your Way
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color={bodyColor} maxW="3xl">
              Start with your travel style, budget, and duration to preview curated experiences
              across Rwanda. This MVP now flows directly into the featured destinations section.
            </Text>
            <Button
              alignSelf="flex-start"
              size="lg"
              colorScheme="green"
              rightIcon={<ArrowRight size={18} />}
              leftIcon={<Compass size={18} />}
              onClick={onStartExploring}
            >
              Start Exploring
            </Button>
          </Stack>
        </SectionShell>
      </MotionBox>
    </Container>
  );
}
