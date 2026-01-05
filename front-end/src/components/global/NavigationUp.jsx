import React, { useContext } from 'react';
import { User, ChevronDown, Sun, Moon } from 'lucide-react';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const NavigationUp = ({ isLandingPage = false, user }) => {
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const getDisplayName = () => {
    if (!user || !user.name) return 'User';
    return user.name.split(' ')[0]; 
  };

  const isDarkMode = theme === 'dark';

  const textColorClass = isDarkMode ? "text-white" : "text-[#03045E]";

  const getBgClass = () => {
    if (isDarkMode) {
      return isLandingPage 
        ? 'bg-[#1f2937]/80 backdrop-blur-sm' 
        : 'bg-[#1f2937] backdrop-blur-none';
    } else {
      return isLandingPage
        ? 'bg-[#0096C7]/80 backdrop-blur-sm'
        : 'bg-[#0096C7] backdrop-blur-none';
    }
  };

  return (
    <nav
      className={`
      w-full px-6 py-2.5 flex justify-between items-center transition-all duration-300
      ${getBgClass()}
    `}
    >
      <div className="flex-1">
        <h1 className={`font-bold text-base md:text-lg leading-tight ${textColorClass}`}>
          Smart Study Dashboard
        </h1>
      </div>

      <Link to="/" className="hover:opacity-80 transition">
        <img src={logo} alt="Vivian Logo" className="h-6 w-auto" />
      </Link>

      <div className="flex-1 flex justify-end items-center gap-4">
        <button 
          onClick={toggleTheme}
          className={`flex items-center gap-2 font-medium hover:opacity-75 transition mr-2 ${textColorClass}`}
        >
          {theme === 'light' ? (
             <Sun size={20} className={textColorClass} />
          ) : (
             <Moon size={20} className={textColorClass} />
          )}
        </button>

        <button 
          onClick={toggleLocale}
          className="flex items-center gap-0.5 font-medium hover:opacity-75 transition"
        >
          <span className={`text-xs uppercase ${textColorClass}`}>{locale}</span>
          <ChevronDown size={14} strokeWidth={3} className={textColorClass} />
        </button>

        <button className="flex items-center gap-1.5 font-medium hover:opacity-75 transition">
          <Link 
            to={isLandingPage ? '/login' : '/profile'} 
            className="flex items-center gap-1.5 font-medium hover:opacity-75 transition"
          >
            <User size={18} className={textColorClass} />
            <span className={`text-sm ${textColorClass}`}>
              {isLandingPage ? (locale === 'id' ? 'Masuk' : 'Login') : getDisplayName()}
            </span>
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default NavigationUp;