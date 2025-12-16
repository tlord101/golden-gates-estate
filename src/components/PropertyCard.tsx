import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize } from 'lucide-react';
import { Property } from '../data/properties';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useLanguage();
  
  // Map property image keywords to Unsplash images
  const getPropertyImage = (imageKey: string) => {
    const imageMap: Record<string, string> = {
      'barcelona-penthouse-luxury': 'https://images.unsplash.com/photo-1661362715810-74dbbd4b51a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBiYXJjZWxvbmF8ZW58MXx8fHwxNzYzNDQyMjMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'barcelona-apartment-modern': 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjMzNDczMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'barcelona-villa-contemporary': 'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzYzNDQxMzAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'barcelona-beach-penthouse': 'https://images.unsplash.com/photo-1711471965650-5ddda764158b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBiZWFjaCUyMG1lZGl0ZXJyYW5lYW58ZW58MXx8fHwxNzYzNDQyMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'barcelona-apartment-sarria': 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjMzNDczMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'barcelona-loft-poblenou': 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjMzNDczMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'barcelona-townhouse-gracia': 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjMzNDczMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'sitges-estate-luxury': 'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzYzNDQxMzAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'madrid-apartment-salamanca': 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjMzNDczMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'marbella-villa-beachfront': 'https://images.unsplash.com/photo-1722452848316-c6c26ebeeb09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJiZWxsYSUyMGx1eHVyeSUyMHZpbGxhfGVufDF8fHx8MTc2MzQ0MjIzMnww&ixlib=rb-4.1.0&q=80&w=1080',
      'valencia-penthouse-seafront': 'https://images.unsplash.com/photo-1661362715810-74dbbd4b51a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBiYXJjZWxvbmF8ZW58MXx8fHwxNzYzNDQyMjMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'ibiza-villa-luxury': 'https://images.unsplash.com/photo-1643235664360-dfd51e1df4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpYml6YSUyMHN1bnNldCUyMHZpbGxhfGVufDF8fHx8MTc2MzQ0MjIzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    };
    return imageMap[imageKey] || imageMap['barcelona-apartment-modern'];
  };

  const imageSrc = property.exteriorImage || getPropertyImage(property.image);

  // Simple installment helper (20% down payment example)
  const downPayment = Math.round(property.price * 0.2);
  const installmentMonths = property.installmentOptions || [6, 12, 24];

  return (
    <Link to={`/properties/${property.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            src={imageSrc}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {property.featured && (
            <div className="absolute top-4 left-4 bg-luxury-gold text-white px-3 py-1 text-xs uppercase tracking-wide">
              Featured
            </div>
          )}
          <div className="absolute top-4 right-4 bg-luxury-black/80 text-white px-3 py-1 text-xs uppercase tracking-wide">
            {t(`type.${property.type}`)}
          </div>
        </div>

        {/* Content */}
          <div className="p-6">
          <div className="mb-2">
            <p className="text-2xl text-luxury-gold mb-2">
              €{property.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Example down payment: €{downPayment.toLocaleString()}</p>
            <div className="mt-2 text-sm text-gray-600">
              {installmentMonths.map((m) => (
                <span key={m} className="inline-block mr-3">{m} months: €{Math.round((property.price - downPayment) / m).toLocaleString()}/mo</span>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500 italic">Installment plans available. Terms and conditions apply.</p>
            <h3 className="text-xl text-luxury-black mb-1">{property.title}</h3>
            <p className="text-sm text-gray-500">{property.location}</p>
            {property.category && (
              <div className="inline-block mt-2 px-2 py-1 text-xs uppercase tracking-wide rounded bg-gray-100 text-gray-700">
                {property.category}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Maximize className="w-4 h-4" />
              <span>{property.sqm} {t('properties.sqm')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
