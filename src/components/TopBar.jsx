import React from 'react';

const TopBar = ({ children, heading }) => {
  return (
    <div>
      <div className="md:flex justify-between items-center mb-4">
        <h1 className="font-semibold text-lg">{heading}</h1>
        <div className="flex max-sm:flex-col sm:justify-between sm:items-center max-sm:mt-4 gap-4 sm:gap-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
