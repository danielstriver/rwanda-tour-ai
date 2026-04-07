import { Box, Button, Container, Heading, HStack, Stack, Text, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

import { MotionBox } from "./MotionBox";
import { useLanguage } from "../hooks/useLanguage";

interface HeroSectionProps {
  onStartExploring: () => void;
}

export function HeroSection({ onStartExploring }: HeroSectionProps) {
  const { t } = useLanguage();
  const eyebrowBg = useColorModeValue("rgba(0, 230, 138, 0.1)", "rgba(0, 230, 138, 0.1)");
  const eyebrowColor = "brand.500";
  const headingColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const subtitleColor = useColorModeValue("gray.600", "whiteAlpha.700");

  return (
    <Container maxW="7xl" py={{ base: 16, md: 32 }}>
      <MotionBox
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "flex-start", lg: "center" }}
          justify="space-between"
          gap={{ base: 12, lg: 8 }}
        >
          <Stack spacing={8} maxW="2xl" flex={1}>
            <HStack
              alignSelf="flex-start"
              px={4}
              py={1.5}
              rounded="full"
              fontSize="sm"
              fontWeight="medium"
              bg={eyebrowBg}
              color={eyebrowColor}
              borderWidth="1px"
              borderColor="rgba(0, 230, 138, 0.2)"
            >
              <Text>{t("hero.eyebrow")}</Text>
            </HStack>
            
            <Heading
              fontSize={{ base: "5xl", md: "7xl" }}
              lineHeight="1.1"
              letterSpacing="-0.03em"
              color={headingColor}
              textAlign="left"
            >
              {t("hero.title.part1")}
              <Box as="span" color="brand.500">
                {t("hero.title.part2")}
              </Box>
            </Heading>
            
            <Text fontSize={{ base: "lg", md: "xl" }} color={subtitleColor} maxW="xl" lineHeight="relaxed" textAlign="left">
              {t("hero.subtitle")}
            </Text>
            
            <HStack spacing={4} pt={4}>
              <Button
                size="lg"
                colorScheme="green"
                bg="brand.500"
                color="black"
                px={8}
                _hover={{ bg: "brand.400" }}
                onClick={onStartExploring}
              >
                {t("hero.cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor={useColorModeValue("gray.200", "whiteAlpha.300")}
                color={useColorModeValue("gray.700", "whiteAlpha.900")}
                px={8}
                _hover={{ bg: useColorModeValue("gray.50", "whiteAlpha.100") }}
              >
                {t("hero.secondary_cta")}
              </Button>
            </HStack>
          </Stack>

          <Flex flex={1} display={{ base: "none", lg: "flex" }} justifyContent="center" alignItems="center" position="relative">
            <motion.div
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,230,138,0.15) 0%, rgba(0,230,138,0) 70%)",
                zIndex: 0,
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <Box position="relative" zIndex={1} p={10}>
              <Icon as={Bot} boxSize={64} color="brand.500" strokeWidth={1} />
            </Box>
          </Flex>
        </Flex>
      </MotionBox>
    </Container>
  );
}
