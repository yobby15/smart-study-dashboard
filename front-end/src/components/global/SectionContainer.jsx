import React from 'react';

const SectionContainer = ({ title, subtitle, children }) => {
  return (
    <div className="bg-[#0077b6] rounded-xl px-6 py-4 mx-4 md:mx-6 my-4 shadow-md shadow-blue-900/20 border border-[#ADE8F4]">
      <div className="flex flex-col">
        <h2 className="text-[#CAF0F8] font-semibold text-xl md:text-2xl leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[#CAF0F8]/80 text-sm md:text-base mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="mt-3">
        {children} 
      </div>
    </div>
  );
};

export default SectionContainer;