import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bed, Bath, Maximize, MapPin, Mail, ArrowLeft, Check } from 'lucide-react';
import { properties } from '../data/properties';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner@2.0.3';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const property = properties.find((p) => p.id === id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [consultData, setConsultData] = useState({
    name: '',
    email: '',
    preferredDate: '',
    message: '',
  });

  if (!property) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Property Not Found</h2>
          <Link to="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        const resp = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: `Inquiry about ${property.title}`,
            message: `Property: ${property.title} (${property.id})\nAgent email: ${property.agentEmail}\n\nMessage:\n${formData.message}`,
          }),
        });
        const json = await resp.json();
        if (resp.ok && json.ok) {
          toast.success(t('contact.success'));
          setFormData({ name: '', email: '', message: '' });
        } else {
          console.error('Email API error', json);
          toast.error('Failed to send message.');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to send message.');
      }
    })();
  };

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

  return (
    <div className="pt-20">
      {/* Back Button */}
      <div className="bg-luxury-gray-light border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/properties" className="inline-flex items-center text-sm text-gray-600 hover:text-luxury-gold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Main Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src={property.images?.[0] || property.exteriorImage || getPropertyImage(property.image)}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </section>

      {/* Property Details */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-luxury-gold text-white text-xs uppercase tracking-wide">
                      {t(`type.${property.type}`)}
                    </span>
                    {property.featured && (
                      <span className="inline-block px-3 py-1 bg-luxury-black text-white text-xs uppercase tracking-wide">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="mb-3">{property.title}</h1>
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span>{property.location}</span>
                  </div>
                  <p className="text-3xl text-luxury-gold">€{property.price.toLocaleString()}</p>
                </div>

                {/* Key Features */}
                <div className="flex flex-wrap gap-8 py-6 border-y border-gray-200 mb-8">
                  <div className="flex items-center space-x-3">
                    <Bed className="w-6 h-6 text-luxury-gold" />
                    <div>
                      <p className="text-sm text-gray-500">{t('properties.bedrooms')}</p>
                      <p className="text-lg">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Bath className="w-6 h-6 text-luxury-gold" />
                    <div>
                      <p className="text-sm text-gray-500">{t('properties.bathrooms')}</p>
                      <p className="text-lg">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Maximize className="w-6 h-6 text-luxury-gold" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="text-lg">{property.sqm} {t('properties.sqm')}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                <div className="mb-8">
                  <h3 className="mb-4">Photo Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded overflow-hidden">
                      <ImageWithFallback src={property.images?.[1] || property.exteriorImage || getPropertyImage(property.image)} alt="Exterior" className="w-full h-40 object-cover" />
                      <p className="text-sm text-gray-600 mt-2">Exterior</p>
                    </div>
                    <div className="rounded overflow-hidden">
                      <ImageWithFallback src={property.images?.[2] || property.kitchenImage || `https://source.unsplash.com/1200x800/?kitchen&sig=${property.id}1`} alt="Kitchen" className="w-full h-40 object-cover" />
                      <p className="text-sm text-gray-600 mt-2">Kitchen</p>
                    </div>
                    <div className="rounded overflow-hidden">
                      <ImageWithFallback src={property.images?.[3] || property.bathroomImage || `https://source.unsplash.com/1200x800/?bathroom&sig=${property.id}2`} alt="Bathroom" className="w-full h-40 object-cover" />
                      <p className="text-sm text-gray-600 mt-2">Bathroom</p>
                    </div>
                  </div>
                </div>

                {/* Installment Options */}
                <div className="mb-8">
                  <h3 className="mb-4">Installment Options</h3>
                  <p className="text-gray-600 mb-3">Installment plans available. Terms and conditions apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(property.installmentOptions || [6,12,24]).map((m) => {
                      const downPayment = Math.round(property.price * 0.2);
                      const monthly = Math.round((property.price - downPayment) / m);
                      return (
                        <div key={m} className="bg-luxury-gray-light p-4 rounded">
                          <div className="text-sm text-gray-500">{m} months</div>
                          <div className="text-xl text-luxury-gold mt-2">€{monthly.toLocaleString()}/mo</div>
                          <div className="text-sm text-gray-600 mt-2">Example down payment: €{downPayment.toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Inquiry Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <div className="bg-luxury-gray-light p-8 rounded-lg">
                  <h3 className="mb-4">Inquire About This Property</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {t('contact.subtitle')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder={t('contact.name')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder={t('contact.email')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder={t('contact.message')}
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-luxury-gold hover:bg-luxury-gold-dark text-white">
                      {t('contact.send')}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <h4 className="mb-3">Book a Consultation</h4>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        (async () => {
                          try {
                            const resp = await fetch('/api/send-email', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                name: consultData.name,
                                email: consultData.email,
                                subject: `Consultation request: ${property.title}`,
                                message: `Preferred date/time: ${consultData.preferredDate}\n\nMessage:\n${consultData.message}`,
                              }),
                            });
                            const json = await resp.json();
                            if (resp.ok && json.ok) {
                              toast.success(t('contact.success'));
                              setConsultData({ name: '', email: '', preferredDate: '', message: '' });
                            } else {
                              toast.error('Failed to send consultation request.');
                            }
                          } catch (err) {
                            console.error(err);
                            toast.error('Failed to send consultation request.');
                          }
                        })();
                      }}
                      className="space-y-3"
                    >
                      <Input placeholder="Full name" value={consultData.name} onChange={(e) => setConsultData({ ...consultData, name: e.target.value })} required />
                      <Input placeholder="Email address" type="email" value={consultData.email} onChange={(e) => setConsultData({ ...consultData, email: e.target.value })} required />
                      <Input placeholder="Preferred date/time" value={consultData.preferredDate} onChange={(e) => setConsultData({ ...consultData, preferredDate: e.target.value })} />
                      <Textarea placeholder="Message (optional)" rows={3} value={consultData.message} onChange={(e) => setConsultData({ ...consultData, message: e.target.value })} />
                      <Button type="submit" className="w-full bg-luxury-gold hover:bg-luxury-gold-dark text-white">Book Consultation</Button>
                    </form>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-luxury-gold" />
                      <span>{property.agentEmail}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
