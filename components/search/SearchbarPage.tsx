"use client"
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const placeholders = [
    "Search for events",
    "Search for a class",
    "Search other students",
    "Search for memories",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${query}`); 
  };

  return (
    <div className="flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Searchbar;
