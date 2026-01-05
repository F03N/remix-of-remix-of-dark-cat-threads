import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
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
        />
        {/* Subtle gradient overlay - not overpowering */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Content - Bottom Left, Generous Spacing */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto pb-24 md:pb-32 lg:pb-40">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            {/* Single Headline - Bold but not oversized */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl text-foreground opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              {t('hero.title')}
            </h1>
            
            {/* Subtitle - Calm, secondary */}
            <p 
              className="text-lg md:text-xl text-foreground-secondary font-display tracking-widest opacity-0 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* Single CTA - Calm strength */}
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

      {/* Scroll Indicator - Very subtle */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30">
        <ChevronDown className="w-6 h-6 text-foreground" strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;
