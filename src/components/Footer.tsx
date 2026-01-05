import React from 'react';
import { Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

// TikTok icon component
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background border-t border-border section-padding py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl tracking-wider text-foreground">
                DARK CAT
              </span>
            </Link>
            <p className="text-foreground-secondary leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Social */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-card border border-border flex items-center justify-center text-foreground-secondary hover:text-cta hover:border-cta transition-smooth"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-card border border-border flex items-center justify-center text-foreground-secondary hover:text-cta hover:border-cta transition-smooth"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="font-display text-lg tracking-wider text-foreground">
              {language === 'ar' ? 'روابط سريعة' : 'QUICK LINKS'}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/shop" className="text-foreground-secondary hover:text-cta transition-smooth">
                {t('nav.shop')}
              </Link>
              <Link to="/customize" className="text-foreground-secondary hover:text-cta transition-smooth">
                {t('nav.customize')}
              </Link>
              <Link to="/about" className="text-foreground-secondary hover:text-cta transition-smooth">
                {t('nav.about')}
              </Link>
            </nav>
          </div>

          {/* Policies */}
          <div className="space-y-6">
            <h4 className="font-display text-lg tracking-wider text-foreground">{t('footer.policies')}</h4>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-foreground-secondary hover:text-cta transition-smooth">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-foreground-secondary hover:text-cta transition-smooth">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-foreground-secondary hover:text-cta transition-smooth">
                {t('footer.returns')}
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-foreground-secondary text-sm">
            © {new Date().getFullYear()} Dark Cat Threads. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
