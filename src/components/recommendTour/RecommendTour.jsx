import TourCard from "../card/TourCard";
import PropTypes from "prop-types";

const RecommendTour = ({ title, tours }) => {
  return (
    <div className={`max-w-7xl my-10`}>
      {/* Title */}
      <h1 className=" text-3xl text-center font-bold ">{title}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 mx-auto justify-between gap-8 my-7">
        {tours?.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

RecommendTour.propTypes = {
  title: PropTypes.string.isRequired,
  tours: PropTypes.array.isRequired,
};

export default RecommendTour;
