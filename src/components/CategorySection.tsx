import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CategorySection: React.FC = () => {
  const { t } = useLanguage();

  const categories = [
    { key: 'men', image: '/hoodie-1.jpg', href: '/shop?category=men' },
    { key: 'women', image: '/hoodie-2.jpg', href: '/shop?category=women' },
    { key: 'youth', image: '/hoodie-3.jpg', href: '/shop?category=youth' },
  ];

  return (
    <section className="bg-background section-padding">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-widest text-center mb-12 md:mb-16">
          {t('categories.title')}
        </h2>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.key}
              to={category.href}
              className="group relative aspect-[3/4] overflow-hidden bg-card"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={t(`categories.${category.key}`)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-background/50 transition-all duration-300 group-hover:bg-background/40" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-widest mb-4">
                  {t(`categories.${category.key}`)}
                </h3>
                
                {/* Hover reveal CTA */}
                <span className="text-foreground-secondary text-sm tracking-wider opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {t('categories.explore')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
