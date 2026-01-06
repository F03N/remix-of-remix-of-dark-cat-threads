import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
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
    { href: '/', label: t('nav.home') },
    { href: '/shop', label: t('nav.hoodies') },
    { href: '/shop?category=men', label: t('nav.men') },
    { href: '/shop?category=women', label: t('nav.women') },
    { href: '/shop?category=youth', label: t('nav.youth') },
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
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="headerGhost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Desktop Navigation - Left/Right based on direction */}
            <nav className={cn(
              "hidden md:flex items-center gap-6",
              direction === 'rtl' ? 'order-last' : 'order-first'
            )}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground-secondary hover:text-foreground transition-smooth text-sm tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo - Right side for RTL, Left for LTR */}
            <Link 
              to="/" 
              className={cn(
                "absolute",
                direction === 'rtl' ? 'right-4 md:right-6' : 'left-4 md:left-6'
              )}
            >
              <span className="font-display text-xl md:text-2xl tracking-widest text-foreground">
                DARK CAT
              </span>
            </Link>

            {/* Right Actions */}
            <div className={cn(
              "flex items-center gap-3",
              direction === 'rtl' ? 'order-first' : 'order-last'
            )}>
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="hidden md:flex text-foreground-secondary hover:text-foreground transition-smooth text-sm tracking-wide"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>

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

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : direction === 'rtl' ? "translate-x-full" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-foreground-secondary"
            >
              <span className="text-sm tracking-wider">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>
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
                className="font-display text-2xl text-foreground hover:text-foreground-secondary transition-smooth tracking-wider"
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
