import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const UserSitedetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem(`floorplan_${id}`);
    setImage(data);
  }, [id]);

  return (
    <Dashboard>
      <div className="p-4 md:p-8 bg-gray-100 min-h-screen">

        {/* 🔙 Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-blue-600 mb-4"
        >
          ← Back
        </button>

        {/* 🔷 Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Site Details
          </h1>

          <span className="text-sm text-gray-500">
            Site ID: {id}
          </span>
        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 📷 IMAGE CARD */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4">

            <h2 className="text-sm font-medium text-gray-600 mb-3">
              Floor Plan
            </h2>

            <div className="w-full h-[250px] md:h-[350px] bg-gray-50 border rounded-xl flex items-center justify-center overflow-hidden">

              {image ? (
                <img
                  src={image}
                  alt="floorplan"
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-gray-400 text-sm">
                  No Floorplan Uploaded
                </p>
              )}

            </div>

            {/* Upload Button */}
            <button
              onClick={() => navigate(`/userfloorplan/${id}`)}
              className="mt-4 w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Upload / Change Floorplan
            </button>

          </div>

          {/* 📄 DETAILS + ACTIONS */}
          <div className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between">

            {/* Details */}
            <div>
              <h2 className="text-sm font-medium text-gray-600 mb-3">
                Site Info
              </h2>

              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Type:</strong> Residential</p>
                <p><strong>Floors:</strong> 1 Floor</p>
                <p><strong>Status:</strong> Active</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                onClick={() => navigate(`/UserRfscan/${id}`)}
                className="bg-blue-50 text-blue-600 py-2 rounded-lg text-sm hover:bg-blue-100"
              >
                RF Scan
              </button>

              <button
                onClick={() => navigate(`/userlabelspace/${id}`)}
                className="bg-blue-50 text-blue-600 py-2 rounded-lg text-sm hover:bg-blue-100"
              >
                Label Space
              </button>

              <button
                onClick={() => navigate(`/userfillchecklist/${id}`)}
                className="col-span-2 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600"
              >
                Fill Checklist
              </button>

            </div>

          </div>

        </div>
      </div>
    </Dashboard>
  );
};

export default UserSitedetail;