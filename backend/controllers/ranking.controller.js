import {
  calculateResultService,
  fetchRandomPairService,
  getLeaderboardService,
} from "../model/ranking.model.js";

const handleResponse = (res, status, message, data = null) => {
  try {
    res.status(status).json({
      status,
      message,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const fetchRandomPair = async (req, res, next) => {
  try {
    const pair = await fetchRandomPairService();
    handleResponse(res, 200, "Pair fetched successfully", pair);
  } catch (error) {
    next(error);
  }
};

export const calculateResult = async (req, res, next) => {
  const { winnerId, loserId } = req.body;
  try {
    const result = await calculateResultService(winnerId, loserId);
    handleResponse(res, 201, "Players rated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    // Parse the 'limit' query parameter (optional)
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;

    if (limit !== null && isNaN(limit)) {
      return handleResponse(
        res,
        400,
        "Invalid limit parameter. It must be a number."
      );
    }

    // Call the service with the parsed limit
    const result = await getLeaderboardService(limit);

    // Send a successful response
    handleResponse(res, 200, "Leaderboard fetched successfully", result);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};
