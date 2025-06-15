
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  vendorId: string;
  categoryId: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingInfo: ShippingInfo;
  paymentDetails: PaymentDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  vendorId: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  shippingMethod: 'standard' | 'express' | 'overnight';
}

export interface PaymentDetails {
  method: 'card' | 'paypal';
  transactionId: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  parentCategoryId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  logo?: string;
  contactEmail: string;
  contactPhone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  isActive: boolean;
  isVerified: boolean;
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}
