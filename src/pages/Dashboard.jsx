import React from "react";
import { useRouteContext } from "../context/RouteContext";
import "../styles.css";

const Dashboard = () => {
  const { routes } = useRouteContext();

  return (
    <div className="dashboard">
      <h2>Available Routes</h2>

      {routes.length === 0 ? (
        <p>No routes added yet.</p>
      ) : (
        <table className="routes-table">
          <thead>
            <tr>
              <th>Route Name</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Distance (km)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td>{route.name}</td>
                <td>{route.origin}</td>
                <td>{route.destination}</td>
                <td>{route.distance}</td>
                <td>{route.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
