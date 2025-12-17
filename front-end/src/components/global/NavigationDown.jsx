import React from 'react';
import { BookOpen, Notebook, Home, Calendar, BarChart2 } from 'lucide-react';

const NavigationDown = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0096C7] py-4 px-6 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center max-w-2xl mx-auto text-[#03045E]">
        <button className="hover:scale-110 transition-transform cursor-pointer">
          <BookOpen size={28} />
        </button>

        <button className="hover:scale-110 transition-transform cursor-pointer">
          <Notebook size={28} />
        </button>

        <button className="hover:scale-110 transition-transform cursor-pointer">
          <Home size={28} />
        </button>

        <button className="hover:scale-110 transition-transform cursor-pointer">
          <Calendar size={28} />
        </button>

        <button className="hover:scale-110 transition-transform cursor-pointer">
          <BarChart2 size={28} />
        </button>
      </div>
    </div>
  );
};

export default NavigationDown;