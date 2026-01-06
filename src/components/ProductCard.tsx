import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  sizes: string[];
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  nameEn,
  price,
  image,
  sizes,
  isNew,
}) => {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const displayName = language === 'ar' ? name : nameEn;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name,
      nameEn,
      price,
      image,
      size: sizes[0],
    });
  };

  return (
    <Link 
      to={`/product/${id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] max-h-[70vh] overflow-hidden bg-card mb-4">
        <img
          src={image}
          alt={displayName}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-3 start-3 bg-cta text-cta-foreground px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase">
            {language === 'ar' ? 'جديد' : 'NEW'}
          </div>
        )}
        
        {/* Hover Actions - Desktop only */}
        <div className={cn(
          "absolute inset-0 bg-background/30 flex flex-col items-center justify-end pb-6 gap-3 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0",
          "hidden md:flex"
        )}>
          <span className="font-display text-sm tracking-widest text-foreground">
            {t('products.viewProduct')}
          </span>
          <button
            onClick={handleQuickAdd}
            className="bg-transparent border border-foreground/50 text-foreground px-5 py-2 text-xs tracking-wider transition-smooth hover:bg-foreground hover:text-background"
          >
            {t('products.addToCart')}
          </button>
        </div>
      </div>

      {/* Product Info - Below image */}
      <div className="space-y-1.5">
        <h3 className="font-display text-base tracking-wider text-foreground">
          {displayName}
        </h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-foreground-secondary text-sm">
            {price.toFixed(0)}
          </span>
          <span className="text-foreground-tertiary text-xs">
            {t('products.currency')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
