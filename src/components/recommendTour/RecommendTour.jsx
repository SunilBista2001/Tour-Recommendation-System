import { useSelector } from "react-redux";
import TourCard from "../card/TourCard";
import PropTypes from "prop-types";

const RecommendTour = ({ title, tours, type }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={`max-w-7xl my-10`}>
      {/* Title */}
      <h1 className=" text-3xl text-center font-bold ">{title}</h1>
      {type !== "top" ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 mx-auto justify-between gap-8 my-7">
          {!user
            ? tours
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((tour) => <TourCard key={tour.id} tour={tour} />)
            : tours?.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 mx-auto justify-between gap-8 my-7">
          {tours
            ?.sort((a, b) => b.price - a.price)
            .map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
      )}
    </div>
  );
};

RecommendTour.propTypes = {
  title: PropTypes.string.isRequired,
  tours: PropTypes.array.isRequired,
  type: PropTypes.string,
};

export default RecommendTour;
