'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { StoreSwitcher } from './store-switcher';
import { UserNav } from './user-nav';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <StoreSwitcher />
      <div className="flex-1" />
      <UserNav />
    </header>
  );
}
