import React, { useContext } from 'react';
import { User } from 'lucide-react';
import ContentCard from "../global/ContentCard";
import ThemeContext from '../../contexts/ThemeContext';

const ProfileHeader = ({ name, id_program }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const nameColor = isDark ? 'text-white' : 'text-[#03045E]';
  const idBg = isDark ? 'bg-gray-700' : 'bg-[#CAF0F8]';
  const idColor = isDark ? 'text-blue-300' : 'text-[#0077B6]';
  const gradientOverlay = isDark ? 'from-gray-900 to-gray-800' : 'from-[#0096C7] to-[#CAF0F8]';
  const avatarBorder = isDark ? 'border-blue-500' : 'border-[#0096C7]';
  const avatarBg = isDark ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <ContentCard className={`${cardBg} p-6 rounded-2xl shadow-sm mb-4 mt-4 flex flex-col items-center text-center relative overflow-hidden transition-colors duration-300`}>
      <div className={`absolute top-0 left-0 w-full h-24 bg-linear-to-b ${gradientOverlay} opacity-20`}></div>

      <div className="relative z-10 mt-4">
        <div className={`w-28 h-28 ${cardBg} p-1 rounded-full shadow-md mb-3 mx-auto transition-colors duration-300`}>
          <div className={`w-full h-full ${avatarBg} rounded-full flex items-center justify-center overflow-hidden border-4 ${avatarBorder}`}>
            <User size={48} className="text-gray-400" />
          </div>
        </div>

        <h2 className={`text-2xl font-bold ${nameColor}`}>{name}</h2>
        
        <p className={`text-sm font-medium ${idColor} ${idBg} px-3 py-1 rounded-full inline-block mt-1`}>
          ID: {id_program}
        </p>
      </div>
    </ContentCard>
  );
};

export default ProfileHeader;