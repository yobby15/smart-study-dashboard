import React from 'react';

const LoginBox = ({ onClick }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" w-112.5  bg-white/20 backdrop-blur-md border border-white/30 rounded-[40px] p-10 shadow-2xl flex flex-col">
        <h2 className="text-4xl font-bold text-[#03045E] text-center mb-8">
          Login
        </h2>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[#03045E] font-semibold ml-1">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl bg-white focus:outline-none shadow-inner"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#03045E] font-semibold ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-3 rounded-xl bg-white focus:outline-none shadow-inner"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-[#03045E] mt-2 px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              Remember for 30 days
            </label>
            <a href="#" className="hover:underline font-semibold">
              Forgot password
            </a>
          </div>

          <button
            onClick={onClick}
            className="w-full bg-[#7B61FF] hover:bg-[#6A51E6] text-white font-bold py-3 rounded-xl mt-6 transition-all shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginBox;