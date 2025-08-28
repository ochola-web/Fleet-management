import React, { useState } from "react";
import { useRouteContext } from "../context/RouteContext.jsx"; // ✅ FIXED import
import "../styles.css";

const AddRoutePage = () => {
  const { addRoute } = useRouteContext(); // ✅ useRouteContext instead of useRoutes

  const [form, setForm] = useState({
    name: "",
    origin: "",
    destination: "",
    distance: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ Success message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.origin || !form.destination || !form.distance) {
      setError("Please fill in all required fields.");
      setSuccess(""); // Clear success if error
      return;
    }

    addRoute(form);

    // Clear form
    setForm({
      name: "",
      origin: "",
      destination: "",
      distance: "",
      description: "",
    });

    setError("");
    setSuccess("✅ Route added successfully!");
  };

  return (
    <div className="add-route-form container mt-4">
      <h3>Add New Route</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>} {/* ✅ Success */}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Route Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., City Center to Airport"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Origin *</label>
          <input
            type="text"
            name="origin"
            value={form.origin}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Downtown"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Destination *</label>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Airport Terminal 1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Distance (km) *</label>
          <input
            type="number"
            name="distance"
            value={form.distance}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., 12"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description / Purpose</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Route used for airport pickups"
            rows="2"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Route
        </button>
      </form>
    </div>
  );
};

export default AddRoutePage;
