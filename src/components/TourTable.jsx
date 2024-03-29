import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Edit, Trash } from "lucide-react";
import PropTypes from "prop-types";

const TourTable = ({ tours, handleActionBtn }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          Total Tours: <span className="font-semibold">{tours.length}</span>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>City</Th>
            <Th>has CoverImg</Th>
            <Th>Duration</Th>
            <Th>Difficulty</Th>
            <Th>Max GS</Th>
            <Th>has Images</Th>
            <Th isNumeric>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tours.map((tour) => (
            <Tr key={tour?.id}>
              <Td>{tour.name}</Td>
              <Td style={{ maxWidth: "300px" }} className="truncate">
                {tour.description}
              </Td>
              <Td>{tour.city}</Td>
              <Td>{tour.coverImage ? "Yes" : "No"}</Td>
              <Td>{tour.duration}</Td>
              <Td>{tour.difficulty}</Td>
              <Td>{tour.maxGroupSize}</Td>
              <Td>
                {tour.images.length !== 0
                  ? `${tour.images.length} Images`
                  : `0 Image`}
              </Td>
              <Td isNumeric>{tour.price}</Td>
              <Td className="flex items-center gap-x-4">
                <Edit
                  width={14}
                  color="black"
                  cursor={"pointer"}
                  onClick={() => handleActionBtn("edit", tour)}
                />
                <Trash
                  width={14}
                  color="red"
                  cursor={"pointer"}
                  onClick={() => handleActionBtn("delete", tour?.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

TourTable.propTypes = {
  tours: PropTypes.array,
  handleActionBtn: PropTypes.func,
};

export default TourTable;
