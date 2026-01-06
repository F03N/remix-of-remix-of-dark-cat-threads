import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getRelatedProducts } from '@/data/products';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, direction } = useLanguage();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const product = getProductById(id || '');
  const relatedProducts = getRelatedProducts(id || '', 3);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground-secondary">{language === 'ar' ? 'المنتج غير موجود' : 'Product not found'}</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        nameEn: product.nameEn,
        price: product.price,
        image: product.image,
        size: selectedSize,
      });
    }
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
        <title>{language === 'ar' ? product.name : product.nameEn} - Dark Cat</title>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
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
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/70 flex items-center justify-center text-foreground transition-smooth hover:bg-background"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/70 flex items-center justify-center text-foreground transition-smooth hover:bg-background"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots */}
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

              {/* Right: Product Info */}
              <div className="flex flex-col">
                {/* Title */}
                <h1 className="font-display text-3xl md:text-4xl tracking-widest text-foreground mb-2">
                  {language === 'ar' ? product.name : product.nameEn}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-foreground text-xl font-medium">
                    {product.price.toFixed(0)}
                  </span>
                  <span className="text-foreground-secondary text-sm">
                    {t('products.currency')}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-foreground-secondary text-sm leading-relaxed mb-8">
                  {language === 'ar' ? product.description : product.descriptionEn}
                </p>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-foreground-secondary text-xs tracking-wider uppercase mb-3">
                    {t('products.selectSize')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[48px] h-12 px-4 font-display tracking-wider text-sm transition-smooth border",
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

                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-foreground-secondary text-xs tracking-wider uppercase mb-3">
                    {t('products.selectQuantity')}
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-border flex items-center justify-center text-foreground-secondary hover:border-foreground-secondary transition-smooth"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-foreground w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-border flex items-center justify-center text-foreground-secondary hover:border-foreground-secondary transition-smooth"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 mb-10">
                  <Button
                    variant="cta"
                    size="xl"
                    className="w-full font-display tracking-widest"
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                  >
                    {t('products.addToCart')}
                  </Button>
                  <Button
                    variant="ctaSecondary"
                    size="xl"
                    className="w-full font-display tracking-widest"
                    disabled={!selectedSize}
                  >
                    {t('products.buyNow')}
                  </Button>
                </div>

                {/* Accordion Details */}
                <Accordion type="single" collapsible className="border-t border-border">
                  <AccordionItem value="description" className="border-b border-border">
                    <AccordionTrigger className="text-foreground-secondary text-sm tracking-wider py-4">
                      {t('products.details')}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground-secondary text-sm pb-4">
                      {language === 'ar' ? product.description : product.descriptionEn}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="fabric" className="border-b border-border">
                    <AccordionTrigger className="text-foreground-secondary text-sm tracking-wider py-4">
                      {t('products.fabric')}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground-secondary text-sm pb-4">
                      {language === 'ar' ? product.fabric : product.fabricEn}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="care" className="border-b border-border">
                    <AccordionTrigger className="text-foreground-secondary text-sm tracking-wider py-4">
                      {t('products.care')}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground-secondary text-sm pb-4">
                      {language === 'ar' ? product.care : product.careEn}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping" className="border-b border-border">
                    <AccordionTrigger className="text-foreground-secondary text-sm tracking-wider py-4">
                      {t('products.shipping')}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground-secondary text-sm pb-4">
                      {language === 'ar' ? 'شحن مجاني داخل الأردن - التوصيل خلال 2-4 أيام عمل' : 'Free shipping within Jordan - Delivery within 2-4 business days'}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-20 md:mt-28">
                <h2 className="font-display text-2xl md:text-3xl text-foreground tracking-widest text-center mb-10 md:mb-14">
                  {t('products.related')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 md:hidden z-50">
          <Button
            variant="cta"
            size="xl"
            className="w-full font-display tracking-widest"
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            {t('products.addToCart')} - {product.price.toFixed(0)} {t('products.currency')}
          </Button>
        </div>

        <div className="pb-20 md:pb-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Product;
