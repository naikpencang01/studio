'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import { mockTransactions } from '@/lib/data';
import { format, subDays } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatRupiah } from '@/lib/utils';

export function SalesChart() {
    const weeklySalesData = useMemo(() => {
        const data: { [key: string]: number } = {};
        for (let i = 6; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dateString = format(date, 'yyyy-MM-dd');
            data[dateString] = 0;
        }

        mockTransactions.forEach(tx => {
            const dateString = format(new Date(tx.createdAt), 'yyyy-MM-dd');
            if (data[dateString] !== undefined) {
                data[dateString] += tx.total;
            }
        });

        return Object.entries(data).map(([date, total]) => ({
            name: format(new Date(date), 'eee', { locale: id }),
            total: total
        }));
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Penjualan 7 Hari Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={weeklySalesData}>
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
                            cursor={{ fill: 'hsl(var(--muted))' }}
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
