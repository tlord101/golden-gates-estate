import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AboutPage from './pages/AboutPage';
import InstallmentPlansPage from './pages/InstallmentPlansPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import LocationsPage from './pages/LocationsPage';
import LocationDetailPage from './pages/LocationDetailPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/installments" element={<InstallmentPlansPage />} />
              <Route path="/why-us" element={<WhyChooseUsPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/locations/:slug" element={<LocationDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  );
}