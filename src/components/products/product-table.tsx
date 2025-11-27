'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, FilePenLine, Trash2, AlertTriangle, PlusCircle, ArrowUpDown, ChevronDown, ExternalLink } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import type { Item } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ProductForm } from './product-form';
import { mockItems } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/hooks/use-mock-auth';
import Link from 'next/link';

const AddStockForm = ({ item, onStockAdded }: { item: Item, onStockAdded: () => void }) => {
    const [quantity, setQuantity] = React.useState(1);
    const [notes, setNotes] = React.useState('');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd call an API to update the stock
        // and record the transaction.
        console.log(`Adding ${quantity} to ${item.name} with notes: ${notes}`);
        item.stock += quantity;
        toast({
            title: "Stok Ditambahkan",
            description: `${quantity} unit telah ditambahkan ke produk ${item.name}.`,
        });
        onStockAdded();
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Jumlah</Label>
                <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="col-span-3"
                    min="1"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">Catatan</Label>
                <Input
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="cth: Dari Pemasok A"
                    className="col-span-3"
                />
            </div>
            <DialogFooter>
                <Button type="submit">Simpan</Button>
            </DialogFooter>
        </form>
    )
}

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Produk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" data-ai-hint={item.imageHint} />
            </div>
            <div className="font-medium">{item.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'category',
    header: 'Kategori',
    cell: ({ row }) => <Badge variant="secondary">{row.getValue('category')}</Badge>,
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Harga</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      return <div className="text-right font-medium">{formatRupiah(amount)}</div>;
    },
  },
  {
    accessorKey: 'stock',
    header: () => <div className="text-right">Stok</div>,
    cell: ({ row }) => {
      const stock = parseInt(row.getValue('stock'));
      const isLowStock = stock < 10;
      return (
        <div className={`text-right ${isLowStock ? 'text-destructive font-bold' : ''}`}>
          <div className="flex items-center justify-end gap-2">
            {isLowStock && <AlertTriangle className="h-4 w-4" />}
            {stock}
          </div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const item = row.original;
      const [isSheetOpen, setSheetOpen] = React.useState(false);
      const [isAddStockOpen, setAddStockOpen] = React.useState(false);
      
      const handleStockAdded = () => {
        setAddStockOpen(false);
        // This is a hack to force react-table to re-render.
        // In a real app with a proper data-fetching library, this would be handled automatically.
        (table.options.meta as any)?.refreshData();
      }

      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href={`/products/${item.id}`} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Lihat Halaman Publik
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAddStockOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Stok
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSheetOpen(true)}>
              <FilePenLine className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
              Salin ID Produk
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 focus:text-red-500">
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Edit Produk</SheetTitle>
              <SheetDescription>
                Lakukan perubahan pada produk Anda. Klik simpan jika sudah selesai.
              </SheetDescription>
            </SheetHeader>
            <div className="py-8">
              <ProductForm product={item} onSuccess={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        
        <Dialog open={isAddStockOpen} onOpenChange={setAddStockOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Stok: {item.name}</DialogTitle>
                    <DialogDescription>
                        Masukkan jumlah stok yang ditambahkan dan catatan jika perlu.
                    </DialogDescription>
                </DialogHeader>
                <AddStockForm item={item} onStockAdded={handleStockAdded} />
            </DialogContent>
        </Dialog>
        </>
      );
    },
  },
];

export function ProductTable() {
  const { currentStore } = useAuth();
  
  // We manage the data state here so we can force a re-render
  const [data, setData] = React.useState(() => 
    mockItems.filter((item) => item.storeId === currentStore?.id)
  );

  React.useEffect(() => {
    setData(mockItems.filter((item) => item.storeId === currentStore?.id));
  }, [currentStore]);


  const refreshData = () => {
    setData(mockItems.filter((item) => item.storeId === currentStore?.id));
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      sku: false,
    });
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      refreshData,
    }
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Cari produk..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kolom <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === 'sku' ? 'SKU' : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada hasil.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} dari {mockItems.filter(i => i.storeId === currentStore?.id).length} produk.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Berikutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
