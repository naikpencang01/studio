import { Item, Transaction, Customer, Store, User } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const mockStores: Store[] = [
  { id: 'store-1', name: 'KasirKu - Jakarta', address: 'Jl. Jend. Sudirman No. 1, Jakarta' },
  { id: 'store-2', name: 'KasirKu - Surabaya', address: 'Jl. Basuki Rahmat No. 2, Surabaya' },
];

export const mockUsers: User[] = [
    { 
        id: 'user-1',
        name: 'Admin User',
        email: 'admin@kasirku.com',
        role: 'admin',
        assignedStores: mockStores,
    },
    {
        id: 'user-2',
        name: 'Cashier Jakarta',
        email: 'cashier.jkt@kasirku.com',
        role: 'cashier',
        assignedStores: [mockStores[0]],
    },
    {
        id: 'user-3',
        name: 'Cashier Surabaya',
        email: 'cashier.sby@kasirku.com',
        role: 'cashier',
        assignedStores: [mockStores[1]],
    },
    {
        id: 'user-4',
        name: 'Manager Regional',
        email: 'manager.reg@kasirku.com',
        role: 'admin',
        assignedStores: mockStores,
    }
];

export const mockItems: Item[] = [
  {
    id: 'item-1',
    sku: 'CF-001',
    name: 'Espresso',
    category: 'Kopi',
    price: 25000,
    stock: 100,
    imageUrl: PlaceHolderImages[0].imageUrl,
    imageHint: PlaceHolderImages[0].imageHint,
    features: 'Biji kopi arabika, digiling halus, tekanan tinggi',
    description: 'Espresso klasik dengan crema tebal, dibuat dari biji kopi arabika pilihan untuk rasa yang kaya dan intens.',
    storeId: 'store-1',
  },
  {
    id: 'item-2',
    sku: 'CF-002',
    name: 'Latte',
    category: 'Kopi',
    price: 35000,
    stock: 80,
    imageUrl: PlaceHolderImages[1].imageUrl,
    imageHint: PlaceHolderImages[1].imageHint,
    features: 'Espresso, susu steam, foam tipis',
    description: 'Perpaduan lembut antara espresso dan susu steam, dihiasi dengan latte art yang cantik. Pilihan sempurna untuk memulai hari.',
    storeId: 'store-1',
  },
  {
    id: 'item-3',
    sku: 'CF-003',
    name: 'Cappuccino',
    category: 'Kopi',
    price: 35000,
    stock: 75,
    imageUrl: PlaceHolderImages[2].imageUrl,
    imageHint: PlaceHolderImages[2].imageHint,
    features: 'Espresso, susu steam, foam tebal',
    description: 'Keseimbangan sempurna antara espresso, susu panas, dan foam susu yang tebal. Memberikan pengalaman minum kopi yang klasik dan memuaskan.',
    storeId: 'store-2',
  },
  {
    id: 'item-4',
    sku: 'CF-004',
    name: 'Americano',
    category: 'Kopi',
    price: 30000,
    stock: 90,
    imageUrl: PlaceHolderImages[3].imageUrl,
    imageHint: PlaceHolderImages[3].imageHint,
    features: 'Espresso, air panas',
    description: 'Shot espresso yang diperkaya dengan air panas, menciptakan kopi hitam yang ringan namun tetap kaya rasa.',
    storeId: 'store-1',
  },
  {
    id: 'item-5',
    sku: 'PS-001',
    name: 'Croissant',
    category: 'Pastry',
    price: 28000,
    stock: 50,
    imageUrl: PlaceHolderImages[4].imageUrl,
    imageHint: PlaceHolderImages[4].imageHint,
    features: 'Mentega asli, adonan berlapis, renyah',
    description: 'Croissant mentega klasik dengan lapisan yang renyah di luar dan lembut di dalam. Teman sempurna untuk kopi Anda.',
    storeId: 'store-2',
  },
  {
    id: 'item-6',
    sku: 'PS-002',
    name: 'Muffin Cokelat',
    category: 'Pastry',
    price: 32000,
    stock: 8,
    imageUrl: PlaceHolderImages[5].imageUrl,
    imageHint: PlaceHolderImages[5].imageHint,
    features: 'Cokelat chip, lembut, manis',
    description: 'Muffin yang lembut dan kaya akan cokelat chip berkualitas tinggi. Manis yang pas untuk menemani waktu santai Anda.',
    storeId: 'store-1',
  },
    {
    id: 'item-7',
    sku: 'PS-003',
    name: 'Donat Gula',
    category: 'Pastry',
    price: 20000,
    stock: 60,
    imageUrl: PlaceHolderImages[6].imageUrl,
    imageHint: PlaceHolderImages[6].imageHint,
    features: 'Adonan lembut, glasir gula',
    description: 'Donat klasik yang empuk dengan lapisan glasir gula manis yang meleleh di mulut.',
    storeId: 'store-2',
  },
  {
    id: 'item-8',
    sku: 'PS-004',
    name: 'Cheesecake',
    category: 'Pastry',
    price: 45000,
    stock: 30,
    imageUrl: PlaceHolderImages[7].imageUrl,
    imageHint: PlaceHolderImages[7].imageHint,
    features: 'Krim keju, biskuit renyah, topping buah',
    description: 'Potongan cheesecake yang creamy dan lembut dengan dasar biskuit renyah dan topping buah segar.',
    storeId: 'store-1',
  },
];

