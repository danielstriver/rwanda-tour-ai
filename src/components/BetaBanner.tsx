import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";
import { useLanguage } from "../hooks/useLanguage";

export function BetaBanner() {
  const { t } = useLanguage();
  const bg = useColorModeValue("brand.50", "rgba(0, 230, 138, 0.1)");
  const color = useColorModeValue("brand.700", "brand.400");
  const borderColor = useColorModeValue("brand.100", "rgba(0, 230, 138, 0.2)");

  return (
    <Box
      bg={bg}
      color={color}
      py={2}
      borderBottom="1px solid"
      borderColor={borderColor}
      textAlign="center"
    >
      <Container maxW="7xl">
        <Text fontSize="sm" fontWeight="medium">
          {t("banner.beta")}
        </Text>
      </Container>
    </Box>
  );
}
