import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  VStack,
  Circle,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Search, MessageSquare, Sparkles, X, Compass, Clock, Users, Bot } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { MotionBox } from "./MotionBox";

interface HowItWorksProps {
  onClose: () => void;
  onStartSearching: () => void;
}

export function HowItWorks({ onClose, onStartSearching }: HowItWorksProps) {
  const { t } = useLanguage();
  const bgColor = useColorModeValue("white", "#0A1118");
  const cardBg = useColorModeValue("gray.50", "rgba(255,255,255,0.03)");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const headingColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "whiteAlpha.700");

  const painPoints = [
    {
      icon: Search,
      title: t("how.pain1.title"),
      desc: t("how.pain1.desc"),
    },
    {
      icon: Clock,
      title: t("how.pain2.title"),
      desc: t("how.pain2.desc"),
    },
    {
      icon: Users,
      title: t("how.pain3.title"),
      desc: t("how.pain3.desc"),
    },
  ];

  const steps = [
    {
      number: "1",
      title: t("how.step1.title"),
      desc: t("how.step1.desc"),
      color: "brand.500",
    },
    {
      number: "2",
      title: t("how.step2.title"),
      desc: t("how.step2.desc"),
      color: "blue.400",
    },
    {
      number: "3",
      title: t("how.step3.title"),
      desc: t("how.step3.desc"),
      color: "purple.400",
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor} position="relative" zIndex={30}>
      <Container maxW="7xl" py={{ base: 12, md: 20 }}>
        <Flex justify="flex-end" mb={8}>
          <IconButton
            aria-label="Close"
            icon={<X size={24} />}
            variant="ghost"
            onClick={onClose}
            rounded="full"
          />
        </Flex>

        <VStack spacing={20} align="stretch">
          {/* Section 1: The Problem */}
          <Stack spacing={12} align="center" textAlign="center">
            <VStack spacing={4} maxW="3xl">
              <Heading size="2xl" color={headingColor} letterSpacing="-0.02em">
                {t("how.intro.title")}
              </Heading>
              <Text fontSize="xl" color={textColor}>
                {t("how.intro.subtitle")}
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%">
              {painPoints.map((point, i) => (
                <MotionBox
                  key={i}
                  p={8}
                  bg={cardBg}
                  rounded="2xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <VStack align="flex-start" spacing={4}>
                    <Circle size="12" bg="rgba(0, 230, 138, 0.1)" color="brand.500">
                      <Icon as={point.icon} boxSize={6} />
                    </Circle>
                    <Heading size="md" color={headingColor}>
                      {point.title}
                    </Heading>
                    <Text color={textColor} textAlign="left">
                      {point.desc}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Stack>

          {/* Section 2: The Solution */}
          <Stack spacing={12} align="center" textAlign="center">
            <VStack spacing={4} maxW="4xl">
              <Heading size="2xl" color={headingColor} letterSpacing="-0.02em">
                {t("how.solution.title.part1")}
                <Box as="span" color="brand.500">
                  {t("how.solution.title.part2")}
                </Box>
              </Heading>
              <Text fontSize="xl" color={textColor}>
                {t("how.solution.subtitle")}
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} w="100%" pt={8}>
              {steps.map((step, i) => (
                <VStack key={i} spacing={6}>
                  <Circle
                    size="16"
                    bg={step.color}
                    color="black"
                    fontSize="2xl"
                    fontWeight="bold"
                    boxShadow={`0 0 20px ${step.color}44`}
                  >
                    {step.number}
                  </Circle>
                  <VStack spacing={2} textAlign="center">
                    <Heading size="md" color={headingColor}>
                      {step.title}
                    </Heading>
                    <Text color={textColor} maxW="250px">
                      {step.desc}
                    </Text>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid>
          </Stack>

          {/* CTA Section */}
          <MotionBox
            p={{ base: 8, md: 16 }}
            bg="brand.500"
            rounded="3xl"
            textAlign="center"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <VStack spacing={8}>
              <VStack spacing={4}>
                <Circle size="16" bg="blackAlpha.200">
                  <Bot size={32} color="black" />
                </Circle>
                <Heading size="2xl" color="black" letterSpacing="-0.03em">
                  {t("how.cta.title")}
                </Heading>
                <Text fontSize="xl" color="blackAlpha.800" fontWeight="medium">
                  {t("how.cta.subtitle")}
                </Text>
              </VStack>
              <Button
                size="lg"
                h="16"
                px="12"
                bg="white"
                color="black"
                rounded="full"
                fontSize="xl"
                _hover={{ bg: "gray.100", transform: "scale(1.05)" }}
                transition="all 0.2s"
                onClick={onStartSearching}
              >
                {t("how.cta.button")}
              </Button>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
