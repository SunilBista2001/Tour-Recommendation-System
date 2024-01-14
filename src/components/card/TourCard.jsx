import { Box, Image } from "@chakra-ui/react";
import { IndianRupee, MapPin, StarIcon, TimerIcon } from "lucide-react";
import PropTypes from "prop-types";
import img from "../../assets/img/mount.webp";
import { Link } from "react-router-dom";
function TourCard({ tour }) {
  return (
    <Link to={`/tour/${tour?.id}`} target="_blank">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        className="cursor-pointer "
        backgroundColor={"white"}
      >
        <Image
          src={
            tour?.coverImage
              ? import.meta.env.VITE_REACT_APP_BASE_URL +
                "/tours/" +
                tour?.coverImage
              : img
          }
          alt="img"
          className="hover:scale-105 object-cover duration-500 ease-out"
        />
        <Box p="5">
          <div className="flex items-center gap-x-2 text-sm text-gray-600 font-normal -ml-2">
            <MapPin size={20} className="text-gray-400" />
            {tour?.name?.charAt(0)?.toUpperCase() +
              tour?.name?.slice(1) +
              ", " +
              tour?.city +
              ", " +
              "Nepal"}
          </div>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {tour?.name}
          </Box>

          <Box className="flex items-center ">
            <IndianRupee size={16} color="green" />
            {tour?.price}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box>

          <Box
            display="flex"
            mt="2"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <p className="flex items-center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i + 1 < tour?.ratingsAverage ? "teal" : "gray"}
                    fill={i + 1 < tour?.ratingsAverage ? "teal" : "none"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {tour?.ratingsQuantity} reviews
              </Box>
            </p>
            <Box
              as="span"
              display={"flex"}
              gap={"4px"}
              alignItems={"center"}
              color="gray.600"
              fontSize="sm"
            >
              <TimerIcon size={16} />
              {tour?.duration} days
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default TourCard;
