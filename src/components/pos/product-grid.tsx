'use client';

import Image from 'next/image';
import { mockItems } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/use-cart';
import { PlusCircle } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { useAuth } from '@/lib/hooks/use-mock-auth';

export function ProductGrid() {
  const { addToCart } = useCart();
  const { currentStore } = useAuth();

  const storeItems = mockItems.filter((item) => item.storeId === currentStore?.id);
  
  if (!currentStore) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {storeItems.map((item) => (
        <Card key={item.id} className="overflow-hidden flex flex-col">
          <CardHeader className="p-0">
            <div className="relative aspect-square">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                data-ai-hint={item.imageHint}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
            <p className="text-sm text-primary">{formatRupiah(item.price)}</p>
          </CardContent>
          <CardFooter className="p-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => addToCart(item)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
