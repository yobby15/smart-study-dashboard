import React, { useState } from 'react'; // Tambah useState
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

const LoginCard = ({ onLogin }) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ email, password, rememberMe });
  };

  const handleForgotPassword = () => {
    alert("Fitur Reset Password akan mengirim link ke email Anda (Memerlukan Backend).");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-112.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-[40px] p-10 shadow-2xl flex flex-col">
        <h2 className="text-4xl font-bold text-[#03045E] text-center mb-8">
          Login
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <label className="text-[#03045E] font-semibold ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl bg-white focus:outline-none shadow-inner"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#03045E] font-semibold ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="********"
              className="w-full p-3 rounded-xl bg-white focus:outline-none shadow-inner"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm text-[#03045E] mt-2 px-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="rounded cursor-pointer" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember for 30 days
            </label>

            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="hover:underline font-semibold bg-transparent border-none cursor-pointer"
            >
              Forgot password
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7B61FF] hover:bg-[#6A51E6] text-white font-bold py-3 rounded-xl mt-6 transition-all shadow-lg cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginCard;