import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Globe } from 'lucide-react';
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
          isHome && !scrolled 
            ? "bg-transparent border-transparent" 
            : "bg-background/95 backdrop-blur-md border-border"
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Mobile Menu Button */}
            <Button
              variant="headerGhost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground hover:text-cta transition-smooth font-display text-lg tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo - Center */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="font-display text-2xl md:text-3xl tracking-wider text-foreground">
                DARK CAT
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Language Toggle */}
              <Button
                variant="headerGhost"
                size="icon"
                onClick={toggleLanguage}
                className="hidden md:flex"
              >
                <Globe className="w-5 h-5" />
              </Button>

              {/* Search - Desktop */}
              <Button
                variant="headerGhost"
                size="icon"
                className="hidden md:flex"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Cart */}
              <Button 
                variant="headerGhost" 
                size="icon" 
                className="relative"
                onClick={toggleCart}
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-cta text-cta-foreground text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : direction === 'rtl' ? "translate-x-full" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-16">
            <Button
              variant="headerGhost"
              size="icon"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="w-6 h-6" />
              <span className="text-sm font-display tracking-wider">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </Button>
            <Button
              variant="headerGhost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-display text-4xl text-foreground hover:text-cta transition-smooth tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <Button
              variant="headerGhost"
              size="lg"
              className="w-full justify-start gap-4"
            >
              <Search className="w-6 h-6" />
              <span className="font-display tracking-wider">{t('nav.search')}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
