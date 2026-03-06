import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import AdminAnalytics from "../components/AdminAnalytics";

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

  const deleteJob = async (id) => {
    try {
      await API.delete(`/admin/jobs/${id}`);

      fetchJobs();
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/jobs/${id}/status?status=${status}`);

      fetchJobs();
    } catch (error) {
      console.error("Error updating status", error);
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
        <h1 className="dashboard-title">Admin Dashboard</h1>

        <div style={{ marginBottom: "30px" }}>
          <AdminAnalytics />
        </div>

        <div className="dashboard-card">
          <table className="job-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-row">
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
                      <select
                        value={job.status}
                        onChange={(e) => updateStatus(job.id, e.target.value)}
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="INTERVIEW">Interview</option>
                        <option value="OFFER">Offer</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </td>

                    <td>
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteJob(job.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
