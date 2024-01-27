import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import { getMe } from "../services/auth";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/loader/Loader";
import AdminLayout from "./AdminLayout";
import Footer from "../components/Footer";

const PublicLayout = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const {
    data: user,
    refetch,
    isLoading,
  } = useQuery("me", getMe, {
    retry: false,
    enabled: false,
    onSuccess: (data) => {
      dispatch(login(data));
    },
    onError: () => {
      console.error("An error occurred while fetching user data.");
    },
  });

  // Check if token is available
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [refetch, token]);

  if (isLoading) return <Loader />;

  return (
    <div className="relative">
      <Navbar />
      {user?.data?.user?.role === "admin" ? <AdminLayout /> : <Outlet />}

      <Footer />
    </div>
  );
};

export default PublicLayout;
