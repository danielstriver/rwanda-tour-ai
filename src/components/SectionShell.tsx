import { Box, type BoxProps, useColorModeValue } from "@chakra-ui/react";

export function SectionShell(props: BoxProps) {
  const bg = useColorModeValue("rgba(255,255,255,0.78)", "rgba(8,14,20,0.82)");
  const borderColor = useColorModeValue("rgba(15,23,42,0.08)", "rgba(226,232,240,0.08)");
  const shadow = useColorModeValue(
    "0 24px 80px rgba(15, 23, 42, 0.08)",
    "0 30px 90px rgba(0, 0, 0, 0.42)",
  );

  return (
    <Box
      rounded={{ base: "28px", md: "32px" }}
      borderWidth="1px"
      borderColor={borderColor}
      bg={bg}
      backdropFilter="blur(18px)"
      boxShadow={shadow}
      {...props}
    />
  );
}
