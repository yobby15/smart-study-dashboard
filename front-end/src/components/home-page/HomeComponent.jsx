import React from 'react';
import Title from './Title';
import ScheduleHome from './ScheduleHome';
import ProgressHome from './ProgressHome';

const HomeComponent = () => {
  return (
    <div>
      <Title/>
      <ScheduleHome/>
      <ProgressHome/>
    </div>
  );
};

export default HomeComponent;