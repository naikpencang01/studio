'use client';

import { SalesChart } from "@/components/reports/sales-chart"
import { StatsCards } from "@/components/reports/stats-cards"
import { useAuth } from "@/lib/hooks/use-mock-auth";

export default function ReportsPage() {
    const { user } = useAuth();

    if (user?.role !== 'admin') {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Anda tidak memiliki akses ke halaman ini.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">
             <div>
                <h1 className="text-2xl font-bold tracking-tight font-headline">Laporan Penjualan</h1>
                <p className="text-muted-foreground">Ringkasan performa penjualan toko Anda.</p>
            </div>
            <StatsCards />
            <SalesChart />
        </div>
    )
}
