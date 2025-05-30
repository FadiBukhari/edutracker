import React, { useState } from "react";
import "./CSS/ContactUs.css";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      style={{
        maxWidth: "500px",

        fontFamily: "sans-serif",
      }}
      className="contact-us"
    >
      <h1>Contact Us</h1>
      {submitted && (
        <p style={{ color: "green" }}>Thank you! We'll get back to you soon.</p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem", marginTop: "3rem" }}>
          <label>Subject</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Message</label>
          <br />
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", resize: "none" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
