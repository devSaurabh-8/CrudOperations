// api.js
// Base API URL from environment variables
const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Fetch all posts from the backend API
 * @returns {Promise<Array>} - Returns an array of posts
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error in fetchPosts:", error);
    throw error; 
  }
};
