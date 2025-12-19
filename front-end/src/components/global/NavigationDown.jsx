import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Notebook, Home, Calendar, BarChart2 } from 'lucide-react';

const NavigationDown = () => {
  const navLinkStyles = ({ isActive }) => 
    `group relative flex-1 flex flex-col items-center justify-center h-full transition-all duration-300 ${
      isActive ? "text-white" : "text-white/50 hover:text-white"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#0096C7] h-16 flex items-center shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-50 border-t border-white/10">
      <div className="flex justify-around items-center w-full px-4 h-full">
        
        <NavLink to="/class" className={navLinkStyles}>
          <BookOpen size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">Class</span>
        </NavLink>

        <NavLink to="/task" className={navLinkStyles}>
          <Notebook size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">Task</span>
        </NavLink>

        <NavLink to="/home" className={navLinkStyles}>
          <div className="absolute -top-5 flex flex-col items-center">
            <div className="p-3 bg-[#03045E] rounded-full shadow-xl border-[6px] border-[#0096C7] group-hover:scale-105 transition-transform duration-300">
               <Home size={26} color="white" />
            </div>
            <span className="text-[10px] mt-1 font-bold uppercase tracking-wider text-white">Home</span>
          </div>
          <div className="h-10 w-10"></div>
        </NavLink>

        <NavLink to="/schedule" className={navLinkStyles}>
          <Calendar size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">Schedule</span>
        </NavLink>

        <NavLink to="/statistic" className={navLinkStyles}>
          <BarChart2 size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">Statistic</span>
        </NavLink>

      </div>
    </nav>
  );
};

export default NavigationDown;