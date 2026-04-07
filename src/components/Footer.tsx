import { Box, Container, HStack, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Github, MapPinned } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export function Footer() {
  const { t } = useLanguage();
  const borderColor = useColorModeValue("rgba(15,23,42,0.08)", "rgba(226,232,240,0.08)");
  const brandColor = useColorModeValue("brand.700", "brand.300");
  const bodyColor = "appMuted";
  const linkColor = "appText";

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
              <Text fontWeight="bold">{t("nav.title")}</Text>
            </HStack>
            <Text color={bodyColor} maxW="xl">
              {t("nav.subtitle")}
            </Text>
          </Stack>

          <HStack spacing={4}>
            <Text fontSize="sm" color={bodyColor}>
              {t("footer.copyright")}
            </Text>
            <Link
              href="https://github.com/danielstriver/rwanda-tour-ai"
              isExternal
              display="inline-flex"
              alignItems="center"
              gap={2}
              color={linkColor}
            >
              <Github size={18} />
              GitHub
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
