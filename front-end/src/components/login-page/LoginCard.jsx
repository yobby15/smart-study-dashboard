import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const LoginCard = ({ onLogin }) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [rememberMe, setRememberMe] = useState(false);
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const content = {
    id: {
      title: 'Masuk',
      emailLabel: 'Email',
      emailPlaceholder: 'Masukkan email anda',
      passwordLabel: 'Kata Sandi',
      passwordPlaceholder: '********',
      remember: 'Ingat selama 30 hari',
      button: 'Masuk',
      alertFeature: 'Fitur Reset Password akan mengirim link ke email Anda (Memerlukan Backend).'
    },
    en: {
      title: 'Login',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: '********',
      remember: 'Remember for 30 days',
      button: 'Login',
      alertFeature: 'Reset Password feature will send a link to your email (Requires Backend).'
    }
  };

  const isDarkMode = theme === 'dark';

  const cardStyle = isDarkMode
    ? "bg-black/40 border-white/10 shadow-black/50"
    : "bg-white/20 border-white/30 shadow-2xl";

  const textStyle = isDarkMode ? "text-white" : "text-[#03045E]";
  
  const inputStyle = isDarkMode
    ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#7B61FF]"
    : "bg-white text-black placeholder-gray-400 focus:outline-none";

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ email, password, rememberMe });
  };

  return (
    <div className="flex items-center justify-center min-h-screen -mt-10 md:mt-0"> 
      <div className={`w-11/12 md:w-112.5 backdrop-blur-md border rounded-[40px] p-8 md:p-10 flex flex-col transition-colors duration-300 ${cardStyle}`}>
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${textStyle}`}>
          {content[locale].title}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <label className={`font-semibold ml-1 ${textStyle}`}>
              {content[locale].emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder={content[locale].emailPlaceholder}
              className={`w-full p-3 rounded-xl shadow-inner transition-colors ${inputStyle}`}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={`font-semibold ml-1 ${textStyle}`}>
              {content[locale].passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder={content[locale].passwordPlaceholder}
              className={`w-full p-3 rounded-xl shadow-inner transition-colors ${inputStyle}`}
              required
            />
          </div>

          <div className={`flex flex-wrap justify-between items-center text-sm mt-2 px-1 gap-2 ${textStyle}`}>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="rounded cursor-pointer w-4 h-4 accent-[#7B61FF]" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              {content[locale].remember}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7B61FF] hover:bg-[#6A51E6] text-white font-bold py-3 rounded-xl mt-6 transition-all shadow-lg cursor-pointer transform active:scale-95"
          >
            {content[locale].button}
          </button>
        </form>
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginCard;