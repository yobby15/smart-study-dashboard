import React from 'react';
import { BookOpen, Notebook, Home, Calendar, BarChart2 } from 'lucide-react';

const NavigationDown = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0096C7] h-14 flex items-center shadow-[0_-4px_15px_rgba(0,0,0,0.15)] z-50">
      <div className="flex justify-around items-center w-full text-[#03045E]">
        <button className="flex-1 flex justify-center items-center hover:scale-110 transition-transform cursor-pointer">
          <BookOpen size={26} strokeWidth={2.5} />
        </button>

        <button className="flex-1 flex justify-center items-center hover:scale-110 transition-transform cursor-pointer">
          <Notebook size={26} strokeWidth={2.5} />
        </button>

        <button className="flex-1 flex justify-center items-center hover:scale-110 transition-transform cursor-pointer">
          <Home size={26} strokeWidth={2.5} />
        </button>

        <button className="flex-1 flex justify-center items-center hover:scale-110 transition-transform cursor-pointer">
          <Calendar size={26} strokeWidth={2.5} />
        </button>

        <button className="flex-1 flex justify-center items-center hover:scale-110 transition-transform cursor-pointer">
          <BarChart2 size={26} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default NavigationDown;