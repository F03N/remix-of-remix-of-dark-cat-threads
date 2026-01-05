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

        <main className="pt-24 md:pt-32">
          <div className="container mx-auto section-padding">
            {/* Page Header */}
            <h1 className="font-display text-5xl md:text-7xl text-foreground tracking-wider text-center mb-16">
              {t('checkout.title')}
            </h1>

            <div className="max-w-2xl mx-auto">
              {/* Shipping Form */}
              <div className="bg-card border border-border p-8 md:p-12 mb-8">
                <h2 className="font-display text-2xl tracking-wider text-foreground mb-8">
                  {t('checkout.shipping')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="editorial-caps text-foreground-secondary block mb-2">
                      {t('checkout.firstName')}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-cta transition-smooth"
                    />
                  </div>
                  <div>
                    <label className="editorial-caps text-foreground-secondary block mb-2">
                      {t('checkout.lastName')}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-cta transition-smooth"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="editorial-caps text-foreground-secondary block mb-2">
                      {t('checkout.email')}
                    </label>
                    <input
                      type="email"
                      className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-cta transition-smooth"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="editorial-caps text-foreground-secondary block mb-2">
                      {t('checkout.phone')}
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-cta transition-smooth"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="editorial-caps text-foreground-secondary block mb-2">
                      {t('checkout.address')}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-cta transition-smooth"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="editorial-caps text-foreground-secondary block mb-2">
                      {t('checkout.city')}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-cta transition-smooth"
                    />
                  </div>
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

              <p className="text-center text-foreground-secondary text-sm mt-6">
                {language === 'ar' 
                  ? 'هذه واجهة عرض فقط - لا يتم معالجة طلبات حقيقية'
                  : 'This is a UI demo only - no real orders are processed'}
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
