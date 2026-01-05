import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? '404 - الصفحة غير موجودة' : '404 - Page Not Found'}</title>
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto text-center px-4">
          {/* Large 404 */}
          <h1 className="font-display text-[12rem] md:text-[20rem] leading-none text-foreground opacity-10 select-none">
            404
          </h1>

          {/* Message */}
          <div className="relative -mt-20 md:-mt-32">
            <h2 className="font-display text-4xl md:text-6xl text-foreground tracking-wider mb-4">
              {t('404.title')}
            </h2>
            <p className="text-foreground-secondary text-lg mb-12">
              {t('404.subtitle')}
            </p>

            <Link to="/">
              <Button variant="cta" size="xl" className="font-display tracking-widest">
                {t('404.back')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
