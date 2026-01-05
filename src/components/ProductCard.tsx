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
      {/* Card must never feel like a hero */}
      <div className="relative">
        {/* Image Container - Max 70vh on mobile */}
        <div className="relative aspect-[3/4] max-h-[70vh] overflow-hidden bg-card">
          <img
            src={image}
            alt={language === 'ar' ? name : nameEn}
            className="w-full h-full object-cover img-zoom"
            loading="lazy"
          />
          
          {/* New Badge - Very minimal */}
          {isNew && (
            <div className="absolute top-4 start-4 bg-cta text-cta-foreground px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase">
              {language === 'ar' ? 'جديد' : 'NEW'}
            </div>
          )}

          {/* Desktop Hover - Very subtle, no drama */}
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center">
            <span className="font-display text-sm tracking-widest text-foreground">
              {t('products.viewProduct')}
            </span>
          </div>
        </div>

        {/* Content - Clear separation, text BELOW image */}
        <div className="pt-5 space-y-1.5">
          {/* Name - Bold but reduced */}
          <h3 className="font-display text-base tracking-wider text-foreground">
            {language === 'ar' ? name : nameEn}
          </h3>
          
          {/* Price - Muted and secondary */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-foreground-secondary text-sm">
              {price.toFixed(0)}
            </span>
            <span className="text-foreground-tertiary text-xs">
              {t('products.currency')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
