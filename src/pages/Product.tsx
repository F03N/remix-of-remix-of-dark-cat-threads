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
  const { t, language, direction } = useLanguage();
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

        <main className="pt-24 md:pt-32">
          <div className="container mx-auto section-padding pt-8">
            {/* Breadcrumb */}
            <div className="mb-8 md:mb-12">
              <Link to="/shop" className="text-foreground-secondary hover:text-cta transition-smooth editorial-caps">
                ← {t('cart.continue')}
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Image Gallery */}
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-card">
                  <img
                    src={product.images[currentImage]}
                    alt={language === 'ar' ? product.name : product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            idx === currentImage ? "bg-cta w-6" : "bg-foreground-secondary"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="flex flex-col">
                {/* Product Name */}
                <h1 className="font-display text-4xl md:text-6xl tracking-wider text-foreground mb-4">
                  {language === 'ar' ? product.name : product.nameEn}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-display text-3xl md:text-4xl text-foreground">
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-foreground-secondary">{t('products.currency')}</span>
                </div>

                {/* Description */}
                <p className="text-foreground-secondary text-lg leading-relaxed mb-8">
                  {language === 'ar' ? product.description : product.descriptionEn}
                </p>

                {/* Size Selector */}
                <div className="mb-8">
                  <h3 className="editorial-caps text-foreground-secondary mb-4">{t('products.selectSize')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'cta' : 'outline'}
                        className={cn(
                          "min-w-[60px] font-display tracking-wider",
                          selectedSize !== size && "border-border text-foreground hover:border-foreground"
                        )}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  variant="cta"
                  size="xl"
                  className="w-full font-display tracking-widest mb-4"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  {t('products.addToCart')}
                </Button>

                <Link to="/customize">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full font-display tracking-widest border-foreground-secondary text-foreground-secondary hover:border-cta hover:text-cta"
                  >
                    {t('products.customize')}
                  </Button>
                </Link>

                {/* Product Details */}
                <div className="mt-12 pt-8 border-t border-border space-y-6">
                  <div>
                    <h3 className="editorial-caps text-foreground-secondary mb-2">{t('products.details')}</h3>
                    <p className="text-foreground">
                      {language === 'ar' ? product.description : product.descriptionEn}
                    </p>
                  </div>
                  <div>
                    <h3 className="editorial-caps text-foreground-secondary mb-2">{t('products.fabric')}</h3>
                    <p className="text-foreground">
                      {language === 'ar' ? product.fabric : product.fabricEn}
                    </p>
                  </div>
                  <div>
                    <h3 className="editorial-caps text-foreground-secondary mb-2">{t('products.shipping')}</h3>
                    <p className="text-foreground">
                      {language === 'ar' ? 'شحن مجاني داخل الأردن - 3-5 أيام عمل' : 'Free shipping within Jordan - 3-5 business days'}
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
