'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  LayoutGrid,
  Package,
  Settings,
  Users,
  Warehouse,
  UsersRound,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAuth } from '@/lib/hooks/use-mock-auth';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Kasir',
    icon: LayoutGrid,
    role: ['admin', 'cashier'],
  },
  {
    href: '/dashboard/products',
    label: 'Produk',
    icon: Package,
    role: ['admin'],
  },
  {
    href: '/dashboard/reports',
    label: 'Laporan',
    icon: BarChart3,
    role: ['admin'],
  },
  {
    href: '/dashboard/customers',
    label: 'Pelanggan',
    icon: Users,
    role: ['admin', 'cashier'],
    disabled: false,
  },
  {
    href: '/dashboard/staff',
    label: 'Staf',
    icon: UsersRound,
    role: ['admin'],
  },
  {
    href: '#',
    label: 'Pengaturan',
    icon: Settings,
    role: ['admin'],
    disabled: true,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Warehouse className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold font-headline">KasirKu</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) =>
            item.role.includes(user?.role || '') ? (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    disabled={item.disabled}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ) : null
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>{/* Add footer content if needed */}</SidebarFooter>
    </Sidebar>
  );
}
