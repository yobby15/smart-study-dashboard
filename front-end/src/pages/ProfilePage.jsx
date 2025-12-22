import React, { useEffect } from 'react'; 
import PropTypes from 'prop-types'; 
import NavigationUp from "../components/global/NavigationUp";
import SectionContainer from "../components/global/SectionContainer";
import ProfileHeader from "../components/profile-page/ProfileHeader";
import AcademicInfo from "../components/profile-page/AcademicInfo";
import LogoutButton from "../components/profile-page/LogoutButton";

const ProfilePage = ({ onLogout, user }) => {
  useEffect(() => {
    if (!user) {
      onLogout();
    }
  }, [user, onLogout]);

  if (!user) {
      return null; 
  }

  const userProfileData = {
    name: user.name,
    id_program: user.id_program, 
    program: user.program,
    university: user.university,
    semester: user.semester,
    mentor: user.mentor,
    lecturer: user.lecturer,
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp user={user} />
      
      <SectionContainer>

        <ProfileHeader 
          name={userProfileData.name} 
          id_program={userProfileData.id_program} 
        />

        <AcademicInfo 
          data={userProfileData} 
        />

        <LogoutButton onLogout={onLogout} />

      </SectionContainer>
    </div>
  );
};

ProfilePage.propTypes = {
  onLogout: PropTypes.func.isRequired,

  currentUser: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    nim: PropTypes.string,
    program: PropTypes.string,
    university: PropTypes.string,
    semester: PropTypes.number,
    mentor: PropTypes.string,
    lecturer: PropTypes.string,
  }),
};

export default ProfilePage;