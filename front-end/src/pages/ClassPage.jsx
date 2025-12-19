import React from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import SectionContainer from "../components/global/SectionContainer";
import ContentCard from "../components/global/ContentCard";

const ClassPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp />
      <SectionContainer>
        <ContentCard></ContentCard>
      </SectionContainer>
      <NavigationDown />
    </div>
  );
};

export default ClassPage;