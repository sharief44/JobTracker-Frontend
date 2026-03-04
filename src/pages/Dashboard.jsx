import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import AddJobModal from "../components/AddJobModal";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      let url = `/jobs?page=${page}&size=10`;

      if (search) url += `&search=${search}`;
      if (status) url += `&status=${status}`;
      if (sort) url += `&sort=${sort}`;

      const res = await API.get(url);

      setJobs(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching jobs", error);
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
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Job Applications</h1>

          <button className="add-job-button" onClick={() => setShowModal(true)}>
            + Add Job
          </button>
        </div>

        <div className="dashboard-controls">
          <input
            className="search-input"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            className="filter-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="companyName,asc">Company A-Z</option>
            <option value="companyName,desc">Company Z-A</option>
            <option value="createdAt,desc">Newest</option>
            <option value="createdAt,asc">Oldest</option>
          </select>

          <button className="apply-button" onClick={fetchJobs}>
            Apply Filters
          </button>
        </div>

        <div className="dashboard-card">
          <table className="job-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-row">
                    No job applications found
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id}>
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

      {showModal && (
        <AddJobModal
          closeModal={() => setShowModal(false)}
          refreshJobs={fetchJobs}
        />
      )}
    </div>
  );
}

export default Dashboard;
