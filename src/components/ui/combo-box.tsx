"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  className?: string,
  options: {
    value: React.Key,
    label: string
  }[],
  placeholder?: string,
  emptyText?: string,
  setValue: (value: React.Key) => void,
  value: React.Key,
  setQuery?: (query: string) => void,
  query?: string
}

export function ComboBox(props: Props) {
  const [open, setOpen] = React.useState(false)
  
  const { className, options, placeholder, emptyText, setValue, value, setQuery, query } = props;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between font-normal"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder || "Select an option"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." className="h-9" value={query} onValueChange={setQuery} />
          <CommandList>
            <CommandEmpty>{emptyText || "No option found."}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    setValue(option.value === value ? "" : option.value)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
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
