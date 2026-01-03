import React, { useState, useContext } from 'react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import AttendanceSection from './AttendanceSection';
import AddScheduleSection from './AddScheduleSection'; 
import ThemeContext from '../../contexts/ThemeContext';
import LocaleContext from '../../contexts/LocaleContext';

const DetailModal = ({ isOpen, onClose, day, month, year, schedules, onAddSchedule, onDeleteSchedule, onEditSchedule, attendances, onSaveAttendance }) => {
  const [activeTab, setActiveTab] = useState('none'); 
  const [editingItem, setEditingItem] = useState(null);
  
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  const isDarkMode = theme === 'dark';

  if (!isOpen) return null;

  const dateObject = new Date(year, month, day);
  const formattedMonth = String(month + 1).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const dateKey = `${year}-${formattedMonth}-${formattedDay}`;

  const dayName = dateObject.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { weekday: 'long' });
  const monthName = dateObject.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { month: 'long' });
  const attendanceButtonText = locale === 'id' ? 'Klik di sini untuk absensi..' : 'Click here for attendance..';

  const currentSchedules = Array.isArray(schedules) ? schedules.filter(item => item.date === dateKey) : [];
  const allAttendance = Array.isArray(attendances) ? attendances : [];
  const todayAttendance = allAttendance.find(item => item.date === dateKey);

  const handleDelete = async (itemToDelete) => {
    const confirmMsg = locale === 'id' 
      ? `Anda yakin ingin menghapus "${itemToDelete.title}"?`
      : `Are you sure delete "${itemToDelete.title}"?`;
      
    if(window.confirm(confirmMsg)){
       await onDeleteSchedule(itemToDelete.id);
    }
  };

  const handleSaveSchedule = async (itemData) => {
    const scheduleData = {
      title: itemData.title,
      startTime: itemData.startTime,
      endTime: itemData.endTime,
      date: dateKey 
    };

    let success = false;
    if (editingItem) {
      success = await onEditSchedule(editingItem.id, scheduleData);
    } else {
      success = await onAddSchedule(scheduleData);
    }

    if (success) {
      setActiveTab('none');
      setEditingItem(null);
    }
  };

  const handleSubmitAttendance = async (data) => {
    const attendanceData = { ...data, date: dateKey };
    const success = await onSaveAttendance(attendanceData);
    if (success) setActiveTab('none'); 
  };

  const handleClose = () => {
    setActiveTab('none');
    setEditingItem(null);
    onClose();
  };

  const modalBg = isDarkMode ? "bg-gray-800 border-gray-600" : "bg-[#90E0EF] border-[#03045E]";
  const btnAttBg = isDarkMode ? "bg-gray-700 text-white border-gray-500 hover:bg-gray-600" : "bg-[#CAF0F8] text-[#03045E] border-[#03045E] hover:bg-[#48CAE4]";

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-start justify-center pt-10 p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible bg-black/60 backdrop-blur-sm' : 'opacity-0 invisible'}`} 
      onClick={handleClose}
    >
      <div 
        className={`rounded-[30px] shadow-2xl p-8 w-full max-w-lg border-2 relative overflow-hidden transition-all duration-300 transform ${modalBg} ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader 
          monthName={monthName} 
          year={year} 
          day={day} 
          dayName={dayName} 
          onClose={handleClose} 
          onAddClick={() => { setEditingItem(null); setActiveTab('add'); }} 
        />

        <div className="mt-4 min-h-75 flex flex-col pb-24">
          {activeTab === 'none' && (
            <div className="animate-fade-in">
               <ModalContent 
                  schedules={currentSchedules} 
                  onEditItem={(item) => { setEditingItem(item); setActiveTab('add'); }} 
                  onDeleteItem={handleDelete}
              />
              <div className="mt-8 flex justify-center pb-2">
                <button onClick={() => setActiveTab('attendance')} className={`px-6 py-2 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 border ${btnAttBg}`}>
                  {attendanceButtonText}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <div className="animate-fade-in h-full">
              <AddScheduleSection 
                key={editingItem ? editingItem.id : 'new-form'}
                initialData={editingItem} 
                onSave={handleSaveSchedule}
                onBack={() => { setActiveTab('none'); setEditingItem(null); }}
              />
            </div>
          )}

          {activeTab === 'attendance' && (
             <div className="animate-fade-in h-full">
              <AttendanceSection 
                existingData={todayAttendance} 
                onSubmit={handleSubmitAttendance} 
                onBack={() => setActiveTab('none')} 
              />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default DetailModal;