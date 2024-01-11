import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import SlideShow from "../../components/slideShow/SlideShow";
import { SearchIcon, ShieldPlus, StarIcon } from "lucide-react";
import RecommendTour from "../../components/recommendTour/RecommendTour";
import { useQuery } from "react-query";
import Loader from "../../components/loader/Loader";
import { getTourByCollaborativeAlgorithm, getTours } from "../../services/tour";
import { useState } from "react";

const Home = () => {
  const [tours, setTours] = useState([]);

  // Run this query when the recommendTours don't have enough data
  const { refetch, isLoading: isToursLoading } = useQuery("tours", getTours, {
    enabled: false,
    retry: false,
    onSuccess: (data) => {
      setTours(data.data.tours);
    },
  });

  // Get Recommend Tours
  const { isLoading: isRecommendLoading } = useQuery(
    "recommendTours",
    getTourByCollaborativeAlgorithm,
    {
      onSuccess: (data) => {
        if (data.data.recommendation.length > 2) {
          setTours(data.data.recommendation);
        }
        data.data.recommendation.length < 2 && refetch();
      },
      retry: false,
    }
  );

  if (isRecommendLoading || isToursLoading) return <Loader />;

  return (
    <div className="w-full flex justify-center flex-col">
      <SlideShow />

      {/* Search */}
      <div className="mx-10 mt-4 flex justify-center">
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
      <div className="w-full justify-center flex my-4">
        <RecommendTour title={"Most Popular"} Icon={StarIcon} tours={tours} />
      </div>

      {/* Recent Added Tours */}
      <div className="w-full justify-center flex my-4">
        <RecommendTour
          title={"Recently Added Tour"}
          Icon={ShieldPlus}
          tours={tours}
        />
      </div>
    </div>
  );
};

export default Home;
