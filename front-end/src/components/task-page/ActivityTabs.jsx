import React from 'react';
import FilterTabs from './FilterTabs';
import SearchInput from './SearchInput';

const ActivityTabs = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-1 px-24 mt">
      <FilterTabs/>
      <SearchInput/>
    </div>
  );
};

export default ActivityTabs;