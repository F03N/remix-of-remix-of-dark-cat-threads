import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Upload, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const Customize: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: 'custom-' + Date.now(),
      name: 'هودي مخصص',
      nameEn: 'Custom Hoodie',
      price: 75.00,
      image: '/hoodie-1.jpg',
      size: selectedSize,
    });
  };

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'تخصيص - دارك كات ثريدز' : 'Customize - Dark Cat Threads'}</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />

        <main className="pt-20 md:pt-24">
          <div className="container mx-auto section-padding">
            {/* Page Header */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-widest mb-4">
                {t('customize.title')}
              </h1>
              <p className="text-foreground-secondary text-sm max-w-md mx-auto">
                {language === 'ar'
                  ? 'ارفع تصميمك أو أضف نصك الخاص على هودي فاخر'
                  : 'Upload your design or add your own text to a premium hoodie'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left: Canvas Preview */}
              <div className="relative">
                <div className="aspect-square relative overflow-hidden bg-card">
                  {/* Hoodie Base */}
                  <img
                    src="/hoodie-1.jpg"
                    alt="Base Hoodie"
                    className="w-full h-full object-cover opacity-40"
                  />
                  
                  {/* Print Area Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 border border-dashed border-foreground-secondary/30 flex items-center justify-center relative">
                      {/* Uploaded Image */}
                      {uploadedImage && (
                        <img
                          src={uploadedImage}
                          alt="Custom Design"
                          className="max-w-full max-h-full object-contain transition-transform duration-200"
                          style={{ transform: `scale(${scale})` }}
                        />
                      )}
                      
                      {/* Custom Text */}
                      {customText && !uploadedImage && (
                        <p 
                          className="font-display text-xl md:text-2xl text-foreground text-center px-4 transition-transform duration-200"
                          style={{ transform: `scale(${scale})` }}
                        >
                          {customText}
                        </p>
                      )}

                      {/* Empty State */}
                      {!uploadedImage && !customText && (
                        <span className="text-foreground-tertiary text-xs tracking-wider uppercase">
                          {language === 'ar' ? 'منطقة الطباعة' : 'PRINT AREA'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Zoom Controls */}
                {(uploadedImage || customText) && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      className="w-8 h-8 flex items-center justify-center text-foreground-secondary hover:text-foreground transition-smooth"
                      onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-foreground-tertiary text-xs w-12 text-center">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      className="w-8 h-8 flex items-center justify-center text-foreground-secondary hover:text-foreground transition-smooth"
                      onClick={() => setScale((s) => Math.min(2, s + 0.1))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Controls */}
              <div className="space-y-8">
                {/* Upload Image */}
                <div>
                  <h3 className="text-foreground-secondary text-xs tracking-wider uppercase mb-3">
                    {t('customize.upload')}
                  </h3>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    className="w-full h-14 border border-border text-foreground-secondary hover:border-foreground-secondary hover:text-foreground transition-smooth flex items-center justify-center gap-3 font-display tracking-wider text-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    {uploadedImage 
                      ? (language === 'ar' ? 'تغيير الصورة' : 'CHANGE IMAGE')
                      : (language === 'ar' ? 'رفع صورة' : 'UPLOAD IMAGE')}
                  </button>
                </div>

                {/* Or divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-foreground-tertiary text-xs">
                    {language === 'ar' ? 'أو' : 'OR'}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Add Text */}
                <div>
                  <h3 className="text-foreground-secondary text-xs tracking-wider uppercase mb-3">
                    {t('customize.addText')}
                  </h3>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => {
                      setCustomText(e.target.value);
                      setUploadedImage(null);
                    }}
                    placeholder={language === 'ar' ? 'اكتب نصك هنا...' : 'Type your text here...'}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                  />
                </div>

                {/* Size Selector */}
                <div>
                  <h3 className="text-foreground-secondary text-xs tracking-wider uppercase mb-3">
                    {t('products.selectSize')}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[48px] h-11 px-4 font-display tracking-wider text-sm transition-smooth border",
                          selectedSize === size
                            ? "border-foreground text-foreground"
                            : "border-border text-foreground-secondary hover:border-foreground-secondary"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground-secondary text-sm">
                      {language === 'ar' ? 'السعر' : 'Price'}
                    </span>
                    <span className="text-foreground">
                      75 <span className="text-foreground-secondary text-sm">{t('products.currency')}</span>
                    </span>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  variant="cta"
                  size="xl"
                  className="w-full font-display tracking-widest"
                  onClick={handleAddToCart}
                  disabled={!selectedSize || (!uploadedImage && !customText)}
                >
                  {t('customize.addToCart')}
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Customize;
