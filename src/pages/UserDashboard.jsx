import React from "react";
import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  // 🔥 Dummy Data
  const sites = [
    { id: 1, name: "Site A", location: "Delhi", status: "Pending" },
    { id: 2, name: "Site B", location: "Mumbai", status: "Completed" },
    { id: 3, name: "Site C", location: "Indore", status: "Pending" },
  ];

  const recent = [
    { site: "Site B", action: "Survey Submitted" },
    { site: "Site A", action: "RF Data Uploaded" },
  ];

  const pendingCount = sites.filter(s => s.status === "Pending").length;

  return (
    <Dashboard>
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

        {/* 🔝 Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome 👋
          </h1>
          <p className="text-gray-600">
            You have{" "}
            <span className="font-semibold text-blue-600">
              {pendingCount}
            </span>{" "}
            pending surveys
          </p>
        </div>

        {/* 🟢 Assigned Sites */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Assigned Sites</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map((site) => (
              <div
                key={site.id}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-gray-800">
                  {site.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {site.location}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      site.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {site.status}
                  </span>

                  <button
                    onClick={() => navigate("/survey-form")}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🟡 Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            {recent.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No recent activity
              </p>
            ) : (
              <ul className="space-y-2">
                {recent.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm border-b pb-2"
                  >
                    <span>{item.site}</span>
                    <span className="text-gray-500">
                      {item.action}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </Dashboard>
  );
};

export default UserDashboard;