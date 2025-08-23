import React, { useEffect, useState } from "react";
import "../styles/routedashboard.css"; // reuse same CSS

const AvailableRoutes = () => {
  const [routes, setRoutes] = useState([]);

  // Load routes from localStorage
  useEffect(() => {
    const savedRoutes = JSON.parse(localStorage.getItem("routes")) || [];
    setRoutes(savedRoutes);
  }, []);

  return (
    <div className="route-dashboard">
      <h2>Available Routes</h2>

      <table className="route-table">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => (
            <tr key={index}>
              <td>{route.origin}</td>
              <td>{route.destination}</td>
              <td>{route.distance}</td>
            </tr>
          ))}
          {routes.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No routes available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableRoutes;
