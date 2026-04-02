import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";

const UserSurveyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    site: "",
    inspector: "",
    networkType: "",
    signalStrength: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    alert("Survey Submitted ✅");

    setFormData({
      site: "",
      inspector: "",
      networkType: "",
      signalStrength: "",
      remarks: "",
    });
  };

  return (
    <Dashboard>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">

        {/* 🔙 Back Button (Outside Card) */}
        <div className="max-w-2xl mx-auto mb-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition"
          >
            ← Back
          </button>
        </div>

        {/* Card */}
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8">

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Survey Form
            </h1>
            <p className="text-gray-500 text-sm">
              Fill the details carefully before submitting
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Site */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Site Name
              </label>
              <input
                type="text"
                name="site"
                value={formData.site}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter site name"
                required
              />
            </div>

            {/* Inspector */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Inspector Name
              </label>
              <input
                type="text"
                name="inspector"
                value={formData.inspector}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Your name"
                required
              />
            </div>

            {/* Network Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Network Type
              </label>
              <select
                name="networkType"
                value={formData.networkType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="4G">4G</option>
                <option value="5G">5G</option>
                <option value="WiFi">WiFi</option>
              </select>
            </div>

            {/* Signal Strength */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Signal Strength (dBm)
              </label>
              <input
                type="number"
                name="signalStrength"
                value={formData.signalStrength}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="-70"
                required
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Remarks
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Any notes..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Submit Survey
            </button>

          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default UserSurveyForm;