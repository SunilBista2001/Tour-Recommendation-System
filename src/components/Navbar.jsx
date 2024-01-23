import {
  Avatar,
  AvatarBadge,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginRegisterModal from "./loginRegisterModal/LoginRegisterModal";
import { Link, useNavigate } from "react-router-dom";
import LargeLogo from "../assets/logo/1.png";

const Navbar = () => {
  //
  //
  const navigate = useNavigate();
  const [navColor, setNavColor] = useState(false);
  const user = useSelector((state) => state.user.user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isLogoutModalOpen,
    onOpen: onOpenLogoutModal,
    onClose: onCloseLogoutModal,
  } = useDisclosure();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setNavColor(true);
      } else {
        setNavColor(false);
      }
    });
  }, []);

  return (
    <div
      className={`fixed w-full  top-0 ${
        navColor ? "bg-black/65 text-white" : "bg-white"
      } z-50 font-medium transition-all duration-300 ease-in-out shadow-md`}
    >
      {/* When user clicked on pfp without logged in, show this modal*/}
      <LoginRegisterModal isOpen={isOpen} onClose={onClose} />

      {/* When user is logged In while clicking on pfp, show this modal */}
      <Modal isCentered isOpen={isLogoutModalOpen} onClose={onCloseLogoutModal}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>{`Hi, ${user?.data?.user?.username}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text className="text-red-600 font-medium">
              Do you want to Log Out?
            </Text>
          </ModalBody>
          <ModalFooter className="space-x-2">
            <Button
              colorScheme="teal"
              type="submit"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Yes
            </Button>
            <Button onClick={onCloseLogoutModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="flex max-w-7xl mx-auto justify-between items-center px-4 sm:px-6 md:px-2 lg:px-0 h-[80px]">
        <Link to="/">
          {/* <h1 className="italic font-bold text-2xl">Tripo</h1>
           */}
          <Image
            src={LargeLogo}
            alt="logo"
            className="max-w-max h-56 object-cover "
          />
        </Link>

        <ul className="md:flex hidden gap-x-8 items-center">
          <li
            className="hover:text-teal-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li className="hover:text-teal-400 cursor-pointer">Popular Tours</li>
          <li className="hover:text-teal-400 cursor-pointer">About Us</li>
        </ul>

        <Avatar
          size={"sm"}
          name={user?.data?.user?.username}
          src={user?.data?.user?.profilePicture}
          cursor={"pointer"}
          onClick={user ? onOpenLogoutModal : onOpen}
        >
          {user && <AvatarBadge boxSize="1em" bg={"green"} />}
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
