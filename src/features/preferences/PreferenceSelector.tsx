import {
  Button,
  Heading,
  Stack,
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
  return (
    <Stack spacing={3}>
      <Heading size="sm">{label}</Heading>
      <Wrap spacing={3}>
        {options.map((option) => {
          const isActive = option === value;

          return (
            <WrapItem key={option}>
              <Button
                size="sm"
                variant={isActive ? "solid" : "outline"}
                colorScheme={isActive ? "green" : "gray"}
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
