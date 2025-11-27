'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockTransactions, mockItems } from '@/lib/data';
import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';
import { useAuth } from '@/lib/hooks/use-mock-auth';

export function TopProductsChart() {
    const { currentStore } = useAuth();
    
    const topProductsData = useMemo(() => {
        if (!currentStore) return [];

        const productSales: { [key: string]: { quantity: number; name: string; imageUrl: string; imageHint: string; } } = {};
        
        mockTransactions
            .filter(tx => tx.storeId === currentStore.id)
            .forEach(tx => {
                tx.items.forEach(item => {
                    if (!productSales[item.itemId]) {
                        const productInfo = mockItems.find(p => p.id === item.itemId);
                        if (productInfo) {
                            productSales[item.itemId] = { 
                                quantity: 0, 
                                name: productInfo?.name || 'Unknown',
                                imageUrl: productInfo?.imageUrl || '',
                                imageHint: productInfo?.imageHint || 'product'
                            };
                        }
                    }
                    if (productSales[item.itemId]) {
                       productSales[item.itemId].quantity += item.quantity;
                    }
                });
            });

        return Object.entries(productSales)
            .map(([id, data]) => ({ id, ...data }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);
    }, [currentStore]);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline">Produk Terlaris</CardTitle>
                <CardDescription>5 produk teratas berdasarkan jumlah penjualan di toko ini.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[350px]">
                    <div className="space-y-4">
                        {topProductsData.length > 0 ? topProductsData.map((product) => (
                            <div key={product.id} className="flex items-center">
                                <div className="relative h-12 w-12 rounded-md overflow-hidden mr-4">
                                     <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="48px" data-ai-hint={product.imageHint} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">{product.quantity} unit terjual</p>
                                </div>
                            </div>
                        )) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <p>Belum ada data penjualan.</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
