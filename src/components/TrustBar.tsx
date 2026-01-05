import React from 'react';
import { Sparkles, Package, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TrustBar: React.FC = () => {
  const { t } = useLanguage();

  const trustItems = [
    { icon: Sparkles, label: t('trust.cotton') },
    { icon: Package, label: t('trust.limited') },
    { icon: Truck, label: t('trust.shipping') },
  ];

  return (
    <section className="bg-section py-8 border-y border-border">
      <div className="container mx-auto">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center gap-20">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-foreground-secondary"
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="editorial-caps">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden overflow-x-auto scrollbar-hide gap-8 px-4 snap-x snap-mandatory">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-foreground-secondary flex-shrink-0 snap-center"
            >
              <item.icon className="w-4 h-4" strokeWidth={1.5} />
              <span className="editorial-caps whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
