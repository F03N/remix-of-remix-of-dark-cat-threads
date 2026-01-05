import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
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
    return b.isNew ? 1 : -1;
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

        <main className="pt-24 md:pt-32">
          {/* Page Header */}
          <div className="container mx-auto mb-12 md:mb-20">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground tracking-wider text-center">
              {t('nav.shop')}
            </h1>
          </div>

          {/* Filters & Sort Bar */}
          <div className="container mx-auto mb-8 md:mb-12">
            <div className="flex items-center justify-between gap-4">
              {/* Filter Button - Mobile */}
              <Button
                variant="outline"
                className="md:hidden gap-2 border-border text-foreground"
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t('products.filter')}
              </Button>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-4">
                <span className="text-foreground-secondary editorial-caps">{t('products.size')}:</span>
                <div className="flex gap-2">
                  <Button
                    variant={selectedSize === null ? 'cta' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSize(null)}
                    className="font-display tracking-wider"
                  >
                    {t('products.all')}
                  </Button>
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'cta' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="font-display tracking-wider"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-foreground-secondary editorial-caps hidden md:block">{t('products.sort')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-card border border-border text-foreground px-4 py-2 text-sm focus:outline-none focus:border-cta"
                >
                  <option value="newest">{t('products.newest')}</option>
                  <option value="priceLow">{t('products.priceLow')}</option>
                  <option value="priceHigh">{t('products.priceHigh')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="container mx-auto section-padding pt-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-foreground-secondary text-lg">Nothing here yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />

        {/* Mobile Filter Modal */}
        <div
          className={cn(
            "fixed inset-0 bg-background z-[70] transition-transform duration-300 md:hidden",
            filterOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl tracking-wider">{t('products.filter')}</h2>
              <Button variant="headerGhost" size="icon" onClick={() => setFilterOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-foreground-secondary editorial-caps mb-4">{t('products.size')}</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={selectedSize === null ? 'cta' : 'outline'}
                    onClick={() => setSelectedSize(null)}
                    className="font-display tracking-wider h-14"
                  >
                    {t('products.all')}
                  </Button>
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'cta' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className="font-display tracking-wider h-14"
                    >
                      {size}
                    </Button>
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
                APPLY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
