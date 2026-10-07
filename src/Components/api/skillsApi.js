import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const skillsApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Fetch all active skills.
 */
export const getSkills = async () => {
  const response = await skillsApi.get("/skills");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to fetch skills.");
  }

  return response.data.data || [];
};

/**
 * Fetch a single skill by MongoDB ObjectId.
 */
export const getSkillById = async (id) => {
  if (!id) {
    throw new Error("Skill ID is required.");
  }

  const response = await skillsApi.get(`/skills/${id}`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to fetch skill.");
  }

  return response.data.data;
};

export default skillsApi;
