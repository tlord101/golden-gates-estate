import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.about': 'About Us',
    'nav.locations': 'Locations',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.installments': 'Installment Plans',
    'nav.why': 'Why Choose Us',
    'nav.testimonials': 'Testimonials',
    
    // Home Page
    'home.hero.title': 'Discover Luxury Properties Worldwide',
    'home.hero.subtitle': 'Curated properties across the world — from city apartments to seaside villas',
    'home.hero.cta': 'Explore Properties',
    'home.featured.title': 'Featured Properties',
    'home.featured.subtitle': 'Handpicked selection of our finest estates',
    'home.locations.title': 'Prime Locations',
    'home.locations.subtitle': 'Discover the most sought-after neighborhoods',
    'home.testimonials.title': 'Client Testimonials',
    'home.contact.title': 'Ready to Find Your Dream Property?',
    'home.contact.subtitle': 'Get in touch with our expert team',
    'home.contact.cta': 'Contact Us',
    
    // Properties
    'properties.title': 'Luxury Properties',
    'properties.filter.location': 'Location',
    'properties.filter.type': 'Property Type',
    'properties.filter.bedrooms': 'Bedrooms',
    'properties.filter.price': 'Price Range',
    'properties.filter.all': 'All Locations',
    'properties.filter.reset': 'Reset Filters',
    'properties.filter.apply': 'Apply Filters',
    'properties.bedrooms': 'Bedrooms',
    'properties.bathrooms': 'Bathrooms',
    'properties.sqm': 'sqm',
    'properties.view': 'View Details',
    
    // Property Types
    'type.apartment': 'Apartment',
    'type.penthouse': 'Penthouse',
    'type.villa': 'Villa',
    'type.townhouse': 'Townhouse',
    'type.estate': 'Estate',
    
    // About
    'about.title': 'About Golden States Estates',
    'about.subtitle': 'Golden States Estates is a global real estate company dedicated to making home ownership accessible worldwide.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We respond within 24 hours via email.',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Thank you for contacting Golden States Estates. Our team will get back to you shortly.',
    
    // Common
    'common.learn_more': 'Learn More',
    'common.explore': 'Explore',
    'common.view_all': 'View All',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.properties': 'Propiedades',
    'nav.about': 'Nosotros',
    'nav.locations': 'Ubicaciones',
    'nav.contact': 'Contacto',
    'nav.blog': 'Blog',
    'nav.installments': 'Planes de Pago',
    'nav.why': 'Por Qué Elegirnos',
    'nav.testimonials': 'Testimonios',
    
    // Home Page
    'home.hero.title': 'Descubre la Vida de Lujo en Barcelona',
    'home.hero.subtitle': 'Propiedades Exclusivas en las Ubicaciones Más Prestigiosas de España',
    'home.hero.cta': 'Explorar Propiedades',
    'home.featured.title': 'Propiedades Destacadas',
    'home.featured.subtitle': 'Selección cuidada de nuestras mejores propiedades',
    'home.locations.title': 'Ubicaciones Premium',
    'home.locations.subtitle': 'Descubre los barrios más codiciados',
    'home.testimonials.title': 'Testimonios de Clientes',
    'home.contact.title': '¿Listo para Encontrar tu Propiedad Soñada?',
    'home.contact.subtitle': 'Ponte en contacto con nuestro equipo experto',
    'home.contact.cta': 'Contáctanos',
    
    // Properties
    'properties.title': 'Propiedades de Lujo',
    'properties.filter.location': 'Ubicación',
    'properties.filter.type': 'Tipo de Propiedad',
    'properties.filter.bedrooms': 'Dormitorios',
    'properties.filter.price': 'Rango de Precio',
    'properties.filter.all': 'Todas las Ubicaciones',
    'properties.filter.reset': 'Restablecer Filtros',
    'properties.filter.apply': 'Aplicar Filtros',
    'properties.bedrooms': 'Dormitorios',
    'properties.bathrooms': 'Baños',
    'properties.sqm': 'm²',
    'properties.view': 'Ver Detalles',
    
    // Property Types
    'type.apartment': 'Apartamento',
    'type.penthouse': 'Ático',
    'type.villa': 'Villa',
    'type.townhouse': 'Casa Adosada',
    'type.estate': 'Finca',
    
    // About
    'about.title': 'Sobre Golden States Estates',
    'about.subtitle': 'Tu Puerta a la Vida de Lujo en España',
    
    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Respondemos en 24 horas por correo electrónico.',
    'contact.name': 'Nombre Completo',
    'contact.email': 'Correo Electrónico',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.success': 'Gracias por contactar a Golden States Estates. Nuestro equipo se pondrá en contacto contigo en breve.',
    
    // Common
    'common.learn_more': 'Saber Más',
    'common.explore': 'Explorar',
    'common.view_all': 'Ver Todo',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
