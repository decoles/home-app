import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBar {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBar> = ({
  placeholder = "Search transactions, accounts, categories, bills, stocks...",
  onSearch
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="flex items-center bg-gray-800 rounded-md px-4 py-2 w-full max-w-1/2 shadow-sm border-white">
      {/* Search Icon */}
      <SearchIcon className="text-white mr-3" />

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500"
      />
    </div>
  );
};

export default SearchBar;
