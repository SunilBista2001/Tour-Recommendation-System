import RecommendTour from "../../components/recommendTour/RecommendTour";
import { useQuery } from "react-query";
import Loader from "../../components/loader/Loader";
import { getTourByCollaborativeAlgorithm, getTours } from "../../services/tour";
import { useEffect, useState } from "react";
import SlideShow from "../../components/slideShow/SlideShow";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [tours, setTours] = useState([]);
  const [topTours, setTopTours] = useState([]);

  const { isLoading: isToursLoading, refetch: fetchTours } = useQuery(
    "tours",
    getTours,
    {
      retry: false,
      enabled: false,
      onSuccess: (data) => {
        setTours(data.data.tours);
        setTopTours(data.data.tours);
      },
    }
  );

  const { isLoading: isToursDataLoading, refetch: fetchAlgoData } = useQuery(
    "tourByCollaborativeAlgorithm",
    getTourByCollaborativeAlgorithm,
    {
      retry: false,
      enabled: false,
      onSuccess: (data) => {
        setTours(data.data.recommendation);
      },
    }
  );

  useEffect(() => {
    if (user) {
      fetchAlgoData();
      fetchTours();
    } else {
      fetchTours();
    }
  }, [fetchAlgoData, fetchTours, user]);

  if (isToursLoading || isToursDataLoading) return <Loader />;

  return (
    <div className="w-full flex justify-center flex-col bg-gray-50">
      <SlideShow />

      {/* Recent Added or Just for you */}
      <div className="w-full justify-center flex my-4 ">
        <RecommendTour
          title={user ? "Just for you" : "Newly Added Tours"}
          tours={tours}
        />
      </div>

      {/* Top Tours */}
      <div className="w-full justify-center flex my-4 bg-white">
        <RecommendTour
          title={"Top High Price Destinations"}
          type="top"
          tours={topTours}
        />
      </div>
    </div>
  );
};

export default Home;
