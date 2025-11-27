'use client';

import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockTransactions, mockItems } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';

export function TopProductsChart() {
    const topProductsData = useMemo(() => {
        const productSales: { [key: string]: { quantity: number; name: string; imageUrl: string; imageHint: string; } } = {};

        mockTransactions.forEach(tx => {
            tx.items.forEach(item => {
                if (!productSales[item.itemId]) {
                    const productInfo = mockItems.find(p => p.id === item.itemId);
                    productSales[item.itemId] = { 
                        quantity: 0, 
                        name: productInfo?.name || 'Unknown',
                        imageUrl: productInfo?.imageUrl || '',
                        imageHint: productInfo?.imageHint || 'product'
                    };
                }
                productSales[item.itemId].quantity += item.quantity;
            });
        });

        return Object.entries(productSales)
            .map(([id, data]) => ({ id, ...data }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);
    }, []);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline">Produk Terlaris</CardTitle>
                <CardDescription>5 produk teratas berdasarkan jumlah penjualan.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[350px]">
                    <div className="space-y-4">
                        {topProductsData.map((product) => (
                            <div key={product.id} className="flex items-center">
                                <div className="relative h-12 w-12 rounded-md overflow-hidden mr-4">
                                     <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="48px" data-ai-hint={product.imageHint} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">{product.quantity} unit terjual</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
