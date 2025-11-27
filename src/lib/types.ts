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
}

export interface CartItem extends Item {
  quantity: number;
}

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
  paymentMethod: 'Cash' | 'Card';
  status: 'Completed' | 'Pending';
  createdAt: Date;
}

export interface User {
  name: string;
  email: string;
  role: 'admin' | 'cashier';
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
}
