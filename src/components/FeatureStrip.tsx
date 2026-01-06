import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeatureStrip: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { key: 'premium', icon: '◈' },
    { key: 'exclusive', icon: '◇' },
    { key: 'shipping', icon: '→' },
  ];

  return (
    <section className="bg-background-section border-y border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 divide-x divide-border rtl:divide-x-reverse">
          {features.map((feature) => (
            <div 
              key={feature.key}
              className="py-8 md:py-10 flex flex-col items-center justify-center text-center px-4"
            >
              <span className="text-foreground-tertiary text-lg mb-2">
                {feature.icon}
              </span>
              <span className="text-foreground-secondary text-xs md:text-sm tracking-wider">
                {t(`features.${feature.key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureStrip;
