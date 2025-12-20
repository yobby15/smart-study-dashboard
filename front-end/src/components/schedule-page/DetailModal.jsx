import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import AttendanceSection from './AttendanceSection';
import AddScheduleSection from './AddScheduleSection'; 
import { DAILY_SCHEDULES, MONTH_NAMES } from '../../data/users';

const DetailModal = ({ isOpen, onClose, day, month, year }) => {
  const [activeTab, setActiveTab] = useState('none'); 
  const [editingItem, setEditingItem] = useState(null);

  if (!isOpen) return null;

  const currentSchedules = DAILY_SCHEDULES[day] || [];
  const dayName = new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long' });

  const handleEditClick = (item) => {
    setEditingItem(item); 
    setActiveTab('add');  
  };

  const handleAddClick = () => {
    setEditingItem(null); 
    setActiveTab('add');
  };

  const handleClose = () => {
    setActiveTab('none');
    setEditingItem(null);
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible bg-black/40 backdrop-blur-sm' : 'opacity-0 invisible'}`} 
      onClick={handleClose}
    >
      <div 
        className={`bg-[#90E0EF] rounded-[30px] shadow-2xl p-8 w-full max-w-lg border-2 border-[#03045E] relative overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        
        <ModalHeader 
          monthName={MONTH_NAMES[month]} 
          year={year} 
          day={day} 
          dayName={dayName} 
          onClose={handleClose} 
          onAddClick={handleAddClick} 
        />

        <div className="relative mt-4 min-h-100">
          <div className={`transition-all duration-500 ${activeTab !== 'none' ? 'opacity-0 pointer-events-none scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
            <ModalContent 
              schedules={currentSchedules} 
              onEditItem={handleEditClick} 
            />
            <div className="mt-10 flex justify-center">
              <button 
                onClick={() => setActiveTab('attendance')}
                className="bg-[#CAF0F8] border border-[#03045E] px-6 py-2 rounded-xl text-[#03045E] text-xs font-bold shadow-md hover:bg-[#48CAE4] transition-all active:scale-95"
              >
                Click here for attendance..
              </button>
            </div>
          </div>

          <div className={`absolute inset-0 bg-[#90E0EF] transition-all duration-500 transform z-10 ${activeTab === 'add' ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'}`}>
            <AddScheduleSection 
              initialData={editingItem} 
              onBack={() => {
                setActiveTab('none');
                setEditingItem(null);
              }}
              key={editingItem ? `edit-${editingItem.title}-${editingItem.time}` : 'add-new-item'} 
            />
          </div>

          <div className={`absolute inset-0 bg-[#90E0EF] transition-all duration-500 transform z-10 ${activeTab === 'attendance' ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'}`}>
            <AttendanceSection 
              onEmojiSelect={(emoji) => console.log(emoji)} 
              onBack={() => setActiveTab('none')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;