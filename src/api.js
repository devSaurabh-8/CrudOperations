const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};
