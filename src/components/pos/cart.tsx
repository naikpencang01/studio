'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/hooks/use-cart';
import { formatRupiah } from '@/lib/utils';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { CheckoutDialog } from './checkout-dialog';
import { ScrollArea } from '../ui/scroll-area';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, taxAmount, grandTotal, clearCart } = useCart();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="font-headline">Keranjang</CardTitle>
          {cartItems.length > 0 && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearCart}>
                <X className="h-4 w-4"/>
                <span className="sr-only">Kosongkan Keranjang</span>
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-0">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6">
              <ShoppingCart className="w-16 h-16 mb-4" />
              <p>Keranjang Anda kosong</p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-22rem)] md:h-[calc(100vh-28rem)]">
              <div className="space-y-4 p-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                       <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" data-ai-hint={item.imageHint} />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{formatRupiah(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-3 w-3"/>
                        </Button>
                        <Input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} className="h-6 w-12 text-center" />
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-3 w-3"/>
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
        {cartItems.length > 0 && (
          <CardFooter className="flex-col !p-6 space-y-4 border-t">
            <div className="w-full space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatRupiah(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Pajak (11%)</span>
                    <span>{formatRupiah(taxAmount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatRupiah(grandTotal)}</span>
                </div>
            </div>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" onClick={() => setCheckoutOpen(true)}>
              Bayar
            </Button>
          </CardFooter>
        )}
      </Card>
      <CheckoutDialog isOpen={isCheckoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
}
