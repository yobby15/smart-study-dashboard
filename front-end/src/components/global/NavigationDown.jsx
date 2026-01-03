import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Notebook, Home, Calendar, BarChart2 } from 'lucide-react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const NavigationDown = () => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const content = {
    id: {
      class: 'Kelas',
      task: 'Tugas',
      home: 'Beranda',
      schedule: 'Jadwal',
      statistic: 'Statistik',
    },
    en: {
      class: 'Class',
      task: 'Task',
      home: 'Home',
      schedule: 'Schedule',
      statistic: 'Statistic',
    }
  };

  const isDarkMode = theme === 'dark';

  const navBgClass = isDarkMode 
    ? "bg-[#1f2937] border-white/5" 
    : "bg-[#0096C7] border-white/10"; 

  const homeCircleClass = isDarkMode
    ? "bg-[#0096C7] border-[#1f2937]" 
    : "bg-[#03045E] border-[#0096C7]"; 

  const navLinkStyles = ({ isActive }) => 
    `group relative flex-1 flex flex-col items-center justify-center h-full transition-all duration-300 ${
      isActive 
        ? (isDarkMode ? "text-[#0096C7]" : "text-white") 
        : (isDarkMode ? "text-gray-400 hover:text-white" : "text-white/50 hover:text-white")
    }`;

  return (
    <nav className={`fixed bottom-0 left-0 w-full h-16 flex items-center shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-50 border-t transition-colors duration-300 ${navBgClass}`}>
      <div className="flex justify-around items-center w-full px-4 h-full">
        
        <NavLink to="/class" className={navLinkStyles}>
          <BookOpen size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">
            {content[locale].class}
          </span>
        </NavLink>

        <NavLink to="/task" className={navLinkStyles}>
          <Notebook size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">
            {content[locale].task}
          </span>
        </NavLink>

        <NavLink to="/home" className={navLinkStyles}>
          <div className="absolute -top-5 flex flex-col items-center">
            <div className={`p-3 rounded-full shadow-xl border-[6px] group-hover:scale-105 transition-all duration-300 ${homeCircleClass}`}>
               <Home size={26} color="white" />
            </div>
            <span className={`text-[10px] mt-1 font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>
              {content[locale].home}
            </span>
          </div>
          <div className="h-10 w-10"></div>
        </NavLink>

        <NavLink to="/schedule" className={navLinkStyles}>
          <Calendar size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">
            {content[locale].schedule}
          </span>
        </NavLink>

        <NavLink to="/statistic" className={navLinkStyles}>
          <BarChart2 size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">
            {content[locale].statistic}
          </span>
        </NavLink>

      </div>
    </nav>
  );
};

export default NavigationDown;