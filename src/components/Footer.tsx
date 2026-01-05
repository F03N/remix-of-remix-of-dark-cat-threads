import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-background border-t border-border py-16 md:py-20">
      <div className="container mx-auto">
        {/* Minimal Footer - Brand + Philosophy + Copyright */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Brand */}
          <Link to="/">
            <span className="font-display text-2xl tracking-widest text-foreground">
              DARK CAT
            </span>
          </Link>

          {/* One philosophy line */}
          <p className="text-foreground-secondary text-sm max-w-sm">
            {language === 'ar' 
              ? 'ستريت وير فاخر من الأردن.' 
              : 'Premium streetwear from Jordan.'}
          </p>

          {/* Copyright */}
          <p className="text-foreground-tertiary text-xs tracking-wider">
            © {new Date().getFullYear()} Dark Cat Threads
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
