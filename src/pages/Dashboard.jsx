import React from "react";
import { useRoutes } from "../context/RouteContext.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { routes } = useRoutes();

  const totalRoutes = routes.length;
  const totalDistance = routes.reduce((sum, r) => sum + Number(r.distance || 0), 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <div className="text-muted">Total Routes</div>
            <div className="fs-3 fw-bold">{totalRoutes}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <div className="text-muted">Total Distance (km)</div>
            <div className="fs-3 fw-bold">{totalDistance}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <div className="text-muted">Avg Distance (km)</div>
            <div className="fs-3 fw-bold">{totalRoutes ? Math.round(totalDistance / totalRoutes) : 0}</div>
          </div>
        </div>
      </div>

      {/* Routes Table */}
      <div className="card p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Available Routes</h5>
          <Link className="btn btn-primary btn-sm" to="/routes">Manage Routes</Link>
        </div>

        {routes.length === 0 ? (
          <div className="text-muted">No routes available. Add your first one from Route Management.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Distance (km)</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.start}</td>
                    <td>{r.end}</td>
                    <td>{r.distance}</td>
                    <td className="text-truncate" style={{maxWidth: 260}}>{r.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
