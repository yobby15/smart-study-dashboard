import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const ButtonLanding = ({ onClick }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const content = {
    id: 'Mulai perjalananmu',
    en: 'Start your journey'
  };

  const isDarkMode = theme === 'dark';

  const buttonStyle = isDarkMode
    ? "bg-black/40 border-white/10 text-white hover:bg-black/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
    : "bg-white/20 border-white/30 text-[#03045E] hover:bg-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]";

  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        onClick={onClick}
        className={`
          backdrop-blur-md border rounded-[40px] font-bold py-4 px-12 
          text-xl md:text-[30px] shadow-lg italic w-auto md:w-150 h-auto md:h-20 
          transition-all duration-300 hover:scale-105 active:scale-95
          ${buttonStyle}
        `}
      >
        {content[locale]}
      </button>
    </div>
  );
};

export default ButtonLanding;