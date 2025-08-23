import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) { setErr("All fields are required."); return; }
    if (password !== confirm) { setErr("Passwords do not match."); return; }
    const ok = signup(name, email, password);
    if (ok) {
      // Reset inputs then go to login
      setName(""); setEmail(""); setPassword(""); setConfirm(""); setErr("");
      navigate("/login");
    } else {
      setErr("Email already exists. Try logging in.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="card shadow p-4" style={{ maxWidth: 460, width: "100%" }}>
        <h3 className="text-center mb-3">Create Account</h3>
        {err && <div className="alert alert-danger py-2">{err}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required />
          </div>
          <button className="btn btn-success w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3 small">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
