'use client';

import * as React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StaffTable } from '@/components/staff/staff-table';
import { useAuth } from '@/lib/hooks/use-mock-auth';

export default function StaffPage() {
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
          <h1 className="text-2xl font-bold tracking-tight font-headline">Manajemen Staf</h1>
          <p className="text-muted-foreground">Kelola semua pengguna di sistem Anda.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Staf
        </Button>
      </div>
      <StaffTable />
    </div>
  );
}
