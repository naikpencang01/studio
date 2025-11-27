'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/hooks/use-mock-auth';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'admin' | 'cashier'>('cashier');

  const handleLogin = (selectedRole: 'admin' | 'cashier') => {
    setIsLoading(true);
    setRole(selectedRole);
    // Simulate API call
    setTimeout(() => {
      login({
        name: selectedRole === 'admin' ? 'Admin User' : 'Cashier User',
        email: `${selectedRole}@kasirku.com`,
        role: selectedRole,
      });
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">KasirKu</CardTitle>
          <CardDescription>Silakan masuk untuk melanjutkan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" defaultValue="demo@kasirku.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="password" />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Button
              onClick={() => handleLogin('cashier')}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && role === 'cashier' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Masuk sebagai Kasir
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleLogin('admin')}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && role === 'admin' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Masuk sebagai Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
