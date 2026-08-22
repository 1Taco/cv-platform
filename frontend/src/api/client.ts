const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchJobs() {
  const res = await fetch(`${API_URL}/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}