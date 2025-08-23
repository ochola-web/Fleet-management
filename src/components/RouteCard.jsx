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
          <h5 className="card-title">
            <FaRoute className="me-2 text-primary" />
            {route.origin} → {route.destination}
          </h5>
          <p className="card-text">
            <strong>Distance:</strong> {route.distance} km
          </p>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onEdit(route.id)}
            >
              <Edit size={16} className="me-1" /> Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(route.id)}
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
