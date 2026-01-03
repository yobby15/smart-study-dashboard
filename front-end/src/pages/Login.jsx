import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NavigationUp from '../components/global/NavigationUp';
import LoginCard from '../components/login-page/LoginCard';
import LandingImage from '../assets/images/landing-image.png';
import ThemeContext from '../contexts/ThemeContext';

const Login = ({ onLogin }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <div
      style={{ backgroundImage: `url(${LandingImage})` }}
      className="w-screen h-screen bg-cover bg-center flex flex-col overflow-hidden relative"
    >
      <div 
        className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
          isDarkMode ? 'bg-black/50' : 'bg-transparent'
        }`} 
      />

      <div className="z-10 w-full h-full flex flex-col">
        <NavigationUp isLandingPage={true} />
        <div className="grow">
          <LoginCard onLogin={onLogin}/>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;