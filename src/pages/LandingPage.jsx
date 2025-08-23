import React from "react";
import { Link } from "react-router-dom";
import fleetImg from "../assets/fleet.png";

const LandingPage = () => {
  return (
    <section className="landing-wrapper">
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-primary">Fleet Management – Vehicle Registration</h1>
            <p className="lead text-muted mt-3">
              Manage routes, register vehicles, and view insights in a clean, modern dashboard.
            </p>
            <div className="mt-4 d-flex gap-3">
              <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
              <Link to="/signup" className="btn btn-outline-primary btn-lg">Create Account</Link>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <img src={fleetImg} alt="Fleet" className="img-fluid rounded shadow landing-hero-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
