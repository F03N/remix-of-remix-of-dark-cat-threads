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
          {/* Simple text - No illustrations */}
          <h1 className="font-display text-5xl md:text-6xl text-foreground tracking-widest mb-4">
            {t('404.title')}
          </h1>
          <p className="text-foreground-secondary mb-10">
            {t('404.subtitle')}
          </p>

          <Link to="/">
            <Button variant="cta" size="lg" className="font-display tracking-widest">
              {t('404.back')}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
