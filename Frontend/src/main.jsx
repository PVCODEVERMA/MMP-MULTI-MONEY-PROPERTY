// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";

/* Context Providers */
import { AuthProvider } from "./context/AuthContext.jsx"; // User
import { AuthProviderSubAdmin } from "./context/AuthContextSubAdmin.jsx"; // SubAdmin
import { AuthProviderSuperAdmin } from "./context/AuthContextSuperAdmin.jsx"; // SuperAdmin

/* Error Boundary */
import ErrorBoundary from "./common/ErrorBoundary.jsx";
import { LowLeadProvider } from "./context/LowLeadContext.jsx";
import { PropertyProvider } from "./context/LeadContext.jsx";
import { MediumLeadProvider } from "./context/MediumLeadContext.jsx";
import { HighLeadProvider } from "./context/HighLeadContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallbackMessage="App crashed">
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <AuthProviderSubAdmin>
              <AuthProviderSuperAdmin>
                <PropertyProvider>
                  <MediumLeadProvider>
                    <HighLeadProvider>
                      <LowLeadProvider>
                        <App />
                      </LowLeadProvider>
                    </HighLeadProvider>
                  </MediumLeadProvider>
                </PropertyProvider>
                <Toaster position="top-center" reverseOrder={false} />
              </AuthProviderSuperAdmin>
            </AuthProviderSubAdmin>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
