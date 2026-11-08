export type ProductCategory =
  | 'caps'
  | 't-shirts'
  | 'hoodies'
  | 'golf-shirts'
  | 'mugs'
  | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface ProductVariant {
  id: string;
  color: string;
  size?: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  currency: string;
  description: string;
  details: {
    material: string;
    fit?: string;
    care: string;
    origin: string;
  };
  features: string[];
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  variants: ProductVariant[];
  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;
  badge?: 'NEW' | 'ESSENTIAL' | 'LIMITED' | 'BESTSELLER';
  relatedProductIds?: string[];
}

export interface CartItem {
  id: string; // unique item cart id: `${productId}-${color}-${size || 'default'}`
  productId: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  currency: string;
  image: string;
  color: string;
  size?: string;
  quantity: number;
  maxStock: number;
}

export interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  district: string;
  address: string;
  instructions?: string;
  paymentMethod: 'mobile-money' | 'card' | 'bank-transfer';
  provider?: string; // e.g. Airtel Money, TNM Mpamba
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
  deliveryDetails: DeliveryDetails;
  status: 'confirmed' | 'pending' | 'processing';
  isSimulated: boolean;
}
