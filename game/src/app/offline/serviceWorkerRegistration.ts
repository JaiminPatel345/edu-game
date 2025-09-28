import { Workbox } from "workbox-window";

const swUrl = `/sw.js`;

export function registerServiceWorker() {
  if (import.meta.env.DEV) {
    return;
  }

  if ("serviceWorker" in navigator) {
    const wb = new Workbox(swUrl, { scope: "/" });
    wb.addEventListener("waiting", () => {
      wb.messageSkipWaiting();
    });
    wb.register().catch((error) => {
      console.error("Service worker registration failed", error);
    });
  }
}
