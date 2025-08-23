import React, { createContext, useContext, useEffect, useState } from "react";

export const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [routes, setRoutes] = useState(() => {
    const stored = localStorage.getItem("routes");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("routes", JSON.stringify(routes));
  }, [routes]);

  // ✅ Add new route
  const addRoute = (route) => {
    setRoutes((prev) => [...prev, { ...route, id: Date.now() }]);
  };

  // ✅ Edit existing route
  const updateRoute = (id, updatedRoute) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedRoute } : r))
    );
  };

  // ✅ Delete route
  const deleteRoute = (id) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RouteContext.Provider
      value={{ routes, addRoute, updateRoute, deleteRoute, setRoutes }}
    >
      {children}
    </RouteContext.Provider>
  );
};

// ✅ Custom hook
export const useRoutes = () => useContext(RouteContext);
