import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RouteManagement from "./pages/RouteManagement.jsx";
import AddRoutePage from "./pages/AddRoutePage.jsx";

import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import { RouteProvider } from "./context/RouteContext.jsx";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

// Layout wrapper that conditionally shows Navbar
const AppLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Navbar />}
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routes"
            element={
              <ProtectedRoute>
                <RouteManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-route"
            element={
              <ProtectedRoute>
                <AddRoutePage />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RouteProvider>
        <AppLayout />
      </RouteProvider>
    </AuthProvider>
  );
};

export default App;
