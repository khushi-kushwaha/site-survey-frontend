import React from "react";
import Dashboard from "../Components/Dashboard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {

  // 🔥 Dummy Data
  const stats = [
    { title: "Total Sites", value: 24 },
    { title: "Completed Surveys", value: 16 },
    { title: "Pending Surveys", value: 8 },
    { title: "Projects", value: 5 },
  ];

  const activities = [
    { site: "Site A", status: "Completed" },
    { site: "Site B", status: "Pending" },
    { site: "Site C", status: "In Progress" },
    { site: "Site D", status: "Completed" },
  ];

  // 📊 Chart Data
  const chartData = [
    { name: "Completed", value: 16 },
    { name: "Pending", value: 8 },
  ];

  const COLORS = ["#22c55e", "#facc15"]; // green, yellow

  const total = 24;
  const progress = Math.round((16 / total) * 100);

  return (
    <Dashboard>
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

        {/* 🔝 Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, Admin 👋
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Here's a quick overview of your assigned projects and survey progress.
          </p>
        </div>

        {/* 🔥 Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-sm text-gray-500">{item.title}</h2>
              <p className="text-2xl font-bold text-blue-600">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* 📊 Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 📋 Recent Activity */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Recent Activity
            </h2>

            <ul className="space-y-3">
              {activities.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-gray-600">{item.site}</span>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 📈 Progress + Chart */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Survey Progress
            </h2>

            {/* 🔵 Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {progress}% of surveys completed
            </p>

            {/* 🟢 Pie Chart */}
            <div className="w-full h-52">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 📊 Info */}
            <div className="mt-3 text-sm text-gray-500 flex justify-between">
              <span>Completed: 16</span>
              <span>Pending: 8</span>
            </div>
          </div>

        </div>
      </div>
    </Dashboard>
  );
};

export default AdminDashboard;