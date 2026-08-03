"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { fetchApi } from "@/lib/api";

export type Country = {
  id: string;
  code: string;
  name: string;
  dialCode: string | null;
};

interface CountrySelectProps {
  value: string;
  onChange: (countryCode: string) => void;
  onCountrySelect?: (country: Country) => void;
  className?: string;
}

export function CountrySelect({ value, onChange, onCountrySelect, className }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  // Keep track if we have triggered the onCountrySelect for the initial loaded value
  const initialTriggered = React.useRef(false);

  React.useEffect(() => {
    async function fetchCountries() {
      try {
        setError(null);
        
        const url = "/countries";
        console.log("Request URL:", `${process.env.NEXT_PUBLIC_API_URL || ""}${url}`);
        
        const res = await fetchApi<Country[] | { data: Country[] }>(url);
        
        console.log("Response status:", res.status);
        console.log("Response body:", res.data);
        
        if (res.error) {
          throw new Error(res.error);
        }
        
        const data = res.data;
        const countryList = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];
        setCountries(countryList);
      } catch (err) {
        console.error("Failed to fetch countries", err);
        setError("Failed to load countries");
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  React.useEffect(() => {
    if (value && countries.length > 0 && onCountrySelect && !initialTriggered.current) {
      const selected = countries.find((c: Country) => c.code === value);
      if (selected) {
        initialTriggered.current = true;
        onCountrySelect(selected);
      }
    }
  }, [value, countries, onCountrySelect]);

  const selectedCountry = React.useMemo(
    () => countries.find((country) => country.code === value),
    [value, countries]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal text-left h-10 px-3",
            !value && "text-muted-foreground",
            className
          )}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </span>
          ) : error ? (
            <span className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> {error}
            </span>
          ) : countries.length === 0 ? (
            <span className="text-muted-foreground">No countries available</span>
          ) : selectedCountry ? (
            <span className="truncate">{selectedCountry.name}</span>
          ) : (
            "Select country..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.name}
                  onSelect={() => {
                    onChange(country.code);
                    onCountrySelect?.(country);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
