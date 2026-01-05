import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground-secondary">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: product.id,
      name: product.name,
      nameEn: product.nameEn,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? product.name : product.nameEn} - Dark Cat Threads</title>
        <meta
          name="description"
          content={language === 'ar' ? product.description : product.descriptionEn}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />

        <main className="pt-20 md:pt-24">
          <div className="container mx-auto section-padding">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link 
                to="/shop" 
                className="text-foreground-secondary hover:text-foreground transition-smooth text-sm tracking-wider"
              >
                ← {t('cart.continue')}
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: Image Gallery - DOMINANT */}
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-card">
                  <img
                    src={product.images[currentImage]}
                    alt={language === 'ar' ? product.name : product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Navigation - Subtle */}
                {product.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/60 flex items-center justify-center text-foreground hover:bg-background/80 transition-smooth"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/60 flex items-center justify-center text-foreground hover:bg-background/80 transition-smooth"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots - Subtle */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-300",
                            idx === currentImage ? "bg-foreground w-4" : "bg-foreground-secondary"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right: Product Info - STRICT HIERARCHY */}
              <div className="flex flex-col lg:pt-8">
                {/* 1. Title - Slightly reduced */}
                <h1 className="font-display text-3xl md:text-4xl tracking-widest text-foreground mb-3">
                  {language === 'ar' ? product.name : product.nameEn}
                </h1>

                {/* 2. Price - Quieter */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-foreground-secondary text-xl">
                    {product.price.toFixed(0)}
                  </span>
                  <span className="text-foreground-tertiary text-sm">
                    {t('products.currency')}
                  </span>
                </div>

                {/* 3. Size Selection - Fashion-style, more spacing */}
                <div className="mb-8">
                  <h3 className="text-foreground-secondary text-xs tracking-wider uppercase mb-4">
                    {t('products.selectSize')}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[52px] h-12 px-4 font-display tracking-wider text-sm transition-smooth border",
                          selectedSize === size
                            ? "border-foreground text-foreground bg-foreground/5"
                            : "border-border text-foreground-secondary hover:border-foreground-secondary"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Primary CTA - Calm strength */}
                <Button
                  variant="cta"
                  size="xl"
                  className="w-full font-display tracking-widest mb-3"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  {t('products.addToCart')}
                </Button>

                {/* 5. Secondary CTA - Lighter, intentional */}
                <Link to="/customize" className="w-full">
                  <Button
                    variant="ctaSecondary"
                    size="xl"
                    className="w-full font-display tracking-widest"
                  >
                    {t('products.customize')}
                  </Button>
                </Link>

                {/* 6. Description - Lower on page, max 2 lines, reduced opacity */}
                <p className="text-foreground-secondary text-sm leading-relaxed mt-10 line-clamp-2">
                  {language === 'ar' ? product.description : product.descriptionEn}
                </p>

                {/* 7. Details - Even lighter */}
                <div className="mt-10 pt-8 border-t border-border space-y-6">
                  <div>
                    <h3 className="text-foreground-tertiary text-xs tracking-wider uppercase mb-2">
                      {t('products.fabric')}
                    </h3>
                    <p className="text-foreground-secondary text-sm">
                      {language === 'ar' ? product.fabric : product.fabricEn}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-foreground-tertiary text-xs tracking-wider uppercase mb-2">
                      {t('products.shipping')}
                    </h3>
                    <p className="text-foreground-secondary text-sm">
                      {language === 'ar' ? 'شحن مجاني داخل الأردن' : 'Free shipping within Jordan'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Product;
