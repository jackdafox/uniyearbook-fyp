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

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent searching empty queries

    setLoading(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setIsOpen(data.length > 0); // Open the dropdown only if results are available
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or other default actions
      handleSubmit(); // Trigger search on Enter key press
    }
  };

  const handleSubmit = () => {
    router.push(`/search?q=${query}`); // Navigate to search page
  }

  const handleResultClick = (batchId: string) => {
    setIsOpen(false); // Close the dropdown
    router.push(`/class/${batchId}`); // Navigate to the batch page
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value) {
      setIsOpen(false);
      setResults([]);
    }
  };

  // const handleClose = () => {
  //   setIsOpen(false);
  //   setQuery("");
  //   setResults([]);
  // };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

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
