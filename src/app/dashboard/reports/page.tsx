'use client';

import { SalesChart } from "@/components/reports/sales-chart"
import { StatsCards } from "@/components/reports/stats-cards"
import { useAuth } from "@/lib/hooks/use-mock-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TopProductsChart } from "@/components/reports/top-products-chart";
import { TransactionsTable } from "@/components/reports/transactions-table";


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
                <h1 className="text-2xl font-bold tracking-tight font-headline">Laporan & Analitik</h1>
                <p className="text-muted-foreground">Ringkasan performa penjualan dan wawasan toko Anda.</p>
            </div>
            <StatsCards />
            <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-2 md:w-1/2 lg:w-1/3">
                    <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                    <TabsTrigger value="transactions">Transaksi</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-4">
                        <div className="lg:col-span-2">
                             <SalesChart />
                        </div>
                        <div className="lg:col-span-1">
                            <TopProductsChart />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="transactions">
                    <div className="overflow-x-auto">
                        <TransactionsTable />
                    </div>
                </TabsContent>
            </Tabs>
            
        </div>
    )
}
