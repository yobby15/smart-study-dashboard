import React from 'react';

const ButtonLanding = ({ onClick }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        onClick={onClick}
        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-[40px] text-[#03045E] font-bold py-4 px-12 text-[30px] shadow-lg italic w-150 h-20 transition-all duration-300 hover:scale-105 hover:bg-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
      >
        Start your journey
      </button>
    </div>
  );
};

export default ButtonLanding;