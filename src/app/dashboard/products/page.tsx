'use client';

import * as React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ProductTable } from '@/components/products/product-table';
import { ProductForm } from '@/components/products/product-form';
import { useAuth } from '@/lib/hooks/use-mock-auth';

export default function ProductsPage() {
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-headline">Manajemen Produk</h1>
          <p className="text-muted-foreground">Kelola semua produk di toko Anda.</p>
        </div>
        <Button onClick={() => setSheetOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Produk
        </Button>
      </div>
      <ProductTable />
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Tambah Produk Baru</SheetTitle>
            <SheetDescription>
              Isi detail produk baru di bawah ini. Klik simpan jika sudah selesai.
            </SheetDescription>
          </SheetHeader>
          <div className="py-8">
            <ProductForm onSuccess={() => setSheetOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
