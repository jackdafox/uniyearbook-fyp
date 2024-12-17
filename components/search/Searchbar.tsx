"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or other default actions
      handleSubmit(); // Trigger search on Enter key press
    }
  };

  const handleSubmit = () => {
    const newQuery = handleSpaces(query);
    router.push(`/search?q=${newQuery}`); // Navigate to search page
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value) {
      setIsOpen(false);
      setResults([]);
    }
  };

  return (
    <>
      {pathname !== "/" && (
        <div className="relative w-full max-w-3xl mx-auto " ref={searchRef}>
          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full bg-white w-full">
            <input
              value={query}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="border-l h-full px-5 py-3 hover:bg-zinc-100 rounded-r-full"
            >
              <CiSearch size={20} />
            </button>
          </div>

          {/* Mobile Search Icon */}
          <div className="md:hidden flex justify-end">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-full hover:bg-zinc-100"
            >
              <FaSearch size={30} color="dimgray" />
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput
                placeholder="Type a command or search..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent form submission or other default actions
                    handleSubmit(); // Trigger search on Enter key press
                    setOpen(false)
                  }
                }}
                onValueChange={(value) => setQuery(value)}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem
                    onSelect={() => {
                      router.push("/search?q=calendar");
                      setOpen(false);
                    }}
                  >
                    Calendar
                  </CommandItem>
                  <CommandItem>Search Emoji</CommandItem>
                  <CommandItem>Calculator</CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </div>
      )}
    </>
  );
};

function handleSpaces(query: string) {
  return query.replace(/ /g, "+");
}

export default Searchbar;
