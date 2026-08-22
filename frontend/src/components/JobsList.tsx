import { useEffect, useState } from 'react';
import { fetchJobs } from '../api/client';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

export function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
          <strong>{job.title}</strong> — {job.company} ({job.location})
        </li>
      ))}
    </ul>
  );
}