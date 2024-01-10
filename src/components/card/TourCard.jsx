import { Badge, Box, Image } from "@chakra-ui/react";
import { StarIcon } from "lucide-react";
import PropTypes from "prop-types";

function TourCard({ tour }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="cursor-pointer hover:scale-105 duration-300 ease-out"
    >
      <Image src={tour?.imageUrl} alt={tour?.imageAlt} />
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
            {tour?.beds} beds &bull; {tour?.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {tour?.title}
        </Box>

        <Box>
          {tour?.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < tour?.rating ? "teal" : "gray"} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {tour?.reviewCount} reviews
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
