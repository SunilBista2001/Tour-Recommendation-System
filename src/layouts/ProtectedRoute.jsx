import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // fetched me from getMe service

  useEffect(() => {
    if (!token) {
      <Navigate to="/login" />;
    } else {
      return;
    }
  }, [token]);

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
