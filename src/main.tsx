import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { LanguageProvider } from "./hooks/useLanguage";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Inter', 'Segoe UI', sans-serif",
    body: "'Inter', 'Segoe UI', sans-serif",
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        bg: "transparent",
        color: "appText",
        transitionProperty: "background-color, color",
        transitionDuration: "220ms",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "full",
        fontWeight: "semibold",
      },
      variants: {
        outline: {
          borderColor: "whiteAlpha.300",
          _hover: {
            bg: "whiteAlpha.100",
          },
        },
        ghost: {
          _hover: {
            bg: "whiteAlpha.100",
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "rgba(11,18,24,0.94)",
          borderColor: "rgba(226,232,240,0.08)",
          color: "white",
          backdropFilter: "blur(18px)",
        },
        item: {
          bg: "transparent",
          _hover: {
            bg: "whiteAlpha.120",
          },
          _focus: {
            bg: "whiteAlpha.120",
          },
        },
      },
    },
  },
  semanticTokens: {
    colors: {
      appText: {
        default: "gray.800",
        _dark: "whiteAlpha.900",
      },
      appHeading: {
        default: "gray.900",
        _dark: "whiteAlpha.950",
      },
      appMuted: {
        default: "gray.600",
        _dark: "whiteAlpha.700",
      },
      appSurface: {
        default: "rgba(255,255,255,0.72)",
        _dark: "rgba(11,18,24,0.72)",
      },
    },
  },
  colors: {
    brand: {
      50: "#e6fff4",
      100: "#b3ffe1",
      200: "#80ffce",
      300: "#4dffbb",
      400: "#1affa8",
      500: "#00E68A", // Vibrant green matching Evimi Bul
      600: "#00b36b",
      700: "#00804d",
      800: "#004d2e",
      900: "#001a0f"
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </LanguageProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
