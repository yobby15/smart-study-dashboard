import React from 'react';
import NavigationUp from '../components/global/NavigationUp';
import NavigationDown from '../components/global/NavigationDown';

const HomePage = ({ onClick }) => {
  return (
    <div>
      <NavigationUp />
      <NavigationDown />
    </div>
  );
};

export default HomePage;