import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const { t, language, setLanguage, direction } = useLanguage();
  const { cartCount, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navLinks = [
    { href: '/shop', label: t('nav.shop') },
    { href: '/shop?category=hoodies', label: t('nav.hoodies') },
    { href: '/customize', label: t('nav.customize') },
    { href: '/about', label: t('nav.about') },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isHome && !scrolled 
            ? "bg-transparent border-transparent" 
            : "bg-background/98 backdrop-blur-sm border-border"
        )}
      >
        <div className="container mx-auto">
          {/* Reduced height: h-16 mobile, h-18 desktop */}
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Mobile Menu Button */}
            <Button
              variant="headerGhost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground-secondary hover:text-foreground transition-smooth font-display text-base tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo - Center */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="font-display text-xl md:text-2xl tracking-widest text-foreground">
                DARK CAT
              </span>
            </Link>

            {/* Right Actions - Minimal */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Toggle */}
              <Button
                variant="headerGhost"
                size="icon"
                onClick={toggleLanguage}
                className="hidden md:flex"
              >
                <Globe className="w-4 h-4" />
              </Button>

              {/* Cart */}
              <Button 
                variant="headerGhost" 
                size="icon" 
                className="relative"
                onClick={toggleCart}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-cta text-cta-foreground text-[10px] font-semibold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Clean */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : direction === 'rtl' ? "translate-x-full" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-12">
            <Button
              variant="headerGhost"
              size="icon"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-display tracking-wider text-foreground-secondary">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </Button>
            <Button
              variant="headerGhost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-display text-3xl text-foreground hover:text-foreground-secondary transition-smooth tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
