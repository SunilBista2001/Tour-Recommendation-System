import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import { getMe } from "../services/auth";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/loader/Loader";

const PublicLayout = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { refetch, isLoading } = useQuery("me", getMe, {
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
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
