import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";

const NotificationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);

        // Fetch notifications with credentials
        const res = await axios.get("/api/notification", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log(res.data);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Error fetching notifications");
        toast.error("Error fetching notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const deleteNotifications = () => {
    try {
      axios.delete("/api/notification", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setNotifications([]);
    } catch (error) {
      console.error("Error deleting notifications:", error);
      setError("Error deleting notifications");
      toast.error("Error deleting notifications");
    }
  };

  console.log(notifications);

  return (
    <>
      <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <p className="font-bold">Notifications</p>
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="m-1">
              <IoSettingsOutline className="w-4" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={deleteNotifications}>Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {error && (
          <div className="text-center p-4 font-bold text-purple-500">{error}</div>
        )}
        {!isLoading && notifications.length === 0 && (
          <div className="text-center p-4 font-bold">No notifications Yet !</div>
        )}
        {notifications.map((notification) => (
          <div className="border-b border-gray-700" key={notification._id}>
            <div className="flex gap-2 p-4">
              {notification.type === "follow" && (
                <FaUser className="w-7 h-7 text-primary" />
              )}
              {notification.type === "like" && (
                <FaHeart className="w-7 h-7 text-red-500" />
              )}
              <Link to={`/profile/${notification.from.username}`}>
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={
                        notification.from.profileImg ||
                        "/avatar-placeholder.png"
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="font-bold">
                    @{notification.from.username}
                  </span>{" "}
                  {notification.type === "follow"
                    ? "followed you"
                    : "liked your post"}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationPage;
