/* eslint-disable react/no-unescaped-entities */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { deleteReview } from "../../services/review";

const DeleteModal = ({ id, isOpen, onClose, cancelRef, title, content }) => {
  const queryClient = useQueryClient();
  const { mutate: mutateReview, isLoading } = useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("tour");
      onClose();
    },
  });

  const handleDelete = () => {
    if (title === "Review") {
      mutateReview({ id });
    }
  };

  console.log("id", id);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {title}
          </AlertDialogHeader>

          <AlertDialogBody>{content}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              isLoading={isLoading}
              loadingText="Deleting...."
              onClick={handleDelete}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cancelRef: PropTypes.any,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default DeleteModal;
