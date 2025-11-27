import { CartProvider } from "@/lib/hooks/use-cart";
import { ProductGrid } from "@/components/pos/product-grid";
import { Cart } from "@/components/pos/cart";

export default function POSPage() {
  return (
    <CartProvider>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="md:col-span-2 lg:col-span-3">
          <ProductGrid />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}
