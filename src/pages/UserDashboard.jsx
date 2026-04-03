import React, { useEffect, useMemo, useState } from "react";
import Dashboard from "../Components/Dashboard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchAssignedSites, fetchRecentActivities } from "../api/siteSurvey";

const getSiteId = (site, index) => site?.id || site?.siteId || index + 1;
const getSiteName = (site) => site?.name || site?.siteName || site?.title || "Unnamed Site";
const getSiteLocation = (site) => site?.location || site?.city || site?.address || "Unknown";
const getSiteStatus = (site) => (site?.status || "Pending").toString();

const UserDashboard = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [sitesData, recentData] = await Promise.all([
          fetchAssignedSites(),
          fetchRecentActivities(),
        ]);

        setSites(sitesData);
        setRecent(recentData);
      } catch (error) {
        const message = error?.response?.data?.message || "Failed to fetch dashboard data";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const mappedSites = useMemo(
    () =>
      sites.map((site, index) => ({
        id: getSiteId(site, index),
        name: getSiteName(site),
        location: getSiteLocation(site),
        status: getSiteStatus(site),
      })),
    [sites],
  );

  const pendingCount = mappedSites.filter((s) => s.status.toLowerCase() !== "completed").length;

  return (
    <Dashboard>
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome 👋</h1>
          <p className="text-gray-600">
            You have <span className="font-semibold text-blue-600">{pendingCount}</span> pending surveys
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Assigned Sites</h2>

          {loading ? (
            <p className="text-gray-500">Loading assigned sites...</p>
          ) : mappedSites.length === 0 ? (
            <div className="bg-white p-4 rounded-xl shadow-sm text-gray-500">No assigned sites available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mappedSites.map((site) => (
                <div key={site.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-800">{site.name}</h3>
                  <p className="text-sm text-gray-500">{site.location}</p>

                  <div className="flex justify-between items-center mt-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        site.status.toLowerCase() === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {site.status}
                    </span>

                    <button
                      onClick={() => navigate(`/usersurveyform/${site.id}`)}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    >
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            {recent.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent activity</p>
            ) : (
              <ul className="space-y-2">
                {recent.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm border-b pb-2">
                    <span>{item?.site || item?.siteName || "Site"}</span>
                    <span className="text-gray-500">{item?.action || item?.event || "Updated"}</span>
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
