import React, { useEffect } from "react";
import "./CSS/Home.css";
import { Link } from "react-router";
import { format } from "date-fns";
import useStore from "../useStore";

const Home = () => {
  const { user, updateUser } = useStore();
  console.log(user);
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const demo = {
      name: "Ahmad",
      email: "demon@demo.com",
      password: "1234",
      Tasks: [
        {
          id: 1,
          task: "Task1",
          type: "assignment",
          endDate: format(new Date(), "yyyy-MM-dd"),
          status: "pending",
        },
      ],
    };
    if (!savedUser) {
      localStorage.setItem("user", JSON.stringify(demo));
      // {name:"Ahmad",email:"demon@demo.com",password:"1234",Tasks:[{id:1,task:"Task1",type:"assignment",endDate:date,status:"pending"}]},
    }
    updateUser(savedUser ? JSON.parse(savedUser) : demo);
  }, [updateUser]);
  return (
    <section className="home-container">
      <div className="home-content">
        <h1 className="home-header">
          <span className="header-highlight">Edu</span> Tracker
        </h1>
        <p className="home-description">
          We build performant, accessible, and beautiful web applications
          tailored to your business needs. Our solutions help you stand out in
          the digital landscape.
        </p>

        <div className="button-group">
          <Link className="cta-button primary" to="/signin">
            Get Started
          </Link>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Performance</h3>
            <p>Optimized for speed and smooth user experience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Built with security best practices</p>
          </div>
        </div>
      </div>

      <div className="home-image-container">
        <img
          src="small1.avif"
          alt="Modern web application interface"
          className="home-image"
          loading="lazy"
        />
        <div className="image-overlay"></div>
      </div>
    </section>
  );
};

export default Home;
