import React, { useContext } from 'react';
import NavigationUp from '../components/global/NavigationUp';
import NavigationDown from '../components/global/NavigationDown';
import HomeComponent from '../components/home-page/HomeComponent'
import ThemeContext from '../contexts/ThemeContext';

const HomePage = ({ user }) => {
  const { theme } = useContext(ThemeContext);
  
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-[#CAF0F8]';

  return (
    <div className={`w-full min-h-screen flex flex-col pb-24 transition-colors duration-300 ${bgClass}`}>
      <NavigationUp user={user} />
      
      <main className="flex-1 w-full">
        <HomeComponent user={user}/>
      </main>

      <NavigationDown />
    </div>
  );
};

export default HomePage;