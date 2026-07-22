export interface ServiceTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  serviceSlug: string;
}

// Empty by design — service detail pages only render a testimonial block if
// a matching entry exists here. To populate, append entries of shape:
//   { quote: "...", author: "...", role: "...", company: "...", serviceSlug: "..." }
export const serviceTestimonials: ServiceTestimonial[] = [];

export function getTestimonialBySlug(
  serviceSlug: string
): ServiceTestimonial | undefined {
  return serviceTestimonials.find((t) => t.serviceSlug === serviceSlug);
}
