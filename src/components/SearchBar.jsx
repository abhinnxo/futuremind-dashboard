'use client';

import React, { useState, useEffect } from 'react';

function SearchBar({ text, placeholder, sendDataToParent }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    sendDataToParent(searchQuery);
  }, [searchQuery, sendDataToParent]);

  return (
    <div className="flex gap-2 items-center">
      <p className="font-semibold">{text}</p>
      <input
        type="text"
        name="Search"
        id="search"
        placeholder={placeholder}
        className="border border-1 rounded p-2"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
