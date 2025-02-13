"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"

type Status = {
  value: string
  label: string
}

type ComboBoxProps = {
  data: Status[];
  onChange: (value: string) => void;
  title:string;
  className?:string;
}

export function ComboBox({ data, onChange, title, className }: ComboBoxProps) {

  const [open, setOpen] = React.useState(false)
  const isDesktop = !useIsMobile();
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  const handleSelect = (value: string) => {
    const selected = data.find((status) => status.value === value) || null;
    setSelectedStatus(selected);
    onChange(value);
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className={`w-[150px] justify-start ${className}`}>
            {selectedStatus ? <>{selectedStatus.label}</> : `${title}` }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList data={data} setOpen={setOpen} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className={`w-[150px] justify-start ${className}`}>
          {selectedStatus ? <>{selectedStatus.label}</> : `${title}` }
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList data={data} setOpen={setOpen} onSelect={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  data,
  setOpen,
  onSelect,
}: {
  data: Status[]
  setOpen: (open: boolean) => void
  onSelect: (value: string) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {data.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={onSelect}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}