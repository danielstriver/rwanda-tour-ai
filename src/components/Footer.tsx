import { Box, Container, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { Github, MapPinned } from "lucide-react";

export function Footer() {
  return (
    <Box as="footer" borderTopWidth="1px" borderColor="blackAlpha.100" py={10}>
      <Container maxW="7xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          spacing={5}
        >
          <Stack spacing={2}>
            <HStack spacing={2} color="brand.700">
              <MapPinned size={18} />
              <Text fontWeight="bold">Rwanda Tour AI</Text>
            </HStack>
            <Text color="gray.500" maxW="xl">
              A UI-first tourism recommendation MVP for discovering destinations across Rwanda.
            </Text>
          </Stack>

          <Link
            href="https://github.com/your-org/rwanda-tour-ai"
            isExternal
            display="inline-flex"
            alignItems="center"
            gap={2}
            color="gray.600"
          >
            <Github size={18} />
            GitHub placeholder
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
