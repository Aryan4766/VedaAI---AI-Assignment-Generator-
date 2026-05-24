import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/** Figma-aligned search input for assignments listing */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search Assignment",
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex h-11 w-full items-center rounded-pill border border-[#EBEBEB] bg-white">
        <Search
          className="ml-4 h-4 w-4 shrink-0 text-ink-subtle"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search assignments"
          className="h-full flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-ink-subtle"
        />
      </div>
    </div>
  );
}
