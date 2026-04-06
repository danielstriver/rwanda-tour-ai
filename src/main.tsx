import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

import App from "./App";

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
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "full",
        fontWeight: "semibold",
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
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
