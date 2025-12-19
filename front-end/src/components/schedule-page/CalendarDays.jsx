import React from 'react';

const CalendarDays = ({ days }) => (
  <div className="grid grid-cols-7 border-b-2 border-[#03045E] bg-[#CAF0F8]">
    {days.map((day) => (
      <div key={day} className="py-2 text-center text-[10px] md:text-xs font-bold text-[#03045E] border-r last:border-r-0 border-[#03045E]">
        {day}
      </div>
    ))}
  </div>
);

export default CalendarDays;