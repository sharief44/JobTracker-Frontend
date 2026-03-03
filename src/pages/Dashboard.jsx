import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await API.get("/jobs?page=0&size=5");
    setJobs(res.data.content);
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>My Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id}>
          {job.companyName} - {job.position} - {job.status}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;