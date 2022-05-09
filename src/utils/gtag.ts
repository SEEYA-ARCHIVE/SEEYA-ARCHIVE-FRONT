export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_ANALYTICS_ID as string, {
    page_path: url,
  });
};

interface EventType {
  action: string;
  category: string;
  label: string;
  value: string;
}

export const event = ({ action, category, label, value }: EventType) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
