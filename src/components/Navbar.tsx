import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDown, Globe2, MoonStar, SunMedium } from "lucide-react";
import { useLanguage, Language } from "../hooks/useLanguage";

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { language, setLanguage, t } = useLanguage();
  const isDark = colorMode === "dark";
  const shellBg = useColorModeValue("rgba(255,255,255,0.56)", "rgba(6,10,14,0.72)");
  const borderColor = useColorModeValue("rgba(15,23,42,0.08)", "rgba(226,232,240,0.08)");
  const titleColor = "appHeading";
  const subText = "appMuted";
  const switchBg = useColorModeValue("rgba(255,255,255,0.88)", "rgba(255,255,255,0.07)");
  const switchTextColor = "appText";

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: t("nav.lang.en") },
    { code: "fr", label: t("nav.lang.fr") },
    { code: "rw", label: t("nav.lang.rw") },
  ];

  const currentLanguageLabel = languages.find((l) => l.code === language)?.label || "English";

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="20"
      backdropFilter="blur(18px)"
      bg={shellBg}
      borderBottomWidth="1px"
      borderColor={borderColor}
    >
      <Container maxW="7xl" py={4}>
        <Flex align="center" justify="space-between" gap={4}>
          <HStack spacing={3}>
            <Flex
              align="center"
              justify="center"
              boxSize={10}
              rounded="2xl"
              bg="brand.500"
              color="black"
              fontWeight="bold"
              boxShadow="lg"
            >
              R
            </Flex>
            <Box>
              <Text fontWeight="bold" color={titleColor}>
                {t("nav.title")}
              </Text>
              <Text fontSize="sm" color={subText}>
                {t("nav.subtitle")}
              </Text>
            </Box>
          </HStack>

          <HStack spacing={3} flexWrap="wrap" justify="flex-end">
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<Globe2 size={16} />}
                rightIcon={<ChevronDown size={16} />}
                variant="outline"
                bg={switchBg}
                borderColor={borderColor}
              >
                {currentLanguageLabel}
              </MenuButton>
              <MenuList>
                {languages.map((lang) => (
                  <MenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                    {lang.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <HStack
              spacing={3}
              px={4}
              py={2.5}
              rounded="full"
              bg={switchBg}
              borderWidth="1px"
              borderColor={borderColor}
            >
              {isDark ? <MoonStar size={16} /> : <SunMedium size={16} />}
              <Text fontSize="sm" fontWeight="medium" color={switchTextColor}>
                {isDark ? t("nav.theme.dark") : t("nav.theme.light")}
              </Text>
              <Switch colorScheme="green" isChecked={isDark} onChange={toggleColorMode} />
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
