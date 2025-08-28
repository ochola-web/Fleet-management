// src/context/RouteContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const RouteContext = createContext();

// Provider
export const RouteProvider = ({ children }) => {
  const [routes, setRoutes] = useState(() => {
    const stored = localStorage.getItem("routes");
    return stored ? JSON.parse(stored) : [];
  });

  // Keep in sync with localStorage
  useEffect(() => {
    localStorage.setItem("routes", JSON.stringify(routes));
  }, [routes]);

  // Add
  const addRoute = (route) => {
    setRoutes((prev) => [
      ...prev,
      { ...route, id: Date.now().toString() },
    ]);
  };

  // Update
  const updateRoute = (id, updatedRoute) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedRoute } : r))
    );
  };

  // Delete
  const deleteRoute = (id) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RouteContext.Provider
      value={{ routes, addRoute, updateRoute, deleteRoute }}
    >
      {children}
    </RouteContext.Provider>
  );
};

// Custom hook
export const useRouteContext = () => useContext(RouteContext);
