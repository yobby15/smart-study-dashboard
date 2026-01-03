import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

const InfoRow = ({ icon, label, value }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  const IconComponent = icon; 

  const borderClass = isDark ? 'border-gray-700' : 'border-gray-100';
  const iconBg = isDark ? 'bg-gray-700' : 'bg-[#CAF0F8]';
  const iconColor = isDark ? 'text-blue-400' : 'text-[#0077B6]';
  const labelColor = isDark ? 'text-gray-400' : 'text-gray-500';
  const valueColor = isDark ? 'text-gray-100' : 'text-[#03045E]';

  return (
    <div className={`flex items-start gap-4 py-3 border-b ${borderClass} last:border-0 transition-colors duration-300`}>
      <div className={`p-2 ${iconBg} rounded-full ${iconColor} mt-0.5`}>
        {IconComponent ? <IconComponent size={18} /> : <div className="w-4.5" />}
      </div>

      <div>
        <p className={`text-xs ${labelColor} font-medium uppercase`}>{label}</p>
        <p className={`${valueColor} font-semibold text-sm md:text-base leading-snug`}>{value}</p>
      </div>
    </div>
  );
};

export default InfoRow;