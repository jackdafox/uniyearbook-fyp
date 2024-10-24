"use client"

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

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
      handleSearch(); // Trigger search on Enter key press
    }
  };

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

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

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
              type="search"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Listen for Enter key press
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full focus:outline-none"
            />
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 p-2 focus:outline-none"
            >
              ✕
            </button>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute mt-2 w-full bg-white rounded-lg z-50 shadow-lg border border-gray-300">
              <div className="p-4 space-y-4">
                {" "}
                {/* Added padding and spacing between items */}
                {/* Loading Indicator */}
                {loading && <p className="text-center">Loading...</p>}
                {/* Display search results */}
                {results.length > 0 ? (
                  <ul className="space-y-4">
                    {" "}
                    {/* Add spacing between list items */}
                    {results.map(
                      (batch: any, index: number) =>
                        batch && (
                          <li
                            key={batch.id || index} // Use index as a fallback key
                            className="p-4 border-b cursor-pointer hover:bg-gray-100"
                            onClick={() => handleResultClick(batch.id)}
                          >
                            <div className="text-lg font-bold">
                              Batch: {batch.name || "Unknown"}
                            </div>
                            <div className="text-sm text-gray-600">
                              Faculty: {batch.Faculty?.name || "Unknown"}
                            </div>
                            <div className="text-sm text-gray-600">
                              Major: {batch.Major?.name || "Unknown"}
                            </div>
                          </li>
                        )
                    )}
                  </ul>
                ) : (
                  !loading && <p className="text-center">No results found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Searchbar;
