import TourCard from "../card/TourCard";
import img from "../../assets/img/mount.webp";
import PropTypes from "prop-types";

const RecommendTour = ({ Icon, title }) => {
  const tours = [
    {
      id: 1,
      imageUrl: img,
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    },
    {
      id: 2,
      imageUrl: img,
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    },
    {
      id: 3,
      imageUrl: img,
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    },
  ];
  return (
    <div className="max-w-7xl">
      {/* Title */}
      <h1 className="flex gap-x-2 items-center font-medium ">
        <Icon color="teal" />
        {title}
      </h1>
      <div className="flex  mx-auto justify-between gap-8 my-7">
        {tours?.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

RecommendTour.propTypes = {
  title: PropTypes.string.isRequired,

  Icon: PropTypes.any.isRequired,
};

export default RecommendTour;
