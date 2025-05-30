import React, { useEffect, useState } from "react";
import "./CSS/ManageRequests.css";

const STORAGE_KEY = "parentRequests";

const ManageParentRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setRequests(saved);
  }, []);

  const updateStatus = (id, status) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    setRequests(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="admin-table-container">
      <h1 className="admin-title">Manage Parent Role Requests</h1>
      {requests.length === 0 ? (
        <p className="no-requests">No requests found.</p>
      ) : (
        <table className="request-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Parent Name</th>
              <th>Parent Email</th>
              <th>Child Name</th>
              <th>Child Email</th>
              <th>Relation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.parentName}</td>
                <td>{req.parentEmail}</td>
                <td>{req.childName}</td>
                <td>{req.childEmail}</td>
                <td>{req.relation || "-"}</td>
                <td>
                  <span className={`status ${req.status}`}>{req.status}</span>
                </td>
                <td className="action-buttons">
                  <button
                    className="btn-approve"
                    onClick={() => updateStatus(req.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => updateStatus(req.id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageParentRequest;
