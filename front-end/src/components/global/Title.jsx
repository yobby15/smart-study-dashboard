import React from 'react';

const Title = ({ Title, SubTitle, Icon }) => {
  return (
    <div className="flex flex-row px-10 pt-5 gap-3 items-start">
      {Icon && <Icon className="size-10 text-[#03045E] shrink-0" />}
      
      <div>
        <h1 className="text-[28px] text-[#03045E] font-semibold">
          {Title}
        </h1>
        <p className="text-[#03045E] font-medium opacity-80">
          {SubTitle}
        </p>
      </div>
    </div>
  );
};

export default Title;