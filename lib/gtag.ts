// GA4 Measurement ID
export const GA_MEASUREMENT_ID = "G-VBTTJ2QHVX";

// gtag parameter types
type GtagParams = Record<string, unknown>;

// Extend window for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, params?: GtagParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}
