import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'عنا - دارك كات ثريدز' : 'About - Dark Cat Threads'}</title>
        <meta
          name="description"
          content={language === 'ar' ? 'تعرف على قصتنا ورؤيتنا' : 'Learn about our story and vision'}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />

        <main className="pt-20 md:pt-24">
          {/* Hero Section */}
          <div className="container mx-auto py-16 md:py-24 text-center">
            <h1 className="font-display text-5xl md:text-6xl text-foreground tracking-widest mb-6">
              {t('about.title')}
            </h1>
            <p className="text-foreground-secondary text-lg max-w-lg mx-auto">
              {language === 'ar'
                ? 'نحن لسنا مجرد علامة تجارية. نحن حركة.'
                : "We're not just a brand. We're a movement."}
            </p>
          </div>

          {/* Story Section */}
          <section className="section-padding border-t border-border">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-widest mb-6">
                    {t('about.story')}
                  </h2>
                  <div className="space-y-4 text-foreground-secondary leading-relaxed">
                    <p>
                      {language === 'ar'
                        ? 'بدأت Dark Cat Threads في شوارع عمان عام 2023. رؤية بسيطة: ملابس تتحدث قبل أن تتكلم.'
                        : 'Dark Cat Threads started in the streets of Amman in 2023. A simple vision: clothes that speak before you do.'}
                    </p>
                    <p>
                      {language === 'ar'
                        ? 'كل قطعة نصنعها تحمل قصة. كل تصميم هو بيان. نحن نؤمن بأن الأزياء ليست مجرد ملابس، بل هوية.'
                        : 'Every piece we create carries a story. Every design is a statement. We believe fashion is not just clothing, but identity.'}
                    </p>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-card overflow-hidden">
                  <img
                    src="/hoodie-1.jpg"
                    alt="Dark Cat Story"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="section-padding border-t border-border">
            <div className="container mx-auto text-center max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-widest mb-6">
                {t('about.mission')}
              </h2>
              <p className="text-foreground-secondary leading-relaxed">
                {language === 'ar'
                  ? 'نهدف إلى إعادة تعريف ثقافة الستريت وير في المنطقة العربية. جودة لا تساوم، تصاميم لا تُنسى، وأسعار عادلة.'
                  : 'We aim to redefine streetwear culture in the Arab region. Uncompromising quality, unforgettable designs, and fair prices.'}
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="section-padding border-t border-border">
            <div className="container mx-auto">
              <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-widest text-center mb-12">
                {t('about.values')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {[
                  {
                    titleAr: 'الجودة أولاً',
                    titleEn: 'QUALITY FIRST',
                    descAr: 'نستخدم أفضل الخامات ولا نقبل أقل من الكمال.',
                    descEn: 'We use the finest materials and accept nothing less than perfection.',
                  },
                  {
                    titleAr: 'محدود وفريد',
                    titleEn: 'LIMITED & UNIQUE',
                    descAr: 'كل إصدار محدود. لن تجد الجميع يرتدون نفس القطعة.',
                    descEn: "Every release is limited. You won't find everyone wearing the same piece.",
                  },
                  {
                    titleAr: 'صنع محلي',
                    titleEn: 'LOCALLY MADE',
                    descAr: 'بفخر من الأردن. ندعم الصناعة المحلية والحرفيين.',
                    descEn: 'Proudly from Jordan. We support local industry and craftsmen.',
                  },
                ].map((value, idx) => (
                  <div key={idx} className="text-center">
                    <h3 className="font-display text-lg tracking-widest text-foreground mb-3">
                      {language === 'ar' ? value.titleAr : value.titleEn}
                    </h3>
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      {language === 'ar' ? value.descAr : value.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
