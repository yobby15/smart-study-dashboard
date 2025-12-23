import React from 'react';
import ScheduleItem from './ScheduleItem';

const ModalContent = ({ schedules, onEditItem, onDeleteItem }) => {
  if (schedules.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-[#03045E]/20 rounded-xl">
        <p className="text-[#03045E]/50 italic">No schedule for today</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
      {schedules.map((item) => { 
        const displayTime = item.startTime === "All Day" 
          ? "All Day" 
          : `${item.startTime} - ${item.endTime}`;

        return (
          <ScheduleItem 
            key={item.id} 
            title={item.title} 
            time={displayTime} 
            
            onDelete={() => {
              if (window.confirm(`Delete "${item.title}"?`)) {
                onDeleteItem(item);
              }
            }}
            
            onEdit={() => onEditItem(item)} 
          />
        );
      })}
    </div>
  );
};

export default ModalContent;