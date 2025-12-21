import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageImage } from '../config/imageUrls';

export default function InstallmentPlansPage() {
  const { t } = useLanguage();
  const [price, setPrice] = useState(250000);

  useEffect(() => {
    document.title = 'Installment Plans - Golden States Estates';
  }, []);

  const downPayment = Math.round(price * 0.2);
  const plans = [6, 12, 24];

  return (
    <div className="pt-20">
      <section className="relative h-64 md:h-96 overflow-hidden">
        <ImageWithFallback
          src={getPageImage('installments-real-estate')}
          alt="Installment Plans Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/70 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Flexible Installment Plans</h1>
            <p className="mt-3 text-lg text-gray-200 max-w-xl">Choose plans that work for you — short-term or longer options with transparent examples and clear next steps to book a consultation.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((m) => (
              <div key={m} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-luxury-gold text-white rounded"><Check className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-lg font-semibold">{m} months</h4>
                    <p className="text-sm text-gray-500">Example monthly plan</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">Estimated monthly</div>
                  <div className="text-2xl text-luxury-gold">€{Math.round((price - downPayment) / m).toLocaleString()}/mo</div>
                  <div className="text-sm text-gray-600 mt-2">Down payment: €{downPayment.toLocaleString()}</div>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <a href="/contact" className="inline-block bg-luxury-gold px-4 py-2 text-white rounded">Book a Consultation</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="mb-3">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-luxury-gray-light rounded">
                <h4 className="font-semibold">1. Choose a Property</h4>
                <p className="text-sm text-gray-600 mt-2">Browse worldwide listings and pick a property that matches your goals.</p>
              </div>
              <div className="p-4 bg-luxury-gray-light rounded">
                <h4 className="font-semibold">2. Select a Plan</h4>
                <p className="text-sm text-gray-600 mt-2">We offer short and medium-term installment options with transparent terms.</p>
              </div>
              <div className="p-4 bg-luxury-gray-light rounded">
                <h4 className="font-semibold">3. Book Consultation</h4>
                <p className="text-sm text-gray-600 mt-2">Our team will advise on exact terms and next steps via email.</p>
              </div>
            </div>
          </div>

          <div className="bg-luxury-gray-light p-6 rounded flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2">
              <label htmlFor="priceRange" className="block text-sm text-gray-700">Example price (adjust to estimate)</label>
              <input id="priceRange" type="range" min={20000} max={2000000} step={1000} value={price} onChange={(e) => setPrice(Number((e.target as HTMLInputElement).value))} className="w-full mt-2" />
            </div>
            <div className="w-full md:w-1/2 text-sm text-gray-700">
              <div>Selected price: <strong>€{price.toLocaleString()}</strong></div>
              <div className="mt-2">Example down payment (20%): <strong>€{downPayment.toLocaleString()}</strong></div>
            </div>
          </div>

          <p className="text-sm text-gray-500 italic mt-6">Installment plans are illustrative. Final terms depend on property, location and verification.</p>
        </div>
      </section>
    </div>
  );
}
