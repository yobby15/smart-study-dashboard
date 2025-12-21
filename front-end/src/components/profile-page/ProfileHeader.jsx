import React from 'react';
import { User } from 'lucide-react';
import ContentCard from "../global/ContentCard";

const ProfileHeader = ({ name, id }) => {
  return (
    <ContentCard className="bg-white p-6 rounded-2xl shadow-sm mb-4 mt-4 flex flex-col items-center text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-[#0096C7] to-[#CAF0F8] opacity-20"></div>

      <div className="relative z-10 mt-4">
        <div className="w-28 h-28 bg-white p-1 rounded-full shadow-md mb-3 mx-auto">
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-[#0096C7]">
            <User size={48} className="text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#03045E]">{name}</h2>
        
        <p className="text-sm font-medium text-[#0077B6] bg-[#CAF0F8] px-3 py-1 rounded-full inline-block mt-1">
          ID: {id}
        </p>
      </div>
    </ContentCard>
  );
};

export default ProfileHeader;