'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Store as StoreIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAuth } from '@/lib/hooks/use-mock-auth'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {}

export function StoreSwitcher({ className }: StoreSwitcherProps) {
  const { user, currentStore, switchStore } = useAuth()
  const [open, setOpen] = React.useState(false)

  const formattedStores = user?.assignedStores.map((store) => ({
    label: store.name,
    value: store.id,
  })) || []

  if (!currentStore || formattedStores.length <= 1) {
    return (
        <div className="flex items-center gap-2">
            <StoreIcon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">{currentStore?.name}</h2>
        </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Pilih toko"
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
            <CommandList>
                <CommandInput placeholder="Cari toko..." />
                <CommandEmpty>Toko tidak ditemukan.</CommandEmpty>
                <CommandGroup heading="Toko">
                    {formattedStores.map((store) => (
                    <CommandItem
                        key={store.value}
                        onSelect={() => {
                          switchStore(store.value)
                          setOpen(false)
                        }}
                        className="text-sm"
                    >
                        <StoreIcon className="mr-2 h-4 w-4" />
                        {store.label}
                        <Check
                        className={cn(
                            'ml-auto h-4 w-4',
                            currentStore.id === store.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                        />
                    </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
