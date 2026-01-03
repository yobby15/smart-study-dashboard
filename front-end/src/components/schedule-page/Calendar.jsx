import React, { useState, useContext } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarGrid from './CalendarGrid';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const Calendar = ({ user, schedules, onAddSchedule, onDeleteSchedule, onEditSchedule, attendances, onSaveAttendance }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthYearString = currentDate.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' });

  const data = {
    firstDay: new Date(year, month, 1).getDay(),
    daysInMonth: new Date(year, month + 1, 0).getDate(),
    prevDaysMax: new Date(year, month, 0).getDate(),
    monthYearString: monthYearString
  };

  const containerClass = isDarkMode
    ? "bg-gray-800 border-gray-600 shadow-black/50"
    : "bg-[#90E0EF] border-[#03045E] shadow-inner";

  return (
    <div className="w-full">
      <CalendarHeader 
        currentMonthYear={data.monthYearString}
        onToday={() => setCurrentDate(new Date())}
        onPrev={() => setCurrentDate(new Date(year, month - 1, 1))}
        onNext={() => setCurrentDate(new Date(year, month + 1, 1))}
      />

      <div className={`border-2 rounded-lg overflow-hidden transition-colors ${containerClass}`}>
        <CalendarDays />

        <CalendarGrid 
          year={year} 
          month={month} 
          firstDay={data.firstDay} 
          daysInMonth={data.daysInMonth} 
          prevDaysMax={data.prevDaysMax} 
          user={user}
          schedules={schedules}
          attendances={attendances}
          onAddSchedule={onAddSchedule}
          onDeleteSchedule={onDeleteSchedule}
          onEditSchedule={onEditSchedule}
          onSaveAttendance={onSaveAttendance}
        />
      </div>
    </div>
  );
};

export default Calendar;