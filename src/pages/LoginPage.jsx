import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    // Optional: email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    const success = login(email, password);
    if (success) {
      setEmail("");
      setPassword("");
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow login-card">
        <h3 className="card-title text-center mb-3">Login</h3>
        <p className="text-center text-muted mb-3">Welcome back! Please login.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email / Username</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/forgot-password" className="small text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          {/* ✅ Signup link */}
          <div className="text-center mt-3">
            <span className="text-muted">Don’t have an account? </span>
            <Link to="/signup" className="text-primary text-decoration-none">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
