import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import { getMe } from "../services/auth";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/loader/Loader";
import PropTypes from "prop-types";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { isLoading, refetch } = useQuery("me", getMe, {
    retry: false,
    enabled: false,
    onSuccess: (data) => {
      dispatch(login(data));
      <Navigate to="/" />;
    },
    onError: () => {
      console.error("An error occurred while fetching user data.");
    },
  });

  useEffect(() => {
    if (!token) {
      <Navigate to="/login" />;
    } else {
      refetch();
    }
  }, [token]);

  if (isLoading) {
    return <Loader />;
  }

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
