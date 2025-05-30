import React, { useState, useEffect } from "react";
import "./CSS/RequestRoleForm.css";

const STORAGE_KEY = "parentRequests";

const RequestRoleForm = () => {
  const emptyForm = {
    parentName: "",
    parentEmail: "",
    childName: "",
    childEmail: "",
    relation: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [requests, setRequests] = useState([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setRequests(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.parentName ||
      !formData.parentEmail ||
      !formData.childName ||
      !formData.childEmail
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...formData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    setRequests((prev) => [...prev, newRequest]);
    setSent(true);
    setFormData(emptyForm);
  };

  return (
    <div className="request-form-container">
      {sent ? (
        <div className="success-message">
          <h1 className="success-title">Request Sent ✅</h1>
          <p className="success-text">
            Thank you! An administrator will review your request shortly.
          </p>
          <button className="form-button" onClick={() => setSent(false)}>
            Send Another Request
          </button>
        </div>
      ) : (
        <form className="request-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Request Parent Role</h1>

          <fieldset className="form-section">
            <legend className="section-title">Your Information</legend>

            <div className="form-group">
              <label htmlFor="parentName">
                Name<span>*</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="parentEmail">
                Email<span>*</span>
              </label>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend className="section-title">Child Information</legend>

            <div className="form-group">
              <label htmlFor="childName">
                Child's Name<span>*</span>
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="childEmail">
                Child's Email<span>*</span>
              </label>
              <input
                type="email"
                id="childEmail"
                name="childEmail"
                value={formData.childEmail}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="relation">Relation</label>
              <input
                type="text"
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </fieldset>

          <button type="submit" className="form-button">
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
};

export default RequestRoleForm;
