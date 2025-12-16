import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-serif">Golden States Estates</span>
              <span className="text-xs tracking-widest text-luxury-gold uppercase">Worldwide Properties</span>
            </div>
            <p className="text-sm text-gray-400">
              Carefully selected residential properties with flexible installment plans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-luxury-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/installments" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                  Installment Plans
                </Link>
              </li>
              <li>
                <Link to="/why-us" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-luxury-gold mb-4">Top Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/locations/new-york" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                  New York, NY
                </Link>
              </li>
              <li>
                <Link to="/locations/los-angeles" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                  Los Angeles, CA
                </Link>
              </li>
              <li>
                <Link to="/locations/miami" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                  Miami, FL
                </Link>
              </li>
              <li>
                <Link to="/locations/san-francisco" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                  San Francisco, CA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-luxury-gold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-1 text-luxury-gold flex-shrink-0" />
                <a
                  href="mailto:Goldenstatesestates@hotmail.com"
                  className="text-sm text-gray-400 hover:text-luxury-gold transition-colors"
                >
                  Goldenstatesestates@hotmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-luxury-gold flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Worldwide (email-based support)
                </span>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              We respond within 24 hours via email
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Golden States Estates. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-luxury-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
