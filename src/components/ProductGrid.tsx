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
        {/* Section Header - Editorial, not loud */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-widest">
            {t('products.title')}
          </h2>
        </div>

        {/* Product Grid - 3-column desktop, editorial spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
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

        {/* View All - Subtle secondary action */}
        <div className="text-center mt-16 md:mt-20">
          <Link to="/shop">
            <Button 
              variant="ctaSecondary" 
              size="lg" 
              className="font-display tracking-widest"
            >
              {t('products.viewAll') || 'VIEW ALL'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
