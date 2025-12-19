import React from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import SectionContainer from "../components/global/SectionContainer";
import CalendarTab from '../components/schedule-page/Calendar';
import Title from '../components/global/Title';
import { Calendar } from 'lucide-react';

const SchedulePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp/>
      <Title 
        Title={"Schedule and Presence"}
        SubTitle={"Your schedule and presence during the program"}
        Icon={Calendar}
      />
      <SectionContainer>
        <CalendarTab/>
      </SectionContainer>
      <NavigationDown/>
    </div>
  );
};

export default SchedulePage;