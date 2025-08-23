import React, { useEffect, useState } from "react";
import { useRoutes } from "../context/RouteContext.jsx";

const emptyForm = { id: null, name: "", start: "", end: "", distance: "", description: "" };

const RouteManagement = () => {
  const { routes, addRoute, updateRoute, deleteRoute } = useRoutes();
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (editId) {
      const r = routes.find(x => x.id === editId);
      if (r) setForm({ ...r });
    }
  }, [editId, routes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, start, end, distance } = form;
    if (!name || !start || !end || !distance) {
      alert("Please fill in all required fields."); // simple validation feedback
      return;
    }

    if (editId) {
      updateRoute(editId, {
        ...form,
        distance: Number(form.distance),
      });
      setSuccessMsg("Route updated successfully!");
    } else {
      addRoute({
        ...form,
        distance: Number(form.distance),
      });
      setSuccessMsg("Route added successfully!");
    }

    setForm(emptyForm);
    setEditId(null);

    setTimeout(() => setSuccessMsg(""), 3000); // message disappears after 3s
  };

  const handleEdit = (id) => setEditId(id);
  const handleCancel = () => { setEditId(null); setForm(emptyForm); };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Route Management</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Form */}
      <div className="card p-3 shadow-sm mb-4" style={{maxWidth: 720}}>
        <h5 className="mb-3">{editId ? "Edit Route" : "Add New Route"}</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Route Name*</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} placeholder="e.g. A104 Express" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Distance (km)*</label>
            <input name="distance" type="number" min="0" className="form-control" value={form.distance} onChange={handleChange} placeholder="e.g. 488" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Origin*</label>
            <input name="start" className="form-control" value={form.start} onChange={handleChange} placeholder="e.g. Nairobi" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Destination*</label>
            <input name="end" className="form-control" value={form.end} onChange={handleChange} placeholder="e.g. Mombasa" required />
          </div>
          <div className="col-12">
            <label className="form-label">Short Description / Purpose</label>
            <textarea name="description" className="form-control" rows="2" value={form.description} onChange={handleChange} placeholder="e.g. Coastal cargo delivery corridor" />
          </div>
          <div className="col-12 d-flex gap-2">
            <button className="btn btn-success">{editId ? "Update Route" : "Add Route"}</button>
            {editId && <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Available Routes</h5>
        {routes.length === 0 ? (
          <div className="text-muted">No routes yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Distance (km)</th>
                  <th>Description</th>
                  <th style={{width: 150}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.origin}</td>
                    <td>{r.destination}</td>
                    <td>{r.distance}</td>
                    <td className="text-truncate" style={{maxWidth: 260}} title={r.description}>{r.description}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(r.id)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteRoute(r.id)}>Delete</button>
                    </td>
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

export default RouteManagement;
