import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarGrid from './CalendarGrid';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const data = {
    firstDay: new Date(year, month, 1).getDay(),
    daysInMonth: new Date(year, month + 1, 0).getDate(),
    prevDaysMax: new Date(year, month, 0).getDate(),
    monthYearString: currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
  };

  return (
    <div className="w-full">
      <CalendarHeader 
        currentMonthYear={data.monthYearString}
        onToday={() => setCurrentDate(new Date())}
        onPrev={() => setCurrentDate(new Date(year, month - 1, 1))}
        onNext={() => setCurrentDate(new Date(year, month + 1, 1))}
      />

      <div className="bg-[#90E0EF] border-2 border-[#03045E] rounded-lg overflow-hidden shadow-inner">
        <CalendarDays days={days} />
        <CalendarGrid 
          year={year} 
          month={month} 
          firstDay={data.firstDay} 
          daysInMonth={data.daysInMonth} 
          prevDaysMax={data.prevDaysMax} 
        />
      </div>
    </div>
  );
};

export default Calendar;