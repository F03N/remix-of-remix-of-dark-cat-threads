// Product data with consistent structure
export type ProductCategory = 'men' | 'women' | 'youth';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  images: string[];
  isNew: boolean;
  category: ProductCategory;
  sizes: string[];
  description: string;
  descriptionEn: string;
  fabric: string;
  fabricEn: string;
  care: string;
  careEn: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'هودي الظل الداكن',
    nameEn: 'Dark Shadow Hoodie',
    price: 45.00,
    image: '/hoodie-1.jpg',
    images: ['/hoodie-1.jpg', '/hoodie-2.jpg'],
    isNew: true,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'هودي فاخر بتصميم عصري يجمع بين الراحة والأناقة.',
    descriptionEn: 'Premium hoodie with modern design combining comfort and elegance.',
    fabric: 'قطن 100%',
    fabricEn: '100% Cotton',
    care: 'غسيل بارد - لا تستخدم المجفف',
    careEn: 'Cold wash - Do not tumble dry',
  },
  {
    id: '2',
    name: 'هودي منتصف الليل',
    nameEn: 'Midnight Hoodie',
    price: 42.00,
    image: '/hoodie-2.jpg',
    images: ['/hoodie-2.jpg', '/hoodie-1.jpg'],
    isNew: false,
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'استوحي من ظلام الليل، هودي يعكس الغموض والأناقة.',
    descriptionEn: 'Inspired by the darkness of night, a hoodie that reflects mystery and elegance.',
    fabric: 'قطن 100%',
    fabricEn: '100% Cotton',
    care: 'غسيل بارد - لا تستخدم المجفف',
    careEn: 'Cold wash - Do not tumble dry',
  },
  {
    id: '3',
    name: 'هودي الأسود المطلق',
    nameEn: 'Pure Black Hoodie',
    price: 48.00,
    image: '/hoodie-3.jpg',
    images: ['/hoodie-3.jpg', '/hoodie-4.jpg'],
    isNew: true,
    category: 'youth',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'الأسود المطلق لمن يفضلون البساطة في التميز.',
    descriptionEn: 'Pure black for those who prefer simplicity in distinction.',
    fabric: 'قطن 100%',
    fabricEn: '100% Cotton',
    care: 'غسيل بارد - لا تستخدم المجفف',
    careEn: 'Cold wash - Do not tumble dry',
  },
  {
    id: '4',
    name: 'هودي القطة الغامضة',
    nameEn: 'Mystery Cat Hoodie',
    price: 55.00,
    image: '/hoodie-4.jpg',
    images: ['/hoodie-4.jpg', '/hoodie-3.jpg'],
    isNew: false,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'تصميم حصري يحمل روح العلامة التجارية.',
    descriptionEn: 'Exclusive design carrying the brand spirit.',
    fabric: 'قطن 100%',
    fabricEn: '100% Cotton',
    care: 'غسيل بارد - لا تستخدم المجفف',
    careEn: 'Cold wash - Do not tumble dry',
  },
  {
    id: '5',
    name: 'هودي الستريت',
    nameEn: 'Street Edition Hoodie',
    price: 50.00,
    image: '/hoodie-5.jpg',
    images: ['/hoodie-5.jpg', '/hoodie-6.jpg'],
    isNew: false,
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'مستوحى من ثقافة الشارع، لمن يعيشون على إيقاعهم الخاص.',
    descriptionEn: 'Inspired by street culture, for those who live to their own rhythm.',
    fabric: 'قطن 100%',
    fabricEn: '100% Cotton',
    care: 'غسيل بارد - لا تستخدم المجفف',
    careEn: 'Cold wash - Do not tumble dry',
  },
  {
    id: '6',
    name: 'هودي الإصدار المحدود',
    nameEn: 'Limited Edition Hoodie',
    price: 65.00,
    image: '/hoodie-6.jpg',
    images: ['/hoodie-6.jpg', '/hoodie-5.jpg'],
    isNew: true,
    category: 'youth',
    sizes: ['M', 'L', 'XL'],
    description: 'إصدار محدود لعشاق التميز والتفرد.',
    descriptionEn: 'Limited edition for lovers of distinction and uniqueness.',
    fabric: 'قطن 100%',
    fabricEn: '100% Cotton',
    care: 'غسيل بارد - لا تستخدم المجفف',
    careEn: 'Cold wash - Do not tumble dry',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};
