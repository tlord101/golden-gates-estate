import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';

const testimonialsSeed = [
  { id: 1, name: 'A. Johnson', location: 'New York, USA', quote: 'Fantastic service and transparent pricing. Highly recommended.', photo: 'https://source.unsplash.com/200x200/?person+business&sig=7001' },
  { id: 2, name: 'M. García', location: 'Madrid, Spain', quote: 'Helpful team and flexible payment options made the process easy.', photo: 'https://source.unsplash.com/200x200/?person+smile&sig=7002' },
  { id: 3, name: 'L. Okafor', location: 'Lagos, Nigeria', quote: 'Professional and responsive — great global reach.', photo: 'https://source.unsplash.com/200x200/?person+portrait&sig=7003' },
];

export default function TestimonialsPage() {
  useEffect(() => {
    document.title = 'Testimonials - Golden States Estates';
  }, []);

  const [testimonials, setTestimonials] = useState(testimonialsSeed);
  const [form, setForm] = useState({ name: '', location: '', email: '', rating: 5, quote: '' });

  const submitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Testimonial submission from ${form.name}`,
          message: `Location: ${form.location}\nRating: ${form.rating}\n\n${form.quote}`,
        }),
      });
      const json = await resp.json();
      if (resp.ok && json.ok) {
        toast.success('Thank you — your testimonial has been received.');
        setTestimonials([{ id: Date.now(), name: form.name, location: form.location, quote: form.quote, photo: `https://source.unsplash.com/200x200/?person&sig=${Date.now()}` }, ...testimonials]);
        setForm({ name: '', location: '', email: '', rating: 5, quote: '' });
      } else {
        toast.error('Failed to submit testimonial.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit testimonial.');
    }
  };

  return (
    <div className="pt-20">
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="mb-4">Client Testimonials</h1>
            <p className="text-gray-600">Real feedback from customers worldwide who used our services to find and finance properties.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {testimonials.map((t) => (
              <div key={t.id} className="p-6 bg-luxury-gray-light rounded">
                <div className="flex items-center space-x-4 mb-4">
                  <ImageWithFallback src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.location}</div>
                  </div>
                </div>
                <div className="mb-4 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-luxury-gold text-luxury-gold' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-800 italic">“{t.quote}”</p>
              </div>
            ))}
          </div>

          <div className="bg-luxury-gray-light p-6 rounded">
            <h3 className="mb-4">Share your experience</h3>
            <form onSubmit={submitTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full name" value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} required />
              <Input placeholder="Location (City, Country)" value={form.location} onChange={(e: any) => setForm({ ...form, location: e.target.value })} required />
              <Input placeholder="Email (for confirmation)" type="email" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} required />
              <div>
                <label htmlFor="ratingSelect" className="text-sm">Rating</label>
                <select id="ratingSelect" aria-label="Rating" className="w-full mt-2 p-2 rounded" value={form.rating} onChange={(e: any) => setForm({ ...form, rating: Number(e.target.value) })}>
                  {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} stars</option>)}
                </select>
              </div>
              <Textarea placeholder="Your testimonial" rows={4} value={form.quote} onChange={(e: any) => setForm({ ...form, quote: e.target.value })} required />
              <div className="md:col-span-2 text-right">
                <Button type="submit" className="bg-luxury-gold text-white">Submit Testimonial</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
