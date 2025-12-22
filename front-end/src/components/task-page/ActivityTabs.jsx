import React from 'react';
import FilterTabs from './FilterTabs';
import SearchInput from './SearchInput';

const ActivityTabs = ({ currentFilter, onFilterChange, searchValue, onSearchChange }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-4 px-6 mt-4">
      
      <div className="w-full md:w-auto">
        <FilterTabs 
          currentFilter={currentFilter} 
          onFilterChange={onFilterChange} 
        />
      </div>

      <div className="w-full md:w-auto">
        <SearchInput 
          value={searchValue} 
          onChange={onSearchChange} 
        />
      </div>

    </div>
  );
};

export default ActivityTabs;