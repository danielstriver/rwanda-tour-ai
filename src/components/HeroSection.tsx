import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

import { MotionBox } from "./MotionBox";

export function HeroSection() {
  return (
    <Container maxW="7xl" py={{ base: 16, md: 24 }}>
      <MotionBox
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Stack spacing={6} maxW="4xl">
          <Text
            display="inline-flex"
            alignSelf="flex-start"
            px={4}
            py={2}
            rounded="full"
            fontSize="sm"
            fontWeight="semibold"
            bg="brand.50"
            color="brand.700"
          >
            AI-powered travel inspiration for Rwanda
          </Text>
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            lineHeight={{ base: "1.1", md: "1" }}
            letterSpacing="-0.04em"
          >
            Rwanda Tour AI
          </Heading>
          <Text fontSize={{ base: "lg", md: "2xl" }} color="gray.500" maxW="2xl">
            Discover Rwanda Your Way
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="3xl">
            Start with your travel style, budget, and duration to preview curated experiences
            across Rwanda. This first MVP focuses on a fast, polished discovery flow.
          </Text>
          <Button
            alignSelf="flex-start"
            size="lg"
            colorScheme="green"
            rightIcon={<ArrowRight size={18} />}
          >
            Start Exploring
          </Button>
        </Stack>
      </MotionBox>
    </Container>
  );
}
