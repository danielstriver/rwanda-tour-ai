import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { LanguageProvider } from "./hooks/useLanguage";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Segoe UI', sans-serif",
    body: "'Segoe UI', sans-serif",
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
        _dark: "whiteAlpha.720",
      },
      appSurface: {
        default: "rgba(255,255,255,0.72)",
        _dark: "rgba(11,18,24,0.72)",
      },
    },
  },
  colors: {
    brand: {
      50: "#eefbf4",
      100: "#d5f2df",
      200: "#b0e6c1",
      300: "#85d89f",
      400: "#58c77d",
      500: "#36af63",
      600: "#25894c",
      700: "#1e6b3d",
      800: "#1a5431",
      900: "#153f26"
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
