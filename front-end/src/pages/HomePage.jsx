import React from 'react';
import NavigationUp from '../components/global/NavigationUp';
import NavigationDown from '../components/global/NavigationDown';
import HomeComponent from '../components/home-page/HomeComponent'

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp />
      
      <main className="flex-1 w-full">
        <HomeComponent />
      </main>

      <NavigationDown />
    </div>
  );
};

export default HomePage;