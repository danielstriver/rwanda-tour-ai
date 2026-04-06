import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDown, Globe2, Moon, SunMedium } from "lucide-react";

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="10"
      backdropFilter="blur(14px)"
      bg={colorMode === "light" ? "rgba(255,255,255,0.86)" : "rgba(23,25,35,0.82)"}
      borderBottomWidth="1px"
      borderColor={colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.200"}
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
              <Text fontWeight="bold">Rwanda Tour AI</Text>
              <Text fontSize="sm" color="gray.500">
                Smart tourism discovery
              </Text>
            </Box>
          </HStack>

          <HStack spacing={3}>
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<Globe2 size={16} />}
                rightIcon={<ChevronDown size={16} />}
                variant="outline"
              >
                English
              </MenuButton>
              <MenuList>
                <MenuItem>English</MenuItem>
                <MenuItem>French</MenuItem>
                <MenuItem>Kinyarwanda</MenuItem>
              </MenuList>
            </Menu>

            <IconButton
              aria-label="Toggle dark mode"
              icon={colorMode === "light" ? <Moon size={18} /> : <SunMedium size={18} />}
              onClick={toggleColorMode}
              variant="outline"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
