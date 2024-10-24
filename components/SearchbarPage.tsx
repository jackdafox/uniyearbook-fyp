"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches

    setLoading(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setIsOpen(true); // Open the dropdown when results are available
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if inside a form
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
    setQuery('');
    setResults([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={searchRef}>
      {/* Search Bar */}
      <div className="w-full max-w-xl flex items-center border border-gray-300 rounded-lg shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Listen for Enter key press
          placeholder="Search..."
          className="w-full p-4 rounded-lg focus:outline-none"
        />
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 p-4 focus:outline-none"
        >
          ✕
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute inset-x-0 top-full bg-white shadow-lg rounded-lg z-50 border-t-0">
          <div className="p-4">
            {/* Loading Indicator */}
            {loading && <p className="text-center">Loading...</p>}

            {/* Display search results */}
            {results.length > 0 ? (
              <ul>
                {results.map((batch: any) => (
                  <li
                    key={batch.id}
                    className="p-4 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleResultClick(batch.id)}
                  >
                    <div>
                      <strong>Batch:</strong> {batch.name}
                    </div>
                    <div>
                      <strong>Faculty:</strong> {batch.Faculty.name}
                    </div>
                    <div>
                      <strong>Major:</strong> {batch.Major.name}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p className="text-center">No results found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
