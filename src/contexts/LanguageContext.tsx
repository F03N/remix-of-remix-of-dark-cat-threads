import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.shop': 'تسوق',
    'nav.hoodies': 'هوديز',
    'nav.customize': 'تخصيص',
    'nav.about': 'عنا',
    'nav.search': 'بحث',
    'nav.cart': 'السلة',
    
    // Hero
    'hero.title': 'ليس مجرد قماش',
    'hero.subtitle': 'إنه بيان.',
    'hero.cta': 'استكشف المجموعة',
    
    // Trust Bar
    'trust.cotton': 'قطن فاخر',
    'trust.limited': 'إصدارات محدودة',
    'trust.shipping': 'شحن سريع',
    
    // Products
    'products.title': 'المجموعة',
    'products.viewProduct': 'عرض المنتج',
    'products.addToCart': 'أضف للسلة',
    'products.customize': 'تخصيص',
    'products.currency': 'د.أ',
    'products.filter': 'تصفية',
    'products.sort': 'ترتيب',
    'products.all': 'الكل',
    'products.newest': 'الأحدث',
    'products.priceLow': 'السعر: منخفض إلى مرتفع',
    'products.priceHigh': 'السعر: مرتفع إلى منخفض',
    'products.size': 'المقاس',
    'products.selectSize': 'اختر المقاس',
    'products.details': 'التفاصيل',
    'products.fabric': 'القماش والعناية',
    'products.shipping': 'الشحن',
    
    // Cart
    'cart.title': 'السلة',
    'cart.empty': 'السلة فارغة',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.checkout': 'إتمام الشراء',
    'cart.continue': 'متابعة التسوق',
    'cart.remove': 'إزالة',
    
    // Checkout
    'checkout.title': 'إتمام الشراء',
    'checkout.shipping': 'معلومات الشحن',
    'checkout.payment': 'الدفع',
    'checkout.review': 'مراجعة الطلب',
    'checkout.firstName': 'الاسم الأول',
    'checkout.lastName': 'الاسم الأخير',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.phone': 'الهاتف',
    'checkout.address': 'العنوان',
    'checkout.city': 'المدينة',
    'checkout.placeOrder': 'تأكيد الطلب',
    
    // About
    'about.title': 'عنا',
    'about.story': 'قصتنا',
    'about.mission': 'مهمتنا',
    'about.values': 'قيمنا',
    
    // Customize
    'customize.title': 'صمم هوديك',
    'customize.upload': 'رفع صورة',
    'customize.addText': 'إضافة نص',
    'customize.preview': 'معاينة',
    'customize.addToCart': 'أضف للسلة',
    
    // Footer
    'footer.description': 'ستريت وير فاخر من الأردن.',
    'footer.policies': 'السياسات',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'الشروط',
    'footer.returns': 'الاسترجاع',
    'footer.rights': 'جميع الحقوق محفوظة',
    
    // 404
    '404.title': 'لا شيء هنا',
    '404.subtitle': 'الصفحة غير موجودة',
    '404.back': 'العودة للرئيسية',
  },
  en: {
    // Navigation
    'nav.shop': 'SHOP',
    'nav.hoodies': 'HOODIES',
    'nav.customize': 'CUSTOMIZE',
    'nav.about': 'ABOUT',
    'nav.search': 'Search',
    'nav.cart': 'Cart',
    
    // Hero
    'hero.title': "NOT JUST FABRIC",
    'hero.subtitle': "IT'S A STATEMENT.",
    'hero.cta': 'EXPLORE COLLECTION',
    
    // Trust Bar
    'trust.cotton': 'Premium Cotton',
    'trust.limited': 'Limited Editions',
    'trust.shipping': 'Fast Shipping',
    
    // Products
    'products.title': 'COLLECTION',
    'products.viewProduct': 'VIEW PRODUCT',
    'products.addToCart': 'ADD TO CART',
    'products.customize': 'CUSTOMIZE',
    'products.currency': 'JOD',
    'products.filter': 'Filter',
    'products.sort': 'Sort',
    'products.all': 'All',
    'products.newest': 'Newest',
    'products.priceLow': 'Price: Low to High',
    'products.priceHigh': 'Price: High to Low',
    'products.size': 'Size',
    'products.selectSize': 'Select Size',
    'products.details': 'Details',
    'products.fabric': 'Fabric & Care',
    'products.shipping': 'Shipping',
    
    // Cart
    'cart.title': 'CART',
    'cart.empty': 'Your cart is empty.',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'CHECKOUT',
    'cart.continue': 'Continue Shopping',
    'cart.remove': 'Remove',
    
    // Checkout
    'checkout.title': 'CHECKOUT',
    'checkout.shipping': 'Shipping Information',
    'checkout.payment': 'Payment',
    'checkout.review': 'Review Order',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.placeOrder': 'PLACE ORDER',
    
    // About
    'about.title': 'ABOUT',
    'about.story': 'Our Story',
    'about.mission': 'Our Mission',
    'about.values': 'Our Values',
    
    // Customize
    'customize.title': 'DESIGN YOUR HOODIE',
    'customize.upload': 'Upload Image',
    'customize.addText': 'Add Text',
    'customize.preview': 'Preview',
    'customize.addToCart': 'ADD TO CART',
    
    // Footer
    'footer.description': 'Premium streetwear from Jordan.',
    'footer.policies': 'Policies',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.returns': 'Returns',
    'footer.rights': 'All rights reserved',
    
    // 404
    '404.title': 'NOTHING HERE',
    '404.subtitle': 'Page not found',
    '404.back': 'BACK TO HOME',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
