import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Upload, Type, Move, ZoomIn, ZoomOut } from 'lucide-react';

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

        <main className="pt-24 md:pt-32">
          <div className="container mx-auto section-padding">
            {/* Page Header */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground tracking-wider text-center mb-8">
              {t('customize.title')}
            </h1>
            <p className="text-foreground-secondary text-center text-lg mb-16 max-w-xl mx-auto">
              {language === 'ar'
                ? 'ارفع تصميمك أو أضف نصك الخاص على هودي فاخر'
                : 'Upload your design or add your own text to a premium hoodie'}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Canvas Preview */}
              <div className="bg-card border border-border p-8 relative">
                <div className="aspect-square relative overflow-hidden bg-background flex items-center justify-center">
                  {/* Hoodie Base */}
                  <img
                    src="/hoodie-1.jpg"
                    alt="Base Hoodie"
                    className="w-full h-full object-cover absolute inset-0 opacity-50"
                  />
                  
                  {/* Print Area Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 border-2 border-dashed border-cta/50 flex items-center justify-center relative">
                      {/* Uploaded Image */}
                      {uploadedImage && (
                        <img
                          src={uploadedImage}
                          alt="Custom Design"
                          className="max-w-full max-h-full object-contain"
                          style={{ transform: `scale(${scale})` }}
                        />
                      )}
                      
                      {/* Custom Text */}
                      {customText && !uploadedImage && (
                        <p 
                          className="font-display text-2xl md:text-4xl text-foreground text-center px-4"
                          style={{ transform: `scale(${scale})` }}
                        >
                          {customText}
                        </p>
                      )}

                      {/* Empty State */}
                      {!uploadedImage && !customText && (
                        <p className="text-foreground-secondary text-sm editorial-caps">
                          {language === 'ar' ? 'منطقة الطباعة' : 'PRINT AREA'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Zoom Controls */}
                {(uploadedImage || customText) && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-foreground-secondary text-sm w-16 text-center">
                      {Math.round(scale * 100)}%
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setScale((s) => Math.min(2, s + 0.1))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Right: Controls */}
              <div className="space-y-8">
                {/* Upload Image */}
                <div>
                  <h3 className="editorial-caps text-foreground-secondary mb-4">{t('customize.upload')}</h3>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    className="w-full h-16 font-display tracking-wider gap-3 border-border text-foreground hover:border-cta"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-5 h-5" />
                    {uploadedImage 
                      ? (language === 'ar' ? 'تغيير الصورة' : 'CHANGE IMAGE')
                      : (language === 'ar' ? 'رفع صورة' : 'UPLOAD IMAGE')}
                  </Button>
                </div>

                {/* Or divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-foreground-secondary text-sm">
                    {language === 'ar' ? 'أو' : 'OR'}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Add Text */}
                <div>
                  <h3 className="editorial-caps text-foreground-secondary mb-4">{t('customize.addText')}</h3>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => {
                        setCustomText(e.target.value);
                        setUploadedImage(null);
                      }}
                      placeholder={language === 'ar' ? 'اكتب نصك هنا...' : 'Type your text here...'}
                      className="w-full bg-background border border-border pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-cta transition-smooth"
                    />
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <h3 className="editorial-caps text-foreground-secondary mb-4">{t('products.selectSize')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'cta' : 'outline'}
                        className="min-w-[60px] font-display tracking-wider"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="bg-section border border-border p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground-secondary">
                      {language === 'ar' ? 'السعر' : 'Price'}
                    </span>
                    <span className="font-display text-3xl text-foreground">
                      75.00 <span className="text-foreground-secondary text-lg">{t('products.currency')}</span>
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
