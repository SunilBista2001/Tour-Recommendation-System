import TourCard from "../card/TourCard";
import PropTypes from "prop-types";

const RecommendTour = ({ Icon, title, tours }) => {
  return (
    <div className="max-w-7xl">
      {/* Title */}
      <h1 className="flex gap-x-2 items-center font-medium ">
        <Icon color="teal" />
        {title}
      </h1>
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
  Icon: PropTypes.any.isRequired,
};

export default RecommendTour;
