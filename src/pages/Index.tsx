import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureStrip from '@/components/FeatureStrip';
import CategorySection from '@/components/CategorySection';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index: React.FC = () => {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'دارك كات - ستريت وير فاخر' : 'Dark Cat - Premium Streetwear'}</title>
        <meta
          name="description"
          content={
            language === 'ar'
              ? 'ستريت وير فاخر من الأردن. هوديات حصرية بجودة عالية.'
              : 'Premium streetwear from Jordan. Exclusive hoodies with high quality.'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://darkcatthreads.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <main>
          <Hero />
          <FeatureStrip />
          <CategorySection />
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
