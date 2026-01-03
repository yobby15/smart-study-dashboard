import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const SearchInput = ({ value, onChange }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const placeholders = {
    id: "Cari tugas atau latihan...",
    en: "Search task or exercise..."
  };

  const inputBg = isDarkMode ? "bg-gray-800" : "bg-[#CAF0F8]";
  const borderColor = isDarkMode ? "border-gray-600" : "border-[#03045E]/20";
  const textColor = isDarkMode ? "text-white" : "text-[#03045E]";
  const placeholderColor = isDarkMode ? "placeholder-gray-500" : "placeholder-[#03045E]/50";
  const iconColor = isDarkMode ? "text-gray-400" : "text-[#03045E]/50";
  const focusRing = isDarkMode ? "focus:ring-blue-500" : "focus:ring-[#03045E]";

  return (
    <div className="relative w-full md:w-64"> 
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={16} className={iconColor} />
      </div>

      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full pl-9 pr-4 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-1 transition-all ${inputBg} ${borderColor} ${textColor} ${placeholderColor} ${focusRing}`} 
        placeholder={placeholders[locale]}
      />
    </div>
  );
};

export default SearchInput;