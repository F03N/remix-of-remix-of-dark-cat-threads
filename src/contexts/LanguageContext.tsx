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
    'nav.home': 'الرئيسية',
    'nav.hoodies': 'الهوديات',
    'nav.men': 'رجالي',
    'nav.women': 'نسائي',
    'nav.youth': 'شبابي',
    'nav.shop': 'تسوق',
    'nav.customize': 'تخصيص',
    'nav.about': 'عنا',
    'nav.cart': 'السلة',
    
    // Hero
    'hero.title': 'ليس مجرد قماش',
    'hero.subtitle': 'إنه بيان.',
    'hero.cta': 'استعرض المجموعة',
    
    // Features
    'features.premium': 'خامات فاخرة',
    'features.exclusive': 'تصميم حصري',
    'features.shipping': 'توصيل داخل الأردن',
    
    // Categories
    'categories.title': 'اختر أسلوبك',
    'categories.men': 'هودي رجالي',
    'categories.women': 'هودي نسائي',
    'categories.youth': 'هودي شبابي',
    'categories.explore': 'استعرض',
    
    // Products
    'products.title': 'المجموعة',
    'products.viewProduct': 'عرض المنتج',
    'products.addToCart': 'أضف إلى السلة',
    'products.buyNow': 'اشتري الآن',
    'products.customize': 'تخصيص',
    'products.currency': 'د.أ',
    'products.filter': 'تصفية',
    'products.sort': 'ترتيب',
    'products.all': 'الكل',
    'products.newest': 'الأحدث',
    'products.priceLow': 'السعر: منخفض إلى مرتفع',
    'products.priceHigh': 'السعر: مرتفع إلى منخفض',
    'products.size': 'المقاس',
    'products.price': 'السعر',
    'products.selectSize': 'اختر المقاس',
    'products.selectQuantity': 'الكمية',
    'products.details': 'الوصف',
    'products.fabric': 'الخامة',
    'products.care': 'الإرشادات',
    'products.shipping': 'الشحن',
    'products.related': 'منتجات مشابهة',
    
    // Cart
    'cart.title': 'السلة',
    'cart.empty': 'السلة فارغة',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.checkout': 'إتمام الشراء',
    'cart.continue': 'متابعة التسوق',
    'cart.remove': 'إزالة',
    
    // Checkout
    'checkout.title': 'إتمام الشراء',
    'checkout.step1': 'المعلومات',
    'checkout.step2': 'العنوان',
    'checkout.step3': 'الدفع',
    'checkout.firstName': 'الاسم الأول',
    'checkout.lastName': 'الاسم الأخير',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.phone': 'الهاتف',
    'checkout.address': 'العنوان',
    'checkout.city': 'المدينة',
    'checkout.placeOrder': 'تأكيد الطلب',
    
    // Footer
    'footer.brand': 'Dark Cat',
    'footer.quickLinks': 'روابط سريعة',
    'footer.contact': 'تواصل معنا',
    'footer.description': 'ستريت وير فاخر من الأردن.',
    'footer.rights': 'جميع الحقوق محفوظة',
    
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
    
    // 404
    '404.title': 'لا شيء هنا',
    '404.subtitle': 'الصفحة غير موجودة',
    '404.back': 'العودة للرئيسية',
  },
  en: {
    // Navigation
    'nav.home': 'HOME',
    'nav.hoodies': 'HOODIES',
    'nav.men': 'MEN',
    'nav.women': 'WOMEN',
    'nav.youth': 'YOUTH',
    'nav.shop': 'SHOP',
    'nav.customize': 'CUSTOMIZE',
    'nav.about': 'ABOUT',
    'nav.cart': 'Cart',
    
    // Hero
    'hero.title': "NOT JUST FABRIC",
    'hero.subtitle': "IT'S A STATEMENT.",
    'hero.cta': 'EXPLORE COLLECTION',
    
    // Features
    'features.premium': 'Premium Materials',
    'features.exclusive': 'Exclusive Design',
    'features.shipping': 'Jordan Delivery',
    
    // Categories
    'categories.title': 'Choose Your Style',
    'categories.men': 'Men\'s Hoodie',
    'categories.women': 'Women\'s Hoodie',
    'categories.youth': 'Youth Hoodie',
    'categories.explore': 'Explore',
    
    // Products
    'products.title': 'COLLECTION',
    'products.viewProduct': 'VIEW PRODUCT',
    'products.addToCart': 'ADD TO CART',
    'products.buyNow': 'BUY NOW',
    'products.customize': 'CUSTOMIZE',
    'products.currency': 'JOD',
    'products.filter': 'Filter',
    'products.sort': 'Sort',
    'products.all': 'All',
    'products.newest': 'Newest',
    'products.priceLow': 'Price: Low to High',
    'products.priceHigh': 'Price: High to Low',
    'products.size': 'Size',
    'products.price': 'Price',
    'products.selectSize': 'Select Size',
    'products.selectQuantity': 'Quantity',
    'products.details': 'Description',
    'products.fabric': 'Material',
    'products.care': 'Care',
    'products.shipping': 'Shipping',
    'products.related': 'Related Products',
    
    // Cart
    'cart.title': 'CART',
    'cart.empty': 'Your cart is empty.',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'CHECKOUT',
    'cart.continue': 'Continue Shopping',
    'cart.remove': 'Remove',
    
    // Checkout
    'checkout.title': 'CHECKOUT',
    'checkout.step1': 'Information',
    'checkout.step2': 'Address',
    'checkout.step3': 'Payment',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.placeOrder': 'PLACE ORDER',
    
    // Footer
    'footer.brand': 'Dark Cat',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.description': 'Premium streetwear from Jordan.',
    'footer.rights': 'All rights reserved',
    
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
    
    // 404
    '404.title': 'NOTHING HERE',
    '404.subtitle': 'Page not found',
    '404.back': 'BACK TO HOME',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar'); // Arabic first
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
