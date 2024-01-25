import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./providers/authProvider.tsx";
import { Toaster } from "@shadcn/ui/toaster.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./pages/errorHandler.tsx";
import { ThemeProvider } from "./providers/themeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Router>
        <AuthProvider>
          <ThemeProvider defaultTheme="light" storageKey="horse-ui-theme">
            <App />
          </ThemeProvider>
          <Toaster />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
