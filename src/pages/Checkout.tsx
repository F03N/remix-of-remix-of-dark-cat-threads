import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Checkout: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'إتمام الشراء - دارك كات ثريدز' : 'Checkout - Dark Cat Threads'}</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />

        <main className="pt-20 md:pt-24">
          <div className="container mx-auto section-padding">
            {/* Page Header */}
            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-widest text-center mb-12">
              {t('checkout.title')}
            </h1>

            <div className="max-w-lg mx-auto">
              {/* Shipping Form */}
              <div className="mb-8">
                <h2 className="text-foreground-secondary text-xs tracking-wider uppercase mb-6">
                  {t('checkout.shipping')}
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={t('checkout.firstName')}
                      className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                    />
                    <input
                      type="text"
                      placeholder={t('checkout.lastName')}
                      className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder={t('checkout.email')}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                  />
                  <input
                    type="tel"
                    placeholder={t('checkout.phone')}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                  />
                  <input
                    type="text"
                    placeholder={t('checkout.address')}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                  />
                  <input
                    type="text"
                    placeholder={t('checkout.city')}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-foreground-secondary transition-smooth"
                  />
                </div>
              </div>

              {/* Place Order */}
              <Button
                variant="cta"
                size="xl"
                className="w-full font-display tracking-widest"
              >
                {t('checkout.placeOrder')}
              </Button>

              <p className="text-center text-foreground-tertiary text-xs mt-6">
                {language === 'ar' 
                  ? 'هذه واجهة عرض فقط'
                  : 'This is a UI demo only'}
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Checkout;
