import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import logo from '../../assets/images/logo.svg';

const NavigationUp = ({ isLandingPage = false }) => {
  return (
    <nav
      className={`
      w-full px-8 py-4 flex justify-between items-center transition-all duration-300
      ${
        isLandingPage
          ? 'bg-[#0096C7]/80 backdrop-blur-sm'
          : 'bg-[#0096C7] backdrop-blur-none'
      }
    `}
    >
      <div className="flex-1">
        <h1 className="font-bold text-lg md:text-xl  text-[#03045E]">
          Smart Study Assistant
        </h1>
      </div>

      <div className="flex-1 flex justify-center items-center gap-2">
        <img src={logo} alt="Vivian Logo" />
      </div>

      <div className="flex-1 flex justify-end items-center gap-6">
        <button className="flex items-center gap-1 font-medium hover:opacity-75 transition">
          <span className="text-sm text-[#03045E]">EN</span>
          <ChevronDown size={16} strokeWidth={3} className="text-[#03045E]" />
        </button>

        <button className="flex items-center gap-2 font-medium hover:opacity-75 transition">
          <User size={20} className="text-[#03045E]" />
          <span className="text-[#03045E]">
            {isLandingPage ? 'Login' : 'User'}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default NavigationUp;