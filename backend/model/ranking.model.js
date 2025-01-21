import pool from "../config/db.js";

const kFactor = 24; // Constant factor for ELO rating adjustment

/**
 * Fetch two random rows from the ranking_table.
 * @returns {Promise<Array>} Array containing two rows with id, name, rating, and image.
 */
export const fetchRandomPairService = async () => {
  const query = `
    SELECT id, name, rating, image
    FROM ranking_table
    ORDER BY RANDOM()
    LIMIT 2;
  `;

  try {
    const result = await pool.query(query);
    return result.rows; // Return the fetched rows
  } catch (error) {
    console.error("Error fetching random pair:", error);
    throw new Error("Failed to fetch random rows from the ranking_table.");
  }
};

/**
 * Calculate ratings for both players based on the match result and update the database.
 * @param {number} winnerId - The ID of the winner.
 * @param {number} loserId - The ID of the loser.
 * @returns {Promise<Object>} An object containing the updated winner and loser rows.
 */
export const calculateResultService = async (winnerId, loserId) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Fetch winner and loser data in a single query
    const { rows: players } = await pool.query(
      "SELECT id, rating FROM ranking_table WHERE id = $1 OR id = $2",
      [winnerId, loserId]
    );

    if (players.length !== 2) {
      throw new Error("Winner or loser not found in the database.");
    }

    // Separate winner and loser from the query results
    const winner = players[0];
    const loser = players[1];

    if (!winner || !loser) {
      throw new Error("Winner or loser data is incomplete.");
    }

    // Calculate probabilities
    const probabilityOfWinner =
      1 / (1 + 10 ** ((loser.rating - winner.rating) / 400));
    const probabilityOfLoser = 1 - probabilityOfWinner;

    // Calculate new ratings
    const updatedWinnerRating = Math.round(
      winner.rating + kFactor * (1 - probabilityOfWinner)
    );
    const updatedLoserRating = Math.round(
      loser.rating + kFactor * (0 - probabilityOfLoser)
    );

    // Update ratings in the database
    const updatedWinner = await pool.query(
      "UPDATE ranking_table SET rating = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [updatedWinnerRating, winnerId]
    );
    const updatedLoser = await pool.query(
      "UPDATE ranking_table SET rating = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [updatedLoserRating, loserId]
    );

    // Commit the transaction
    await pool.query("COMMIT");

    // Return the updated rows
    return {
      winner: updatedWinner.rows[0],
      loser: updatedLoser.rows[0],
    };
  } catch (error) {
    // Rollback the transaction in case of error
    await pool.query("ROLLBACK");
    console.error("Error updating ratings:", error);
    throw new Error("Failed to calculate and update ratings.");
  }
};

/**
 * Fetch leaderboard from the ranking_table.
 * @param {number} [limit] - Optional. Maximum number of rows to fetch.
 * @returns {Promise<Array>} Array containing rows with name and rating.
 */
export const getLeaderboardService = async (limit = null) => {
  // Base query for leaderboard data
  let dataQuery = `
    SELECT name, rating
    FROM ranking_table
    ORDER BY rating DESC
  `;

  const queryParams = [];
  if (limit) {
    dataQuery += " LIMIT $1";
    queryParams.push(limit);
  }

  // Query to get total count of rows
  const countQuery = `
    SELECT COUNT(*) AS total_count
    FROM ranking_table
  `;

  try {
    // Execute both queries
    const dataResult = await pool.query(dataQuery, queryParams);
    const countResult = await pool.query(countQuery);

    // Extract total count
    const totalCount = parseInt(countResult.rows[0].total_count, 10);

    // Return data and total count
    return {
      data: dataResult.rows,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw new Error("Failed to fetch leaderboard from the ranking_table.");
  }
};
