import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen bg-background overflow-hidden">
      {/* Full-bleed Hero Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-hoodie.jpg"
          alt="Dark Cat Hoodie"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
      </div>

      {/* Content - Bottom positioned with generous spacing */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto pb-20 md:pb-28 lg:pb-36">
          <div className="max-w-xl space-y-6">
            {/* Single bold headline */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl text-foreground opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              {t('hero.title')}
            </h1>
            
            {/* Mysterious tagline */}
            <p 
              className="text-lg text-foreground-secondary font-display tracking-widest opacity-0 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* Single CTA */}
            <div 
              className="opacity-0 animate-fade-in pt-4" 
              style={{ animationDelay: '0.6s' }}
            >
              <Link to="/shop">
                <Button variant="cta" size="xl" className="font-display tracking-widest">
                  {t('hero.cta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
