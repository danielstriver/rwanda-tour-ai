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

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const shellBg = useColorModeValue("rgba(255,255,255,0.56)", "rgba(6,10,14,0.72)");
  const borderColor = useColorModeValue("rgba(15,23,42,0.08)", "rgba(226,232,240,0.08)");
  const titleColor = "appHeading";
  const subText = "appMuted";
  const switchBg = useColorModeValue("rgba(255,255,255,0.88)", "rgba(255,255,255,0.07)");
  const switchTextColor = "appText";

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
              color="white"
              fontWeight="bold"
              boxShadow="lg"
            >
              R
            </Flex>
            <Box>
              <Text fontWeight="bold" color={titleColor}>
                Rwanda Tour AI
              </Text>
              <Text fontSize="sm" color={subText}>
                Smart tourism discovery
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
                English
              </MenuButton>
              <MenuList>
                <MenuItem>English</MenuItem>
                <MenuItem>French</MenuItem>
                <MenuItem>Kinyarwanda</MenuItem>
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
                {isDark ? "Dark" : "Light"}
              </Text>
              <Switch colorScheme="green" isChecked={isDark} onChange={toggleColorMode} />
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
