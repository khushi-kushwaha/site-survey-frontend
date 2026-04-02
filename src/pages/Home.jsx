import React from 'react'
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
   <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-400 to-blue-500 text-white px-4 sm:px-8 md:px-16 py-4">

      {/* Navbar */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-base sm:text-lg font-semibold">
          HOME
        </h1>

        <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm">
          <button 
            className="border px-3 sm:px-4 py-1 rounded-full"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

          <button 
            className="border px-3 sm:px-4 py-1 rounded-full"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-10">

        {/* Left Content */}
        <div className="max-w-xl space-y-4 sm:space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Site Survey Tool
          </h1>

          <p className="text-gray-200 text-sm sm:text-base">
            Smart solution for ISPs to design and manage network setups in large-scale environments.
            From apartments to campuses, simplify site surveys and equipment planning.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full flex justify-center md:justify-end">
          <img
            src="https://thecssolutions.com/wp-content/uploads/2020/07/Support.png"
            alt="survey"
            className="w-[280px] sm:w-[350px] md:w-[450px] lg:w-[500px] max-w-full"
          />
        </div>
      </div>

    </div>
  );
};

export default Hero;