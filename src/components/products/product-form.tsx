'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Item } from '@/lib/types';
import { generateProductDescription } from '@/lib/actions';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const productFormSchema = z.object({
  name: z.string().min(2, { message: 'Nama produk minimal 2 karakter.' }),
  category: z.string().min(2, { message: 'Kategori minimal 2 karakter.' }),
  price: z.coerce.number().min(0, { message: 'Harga tidak boleh negatif.' }),
  stock: z.coerce.number().int({ message: 'Stok harus berupa angka bulat.' }),
  features: z.string().min(3, { message: 'Sebutkan setidaknya satu fitur.' }),
  description: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Item | null;
  onSuccess: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      features: product?.features || '',
      description: product?.description || '',
    },
  });

  const handleGenerateDescription = async () => {
    const { name, category, features } = form.getValues();
    if (!name || !category || !features) {
      toast({
        title: 'Informasi Kurang',
        description: 'Nama, kategori, dan fitur produk harus diisi untuk membuat deskripsi.',
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateProductDescription({
        productName: name,
        productCategory: category,
        productFeatures: features,
      });

      if ('description' in result && result.description) {
        form.setValue('description', result.description);
        toast({
            title: 'Deskripsi Dihasilkan!',
            description: 'Deskripsi produk berhasil dibuat oleh AI.',
        })
      } else {
        throw new Error('Failed to generate description');
      }
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal membuat deskripsi. Coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  async function onSubmit(data: ProductFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Submitting data:', data);
    toast({
      title: product ? 'Produk Diperbarui' : 'Produk Ditambahkan',
      description: `${data.name} telah berhasil disimpan.`,
    });
    setIsSubmitting(false);
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                    <Input placeholder="cth: Kopi Susu Gula Aren" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                    <Input placeholder="cth: Minuman Kopi" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Harga</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="25000" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Stok</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Fitur Utama</FormLabel>
                <FormControl>
                    <Input placeholder="cth: 100% Arabika, Gula Aren Organik, Susu Segar" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Deskripsi Produk</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  )}
                  Generate
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Deskripsi menarik tentang produk Anda..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onSuccess}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Produk
            </Button>
        </div>
      </form>
    </Form>
  );
}
