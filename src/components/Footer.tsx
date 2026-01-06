import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link to="/">
              <span className="font-display text-2xl tracking-widest text-foreground">
                {t('footer.brand').toUpperCase()}
              </span>
            </Link>
            <p className="text-foreground-secondary text-sm mt-4 max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground text-sm font-medium tracking-wider mb-4">
              {t('footer.quickLinks')}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-foreground-secondary text-sm hover:text-foreground transition-smooth">
                {t('nav.home')}
              </Link>
              <Link to="/shop" className="text-foreground-secondary text-sm hover:text-foreground transition-smooth">
                {t('nav.hoodies')}
              </Link>
              <Link to="/about" className="text-foreground-secondary text-sm hover:text-foreground transition-smooth">
                {t('nav.about')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground text-sm font-medium tracking-wider mb-4">
              {t('footer.contact')}
            </h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-foreground-secondary hover:text-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-foreground-secondary hover:text-foreground transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-foreground-secondary hover:text-foreground transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8">
          <p className="text-foreground-tertiary text-xs text-center tracking-wider">
            © {new Date().getFullYear()} Dark Cat. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
