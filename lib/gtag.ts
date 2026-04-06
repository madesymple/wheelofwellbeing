// GA4 Measurement ID
export const GA_MEASUREMENT_ID = "G-VBTTJ2QHVX";

// Extend window for gtag
declare global {
  interface Window {
    gtag?: (command: string, ...args: (string | number | Record<string, string | number | Record<string, string>[]>)[]) => void;
    dataLayer?: Record<string, string | number>[];
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | Record<string, string>[]>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}
