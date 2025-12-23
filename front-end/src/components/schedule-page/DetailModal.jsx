import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import AttendanceSection from './AttendanceSection';
import AddScheduleSection from './AddScheduleSection'; 
import { MONTH_NAMES } from '../../data/users';

const DetailModal = ({ isOpen, onClose, day, month, year, schedules, user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('none'); 
  const [editingItem, setEditingItem] = useState(null);

  if (!isOpen) return null;

  const formattedMonth = String(month + 1).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const dateKey = `${year}-${formattedMonth}-${formattedDay}`;

  const currentSchedules = Array.isArray(schedules) 
    ? schedules.filter(item => item.date === dateKey) 
    : [];
  
  const allAttendance = Array.isArray(user?.attendance) ? user.attendance : [];
  const todayAttendance = allAttendance.find(item => item.date === dateKey); 

  const dayName = new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long' });

  const handleDelete = (itemToDelete) => {
    const newGlobalSchedules = schedules.filter(item => item.id !== itemToDelete.id);
    onUpdateUser({ schedules: newGlobalSchedules });
  };

  const handleSaveSchedule = (itemData) => {
    let newGlobalSchedules = [...schedules];

    if (editingItem) {
      newGlobalSchedules = newGlobalSchedules.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...itemData, date: dateKey } 
          : item
      );
    } else {
      const newItem = {
        ...itemData,
        id: Date.now(), 
        date: dateKey   
      };
      newGlobalSchedules.push(newItem);
    }

    onUpdateUser({ schedules: newGlobalSchedules });
    setActiveTab('none');
    setEditingItem(null);
  };

  const handleSaveAttendance = (data) => {
    let newAttendanceList = [...allAttendance];
    const existingIndex = newAttendanceList.findIndex(item => item.date === dateKey);

    const attendanceData = { ...data, date: dateKey };

    if (existingIndex >= 0) {
      newAttendanceList[existingIndex] = { ...newAttendanceList[existingIndex], ...attendanceData };
    } else {
      newAttendanceList.push({ id: Date.now(), ...attendanceData });
    }

    onUpdateUser({ attendance: newAttendanceList });
  };

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
      className={`fixed inset-0 z-50 flex items-start justify-center pt-10 p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible bg-black/40 backdrop-blur-sm' : 'opacity-0 invisible'}`} 
      onClick={handleClose}
    >
      <div 
        className={`bg-[#90E0EF] rounded-[30px] shadow-2xl p-8 w-full max-w-lg border-2 border-[#03045E] relative overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        
        <ModalHeader monthName={MONTH_NAMES[month]} year={year} day={day} dayName={dayName} onClose={handleClose} onAddClick={handleAddClick} />

        <div className="relative mt-4 min-h-75">
          <div className={`transition-all duration-500 ${activeTab !== 'none' ? 'opacity-0 pointer-events-none scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
            <ModalContent 
                schedules={currentSchedules} 
                onEditItem={handleEditClick} 
                onDeleteItem={handleDelete}
            />
            <div className="mt-10 flex justify-center">
              <button onClick={() => setActiveTab('attendance')} className="bg-[#CAF0F8] border border-[#03045E] px-6 py-2 rounded-xl text-[#03045E] text-xs font-bold shadow-md hover:bg-[#48CAE4] transition-all active:scale-95">
                Click here for attendance..
              </button>
            </div>
          </div>

          <div className={`absolute inset-0 bg-[#90E0EF] transition-all duration-500 transform z-10 ${activeTab === 'add' ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'}`}>
            <AddScheduleSection 
              key={editingItem ? editingItem.id : 'new-form'}
              initialData={editingItem} 
              onSave={handleSaveSchedule}
              onBack={() => { setActiveTab('none'); setEditingItem(null); }}
            />
          </div>

          <div className={`absolute inset-0 bg-[#90E0EF] transition-all duration-500 transform z-10 ${activeTab === 'attendance' ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'}`}>
            <AttendanceSection 
              existingData={todayAttendance}
              onSubmit={handleSaveAttendance} 
              onBack={() => setActiveTab('none')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;