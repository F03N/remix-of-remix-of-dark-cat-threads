import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  nameEn,
  price,
  image,
  isNew,
}) => {
  const { t, language } = useLanguage();

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="relative bg-card overflow-hidden">
        {/* Image Container - Dominant */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={language === 'ar' ? name : nameEn}
            className="w-full h-full object-cover img-zoom"
            loading="lazy"
          />
          
          {/* New Badge - Minimal */}
          {isNew && (
            <div className="absolute top-4 start-4 bg-cta text-cta-foreground px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
              {language === 'ar' ? 'جديد' : 'NEW'}
            </div>
          )}

          {/* Desktop Hover Overlay */}
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center backdrop-blur-[2px]">
            <span className="font-display text-xl tracking-widest text-foreground">
              {t('products.viewProduct')}
            </span>
          </div>

          {/* Subtle bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </div>

        {/* Minimal Content */}
        <div className="p-5 space-y-2">
          <h3 className="font-display text-lg tracking-wider text-foreground uppercase">
            {language === 'ar' ? name : nameEn}
          </h3>
          
          <div className="flex items-baseline gap-2">
            <span className="text-foreground font-bold text-xl">
              {price.toFixed(2)}
            </span>
            <span className="text-foreground-secondary text-sm">
              {t('products.currency')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
