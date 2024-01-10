import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../layouts/ProtectedRoute";

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <Outlet />
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
