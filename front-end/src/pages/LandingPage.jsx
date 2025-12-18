import React from 'react';
import NavigationUp from '../components/global/NavigationUp';
import LandingImage from '../assets/images/landing-image.png';
import ButtonLanding from '../components/landing-page/ButtonLanding';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    navigate('/login');
  }

  return (
    <div style={{ backgroundImage: `url(${LandingImage})`}} className="w-screen h-screen bg-cover bg-center flex flex-col">
      <NavigationUp isLandingPage={true}/>
      
      <div className="grow"> 
          <ButtonLanding onClick={handleGoToLogin}/>
      </div>
    </div>
  );
};

export default LandingPage;