import React, { useState } from "react";
import { useRouteContext } from "../context/RouteContext";
import "../styles.css";

const RouteManagement = () => {
  const { routes, addRoute, updateRoute, deleteRoute } = useRouteContext();
  const [form, setForm] = useState({
    name: "",
    origin: "",
    destination: "",
    distance: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // ✅ Update existing
      updateRoute(editingId, form);
      setEditingId(null);
    } else {
      // ✅ Add new
      addRoute(form);
    }

    // ✅ Reset form after add/update
    setForm({
      name: "",
      origin: "",
      destination: "",
      distance: "",
      description: "",
    });
  };

  const handleEdit = (id) => {
    const routeToEdit = routes.find((r) => r.id === id);
    if (routeToEdit) {
      setForm(routeToEdit);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      deleteRoute(id); // ✅ Calls context to remove route
    }
  };

  return (
    <div className="page-container">
      <h2>Route Management</h2>
      <form onSubmit={handleSubmit} className="route-form">
        <input
          type="text"
          name="name"
          placeholder="Route Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="origin"
          placeholder="Origin"
          value={form.origin}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="distance"
          placeholder="Distance (km)"
          value={form.distance}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* ✅ Custom button classes */}
        <button
          type="submit"
          className={editingId ? "btn-update" : "btn-add"}
        >
          {editingId ? "Update Route" : "Add Route"}
        </button>
      </form>

      <h3>Available Routes</h3>
      <table className="route-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Distance</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.length > 0 ? (
            routes.map((route) => (
              <tr key={route.id}>
                <td>{route.name}</td>
                <td>{route.origin}</td>
                <td>{route.destination}</td>
                <td>{route.distance} km</td>
                <td>{route.description}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(route.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(route.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No routes available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RouteManagement;
