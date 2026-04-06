import {
  Button,
  Heading,
  Stack,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

interface PreferenceSelectorProps<TOption extends string> {
  label: string;
  value: TOption;
  options: TOption[];
  onChange: (value: TOption) => void;
}

export function PreferenceSelector<TOption extends string>({
  label,
  value,
  options,
  onChange,
}: PreferenceSelectorProps<TOption>) {
  const labelColor = "appHeading";
  const outlineBg = useColorModeValue("whiteAlpha.50", "whiteAlpha.100");
  const outlineText = useColorModeValue("gray.700", "whiteAlpha.800");

  return (
    <Stack spacing={3}>
      <Heading size="sm" color={labelColor}>
        {label}
      </Heading>
      <Wrap spacing={3}>
        {options.map((option) => {
          const isActive = option === value;

          return (
            <WrapItem key={option}>
              <Button
                size="sm"
                variant={isActive ? "solid" : "outline"}
                colorScheme={isActive ? "green" : "gray"}
                bg={isActive ? undefined : outlineBg}
                color={isActive ? undefined : outlineText}
                onClick={() => onChange(option)}
              >
                {option}
              </Button>
            </WrapItem>
          );
        })}
      </Wrap>
    </Stack>
  );
}
