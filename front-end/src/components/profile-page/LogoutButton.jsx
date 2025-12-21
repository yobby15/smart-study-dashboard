import React from 'react';
import ContentCard from "../global/ContentCard";

const LogoutButton = () => {
  return (
    <ContentCard className="mt-4 bg-white p-1 rounded-2xl shadow-sm">
      <button className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
        </svg>
        Log Out
      </button>
    </ContentCard>
  );
};

export default LogoutButton;