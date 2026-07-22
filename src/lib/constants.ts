export const SITE_URL = "https://www.retech.asia";
export const SITE_NAME = "Retech Solutions";

export const CONTACT = {
  phone: "(+84) 769 294 225",
  phoneHref: "tel:+84769294225",
  email: "retechasia@gmail.com",
  emailHref: "mailto:retechasia@gmail.com",
  address: "288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward, HCMC, Vietnam",
  mapUrl: "https://maps.app.goo.gl/6NEtFfXAubCPoKj96",
  taxId: "0318655079",
  businessName: "RETECH SOLUTIONS CO., LTD.",
} as const;

export const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Expert Engineers" },
  { value: 5, suffix: "+", label: "Years of Experience" },
] as const;

export const STATS_BAR = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Expert Engineers" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
] as const;

export const ABOUT_STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered", icon: "rocket" },
  { value: 30, suffix: "+", label: "Expert Engineers", icon: "users" },
  { value: 6, suffix: "", label: "Countries Served", icon: "globe" },
  { value: 98, suffix: "%", label: "Client Satisfaction Rate", icon: "heart" },
  { value: 5, suffix: "+", label: "Years of Excellence", icon: "calendar" },
  { value: 24, suffix: "h", label: "Average Response Time", icon: "clock" },
] as const;

export const HIGHLIGHTS = [
  {
    iconKey: "code",
    title: "Full-Cycle Development",
    description: "From business analysis and design to development, testing, and deployment — we handle the entire software lifecycle.",
  },
  {
    iconKey: "zap",
    title: "Agile Methodologies",
    description: "Iterative development with continuous feedback, ensuring rapid delivery and alignment with your business goals.",
  },
  {
    iconKey: "brain",
    title: "AI-Driven Solutions",
    description: "Integrated AI capabilities across CMS, CRM, and ERP platforms — from automated content tagging and predictive analytics to intelligent workflow automation.",
  },
  {
    iconKey: "users",
    title: "Scalable Teams",
    description: "Flexible, dedicated development teams that scale with your project needs and grow alongside your business.",
  },
] as const;
