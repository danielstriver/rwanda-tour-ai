import { Box, Container, HStack, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Github, MapPinned } from "lucide-react";

export function Footer() {
  const borderColor = useColorModeValue("rgba(15,23,42,0.08)", "rgba(226,232,240,0.08)");
  const brandColor = useColorModeValue("brand.700", "brand.300");
  const bodyColor = useColorModeValue("gray.600", "whiteAlpha.720");
  const linkColor = useColorModeValue("gray.700", "whiteAlpha.860");

  return (
    <Box as="footer" borderTopWidth="1px" borderColor={borderColor} py={10}>
      <Container maxW="7xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          spacing={5}
        >
          <Stack spacing={2}>
            <HStack spacing={2} color={brandColor}>
              <MapPinned size={18} />
              <Text fontWeight="bold">Rwanda Tour AI</Text>
            </HStack>
            <Text color={bodyColor} maxW="xl">
              A UI-first tourism recommendation MVP for discovering destinations across Rwanda.
            </Text>
          </Stack>

          <Link
            href="https://github.com/your-org/rwanda-tour-ai"
            isExternal
            display="inline-flex"
            alignItems="center"
            gap={2}
            color={linkColor}
          >
            <Github size={18} />
            GitHub placeholder
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
