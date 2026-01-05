import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TrustBar: React.FC = () => {
  const { t } = useLanguage();

  const trustItems = [
    { label: t('trust.cotton') },
    { label: t('trust.limited') },
    { label: t('trust.shipping') },
  ];

  return (
    <section className="bg-background py-6 border-y border-border">
      <div className="container mx-auto">
        {/* Desktop - Simple text row */}
        <div className="hidden md:flex items-center justify-center gap-16">
          {trustItems.map((item, index) => (
            <span
              key={index}
              className="editorial-caps text-foreground-secondary"
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Mobile - Horizontal scroll, text only */}
        <div className="flex md:hidden overflow-x-auto scrollbar-hide gap-8 px-2 justify-center">
          {trustItems.map((item, index) => (
            <span
              key={index}
              className="editorial-caps text-foreground-secondary whitespace-nowrap"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
