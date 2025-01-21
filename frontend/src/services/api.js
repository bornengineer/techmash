import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin // Use the same origin as the frontend in production
    : "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 5000, // Timeout after 5 seconds
});

// Fetch a random pair
export const fetchRandomPair = async () => {
  try {
    const response = await api.get("/get-pair");
    return response.data;
  } catch (error) {
    console.error("Error fetching random pair:", error);
    throw error;
  }
};

// Submit a rating
export const submitRating = async (winnerId, loserId) => {
  try {
    const response = await api.post("/rate-players", { winnerId, loserId });
    return response.data;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
};

// Fetch leaderboard
export const fetchLeaderboard = async (limit) => {
  try {
    const response = await api.get(
      limit ? `/leaderboard?limit=${limit}` : "/leaderboard"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
