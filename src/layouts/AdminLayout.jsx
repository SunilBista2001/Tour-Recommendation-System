import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import TourTable from "../components/TourTable";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTour, getTours } from "../services/tour";
import Loader from "../components/loader/Loader";
import AddTour from "../components/AddTour";
import EditTourModal from "../components/EditTourModal";
import { useState } from "react";

const AdminLayout = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [currentTourData, setCurrentTourData] = useState({});
  const { data: tours, isLoading } = useQuery("tours", getTours, {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleActionBtn = (type, data) => {
    if (type === "edit") {
      setCurrentTourData(data);
      onEditOpen();
    } else {
      setCurrentTourData(data);
      onDeleteOpen();
    }
  };

  const { mutate, isLoading: isDeleting } = useMutation(deleteTour, {
    onSuccess: () => {
      queryClient.invalidateQueries("tours");
      toast({
        title: "Tour deleted successfully.",
        status: "success",
        isClosable: true,
      });
      onDeleteClose();
    },
    onError: () => {
      toast({
        title: "An error occurred while deleting tour.",
        status: "error",
        isClosable: true,
      });
      onDeleteClose();
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex ">
      {/* <Sidebar handleNav={handleNav} /> */}

      {/* Add Tour modal */}
      {isOpen && <AddTour onClose={onClose} isOpen={isOpen} />}

      {/* Edit tour modal */}
      {isEditOpen && (
        <EditTourModal
          onClose={onEditClose}
          isOpen={isEditOpen}
          currentTourData={currentTourData}
        />
      )}

      {/* Delete Tour modal */}
      <Modal isCentered isOpen={isDeleteOpen} onClose={onDeleteOpen}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Text className="text-red-600 font-medium">
              Do you want to Delete this tour?
            </Text>
          </ModalBody>
          <ModalFooter className="space-x-2">
            <Button
              isLoading={isDeleting}
              colorScheme="teal"
              type="submit"
              onClick={() => mutate(currentTourData)}
            >
              Yes
            </Button>
            <Button onClick={onDeleteClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="mt-28 flex w-full flex-col px-8 gap-4">
        <h1 className="text-2xl font-semibold tracking-wider">
          <span className="text-teal-500">Tripo</span> Admin
        </h1>
        <p className="w-full flex justify-end">
          <Button colorScheme="blue" w="max-content" onClick={onOpen}>
            Add Tour
          </Button>
        </p>

        <div className="w-full">
          <TourTable
            tours={tours?.data?.tours}
            handleActionBtn={handleActionBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
