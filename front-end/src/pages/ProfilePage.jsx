import React from 'react';
import NavigationUp from "../components/global/NavigationUp";
import SectionContainer from "../components/global/SectionContainer";
import ProfileHeader from "../components/profile-page/ProfileHeader";
import AcademicInfo from "../components/profile-page/AcademicInfo";
import LogoutButton from "../components/profile-page/LogoutButton";

const ProfilePage = () => {
  const userProfile = {
    name: "User",
    id: "M202512345", 
    program: "Front-End Web Development with React",
    university: "Universitas Teknologi Digital",
    semester: 6,
    mentor: "Kak Budi Santoso",
    dosen: "Dr. Siti Aminah, M.Kom"
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp />
      
      <SectionContainer>

        <ProfileHeader 
          name={userProfile.name} 
          id={userProfile.id} 
        />

        <AcademicInfo 
          data={userProfile} 
        />

        <LogoutButton />

      </SectionContainer>
    </div>
  );
};

export default ProfilePage;