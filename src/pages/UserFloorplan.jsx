import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import { toast } from "sonner";

const UserFloorplan = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // 👉 Handle Upload
  const handleUpload = () => {
    if (!file) {
      toast.error("Please select file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      localStorage.setItem(`floorplan_${id}`, reader.result);
      toast.success("Uploaded ✅");
      navigate(`/site/${id}`);
    };

    reader.readAsDataURL(file);
  };

  // 👉 Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <Dashboard>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">

        {/* Back */}
        <div className="max-w-2xl mx-auto mb-3">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-blue-600"
          >
            ← Back
          </button>
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">

          <h1 className="text-xl font-bold mb-2">Upload Floor Plan</h1>
          <p className="text-gray-500 text-sm mb-4">Survey ID: {id}</p>

          {/* Drag & Drop Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >

            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor="fileUpload" className="cursor-pointer">

              <div className="flex flex-col items-center gap-3">
                <div className="text-3xl">📁</div>

                <p className="text-gray-600">
                  Drag & drop file here
                </p>

                <p className="text-sm text-gray-400">
                  or click to upload
                </p>

                <p className="text-xs text-gray-400">
                  PNG, JPG, PDF
                </p>
              </div>
            </label>

            {/* Selected File */}
            {file && (
              <p className="mt-4 text-green-600 text-sm">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Upload Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Upload
            </button>
          </div>

        </div>
      </div>
    </Dashboard>
  );
};

export default UserFloorplan;