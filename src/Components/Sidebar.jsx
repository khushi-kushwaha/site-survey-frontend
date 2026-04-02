import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  BarChart3,
  FileText,
  Radio,
  LogOut,
  Upload,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

  

const Sidebar = ({ isOpen, setIsOpen }) => {

  // ✅ Safe role handling
  const roleRaw = localStorage.getItem("role") || "USER";

  const role =
    roleRaw.charAt(0).toUpperCase() +
    roleRaw.slice(1).toLowerCase();

const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  }

  // ✅ Role-based menu
  const menuByRole = {
  ADMIN: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admindashboard" },
    { name: "Projects", icon: ClipboardList, path: "/projects" },
    { name: "Sites", icon: Building2, path: "/sites" },
    { name: "Survey Forms", icon: ClipboardList, path: "/surveys" },
    { name: "RF Scans", icon: Radio, path: "/rf" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Bulk Import", icon: Upload, path: "/bulk" },
  ],


  USER: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/userdashboard" },
    { name: "Assigned Sites", icon: Building2, path: "/usersite" },
    // { name: "Fill Survey", icon: ClipboardList, path: "/usersurvey" },
    // { name: "Upload RF Data", icon: Upload, path: "/rf-upload" },
  ],

  
};

  const menuItems = menuByRole[roleRaw] || menuByRole["USER"];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-white z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/*  Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-screen w-64 bg-white text-black border-r border-gray-200
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold">SiteSurvey</h1>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* 👤 Role Badge */}
        <div className="px-4 py-3">
          <div className="bg-blue-600 text-sm px-3 py-1 rounded-full w-fit text-white">
            {role}
          </div>
        </div>

        {/* 📋 Menu */}
        <div className="px-3 py-2 flex-1 text-black">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl mb-2 transition-all duration-200 
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-black hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/*  Footer (always bottom) */}
        <div className="mt-auto p-4 border-t border-gray-200 text-sm text-black">
          <button 
           onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;