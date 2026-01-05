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
          "fixed inset-0 bg-black/60 z-[70] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 bottom-0 w-full max-w-md bg-background z-[80] transition-transform duration-300 border-l border-border",
          direction === 'rtl' ? "left-0" : "right-0",
          isOpen 
            ? "translate-x-0" 
            : direction === 'rtl' ? "-translate-x-full" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-2xl tracking-wider">{t('cart.title')}</h2>
            <Button variant="headerGhost" size="icon" onClick={closeCart}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-foreground-secondary mb-6" strokeWidth={1} />
                <p className="text-foreground-secondary text-lg">{t('cart.empty')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 p-4 bg-card border border-border"
                  >
                    <img
                      src={item.image}
                      alt={language === 'ar' ? item.name : item.nameEn}
                      className="w-24 h-32 object-cover"
                    />
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-foreground">
                        {language === 'ar' ? item.name : item.nameEn}
                      </h3>
                      <p className="text-foreground-secondary text-sm mt-1">
                        {t('products.size')}: {item.size}
                      </p>
                      <p className="text-foreground font-bold mt-2">
                        {item.price.toFixed(2)} {t('products.currency')}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Quantity */}
                        <div className="flex items-center gap-3 border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-6 text-center font-bold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-foreground-secondary hover:text-destructive"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          {t('cart.remove')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground-secondary">{t('cart.subtotal')}</span>
                <span className="font-display text-2xl">
                  {cartTotal.toFixed(2)} {t('products.currency')}
                </span>
              </div>
              <Link to="/checkout" onClick={closeCart}>
                <Button variant="cta" size="xl" className="w-full">
                  {t('cart.checkout')}
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full text-foreground-secondary"
                onClick={closeCart}
              >
                {t('cart.continue')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
