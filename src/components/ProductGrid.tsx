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
        {/* Section Header - Editorial */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-5xl md:text-7xl text-foreground tracking-wider">
            {t('products.title')}
          </h2>
        </div>

        {/* Product Grid - Large Cards, Editorial Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {products.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16 md:mt-24">
          <Link to="/shop">
            <Button variant="outline" size="xl" className="font-display tracking-widest border-foreground-secondary text-foreground-secondary hover:border-cta hover:text-cta">
              VIEW ALL
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
