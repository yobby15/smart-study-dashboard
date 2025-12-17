import React from 'react';
import NavigationUp from '../components/global/NavigationUp';
import LoginBox from '../components/login/LoginBox';
import LandingImage from '../assets/images/landing-image.png';

const Login = () => {
  return (
    <div style={{ backgroundImage: `url(${LandingImage})`}} className="w-screen h-screen bg-cover bg-center flex flex-col overflow-hidden">
      <NavigationUp isLandingPage={true}/>
      <div className="grow"> 
          <LoginBox/>
      </div>
    </div>
  );
};

export default Login;