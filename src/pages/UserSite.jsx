import React, { useEffect, useMemo, useState } from "react";
import Dashboard from "../Components/Dashboard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchAssignedSites } from "../api/siteSurvey";

const getSiteName = (site) => site?.name || site?.siteName || site?.title || "Unnamed Site";
const getSiteLocation = (site) => site?.location || site?.city || site?.address || "Unknown";
const getSiteType = (site) => site?.type || site?.category || "Residential";
const getSiteFloors = (site) => site?.floors || site?.floorCount || "N/A";
const getSiteId = (site, index) => site?.id || site?.siteId || index + 1;

const UserSite = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSites = async () => {
      try {
        setLoading(true);
        const apiSites = await fetchAssignedSites();
        setSites(apiSites);
      } catch (error) {
        const message = error?.response?.data?.message || "Unable to fetch assigned sites";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadSites();
  }, []);

  const viewSites = useMemo(
    () =>
      sites.map((site, index) => ({
        id: getSiteId(site, index),
        name: getSiteName(site),
        location: getSiteLocation(site),
        type: getSiteType(site),
        floors: getSiteFloors(site),
      })),
    [sites],
  );

  const getStatus = (id) => {
    const floorplan = localStorage.getItem(`floorplan_${id}`);
    const rf = localStorage.getItem(`rf_scan_${id}`);
    const labels = localStorage.getItem(`floorplan_labels_${id}`);

    if (!floorplan) return "PENDING";

    const rfData = rf ? JSON.parse(rf) : [];
    const labelData = labels ? JSON.parse(labels) : [];

    if (rfData.length > 0 && labelData.length > 0) return "COMPLETED";

    return "IN PROGRESS";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-600 ring-1 ring-green-200";
      case "IN PROGRESS":
        return "bg-blue-100 text-blue-600 ring-1 ring-blue-200";
      default:
        return "bg-yellow-100 text-yellow-600 ring-1 ring-yellow-200";
    }
  };

  return (
    <Dashboard>
      <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">Assigned Surveys</h1>

        {loading ? (
          <div className="text-gray-500">Loading assigned sites...</div>
        ) : viewSites.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-gray-500">No assigned sites found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {viewSites.map((survey) => {
              const image = localStorage.getItem(`floorplan_${survey.id}`);
              const status = getStatus(survey.id);

              return (
                <div
                  key={survey.id}
                  onClick={() => navigate(`/site/${survey.id}`)}
                  className="bg-white rounded-2xl shadow-sm p-4 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <h2 className="font-semibold text-gray-800 text-lg">{survey.name}</h2>
                      <p className="text-sm text-gray-500">📍 {survey.location}</p>
                    </div>

                    <span
                      className={`inline-flex items-center justify-center text-xs font-medium px-2.5 py-1 rounded-full h-5 ${getStatusStyle(status)}`}
                    >
                      {status === "COMPLETED" && "✔ "}
                      {status}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>{survey.type}</span>
                    <span>{survey.floors} Floors</span>
                  </div>

                  <div className="h-40 rounded-lg mb-4 border overflow-hidden">
                    {image ? (
                      <img src={image} alt="floorplan" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No Floorplan
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/userfloorplan/${survey.id}`);
                      }}
                      className="bg-blue-50 text-blue-600 py-2 rounded-lg text-sm"
                    >
                      Floor Plan
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/UserRfscan/${survey.id}`);
                      }}
                      className="bg-blue-50 text-blue-600 py-2 rounded-lg text-sm"
                    >
                      RF Upload
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/userlabelspace/${survey.id}`);
                      }}
                      className="bg-blue-50 text-blue-600 py-2 rounded-lg text-sm"
                    >
                      Label Space
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/usersurveyform/${survey.id}`);
                      }}
                      className="bg-blue-50 text-blue-600 py-2 rounded-lg text-sm"
                    >
                      Checklist
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default UserSite;
