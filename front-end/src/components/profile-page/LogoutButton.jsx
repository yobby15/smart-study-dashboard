import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContentCard from "../global/ContentCard";
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const LogoutButton = ({ onLogout }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const text = locale === 'id' ? 'Keluar' : 'Log Out';

  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const hoverBg = isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-50';

  return (
    <ContentCard className={`mt-4 ${cardBg} p-1 rounded-2xl shadow-sm transition-colors duration-300`}>
      <button 
        onClick={onLogout} 
        className={`w-full flex items-center justify-center gap-2 py-3 text-red-500 font-bold ${hoverBg} rounded-xl transition-colors`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
        </svg>
        {text}
      </button>
    </ContentCard>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;