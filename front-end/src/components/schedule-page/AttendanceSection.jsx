import React, { useState, useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const AttendanceSection = ({ onBack, onSubmit, existingData }) => {
  const [note, setNote] = useState(existingData?.note || "");
  const [selectedEmoji, setSelectedEmoji] = useState(existingData?.emoji || null);
  
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const content = {
    id: {
      back: '← Kembali ke Jadwal',
      alertEmoji: 'Pilih emoji dulu!',
      submitted: 'Sudah Absen!',
      time: 'Waktu',
      question: 'Bagaimana perasaanmu hari ini?',
      placeholder: 'Ceritakan harimu...',
      submitBtn: 'Kirim Absen'
    },
    en: {
      back: '← Back to Schedule',
      alertEmoji: 'Please select an emoji!',
      submitted: 'Attendance Submitted!',
      time: 'Time',
      question: 'How do you feel today?',
      placeholder: 'Tell us about your day...',
      submitBtn: 'Submit Attendance'
    }
  };

  const emojis = ["🙁", "😐", "🙂"];

  const handleSubmit = () => {
    if (!selectedEmoji) return alert(content[locale].alertEmoji);
    
    onSubmit({
      emoji: selectedEmoji,
      note: note,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
  };

  const textLink = isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-[#03045E] hover:text-blue-700";
  const textColor = isDarkMode ? "text-gray-100" : "text-[#03045E]";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-[#03045E]/50";
  
  const emojiBg = isDarkMode ? "bg-gray-700 border-gray-600" : "bg-[#CAF0F8] border-[#03045E]/10";
  const noteBox = isDarkMode ? "bg-gray-700/50 border-gray-600 text-gray-200" : "bg-white/40 border-[#03045E]/10 text-[#03045E]";
  
  const inputBg = isDarkMode ? "bg-gray-700/50 border-gray-600 text-gray-200 focus:ring-blue-500" : "bg-[#CAF0F8]/50 border-[#03045E]/30 text-[#03045E] focus:ring-[#48CAE4]";
  const btnSubmit = isDarkMode 
    ? "bg-gray-700 border-gray-500 text-white hover:bg-gray-600" 
    : "bg-[#CAF0F8] border-[#03045E] text-[#03045E] hover:bg-[#48CAE4]";

  if (existingData) {
    return (
      <div className="pt-2 h-full flex flex-col">
        <button onClick={onBack} className={`mb-4 text-xs font-bold underline self-start ${textLink}`}>
          {content[locale].back}
        </button>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className={`p-6 rounded-full shadow-inner border-2 scale-125 ${emojiBg}`}>
            <span className="text-6xl filter drop-shadow-lg block">{existingData.emoji}</span>
          </div>
          
          <div className="text-center space-y-2 max-w-[90%]">
            <h3 className={`font-bold text-lg ${textColor}`}>{content[locale].submitted}</h3>
            <div className={`p-4 rounded-xl border min-w-50 ${noteBox}`}>
               <p className="italic text-sm">"{existingData.note || "-"}"</p>
            </div>
            <span className={`text-[10px] block mt-2 ${subTextColor}`}>
              {content[locale].time}: {existingData.timestamp}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <button onClick={onBack} className={`mb-4 text-xs font-bold underline ${textLink}`}>
        {content[locale].back}
      </button>

      <div className={`border-t pt-4 ${isDarkMode ? 'border-gray-600' : 'border-[#03045E]/20'}`}>
        <h3 className={`font-bold text-sm mb-4 ml-1 ${textColor}`}>{content[locale].question}</h3>
        
        <div className="flex justify-start space-x-6 mb-6">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => setSelectedEmoji(emoji)}
              className={`text-4xl transition-all duration-200 active:scale-90 ${
                selectedEmoji === emoji 
                  ? "grayscale-0 scale-125 drop-shadow-md" 
                  : "grayscale opacity-50 hover:opacity-100 hover:grayscale-0"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={content[locale].placeholder}
          className={`w-full h-32 p-4 border rounded-[20px] focus:outline-none focus:ring-2 resize-none ${inputBg} ${isDarkMode ? 'placeholder-gray-500' : 'placeholder-[#03045E]/40'}`}
        />

        <div className="mt-4 flex justify-center">
          <button 
            onClick={handleSubmit}
            disabled={!selectedEmoji}
            className={`px-8 py-2 rounded-xl text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${btnSubmit}`}
          >
            {content[locale].submitBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;