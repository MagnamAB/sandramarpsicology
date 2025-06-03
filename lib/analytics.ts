// Google Analytics 4 Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for psychology website
export const trackWhatsAppClick = (service: string) => {
  event({
    action: 'whatsapp_click',
    category: 'engagement',
    label: service,
  });
};

export const trackScheduleClick = (service: string) => {
  event({
    action: 'schedule_click', 
    category: 'conversion',
    label: service,
  });
};

export const trackFormSubmission = (formType: string) => {
  event({
    action: 'form_submit',
    category: 'conversion',
    label: formType,
  });
};

export const trackPageView = (pageName: string) => {
  event({
    action: 'page_view',
    category: 'engagement',
    label: pageName,
  });
};

export const trackServiceInterest = (service: string) => {
  event({
    action: 'service_interest',
    category: 'engagement', 
    label: service,
  });
}; 