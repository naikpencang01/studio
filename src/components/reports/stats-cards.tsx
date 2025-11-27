'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Users, BarChart } from "lucide-react"
import { formatRupiah } from "@/lib/utils";
import { useMemo } from "react";
import { mockTransactions, mockCustomers } from "@/lib/data";
import { useAuth } from "@/lib/hooks/use-mock-auth";

export function StatsCards() {
    const { currentStore } = useAuth();

    const dailyStats = useMemo(() => {
        if (!currentStore) return { totalSales: 0, txCount: 0, avgTxValue: 0, newCustomers: 0 };
        
        const today = new Date().toDateString();
        const storeTransactions = mockTransactions.filter(t => t.storeId === currentStore.id);
        const todayTransactions = storeTransactions.filter(t => new Date(t.createdAt).toDateString() === today);
        
        const totalSales = todayTransactions.reduce((sum, t) => sum + t.total, 0);
        const txCount = todayTransactions.length;
        const avgTxValue = txCount > 0 ? totalSales / txCount : 0;
        
        const todayCustomers = mockCustomers.filter(c => 
            c.storeId === currentStore.id && 
            new Date(c.lastVisit).toDateString() === today &&
            c.totalVisits === 1 // Assuming first visit is a new customer
        );
        const newCustomers = todayCustomers.length;


        return { totalSales, txCount, avgTxValue, newCustomers };
    }, [currentStore]);

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
            value: dailyStats.newCustomers.toString(),
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
