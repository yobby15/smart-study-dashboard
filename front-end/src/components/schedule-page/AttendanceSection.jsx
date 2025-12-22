import React, { useState } from 'react';

const AttendanceSection = ({ onBack, onSubmit, existingData }) => {
  const [note, setNote] = useState(existingData?.note || "");
  const [selectedEmoji, setSelectedEmoji] = useState(existingData?.emoji || null);
  
  const emojis = ["🙁", "😐", "🙂"];

  const handleSubmit = () => {
    if (!selectedEmoji) return alert("Pilih emoji dulu!");
    
    onSubmit({
      emoji: selectedEmoji,
      note: note,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
  };

  if (existingData) {
    return (
      <div className="pt-2 h-full flex flex-col">
        <button onClick={onBack} className="mb-4 text-[#03045E] text-xs font-bold underline hover:text-blue-700 self-start">
          ← Back to Schedule
        </button>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="bg-[#CAF0F8] p-6 rounded-full shadow-inner border-2 border-[#03045E]/10 scale-125">
            <span className="text-6xl filter drop-shadow-lg block">{existingData.emoji}</span>
          </div>
          
          <div className="text-center space-y-2 max-w-[90%]">
            <h3 className="text-[#03045E] font-bold text-lg">Sudah Absen!</h3>
            <div className="bg-white/40 p-4 rounded-xl border border-[#03045E]/10 min-w-50">
               <p className="text-[#03045E] italic text-sm">"{existingData.note || "-"}"</p>
            </div>
            <span className="text-[10px] text-[#03045E]/50 block mt-2">
              Time: {existingData.timestamp}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <button onClick={onBack} className="mb-4 text-[#03045E] text-xs font-bold underline hover:text-blue-700">
        ← Back to Schedule
      </button>

      <div className="border-t border-[#03045E]/20 pt-4">
        <h3 className="text-[#03045E] font-bold text-sm mb-4 ml-1">Bagaimana perasaanmu hari ini?</h3>
        
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
          placeholder="Ceritakan harimu..."
          className="w-full h-32 p-4 bg-[#CAF0F8]/50 border border-[#03045E]/30 rounded-[20px] text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#48CAE4] resize-none placeholder-[#03045E]/40"
        />

        <div className="mt-4 flex justify-center">
          <button 
            onClick={handleSubmit}
            disabled={!selectedEmoji}
            className="bg-[#CAF0F8] border border-[#03045E] px-8 py-2 rounded-xl text-[#03045E] text-sm font-bold shadow-md hover:bg-[#48CAE4] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Absen
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;