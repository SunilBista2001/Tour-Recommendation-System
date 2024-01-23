import PropTypes from "prop-types";

const Sidebar = ({ handleNav }) => {
  return (
    <div className="sticky h-screen w-72 left-0 top-28 py-6 flex flex-col  bg-black/80">
      <div className="flex flex-col mt-20 px-4">
        <div className="">
          <ul className="text-xl text-white font-medium space-y-2">
            {/* <li className="cursor-pointer" onClick={() => handleNav("users")}>
              Users
            </li> */}
            <li className="cursor-pointer" onClick={() => handleNav("tours")}>
              Tours
            </li>
          </ul>
        </div>
      </div>

      <hr className="border px-2 mt-28" />

      <ul
        className="text-white text-xl px-4 font-medium cursor-pointer"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        <li>Logout</li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  handleNav: PropTypes.func,
};

export default Sidebar;
