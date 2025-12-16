import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/properties', label: t('nav.properties') },
    { path: '/installments', label: t('nav.installments') },
    { path: '/why-us', label: t('nav.why') },
    { path: '/testimonials', label: t('nav.testimonials') },
    { path: '/locations', label: t('nav.locations') },
    { path: '/about', label: t('nav.about') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  // No language toggle — single language site

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - horizontal on larger screens */}
          <Link to="/" className="flex items-center space-x-4">
            {/* If you later add an image logo, replace the span with an <img /> */}
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl font-serif text-luxury-black">Golden States Estates</span>
              <span className="hidden sm:inline-block ml-3 text-xs md:text-sm tracking-widest text-luxury-gold uppercase">Worldwide Properties</span>
            </div>
          </Link>

          {/* Desktop nav: show horizontally on md and up */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  location.pathname === link.path
                    ? 'text-luxury-gold'
                    : 'text-luxury-gray hover:text-luxury-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/contact" className="ml-4 inline-block bg-luxury-gold px-4 py-2 text-white rounded">
              Contact
            </Link>
          </div>

          {/* Mobile: show hamburger only on smaller screens */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="text-luxury-gray hover:text-luxury-gold"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile half-screen top panel overlay (appears from top and covers ~50% height) */}
      {isMobileMenuOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)} />

          {/* sliding panel from top covering half the screen */}
          <div className="absolute top-0 left-0 right-0 h-1/2 transform transition-transform duration-300">
            <div className="h-full bg-white shadow-lg p-6 overflow-auto">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-luxury-gray hover:text-luxury-gold"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <nav className="flex flex-col items-start justify-start h-full space-y-4 mt-4 pl-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg uppercase tracking-wider transition-colors ${
                      location.pathname === link.path
                        ? 'text-luxury-gold'
                        : 'text-luxury-gray hover:text-luxury-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4">
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="inline-block bg-luxury-gold px-6 py-3 text-white rounded">
                    Contact Us
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
