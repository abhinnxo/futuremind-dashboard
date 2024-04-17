import React from 'react';

function SearchBar({ text, placeholder }) {
  return (
    <div className="flex gap-2 items-center">
      <p className="font-semibold">{text}</p>
      <input
        type="text"
        name="Search"
        id="search"
        placeholder={placeholder}
        className="border border-1 rounded p-2"
      />
    </div>
  );
}

export default SearchBar;
