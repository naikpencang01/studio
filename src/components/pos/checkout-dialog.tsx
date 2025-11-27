'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/use-cart';
import { formatRupiah } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import type { PaymentMethod } from '@/lib/types';
import { CreditCard, QrCode, Smartphone, Wallet } from 'lucide-react';

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const paymentMethods: { name: PaymentMethod, icon: React.ElementType }[] = [
    { name: 'Cash', icon: Wallet },
    { name: 'Card', icon: CreditCard },
    { name: 'QRIS', icon: QrCode },
    { name: 'GoPay', icon: Smartphone },
    { name: 'OVO', icon: Smartphone },
    { name: 'ShopeePay', icon: Smartphone },
]

export function CheckoutDialog({ isOpen, onOpenChange }: CheckoutDialogProps) {
  const { cartItems, grandTotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = (method: PaymentMethod) => {
    // Here you would typically call a server action to create the transaction
    console.log(`Creating transaction with items:`, cartItems, `using ${method}`);
    toast({
      title: `Transaksi Berhasil dengan ${method}`,
      description: `Total pembayaran ${formatRupiah(grandTotal)} telah diterima.`,
      variant: 'default',
    });
    clearCart();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Konfirmasi Pembayaran</DialogTitle>
          <DialogDescription>Pilih metode pembayaran yang diinginkan pelanggan.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="text-center p-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Tagihan</p>
                <p className="text-4xl font-bold text-primary">{formatRupiah(grandTotal)}</p>
            </div>
            <Separator />
            <div className="space-y-2">
                <h4 className="font-medium px-1">Metode Pembayaran</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {paymentMethods.map(method => (
                        <Button key={method.name} variant="outline" size="lg" className="justify-start h-12" onClick={() => handleCheckout(method.name)}>
                            <method.icon className="mr-2 h-5 w-5 text-muted-foreground"/>
                            {method.name}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Batal
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
