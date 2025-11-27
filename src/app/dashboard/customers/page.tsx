'use client';

import * as React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerTable } from '@/components/customers/customer-table';

export default function CustomersPage() {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-headline">Manajemen Pelanggan</h1>
          <p className="text-muted-foreground">Kelola semua pelanggan di toko Anda.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Pelanggan
        </Button>
      </div>
      <CustomerTable />
    </div>
  );
}
