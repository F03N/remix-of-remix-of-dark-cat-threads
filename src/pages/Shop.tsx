import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Shop: React.FC = () => {
  const { t, language } = useLanguage();
  const [sortBy, setSortBy] = useState<'newest' | 'priceLow' | 'priceHigh'>('newest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    // For newest, prioritize isNew items first
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    return 0;
  });

  const filteredProducts = selectedSize
    ? sortedProducts.filter((p) => p.sizes.includes(selectedSize))
    : sortedProducts;

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'تسوق - دارك كات ثريدز' : 'Shop - Dark Cat Threads'}</title>
        <meta
          name="description"
          content={language === 'ar' ? 'تسوق مجموعتنا الكاملة من الهوديات الفاخرة' : 'Shop our complete collection of premium hoodies'}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />

        <main className="pt-20 md:pt-24">
          {/* Page Header - Reduced from 9xl */}
          <div className="container mx-auto py-12 md:py-16">
            <h1 className="font-display text-5xl md:text-6xl text-foreground tracking-widest text-center">
              {t('nav.shop')}
            </h1>
          </div>

          {/* Filters & Sort Bar - Minimal */}
          <div className="container mx-auto mb-8">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              {/* Filter Button - Mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-foreground-secondary"
                onClick={() => setFilterOpen(true)}
              >
                {t('products.filter')}
              </Button>

              {/* Desktop Filters - Horizontal, no sidebars */}
              <div className="hidden md:flex items-center gap-6">
                <span className="text-foreground-secondary text-xs tracking-wider uppercase">
                  {t('products.size')}:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedSize(null)}
                    className={cn(
                      "px-3 py-1.5 text-xs tracking-wider font-display transition-smooth",
                      selectedSize === null
                        ? "text-foreground border-b border-foreground"
                        : "text-foreground-secondary hover:text-foreground"
                    )}
                  >
                    {t('products.all')}
                  </button>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-3 py-1.5 text-xs tracking-wider font-display transition-smooth",
                        selectedSize === size
                          ? "text-foreground border-b border-foreground"
                          : "text-foreground-secondary hover:text-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-transparent border-none text-foreground-secondary text-xs tracking-wider focus:outline-none cursor-pointer"
                >
                  <option value="newest">{t('products.newest')}</option>
                  <option value="priceLow">{t('products.priceLow')}</option>
                  <option value="priceHigh">{t('products.priceHigh')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid - 3-column, editorial spacing */}
          <div className="container mx-auto section-padding pt-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-foreground-secondary">Nothing here yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.06}s` }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />

        {/* Mobile Filter Modal - Clean */}
        <div
          className={cn(
            "fixed inset-0 bg-background z-[70] transition-transform duration-300 md:hidden",
            filterOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-xl tracking-widest">{t('products.filter')}</h2>
              <Button variant="headerGhost" size="icon" onClick={() => setFilterOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-foreground-secondary text-xs tracking-wider uppercase mb-4">
                  {t('products.size')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedSize(null)}
                    className={cn(
                      "px-4 py-3 text-sm font-display tracking-wider transition-smooth border",
                      selectedSize === null
                        ? "border-foreground text-foreground"
                        : "border-border text-foreground-secondary"
                    )}
                  >
                    {t('products.all')}
                  </button>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-3 text-sm font-display tracking-wider transition-smooth border",
                        selectedSize === size
                          ? "border-foreground text-foreground"
                          : "border-border text-foreground-secondary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Button
                variant="cta"
                size="xl"
                className="w-full font-display tracking-widest"
                onClick={() => setFilterOpen(false)}
              >
                {language === 'ar' ? 'تطبيق' : 'APPLY'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
