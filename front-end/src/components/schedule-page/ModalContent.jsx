import React from 'react';
import ScheduleItem from './ScheduleItem';

const ModalContent = ({ schedules, onEditItem }) => {
  if (schedules.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-[#03045E]/20 rounded-xl">
        <p className="text-[#03045E]/50 italic">No schedule for today</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
      {schedules.map((item, index) => (
        <ScheduleItem 
          key={index} 
          title={item.title} 
          time={item.time} 
          onDelete={() => window.confirm(`Delete "${item.title}"?`)}
          onEdit={() => onEditItem(item)} 
        />
      ))}
    </div>
  );
};

export default ModalContent;