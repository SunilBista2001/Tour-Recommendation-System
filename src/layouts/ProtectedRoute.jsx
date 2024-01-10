import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import { getMe } from "../services/auth";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/loader/Loader";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { isLoading } = useQuery("me", getMe, {
    retry: 2,
    onSuccess: (data) => {
      dispatch(login(data));
    },
    onError: () => {
      console.error("An error occurred while fetching user data.");
      <Navigate to="/login" />;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
