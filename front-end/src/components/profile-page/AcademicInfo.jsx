import React, { useContext } from 'react';
import { School, BookOpen, Users, GraduationCap, MapPin } from 'lucide-react';
import ContentCard from "../global/ContentCard";
import InfoRow from "./InfoRow";
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const AcademicInfo = ({ data }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const content = {
    id: {
      title: 'Informasi Akademik',
      program: 'Program Saat Ini',
      university: 'Asal Universitas',
      semester: 'Semester Saat Ini',
      mentor: 'Mentor Program',
      lecturer: 'Dosen Pembimbing',
      semesterPrefix: 'Semester'
    },
    en: {
      title: 'Academic Information',
      program: 'Current Program',
      university: 'University Origin',
      semester: 'Current Semester',
      mentor: 'Program Mentor',
      lecturer: 'Faculty Supervisor',
      semesterPrefix: 'Semester'
    }
  };

  const text = content[locale];

  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const titleColor = isDark ? 'text-blue-300' : 'text-[#03045E]';
  const borderColor = isDark ? 'border-blue-500' : 'border-[#00B4D8]';

  return (
    <ContentCard className={`${cardBg} p-5 rounded-2xl shadow-sm transition-colors duration-300`}>
      <h3 className={`text-lg font-bold ${titleColor} mb-4 pl-1 border-l-4 ${borderColor}`}>
        {text.title}
      </h3>

      <div className="flex flex-col">
        <InfoRow 
            icon={BookOpen} 
            label={text.program} 
            value={data.program} 
        />

        <InfoRow 
            icon={School} 
            label={text.university} 
            value={data.university} 
        />

        <InfoRow 
            icon={MapPin} 
            label={text.semester} 
            value={`${text.semesterPrefix} ${data.semester}`} 
        />

        <InfoRow 
            icon={Users} 
            label={text.mentor} 
            value={data.mentor} 
        />
        
        <InfoRow 
            icon={GraduationCap} 
            label={text.lecturer} 
            value={data.lecturer} 
        />
      </div>
    </ContentCard>
  );
};

export default AcademicInfo;