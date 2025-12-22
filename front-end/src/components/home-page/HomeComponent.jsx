import React from 'react';
import Title from './Title';
import ScheduleHome from './ScheduleHome';
import ProgressHome from './ProgressHome';

const HomeComponent = ({ user }) => {
  return (
    <div>
      <Title/>
      <ScheduleHome user={user}/>
      <ProgressHome user={user}/>
    </div>
  );
};

export default HomeComponent;