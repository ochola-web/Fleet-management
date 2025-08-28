// src/pages/RouteForm.jsx
import React, { useState, useContext } from "react";
import { RouteContext } from "../context/RouteContext";
import "../styles.css";

const RouteForm = () => {
  const { addRoute } = useContext(RouteContext);
  const [routeName, setRouteName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [distance, setDistance] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (routeName && startPoint && endPoint && distance && purpose) {
      addRoute({
        routeName,
        startPoint,
        endPoint,
        distance,
        purpose,
      });
      // reset after success
      setRouteName("");
      setStartPoint("");
      setEndPoint("");
      setDistance("");
      setPurpose("");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Route</h2>
      <form onSubmit={handleSubmit}>
        <label>Route Name:</label>
        <input
          type="text"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          required
        />
        <label>Start Point:</label>
        <input
          type="text"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          required
        />
        <label>End Point:</label>
        <input
          type="text"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
          required
        />
        <label>Distance (km):</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
        <label>Purpose / Short Description:</label>
        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        />
        <button type="submit">Add Route</button>
      </form>
    </div>
  );
};

export default RouteForm;
