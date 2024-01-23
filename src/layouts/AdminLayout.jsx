import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "@chakra-ui/react";
import TourTable from "../components/TourTable";
import { useQuery } from "react-query";
import { getTours } from "../services/tour";
import Loader from "../components/loader/Loader";

const AdminLayout = () => {
  const [nav, setNav] = useState("tours");

  const handleNav = (type) => {
    setNav(type);
  };

  const { data: tours, isLoading } = useQuery("tours", getTours);

  if (isLoading) return <Loader />;

  console.log(tours);

  return (
    <div className="w-full flex ">
      <Sidebar handleNav={handleNav} />

      {nav === "tours" && (
        <div className="mt-28 flex w-full flex-col px-8 gap-4">
          <p className="w-full flex justify-end">
            <Button colorScheme="blue" w="max-content">
              Add Tour
            </Button>
          </p>
          <div className="max-w-5xl">
            <TourTable tours={tours?.data?.tours} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
