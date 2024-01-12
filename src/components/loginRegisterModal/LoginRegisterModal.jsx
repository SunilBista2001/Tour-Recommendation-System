/* eslint-disable react/no-unescaped-entities */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginRegisterModal = ({ onClose, isOpen, initialRef, finalRef }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [title, setTitle] = useState("Sign in to your account");

  const handleFormType = (formType) => {
    if (formType === "login") {
      setIsLoginForm(true);
      setTitle("Sign in to your account");
    } else {
      setIsLoginForm(false);
      setTitle("Create an account");
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"teal"}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {isLoginForm ? (
            <LoginForm handleFormType={handleFormType} onClose={onClose} />
          ) : (
            <RegisterForm handleFormType={handleFormType} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

LoginRegisterModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  initialRef: PropTypes.shape({ current: PropTypes.any }),
  finalRef: PropTypes.shape({ current: PropTypes.any }),
  type: PropTypes.string,
};

export default LoginRegisterModal;
