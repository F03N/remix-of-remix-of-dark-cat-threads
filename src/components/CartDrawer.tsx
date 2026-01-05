import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { items, cartTotal, isOpen, closeCart, removeFromCart, updateQuantity } = useCart();
  const { t, language, direction } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[70] transition-opacity duration-250",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 bottom-0 w-full max-w-sm bg-background z-[80] transition-transform duration-300 border-l border-border",
          direction === 'rtl' ? "left-0" : "right-0",
          isOpen 
            ? "translate-x-0" 
            : direction === 'rtl' ? "-translate-x-full" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-display text-xl tracking-widest">{t('cart.title')}</h2>
            <Button variant="headerGhost" size="icon" onClick={closeCart}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-12 h-12 text-foreground-tertiary mb-4" strokeWidth={1} />
                <p className="text-foreground-secondary text-sm">{t('cart.empty')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 pb-4 border-b border-border"
                  >
                    <img
                      src={item.image}
                      alt={language === 'ar' ? item.name : item.nameEn}
                      className="w-20 h-24 object-cover bg-card"
                    />
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-display text-sm tracking-wider text-foreground">
                        {language === 'ar' ? item.name : item.nameEn}
                      </h3>
                      <p className="text-foreground-tertiary text-xs mt-1">
                        {t('products.size')}: {item.size}
                      </p>
                      <p className="text-foreground-secondary text-sm mt-1">
                        {item.price.toFixed(0)} {t('products.currency')}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            className="w-7 h-7 flex items-center justify-center text-foreground-secondary hover:text-foreground transition-smooth"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-sm">{item.quantity}</span>
                          <button
                            className="w-7 h-7 flex items-center justify-center text-foreground-secondary hover:text-foreground transition-smooth"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          className="text-foreground-tertiary text-xs hover:text-foreground transition-smooth"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          {t('cart.remove')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground-secondary text-sm">{t('cart.subtotal')}</span>
                <span className="font-display text-xl tracking-wider">
                  {cartTotal.toFixed(0)} {t('products.currency')}
                </span>
              </div>
              <Link to="/checkout" onClick={closeCart}>
                <Button variant="cta" size="lg" className="w-full font-display tracking-widest">
                  {t('cart.checkout')}
                </Button>
              </Link>
              <button
                className="w-full text-foreground-secondary text-sm hover:text-foreground transition-smooth py-2"
                onClick={closeCart}
              >
                {t('cart.continue')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
