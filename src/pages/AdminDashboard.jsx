import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      const res = await API.get(`/admin/jobs?page=${page}&size=10`);

      setJobs(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching admin jobs", error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "APPLIED":
        return "status status-applied";
      case "INTERVIEW":
        return "status status-interview";
      case "OFFER":
        return "status status-offer";
      case "REJECTED":
        return "status status-rejected";
      default:
        return "status";
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <h1 className="dashboard-title">All Job Applications</h1>

        <div className="dashboard-card">
          <table className="job-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-row">
                    No job applications found
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.user?.name || "Unknown"}</td>
                    <td>{job.companyName}</td>
                    <td>{job.position}</td>

                    <td>
                      <span className={getStatusClass(job.status)}>
                        {job.status}
                      </span>
                    </td>

                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
