/**
 * Image URL configuration - References images from the public folder
 * All paths are relative to the public folder (e.g., /images/properties/...)
 */

// Property Images
export const propertyImages: Record<string, string> = {
  'barcelona-penthouse-luxury': '/images/properties/barcelona-penthouse-luxury.jpg',
  'barcelona-apartment-modern': '/images/properties/barcelona-apartment-modern.jpg',
  'barcelona-villa-contemporary': '/images/properties/barcelona-villa-contemporary.jpg',
  'barcelona-beach-penthouse': '/images/properties/barcelona-beach-penthouse.jpg',
  'barcelona-apartment-sarria': '/images/properties/barcelona-apartment-sarria.jpg',
  'barcelona-loft-poblenou': '/images/properties/barcelona-loft-poblenou.jpg',
  'barcelona-townhouse-gracia': '/images/properties/barcelona-townhouse-gracia.jpg',
  'sitges-estate-luxury': '/images/properties/sitges-estate-luxury.jpg',
  'madrid-apartment-salamanca': '/images/properties/madrid-apartment-salamanca.jpg',
  'marbella-villa-beachfront': '/images/properties/marbella-villa-beachfront.jpg',
  'valencia-penthouse-seafront': '/images/properties/valencia-penthouse-seafront.jpg',
  'ibiza-villa-luxury': '/images/properties/ibiza-villa-luxury.jpg',
};

// Location Images
export const locationImages: Record<string, string> = {
  'barcelona-eixample-architecture': '/images/locations/barcelona-eixample.jpg',
  'barcelona-gracia-neighborhood': '/images/locations/barcelona-gracia.jpg',
  'barcelona-poblenou-waterfront': '/images/locations/barcelona-poblenou.jpg',
  'barcelona-sarria-charming': '/images/locations/barcelona-sarria.jpg',
  'barcelona-gothic-quarter': '/images/locations/barcelona-gothic-quarter.jpg',
  'sitges-mediterranean': '/images/locations/sitges.jpg',
  'madrid-salamanca-elegant': '/images/locations/madrid-salamanca.jpg',
  'madrid-retiro-luxurious': '/images/locations/madrid-retiro.jpg',
  'madrid-chamber': '/images/locations/madrid-chamber.jpg',
  'marbella-golden-mile': '/images/locations/marbella-golden-mile.jpg',
  'marbella-puerto-banus': '/images/locations/marbella-puerto-banus.jpg',
  'valencia-city-of-arts': '/images/locations/valencia-city-of-arts.jpg',
  'valencia-beachfront-penthouse': '/images/locations/valencia-beachfront.jpg',
  'ibiza-sunset': '/images/locations/ibiza-sunset.jpg',
  'palma-mallorca': '/images/locations/palma-mallorca.jpg',
  'lisbon-miradouro': '/images/locations/lisbon.jpg',
  'porto-riverside': '/images/locations/porto.jpg',
  'lagos-marina': '/images/locations/lagos.jpg',
  'cape-town-table-mountain': '/images/locations/cape-town.jpg',
  'dubai-marina': '/images/locations/dubai-marina.jpg',
  'singapore-skyline': '/images/locations/singapore.jpg',
  'tokyo-tower': '/images/locations/tokyo.jpg',
};

// Page Images
export const pageImages: Record<string, string> = {
  'hero-luxury-real-estate': '/images/pages/hero-luxury.jpg',
  'about-global-property': '/images/pages/about-global.jpg',
  'about-modern-apartment': '/images/pages/about-apartment.jpg',
  'installments-real-estate': '/images/pages/installments.jpg',
  'why-choose-global': '/images/pages/why-choose-global.jpg',
  'why-choose-payment': '/images/pages/why-choose-payment.jpg',
  'why-choose-support': '/images/pages/why-choose-support.jpg',
  'why-choose-secure': '/images/pages/why-choose-secure.jpg',
};

// Testimonial Images
export const testimonialImages: Record<number, string> = {
  1: '/images/testimonials/testimonial-1.jpg',
  2: '/images/testimonials/testimonial-2.jpg',
  3: '/images/testimonials/testimonial-3.jpg',
};

// Blog Images
export const blogImages: Record<number, string> = {
  1: '/images/pages/blog-barcelona.jpg',
  2: '/images/pages/blog-marbella.jpg',
  3: '/images/pages/blog-madrid.jpg',
  4: '/images/pages/blog-modern-living.jpg',
  5: '/images/pages/blog-luxury-villa.jpg',
  6: '/images/pages/blog-penthouse.jpg',
};

/**
 * Get property image URL with fallback
 */
export function getPropertyImage(imageKey: string): string {
  return propertyImages[imageKey] || propertyImages['barcelona-apartment-modern'];
}

/**
 * Get location image URL with fallback
 */
export function getLocationImage(imageKey: string): string {
  return locationImages[imageKey] || locationImages['barcelona-eixample-architecture'];
}

/**
 * Get page image URL with fallback
 */
export function getPageImage(imageKey: string): string {
  return pageImages[imageKey] || pageImages['hero-luxury-real-estate'];
}

/**
 * Get testimonial image URL with fallback
 */
export function getTestimonialImage(index: number): string {
  return testimonialImages[index] || '/images/testimonials/testimonial-default.jpg';
}

/**
 * Get blog image URL with fallback
 */
export function getBlogImage(index: number): string {
  return blogImages[index] || blogImages[1];
}
