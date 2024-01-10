import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomModal = ({
  children,
  onClose,
  isOpen,
  initialRef,
  finalRef,
  title,
  onClickSave,
  isLoading,
}) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            loadingText="Saving..."
            colorScheme="teal"
            mr={3}
            onClick={onClickSave}
            type="submit"
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CustomModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  initialRef: PropTypes.shape({ current: PropTypes.any }),
  finalRef: PropTypes.shape({ current: PropTypes.any }),
  title: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CustomModal;
