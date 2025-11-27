'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/use-cart';
import { formatRupiah } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ isOpen, onOpenChange }: CheckoutDialogProps) {
  const { cartItems, grandTotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    // Here you would typically call a server action to create the transaction
    console.log('Creating transaction with items:', cartItems);
    toast({
      title: 'Transaksi Berhasil',
      description: `Total pembayaran ${formatRupiah(grandTotal)} telah diterima.`,
      variant: 'default',
    });
    clearCart();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Konfirmasi Pembayaran</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="text-center">
                <p className="text-muted-foreground">Total Tagihan</p>
                <p className="text-4xl font-bold text-primary">{formatRupiah(grandTotal)}</p>
            </div>
            <Separator />
            <div className="space-y-2">
                <h4 className="font-medium">Metode Pembayaran</h4>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={handleCheckout}>Bayar Tunai</Button>
                    <Button variant="outline" onClick={handleCheckout}>Bayar Kartu</Button>
                </div>
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Batal
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
