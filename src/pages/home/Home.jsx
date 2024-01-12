import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import RecommendTour from "../../components/recommendTour/RecommendTour";
import { useQuery } from "react-query";
import Loader from "../../components/loader/Loader";
import { getTours } from "../../services/tour";
import { useState } from "react";
import SlideShow from "../../components/slideShow/SlideShow";

const Home = () => {
  const [tours, setTours] = useState([]);

  const { isLoading: isToursLoading } = useQuery("tours", getTours, {
    retry: false,
    onSuccess: (data) => {
      setTours(data.data.tours);
    },
  });

  if (isToursLoading) return <Loader />;

  return (
    <div className="w-full flex justify-center flex-col bg-gray-50">
      <SlideShow />

      {/* Search */}
      <div className="mx-10 mt-4 flex justify-center ">
        <div className="w-1/2">
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Search Tour here...."
              className="w-1/2 "
            />
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
          </InputGroup>
        </div>
      </div>

      {/* Most Popular */}
      <div className="w-full justify-center flex my-4 ">
        <RecommendTour title={"Recommended for you"} tours={tours} />
      </div>

      {/* Recent Added Tours */}
      <div className="w-full justify-center flex my-4 bg-white">
        <RecommendTour title={"Top Destinations"} tours={tours} />
      </div>
    </div>
  );
};

export default Home;
