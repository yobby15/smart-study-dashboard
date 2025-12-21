import React from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import SectionContainer from "../components/global/SectionContainer";
import ContentCard from "../components/global/ContentCard";
import Title from '../components/global/Title';
import { BookOpen } from 'lucide-react';
import ClassCard from '../components/class-page/ClassCard'; 

const ClassPage = () => {
  const classList = [
    { id: 1, title: "React Basics", percentage: 80 },
    { id: 2, title: "Javascript Advanced", percentage: 45 },
    { id: 3, title: "UI/UX Fundamental", percentage: 100 },
    { id: 4, title: "Backend with Node", percentage: 10 },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp />
      <Title 
        Title={"Task and Exercise"}
        SubTitle={"Your task and exercise during the program"}
        Icon={BookOpen}
      />
      <SectionContainer>
        {classList.map((item) => (
          <ContentCard key={item.id}>
            <ClassCard 
              title={item.title} 
              percentage={item.percentage} 
            />
          </ContentCard>
        ))}
      </SectionContainer>
      <NavigationDown />
    </div>
  );
};

export default ClassPage;