import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ErrorBoundary from "./common/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallbackMessage="App crashed">
      <AuthProvider>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