export const mockCustomers: Customer[] = [
    {
        id: 'cust-1',
        name: 'Budi Santoso',
        email: 'budi.s@example.com',
        phone: '081234567890',
        totalVisits: 15,
        totalSpent: 2500000,
        lastVisit: new Date(new Date().setDate(new Date().getDate() - 2)),
        loyaltyPoints: 250,
        storeId: 'store-1',
    },
    {
        id: 'cust-2',
        name: 'Citra Lestari',
        email: 'citra.l@example.com',
        phone: '081223344556',
        totalVisits: 8,
        totalSpent: 1250000,
        lastVisit: new Date(new Date().setDate(new Date().getDate() - 5)),
        loyaltyPoints: 125,
        storeId: 'store-2',
    },
    {
        id: 'cust-3',
        name: 'Doni Firmansyah',
        email: 'doni.f@example.com',
        phone: '081987654321',
        totalVisits: 25,
        totalSpent: 4500000,
        lastVisit: new Date(new Date().setDate(new Date().getDate() - 1)),
        loyaltyPoints: 450,
        storeId: 'store-1',
    },
    {
        id: 'cust-4',
        name: 'Eka Putri',
        email: 'eka.p@example.com',
        phone: '081122334455',
        totalVisits: 5,
        totalSpent: 750000,
        lastVisit: new Date(new Date().setDate(new Date().getDate() - 10)),
        loyaltyPoints: 75,
        storeId: 'store-2',
    },
    {
        id: 'cust-5',
        name: 'Fajar Nugroho',
        email: 'fajar.n@example.com',
        phone: '081555666777',
        totalVisits: 12,
        totalSpent: 1800000,
        lastVisit: new Date(new Date().setDate(new Date().getDate() - 3)),
        loyaltyPoints: 180,
        storeId: 'store-1',
    }
];


export const mockTransactions: Transaction[] = Array.from({ length: 25 }, (_, i) => {
    const storeId = i % 2 === 0 ? 'store-1' : 'store-2';
    const storeCustomers = mockCustomers.filter(c => c.storeId === storeId);
    const customer = storeCustomers[i % storeCustomers.length];
    
    const storeItems = mockItems.filter(item => item.storeId === storeId);
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = Array.from({ length: itemCount }, () => {
        const item = storeItems[Math.floor(Math.random() * storeItems.length)];
        return {
            itemId: item.id,
            quantity: Math.floor(Math.random() * 2) + 1,
            price: item.price,
        };
    });
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.11;
    const total = subtotal + tax;

    return {
        id: `TX-20240521-${1001 + i}`,
        customerId: customer.id,
        customerName: customer.name,
        items,
        subtotal,
        tax,
        total,
        paymentMethod: Math.random() > 0.5 ? 'Cash' : 'Card',
        status: 'Completed',
        createdAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(i / 5))),
        storeId,
    };
});
