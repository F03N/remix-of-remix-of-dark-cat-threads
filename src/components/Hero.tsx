import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Full-bleed Hero Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-hoodie.jpg"
          alt="Dark Cat Hoodie"
          className="w-full h-full object-cover"
        />
        {/* Editorial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content - Bottom Left Editorial Layout */}
      <div className="relative z-10 min-h-screen flex items-end">
        <div className="container mx-auto pb-32 md:pb-40">
          <div className="max-w-3xl space-y-8">
            {/* Statement Typography */}
            <h1 
              className="text-6xl md:text-8xl lg:text-[10rem] text-foreground opacity-0 animate-fade-in leading-none"
              style={{ animationDelay: '0.2s' }}
            >
              {t('hero.title')}
            </h1>
            
            <p 
              className="text-2xl md:text-4xl text-foreground-secondary font-display tracking-wider opacity-0 animate-fade-in"
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40 animate-bounce">
        <ChevronDown className="w-8 h-8 text-foreground" strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;
