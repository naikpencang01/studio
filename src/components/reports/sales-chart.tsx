'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useMemo } from 'react';
import { mockTransactions } from '@/lib/data';
import { format, subDays } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatRupiah } from '@/lib/utils';
import { useAuth } from '@/lib/hooks/use-mock-auth';

export function SalesChart() {
    const { currentStore } = useAuth();
    
    const weeklySalesData = useMemo(() => {
        if (!currentStore) return [];

        const data: { [key: string]: number } = {};
        for (let i = 6; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dateString = format(date, 'yyyy-MM-dd');
            data[dateString] = 0;
        }

        mockTransactions
            .filter(tx => tx.storeId === currentStore.id)
            .forEach(tx => {
                const dateString = format(new Date(tx.createdAt), 'yyyy-MM-dd');
                if (data[dateString] !== undefined) {
                    data[dateString] += tx.total;
                }
            });

        return Object.entries(data).map(([date, total]) => ({
            name: format(new Date(date), 'eee, d MMM', { locale: id }),
            total: total
        }));
    }, [currentStore]);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline">Penjualan 7 Hari Terakhir</CardTitle>
                <CardDescription>Total pendapatan dari penjualan setiap hari di toko ini.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={weeklySalesData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${formatRupiah(value as number, 0).slice(0, -4)}k`}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))', radius: 'var(--radius)' }}
                            contentStyle={{ 
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)'
                             }}
                            labelStyle={{color: 'hsl(var(--foreground))'}}
                            formatter={(value) => [formatRupiah(value as number), 'Penjualan']}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
