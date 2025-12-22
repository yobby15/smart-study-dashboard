import React from 'react';
import NavigationUp from '../components/global/NavigationUp';
import NavigationDown from '../components/global/NavigationDown';
import HomeComponent from '../components/home-page/HomeComponent'

const HomePage = ({ user }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp user={user} />
      
      <main className="flex-1 w-full">
        <HomeComponent user={user}/>
      </main>

      <NavigationDown />
    </div>
  );
};

export default HomePage;