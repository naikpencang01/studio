

export interface Store {
  id: string;
  name: string;
  address: string;
}

export interface Supplier {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
}

export interface Item {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  imageHint: string;
  features: string;
  description: string;
  storeId: string;
  supplierId?: string;
}

export interface CartItem extends Item {
  quantity: number;
}

export type PaymentMethod = 'Cash' | 'Card' | 'QRIS' | 'GoPay' | 'OVO' | 'ShopeePay';

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  items: {
    itemId: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: 'Completed' | 'Pending';
  createdAt: Date;
  storeId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier';
  assignedStores: Store[];
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalVisits: number;
    totalSpent: number;
    lastVisit: Date;
    loyaltyPoints: number;
    storeId: string;
}
