import React, { useState } from 'react';

const AttendanceSection = ({ onEmojiSelect, onBack }) => {
  const [note, setNote] = useState("");
  const emojis = ["🙁", "😐", "🙂"];

  return (
    <div className="pt-2">
      <button 
        onClick={onBack}
        className="mb-4 text-[#03045E] text-xs font-bold underline hover:text-blue-700"
      >
        ← Back to Schedule
      </button>

      <div className="border-t border-[#03045E]/20 pt-4">
        <div className="flex justify-start space-x-6 mb-4">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => onEmojiSelect(emoji)}
              className="text-4xl grayscale hover:grayscale-0 transition-all active:scale-90"
            >
              {emoji}
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type here about today..."
          className="w-full h-32 p-4 bg-[#CAF0F8]/50 border border-[#03045E]/30 rounded-[20px] text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#48CAE4] resize-none"
        />

        <div className="mt-4 flex justify-center">
          <button className="bg-[#CAF0F8] border border-[#03045E] px-8 py-2 rounded-xl text-[#03045E] text-sm font-bold shadow-md hover:bg-[#48CAE4]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;