import React, { useState } from "react";
import type { FormEvent } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="本のタイトル、著者名で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          検索
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
