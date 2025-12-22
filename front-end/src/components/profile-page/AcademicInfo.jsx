import React from 'react';
import { School, BookOpen, Users, GraduationCap, MapPin } from 'lucide-react';
import ContentCard from "../global/ContentCard";
import InfoRow from "./InfoRow";

const AcademicInfo = ({ data }) => {
  return (
    <ContentCard className="bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="text-lg font-bold text-[#03045E] mb-4 pl-1 border-l-4 border-[#00B4D8]">
        Academic Information
      </h3>

      <div className="flex flex-col">
        <InfoRow 
            icon={BookOpen} 
            label="Current Program" 
            value={data.program} 
        />

        <InfoRow 
            icon={School} 
            label="University Origin" 
            value={data.university} 
        />

        <InfoRow 
            icon={MapPin} 
            label="Current Semester" 
            value={`Semester ${data.semester}`} 
        />

        <InfoRow 
            icon={Users} 
            label="Program Mentor" 
            value={data.mentor} 
        />
        
        <InfoRow 
            icon={GraduationCap} 
            label="Faculty Supervisor" 
            value={data.lecturer} 
        />
      </div>
    </ContentCard>
  );
};

export default AcademicInfo;