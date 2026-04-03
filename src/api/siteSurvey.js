import API from "./client";

const normalizeArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

const fetchFromFirstAvailable = async (paths) => {
  for (const path of paths) {
    try {
      const response = await API.get(path);
      return normalizeArray(response.data);
    } catch (error) {
      const status = error?.response?.status;
      if (status && status !== 404) {
        throw error;
      }
    }
  }

  return [];
};

export const fetchAssignedSites = () =>
  fetchFromFirstAvailable([
    "/sites/assigned",
    "/sites/my",
    "/sites",
    "/properties",
  ]);

export const fetchRecentActivities = () =>
  fetchFromFirstAvailable([
    "/surveys/recent-activity",
    "/activities/recent",
    "/audit-logs/recent",
  ]);
