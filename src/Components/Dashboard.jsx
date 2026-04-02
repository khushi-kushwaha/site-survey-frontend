import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from 'react';

const Dashboard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 10 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar (fixed height, no scroll) */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <Menu />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;