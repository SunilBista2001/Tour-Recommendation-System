import {
  Avatar,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { LogOutIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CustomModal from "./modal";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { updateMe } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [color, setColor] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputRef = useRef(null);
  const [buildImage, setBuildImage] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { mutate, isLoading } = useMutation(updateMe, {
    onSuccess: () => {
      onClose();
    },
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setColor(true);
      } else {
        setColor(false);
      }
    });
  }, []);

  const onChangeAvatar = (e) => {
    setAvatar(e.target.files[0]);
    setBuildImage(URL.createObjectURL(e.target.files[0]));
  };

  const onClickSave = () => {
    const formData = new FormData();
    formData.append("profilePicture", avatar);
    mutate(formData);
  };

  return (
    <div
      className={`fixed w-full  top-0 ${
        color ? "bg-black/65 text-white" : "bg-white"
      } z-50 font-medium transition-all duration-300 ease-in-out shadow-md`}
    >
      {
        <CustomModal
          isOpen={isOpen}
          onClose={() => {
            setBuildImage("");
            onClose();
          }}
          title="Upload Avatar"
          onClickSave={onClickSave}
          isLoading={isLoading}
        >
          <div className="flex justify-center items-center">
            <Input
              type="file"
              display={"none"}
              ref={inputRef}
              onChange={onChangeAvatar}
            />
            {buildImage ? (
              <Avatar size={"2xl"} src={buildImage} />
            ) : (
              <UploadCloudIcon
                color="teal"
                className="w-20 h-20 hover:scale-105 duration-150 ease-in cursor-pointer"
                onClick={() => inputRef.current.click()}
              />
            )}
          </div>
        </CustomModal>
      }

      <div className="flex max-w-7xl mx-auto justify-between items-center h-[70px]">
        <h1 className="italic font-bold text-2xl">Tripo</h1>

        <ul className="flex gap-x-8 items-center">
          <li className="hover:text-teal-400 cursor-pointer">Home</li>
          <li className="hover:text-teal-400 cursor-pointer">Popular Tours</li>
          <li className="hover:text-teal-400 cursor-pointer">About Us</li>
          <Menu>
            <MenuButton>
              <Avatar
                size={"sm"}
                name={user?.data?.user?.username}
                src={user?.data?.user?.profilePicture}
                cursor={"pointer"}
              />
            </MenuButton>
            <MenuList className="text-sm">
              <MenuGroup title="Account Settings">
                <MenuItem
                  className="flex items-center gap-x-1"
                  onClick={onOpen}
                >
                  <UploadCloudIcon color="teal" /> Upload Avatar
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem
                className="flex items-center gap-x-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                <LogOutIcon color="teal" /> Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
