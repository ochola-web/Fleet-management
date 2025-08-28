// src/components/RouteCard.jsx
import React from "react";
import { FaRoute } from "react-icons/fa";
import { Trash2, Edit } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/routecard.css";

const RouteCard = ({ route, onDelete, onEdit }) => {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card shadow-sm route-card">
        <div className="card-body">
          {/* Route Name */}
          <h5 className="card-title text-primary fw-bold">
            <FaRoute className="me-2" />
            {route.routeName}
          </h5>

          {/* Route Details */}
          <p className="card-text mb-1">
            <strong>From:</strong> {route.origin}
          </p>
          <p className="card-text mb-1">
            <strong>To:</strong> {route.destination}
          </p>
          <p className="card-text mb-1">
            <strong>Distance:</strong> {route.distance} km
          </p>
          <p className="card-text text-muted">
            {route.shortDescription}
          </p>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onEdit(route.id)}
            >
              <Edit size={16} className="me-1" /> Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this route?")) {
                  onDelete(route.id);
                }
              }}
            >
              <Trash2 size={16} className="me-1" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
