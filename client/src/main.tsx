import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles.ts";
import { BrowserRouter } from "react-router-dom";
import SessionContextProvider from "./contexts/SessionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </StrictMode>
);
