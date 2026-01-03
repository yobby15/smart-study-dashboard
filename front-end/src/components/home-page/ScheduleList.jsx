import React from 'react';
import ScheduleCard from './ScheduleCard';

const ScheduleList = ({ data }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {data.map((item) => ( 
        <ScheduleCard 
          key={item.id} 
          title={item.title} 
          time={item.time} 
        />
      ))}
    </div>
  );
};

export default ScheduleList;