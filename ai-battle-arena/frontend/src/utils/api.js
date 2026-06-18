const API_BASE_URL = "http://localhost:4000/api";

/**
 * Trigger a new AI battle
 * @param {string} prompt 
 * @returns {Promise<any>}
 */
export async function createBattle(prompt) {
  const response = await fetch(`${API_BASE_URL}/battles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to create battle");
  }
  return result;
}

/**
 * Get paginated list of battles, optionally filtered by search query
 * @param {object} params
 * @param {number} params.page
 * @param {number} params.limit
 * @param {string} params.search
 * @returns {Promise<any>}
 */
export async function getBattles({ page = 1, limit = 10, search = "" } = {}) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  if (search) {
    params.append("search", search);
  }
  
  const response = await fetch(`${API_BASE_URL}/battles?${params.toString()}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch battles");
  }
  return result;
}

/**
 * Get details for a single battle by ID
 * @param {string} id 
 * @returns {Promise<any>}
 */
export async function getBattleById(id) {
  const response = await fetch(`${API_BASE_URL}/battles/${id}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch battle details");
  }
  return result;
}

/**
 * Get dynamic leaderboard data
 * @returns {Promise<any>}
 */
export async function getLeaderboard() {
  const response = await fetch(`${API_BASE_URL}/leaderboard`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch leaderboard");
  }
  return result;
}
