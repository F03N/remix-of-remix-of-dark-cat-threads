import React from 'react';
import ProductCard from './ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProductGrid: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="products" className="bg-background section-padding">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-widest">
            {t('products.title')}
          </h2>
        </div>

        {/* Product Grid - Clean, equal card sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {products.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-14 md:mt-20">
          <Link to="/shop">
            <Button 
              variant="ctaSecondary" 
              size="lg" 
              className="font-display tracking-widest"
            >
              {t('nav.hoodies')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
