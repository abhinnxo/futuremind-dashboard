'use client';

import React, { useState, createContext } from 'react';

export const TableContext = createContext();

const TableContextProvider = ({ children }) => {
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('Show All');

  return (
    <TableContext.Provider
      value={{
        isToggleEnabled,
        setIsToggleEnabled,
        searchQuery,
        setSearchQuery,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
