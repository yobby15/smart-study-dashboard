import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const NavigationUp = ({ isLandingPage = false, user }) => {
  const getDisplayName = () => {
    if (!user || !user.name) return 'User';
    
    return user.name.split(' ')[0]; 
  };

  return (
    <nav
      className={`
      w-full px-6 py-2.5 flex justify-between items-center transition-all duration-300
      ${
        isLandingPage
          ? 'bg-[#0096C7]/80 backdrop-blur-sm'
          : 'bg-[#0096C7] backdrop-blur-none'
      }
    `}
    >
      <div className="flex-1">
        <h1 className="font-bold text-base md:text-lg text-[#03045E] leading-tight">
          Smart Study Assistant
        </h1>
      </div>

      <Link to="/" className="hover:opacity-80 transition">
        <img src={logo} alt="Vivian Logo" className="h-6 w-auto" />
      </Link>

      <div className="flex-1 flex justify-end items-center gap-4">
        <button className="flex items-center gap-0.5 font-medium hover:opacity-75 transition">
          <span className="text-xs text-[#03045E]">EN</span>
          <ChevronDown size={14} strokeWidth={3} className="text-[#03045E]" />
        </button>

        <button className="flex items-center gap-1.5 font-medium hover:opacity-75 transition">
          <Link 
            to={isLandingPage ? '/login' : '/profile'} 
            className="flex items-center gap-1.5 font-medium hover:opacity-75 transition"
          >
            <User size={18} className="text-[#03045E]" />
            <span className="text-sm text-[#03045E]">
              {isLandingPage ? 'Login' : getDisplayName()}
            </span>
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default NavigationUp;