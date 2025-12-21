import { useEffect } from 'react';
import { Globe, Star, ShieldCheck, Users } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageImage } from '../config/imageUrls';

export default function WhyChooseUsPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = 'Why Choose Us - Golden States Estates';
  }, []);

  const cards = [
    { title: 'Global Access', icon: <Globe className="w-6 h-6 text-luxury-gold" />, desc: 'Curated properties across Europe, Africa, Asia and the Americas.' , img: getPageImage('why-choose-global')},
    { title: 'Flexible Payments', icon: <Star className="w-6 h-6 text-luxury-gold" />, desc: 'Transparent installment plans with clear examples and support.', img: getPageImage('why-choose-payment') },
    { title: 'Trusted Support', icon: <Users className="w-6 h-6 text-luxury-gold" />, desc: 'Email-first, professional assistance from property selection to closing.', img: getPageImage('why-choose-support') },
    { title: 'Secure Transactions', icon: <ShieldCheck className="w-6 h-6 text-luxury-gold" />, desc: 'We follow transparent processes and vetted partners for safe transactions.', img: getPageImage('why-choose-secure') },
  ];

  return (
    <div className="pt-20">
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h1 className="mb-4">Why Choose Golden States Estates</h1>
              <p className="text-gray-700 mb-6">We connect buyers to a world of properties and empower ownership with flexible payment solutions and transparent guidance — all managed via email for clarity and records.</p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="mt-1"><Star className="w-5 h-5 text-luxury-gold" /></div>
                  <div>
                    <strong>Handpicked properties:</strong> Each listing is carefully selected for value and quality.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1"><ShieldCheck className="w-5 h-5 text-luxury-gold" /></div>
                  <div>
                    <strong>Clear terms:</strong> Installments and pricing are always transparent.
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ImageWithFallback src={getPageImage('why-choose-global')} alt="Global properties" className="w-full h-64 object-cover rounded-lg shadow-md" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((c) => (
              <div key={c.title} className="flex bg-luxury-gray-light rounded overflow-hidden">
                <div className="w-1/3">
                  <ImageWithFallback src={c.img} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 w-2/3">
                  <div className="flex items-center space-x-3 mb-2">
                    {c.icon}
                    <h4 className="font-semibold">{c.title}</h4>
                  </div>
                  <p className="text-gray-700">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
