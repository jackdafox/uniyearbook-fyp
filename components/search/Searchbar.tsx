"use client"

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
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
    router.push(`/search?q=${query}`); // Navigate to search page
  }

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
        <div className="relative w-full max-w-3xl mx-auto" ref={searchRef}>
          {/* Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-full bg-white w-full">
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
              <CiSearch size={20}/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Searchbar;
