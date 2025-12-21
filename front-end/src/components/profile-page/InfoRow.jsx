import React from 'react';

const InfoRow = ({ icon, label, value }) => {
  const IconComponent = icon; 

  return (
    <div className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
      <div className="p-2 bg-[#CAF0F8] rounded-full text-[#0077B6] mt-0.5">
        {IconComponent ? <IconComponent size={18} /> : <div className="w-4.5" />}
      </div>

      <div>
        <p className="text-xs text-gray-500 font-medium uppercase">{label}</p>
        <p className="text-[#03045E] font-semibold text-sm md:text-base leading-snug">{value}</p>
      </div>
    </div>
  );
};

export default InfoRow;