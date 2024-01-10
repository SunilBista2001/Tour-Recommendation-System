import { Outlet } from "react-router-dom";
import DefaultBgImage from "../assets/img/mount.webp";

const PublicLayout = () => {
  return (
    <>
      <div className="relative h-screen ">
        <img
          src={DefaultBgImage}
          alt="background img"
          className="object-cover w-full h-full brightness-50 opacity-95"
        />
        <Outlet />
      </div>
    </>
  );
};

export default PublicLayout;
