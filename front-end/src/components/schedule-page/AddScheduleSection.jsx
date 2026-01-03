import React, { useState, useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const AddScheduleSection = ({ initialData, onSave, onBack }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  
  const [startTime, setStartTime] = useState(() => {
    if (!initialData?.startTime || initialData.startTime === 'All Day') return '';
    return initialData.startTime;
  });

  const [endTime, setEndTime] = useState(initialData?.endTime || '');
  
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  
  const activeLocale = locale || 'id';
  const isDarkMode = theme === 'dark';

  const content = {
    id: {
      activityLabel: 'Aktivitas',
      activityPlaceholder: 'Contoh: Belajar React Native',
      timeLabel: 'Waktu (Mulai - Selesai)',
      cancel: 'Batal',
      save: 'Simpan',
      update: 'Perbarui',
      back: '← Kembali'
    },
    en: {
      activityLabel: 'Activity',
      activityPlaceholder: 'Ex: Learn React Native',
      timeLabel: 'Time (Start - End)',
      cancel: 'Cancel',
      save: 'Save',
      update: 'Update',
      back: '← Back'
    }
  };

  const text = content[activeLocale];

  const handleSubmit = () => {
    if (!title.trim()) {
      return alert(activeLocale === 'id' ? 'Judul harus diisi' : 'Title is required');
    }
    
    onSave({
      title,
      startTime: startTime || "All Day",
      endTime: endTime || ""
    });
  };

  const onTitleChange = (e) => setTitle(e.target.value);
  const onStartTimeChange = (e) => setStartTime(e.target.value);
  const onEndTimeChange = (e) => setEndTime(e.target.value);

  const labelColor = isDarkMode ? "text-gray-300" : "text-[#03045E]";
  const inputBg = isDarkMode 
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500" 
    : "bg-[#CAF0F8] border-[#03045E]/30 text-[#03045E] placeholder-[#03045E]/50 focus:ring-[#48CAE4]";
  const btnSaveBg = isDarkMode 
    ? "bg-blue-600 hover:bg-blue-500 text-white border-transparent"
    : "bg-[#03045E] hover:bg-[#020344] text-white border-[#03045E]";
  const linkColor = isDarkMode ? "text-blue-400" : "text-[#03045E]";

  return (
    <div className="pt-2 h-full flex flex-col">
      <button onClick={onBack} className={`mb-4 text-xs font-bold underline self-start hover:opacity-80 ${linkColor}`}>
        {text.back}
      </button>

      <div className={`flex-1 flex flex-col gap-4 overflow-y-auto px-1 pb-2 custom-scrollbar`}>
        <div className="flex flex-col gap-1">
          <label className={`font-bold text-xs ml-1 ${labelColor}`}>
            {text.timeLabel}
          </label>
          <div className="flex items-center gap-2">
            <input 
              type="time" 
              value={startTime}
              onChange={onStartTimeChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${inputBg}`}
            />
            <span className={labelColor}>-</span>
            <input 
              type="time" 
              value={endTime}
              onChange={onEndTimeChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${inputBg}`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={`font-bold text-xs ml-1 ${labelColor}`}>
             {text.activityLabel}
          </label>
          <textarea
            value={title}
            onChange={onTitleChange}
            placeholder={text.activityPlaceholder}
            className={`w-full h-32 p-4 rounded-xl border focus:outline-none focus:ring-2 resize-none transition-all ${inputBg}`}
          />
        </div>

        <button 
          onClick={handleSubmit}
          className={`w-full py-3 mt-4 rounded-xl font-bold border shadow-md transition-all active:scale-95 ${btnSaveBg}`}
        >
          {initialData ? text.update : text.save}
        </button>
      </div>
    </div>
  );
};

export default AddScheduleSection;