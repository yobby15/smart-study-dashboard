import React, { useEffect, useContext } from 'react'; 
import PropTypes from 'prop-types'; 
import NavigationUp from "../components/global/NavigationUp";
import SectionContainer from "../components/global/SectionContainer";
import ProfileHeader from "../components/profile-page/ProfileHeader";
import AcademicInfo from "../components/profile-page/AcademicInfo";
import LogoutButton from "../components/profile-page/LogoutButton";
import ThemeContext from '../contexts/ThemeContext';

const ProfilePage = ({ onLogout, user }) => {
  const { theme } = useContext(ThemeContext);

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

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-[#CAF0F8]';

  return (
    <div className={`w-full min-h-screen flex flex-col pb-24 transition-colors duration-300 ${bgClass}`}>
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
  user: PropTypes.object
};

export default ProfilePage;