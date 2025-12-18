import React from 'react';
import SectionContainer from '../global/SectionContainer';
import ScheduleList from './ScheduleList';

const ScheduleHome = () => {
  const mySchedules = [
    { title: "Modul Perangkat Lunak", time: "08.00 - 10.00" },
    { title: "Modul Perangkat Keras", time: "10.00 - 12.00" },
    { title: "Meet Soft Skill 1", time: "13.00 - 15.00" },
    { title: "Exercise Soft Skill 1", time: "15.00 - 17.00" },
  ];

  return (
    <div>
      <SectionContainer title="My Today's Schedule" subtitle="Monday 01-01-2026">
        <ScheduleList data={mySchedules}/>
      </SectionContainer>
    </div>
  );

};

export default ScheduleHome;