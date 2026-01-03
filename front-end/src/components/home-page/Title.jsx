import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const Title = ({ user }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const userName = user?.name ? user.name.split(' ')[0] : 'User';

  const content = {
    id: `Selamat datang kembali, ${userName}. Siap belajar lebih cerdas hari ini?`,
    en: `Welcome back, ${userName}. Ready to learn smarter today?`
  };

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#03045E]';

  return (
    <h1 className={`text-[24px] md:text-[28px] px-6 md:px-10 pt-5 font-semibold leading-tight transition-colors ${textColor}`}>
      {content[locale]}
    </h1>
  )
}

export default Title;