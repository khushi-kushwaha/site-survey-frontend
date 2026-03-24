 import React from 'react'
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-500 text-white  px-16 py-3">
      
      {/* Navbar */}
      <div className="flex justify-between items-center m-10">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          HOME
        </h1>

        <div className="flex gap-6 text-sm">
          <button className="border px-4 py-1 rounded-full" onClick={() => navigate("/register")}> Register </button>
        <button className="border px-4 py-1 rounded-full" onClick={() => navigate("/login")}> Login </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Site Survey tool 
          </h1>

          <p className="text-gray-300 text-sm">
          Smart solution for ISPs to design and manage network setups in large-scale environments.
           From apartments to campuses, simplify site surveys and equipment planning.
          </p>

        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0">
          <img
            src="https://thecssolutions.com/wp-content/uploads/2020/07/Support.png"
            alt="survey"
            className="w-[500px] max-w-full"
          />
        </div>
      </div>

    </div>
  );
};

export default Hero;