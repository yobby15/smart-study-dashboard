import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <div>
      <div className="relative w-full max-w-70"> 
        
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={16} className="text-[#03045E]/50" />
        </div>

        <input 
          type="text" 
          className="block w-full pl-9 pr-3 py-1.5 bg-[#CAF0F8] border border-[#03045E]/20 rounded-lg text-sm text-[#03045E] placeholder-[#03045E]/40 focus:outline-none focus:ring-1 focus:ring-[#0096C7] transition-all" 
          placeholder="Search task or exercise..."
        />
      </div>
    </div>
  );
};

export default SearchInput;