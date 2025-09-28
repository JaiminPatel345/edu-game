import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./app/i18n";
import "./index.css";

import { AppProviders } from "./app/providers/AppProviders";
import { registerServiceWorker } from "./app/offline/serviceWorkerRegistration";
import App from "./App";

registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
  <Suspense fallback={<div className="min-h-screen bg-surface text-text-inverted flex items-center justify-center">Loading...</div>}>
        <App />
      </Suspense>
    </AppProviders>
  </StrictMode>,
);
