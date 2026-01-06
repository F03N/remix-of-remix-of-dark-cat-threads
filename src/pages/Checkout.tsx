import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const Checkout: React.FC = () => {
  const { t, language } = useLanguage();
  const { items, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { num: 1, label: t('checkout.step1') },
    { num: 2, label: t('checkout.step2') },
    { num: 3, label: t('checkout.step3') },
  ];

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'إتمام الشراء - دارك كات' : 'Checkout - Dark Cat'}</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />

        <main className="pt-20 md:pt-24">
          <div className="container mx-auto section-padding">
            {/* Page Header */}
            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-widest text-center mb-10">
              {t('checkout.title')}
            </h1>

            {/* Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {steps.map((step, index) => (
                <React.Fragment key={step.num}>
                  <button
                    onClick={() => setCurrentStep(step.num)}
                    className={cn(
                      "flex items-center gap-2 transition-smooth",
                      currentStep >= step.num ? "text-foreground" : "text-foreground-tertiary"
                    )}
                  >
                    <span className={cn(
                      "w-8 h-8 flex items-center justify-center border text-sm",
                      currentStep > step.num 
                        ? "bg-cta border-cta text-cta-foreground" 
                        : currentStep === step.num 
                          ? "border-foreground" 
                          : "border-border"
                    )}>
                      {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                    </span>
                    <span className="text-sm tracking-wider hidden md:inline">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-12 md:w-20 h-px",
                      currentStep > step.num ? "bg-cta" : "bg-border"
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Form */}
              <div>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-foreground text-lg font-display tracking-wider mb-6">
                      {t('checkout.step1')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={t('checkout.firstName')}
                        className="w-full bg-transparent border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                      />
                      <input
                        type="text"
                        placeholder={t('checkout.lastName')}
                        className="w-full bg-transparent border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder={t('checkout.email')}
                      className="w-full bg-transparent border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                    />
                    <input
                      type="tel"
                      placeholder={t('checkout.phone')}
                      className="w-full bg-transparent border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                    />
                    <Button
                      variant="cta"
                      size="xl"
                      className="w-full font-display tracking-widest mt-4"
                      onClick={() => setCurrentStep(2)}
                    >
                      {language === 'ar' ? 'التالي' : 'CONTINUE'}
                    </Button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-foreground text-lg font-display tracking-wider mb-6">
                      {t('checkout.step2')}
                    </h2>
                    <input
                      type="text"
                      placeholder={t('checkout.address')}
                      className="w-full bg-transparent border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                    />
                    <input
                      type="text"
                      placeholder={t('checkout.city')}
                      className="w-full bg-transparent border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                    />
                    <select className="w-full bg-transparent border border-border px-4 py-3.5 text-foreground-secondary text-sm focus:outline-none focus:border-foreground-secondary transition-smooth">
                      <option value="amman">{language === 'ar' ? 'عمان' : 'Amman'}</option>
                      <option value="irbid">{language === 'ar' ? 'إربد' : 'Irbid'}</option>
                      <option value="zarqa">{language === 'ar' ? 'الزرقاء' : 'Zarqa'}</option>
                      <option value="aqaba">{language === 'ar' ? 'العقبة' : 'Aqaba'}</option>
                    </select>
                    <Button
                      variant="cta"
                      size="xl"
                      className="w-full font-display tracking-widest mt-4"
                      onClick={() => setCurrentStep(3)}
                    >
                      {language === 'ar' ? 'التالي' : 'CONTINUE'}
                    </Button>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-foreground text-lg font-display tracking-wider mb-6">
                      {t('checkout.step3')}
                    </h2>
                    <div className="border border-border p-4">
                      <p className="text-foreground-secondary text-sm">
                        {language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                      </p>
                    </div>
                    <Button
                      variant="cta"
                      size="xl"
                      className="w-full font-display tracking-widest mt-4"
                    >
                      {t('checkout.placeOrder')}
                    </Button>
                    <p className="text-center text-foreground-tertiary text-xs mt-4">
                      {language === 'ar' 
                        ? 'هذه واجهة عرض فقط'
                        : 'This is a UI demo only'}
                    </p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:order-last order-first">
                <div className="bg-card p-6 border border-border">
                  <h3 className="font-display text-lg tracking-wider mb-6">
                    {language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
                  </h3>
                  
                  {items.length === 0 ? (
                    <p className="text-foreground-secondary text-sm">
                      {language === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}
                    </p>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {items.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex gap-4">
                            <img
                              src={item.image}
                              alt={language === 'ar' ? item.name : item.nameEn}
                              className="w-16 h-20 object-cover bg-background"
                            />
                            <div className="flex-1">
                              <p className="text-foreground text-sm">
                                {language === 'ar' ? item.name : item.nameEn}
                              </p>
                              <p className="text-foreground-tertiary text-xs mt-1">
                                {t('products.size')}: {item.size} × {item.quantity}
                              </p>
                              <p className="text-foreground-secondary text-sm mt-1">
                                {(item.price * item.quantity).toFixed(0)} {t('products.currency')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-border pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground-secondary">{t('cart.subtotal')}</span>
                          <span className="text-foreground">{cartTotal.toFixed(0)} {t('products.currency')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground-secondary">{t('products.shipping')}</span>
                          <span className="text-foreground">{language === 'ar' ? 'مجاني' : 'Free'}</span>
                        </div>
                        <div className="flex justify-between font-display text-lg tracking-wider pt-2 border-t border-border mt-2">
                          <span>{language === 'ar' ? 'المجموع' : 'Total'}</span>
                          <span>{cartTotal.toFixed(0)} {t('products.currency')}</span>
                        </div>
                      </div>
                    </>
                  )}
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

export default Checkout;
