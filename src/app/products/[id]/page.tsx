import { mockItems, mockStores } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Store } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const item = mockItems.find((p) => p.id === params.id);
  
  if (!item) {
    notFound();
  }

  const store = mockStores.find((s) => s.id === item.storeId);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <Card className="overflow-hidden">
                <div className="relative aspect-square">
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        data-ai-hint={item.imageHint}
                        priority
                    />
                </div>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <div>
                <Badge variant="secondary">{item.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold font-headline mt-2">{item.name}</h1>
                <p className="text-2xl font-semibold text-primary mt-2">{formatRupiah(item.price)}</p>
            </div>
            
            <Separator />
            
            <div>
                <h2 className="text-lg font-semibold mb-2">Deskripsi Produk</h2>
                <p className="text-muted-foreground">{item.description}</p>
            </div>
            
            <div>
                <h3 className="text-md font-semibold mb-2">Fitur Utama:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {item.features.split(',').map((feature, index) => (
                        <li key={index}>{feature.trim()}</li>
                    ))}
                </ul>
            </div>

            <Separator />

            {store && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Store className="w-4 h-4" />
                    <span>Tersedia di {store.name}</span>
                </div>
            )}
            
            <Button size="lg" className="w-full mt-auto bg-accent text-accent-foreground hover:bg-accent/90">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Tambah ke Keranjang
            </Button>
            <p className="text-center text-sm text-muted-foreground">
                (Fungsionalitas E-commerce akan segera hadir)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
