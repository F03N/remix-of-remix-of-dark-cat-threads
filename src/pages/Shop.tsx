import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, ProductCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Shop: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  
  const [sortBy, setSortBy] = useState<'newest' | 'priceLow' | 'priceHigh'>('newest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(categoryParam);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const categories: { key: ProductCategory; labelAr: string; labelEn: string }[] = [
    { key: 'men', labelAr: 'رجالي', labelEn: 'Men' },
    { key: 'women', labelAr: 'نسائي', labelEn: 'Women' },
    { key: 'youth', labelAr: 'شبابي', labelEn: 'Youth' },
  ];

  // Filter by category first
  const categoryFiltered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  // Then filter by size
  const sizeFiltered = selectedSize
    ? categoryFiltered.filter((p) => p.sizes.includes(selectedSize))
    : categoryFiltered;

  // Then sort
  const sortedProducts = [...sizeFiltered].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    return 0;
  });

  const getPageTitle = () => {
    if (selectedCategory) {
      const cat = categories.find(c => c.key === selectedCategory);
      return language === 'ar' ? cat?.labelAr : cat?.labelEn;
    }
    return t('nav.hoodies');
  };

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'الهوديات - دارك كات' : 'Hoodies - Dark Cat'}</title>
        <meta
          name="description"
          content={language === 'ar' ? 'تسوق مجموعتنا الكاملة من الهوديات الفاخرة' : 'Shop our complete collection of premium hoodies'}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />

        <main className="pt-20 md:pt-24">
          {/* Page Header */}
          <div className="container mx-auto py-10 md:py-14">
            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-widest text-center">
              {getPageTitle()}
            </h1>
          </div>

          {/* Filters & Sort Bar */}
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

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-8">
                {/* Category Filter */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "text-xs tracking-wider transition-smooth",
                      selectedCategory === null
                        ? "text-foreground border-b border-foreground"
                        : "text-foreground-secondary hover:text-foreground"
                    )}
                  >
                    {t('products.all')}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={cn(
                        "text-xs tracking-wider transition-smooth",
                        selectedCategory === cat.key
                          ? "text-foreground border-b border-foreground"
                          : "text-foreground-secondary hover:text-foreground"
                      )}
                    >
                      {language === 'ar' ? cat.labelAr : cat.labelEn}
                    </button>
                  ))}
                </div>

                <span className="text-border">|</span>

                {/* Size Filter */}
                <div className="flex items-center gap-3">
                  <span className="text-foreground-tertiary text-xs tracking-wider">
                    {t('products.size')}:
                  </span>
                  <button
                    onClick={() => setSelectedSize(null)}
                    className={cn(
                      "text-xs tracking-wider transition-smooth",
                      selectedSize === null
                        ? "text-foreground"
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
                        "text-xs tracking-wider transition-smooth",
                        selectedSize === size
                          ? "text-foreground"
                          : "text-foreground-secondary hover:text-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
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

          {/* Product Grid */}
          <div className="container mx-auto section-padding pt-0">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-foreground-secondary">
                  {language === 'ar' ? 'لا توجد منتجات' : 'No products found'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                {sortedProducts.map((product, index) => (
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

        {/* Mobile Filter Modal */}
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

            <div className="space-y-8 flex-1 overflow-auto">
              {/* Category */}
              <div>
                <h3 className="text-foreground-tertiary text-xs tracking-wider uppercase mb-4">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "px-4 py-3 text-sm tracking-wider transition-smooth border",
                      selectedCategory === null
                        ? "border-foreground text-foreground"
                        : "border-border text-foreground-secondary"
                    )}
                  >
                    {t('products.all')}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={cn(
                        "px-4 py-3 text-sm tracking-wider transition-smooth border",
                        selectedCategory === cat.key
                          ? "border-foreground text-foreground"
                          : "border-border text-foreground-secondary"
                      )}
                    >
                      {language === 'ar' ? cat.labelAr : cat.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-foreground-tertiary text-xs tracking-wider uppercase mb-4">
                  {t('products.size')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedSize(null)}
                    className={cn(
                      "px-4 py-3 text-sm tracking-wider transition-smooth border",
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
                        "px-4 py-3 text-sm tracking-wider transition-smooth border",
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

            <div className="mt-auto pt-6">
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
