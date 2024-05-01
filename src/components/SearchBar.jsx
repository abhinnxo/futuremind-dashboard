import { useContext } from 'react';
import { TableContext } from '@/context/TableContextProvider';

function SearchBar({ text, placeholder }) {
  const { setSearchQuery } = useContext(TableContext);

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
