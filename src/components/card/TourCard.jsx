import { Badge, Box, Image } from "@chakra-ui/react";
import { IndianRupee, StarIcon } from "lucide-react";
import PropTypes from "prop-types";
import img from "../../assets/img/mount.webp";
function TourCard({ tour }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="cursor-pointer "
      backgroundColor={"white"}
    >
      <Image
        src={img}
        alt="img"
        className="hover:scale-105 object-cover duration-500 ease-out"
      />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Duration {tour?.duration}d &bull; Difficult {tour?.difficulty}
          </Box>
        </Box>

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

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i + 1 < tour?.ratingsAverage ? "teal" : "gray"}
                fill={i + 1 < tour?.ratingsAverage ? "teal" : "gray"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {tour?.ratingsQuantity} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default TourCard;
