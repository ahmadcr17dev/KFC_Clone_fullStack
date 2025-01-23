import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    // Not an admin
    return <Navigate to="/admin" />;
  }

  // Logged in and is an admin
  return children;
};

export default PrivateRoute;
