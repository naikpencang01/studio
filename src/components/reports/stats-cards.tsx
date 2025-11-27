'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Users, BarChart } from "lucide-react"
import { formatRupiah } from "@/lib/utils";
import { useMemo } from "react";
import { mockTransactions } from "@/lib/data";

export function StatsCards() {
    const dailyStats = useMemo(() => {
        const today = new Date().toDateString();
        const todayTransactions = mockTransactions.filter(t => new Date(t.createdAt).toDateString() === today);
        
        const totalSales = todayTransactions.reduce((sum, t) => sum + t.total, 0);
        const txCount = todayTransactions.length;
        const avgTxValue = txCount > 0 ? totalSales / txCount : 0;

        return { totalSales, txCount, avgTxValue };
    }, []);

    const stats = [
        {
            title: "Total Penjualan (Hari Ini)",
            value: formatRupiah(dailyStats.totalSales),
            icon: DollarSign
        },
        {
            title: "Transaksi (Hari Ini)",
            value: dailyStats.txCount.toString(),
            icon: ShoppingCart
        },
        {
            title: "Rata-rata Transaksi",
            value: formatRupiah(dailyStats.avgTxValue),
            icon: BarChart
        },
        {
            title: "Pelanggan Baru",
            value: "12", // Mock data
            icon: Users
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
