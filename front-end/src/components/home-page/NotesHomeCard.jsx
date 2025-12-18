import React from 'react';

const NotesHomeCard = () => {
  return (
    <div className="flex flex-col p-1">
      <ul className="space-y-2">
        <li className="flex items-start gap-2 text-sm text-[#03045E]">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#03045E] shrink-0" />
          <p>You are not absent yet</p>
        </li>
        
        <li className="flex items-start gap-2 text-sm text-[#03045E]">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#03045E] shrink-0" />
          <p>Your exercise is not finished yet</p>
        </li>
      </ul>

      <button className="text-xs text-[#03045E]/60 hover:underline self-start mt-4">
        See More...
      </button>
    </div>
  );
};

export default NotesHomeCard;