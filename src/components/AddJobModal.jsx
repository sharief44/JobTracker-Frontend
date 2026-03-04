import { useState } from "react";
import API from "../api/axios";
import "../styles/modal.css";

function AddJobModal({ closeModal, refreshJobs }) {

  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("APPLIED");

  const handleCreate = async () => {

    await API.post("/jobs", {
      companyName,
      position,
      status
    });

    refreshJobs();
    closeModal();
  };

  return (

    <div className="modal-overlay">

      <div className="modal-card">

        <h2 className="modal-title">
          Add Job Application
        </h2>

        <input
          className="modal-input"
          placeholder="Company"
          value={companyName}
          onChange={(e)=>setCompanyName(e.target.value)}
        />

        <input
          className="modal-input"
          placeholder="Position"
          value={position}
          onChange={(e)=>setPosition(e.target.value)}
        />

        <select
          className="modal-input"
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option value="APPLIED">APPLIED</option>
          <option value="INTERVIEW">INTERVIEW</option>
          <option value="OFFER">OFFER</option>
          <option value="REJECTED">REJECTED</option>
        </select>

        <button
          className="modal-button"
          onClick={handleCreate}
        >
          Create Job
        </button>

      </div>

    </div>
  );
}

export default AddJobModal;