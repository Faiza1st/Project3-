// import
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const navigate = useNavigate();
  console.log(JSON.parse(localStorage.getItem("authUser")));
  const authUser = JSON.parse(localStorage.getItem("authUser")) || null;

  if (!authUser) {
    console.log("auth user", authUser);
    navigate("/login");
  }

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:4050/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 200) {
        throw new Error("Unauthorized");
      }

      localStorage.removeItem("authUser");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start"></Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-[#CBC3E3] transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-[#CBC3E3] transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex gap-3 items-center hover:bg-[#CBC3E3] transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="w-6 h-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {authUser && (
          <div className="flex items-center md:items-center mt-auto">
            <Link
              to={`/profile/${authUser.username}`}
              className="flex gap-3 items-center hover:bg-[#CBC3E3] transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <div className="avatar hidden md:inline-flex">
                <div className="w-8 rounded-full">
                  <img
                    src={authUser?.profileImg || "/avatar-placeholder.png"}
                  />
                </div>
              </div>
              <div className="flex justify-between flex-1">
                <div className="hidden md:block">
                  <p className="text-black font-bold text-sm w-20 truncate">
                    {authUser?.fullName}
                  </p>
                  <p className="text-purple-500 text-sm">
                    @{authUser?.username}
                  </p>
                </div>
              </div>
            </Link>
            <BiLogOut
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
