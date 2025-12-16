import React from 'react';
import Navbar from '../components/global/NavigationUp';
import LandingImage from '../assets/images/landing-image.png';
import ButtonLanding from '../components/landing-page/ButtonLanding';

const LandingPage = () => {
  return (
    <div style={{ backgroundImage: `url(${LandingImage})`}} className="w-screen h-screen bg-cover bg-center flex flex-col">
      <Navbar isLandingPage={true} />
      
      <div className="flex-grow"> 
          <ButtonLanding/>
      </div>
    </div>
  );
}

export default LandingPage;